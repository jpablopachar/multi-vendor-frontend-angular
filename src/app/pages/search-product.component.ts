import { NgxSliderModule, Options } from '@angular-slider/ngx-slider'
import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import {
  FooterComponent,
  HeaderComponent,
  PaginationComponent,
  ProductsComponent,
  ShopProductsComponent,
  StylesType,
} from '@app/components'
import {
  Category,
  PriceRange,
  ProductInfo,
  QueryProductsRequest,
} from '@app/models'
import { MathOperationsPipe } from '@app/pipes'
import {
  homeActions,
  selectCategories,
  selectLatestProduct,
  selectParPage,
  selectPriceRange,
  selectProducts,
  selectTotalProduct,
} from '@app/store/home'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRight,
  faGrin,
  faList,
  faStar as fasStar,
} from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'

const SLIDER_OPTIONS: Options = {
  step: 5,
  showTicks: false,
  animate: false,
  showSelectionBar: true,
};

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxSliderModule,
    MathOperationsPipe,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    PaginationComponent,
    ShopProductsComponent,
  ],
  templateUrl: './search-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchProductComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);

  public $products: Signal<ProductInfo[]> =
    this._store.selectSignal(selectProducts);
  public $categories: Signal<Category[]> =
    this._store.selectSignal(selectCategories);
  public $priceRange: Signal<PriceRange> =
    this._store.selectSignal(selectPriceRange);
  public $latestProduct: Signal<ProductInfo[][]> =
    this._store.selectSignal(selectLatestProduct);
  public $totalProduct: Signal<number> =
    this._store.selectSignal(selectTotalProduct);
  public $parPage: Signal<number> = this._store.selectSignal(selectParPage);

  public $filter: WritableSignal<boolean> = signal(true);
  public $styles: WritableSignal<StylesType> = signal('grid');
  public $rating: WritableSignal<number | string> = signal('');
  public $pageNumber: WritableSignal<number> = signal(1);
  public $sortPrice: WritableSignal<string> = signal('');
  public $state: WritableSignal<{ values: number[] }> = signal({
    values: [this.$priceRange().low!, this.$priceRange().high!],
  });

  private $_category: WritableSignal<string> = signal('');
  private $_searchValue: WritableSignal<string> = signal('');

  public sliderOptions!: Options;
  public low!: number | null;
  public high!: number | null;

  public isPriceLRangeLoading = false;
  public fasStar: IconDefinition = fasStar;
  public farStar: IconDefinition = farStar;
  public faArrowRight: IconDefinition = faArrowRight;
  public faGrin: IconDefinition = faGrin;
  public faList: IconDefinition = faList;

  constructor() {
    effect(
      (): void => {
        const priceRange = this.$priceRange();

        if (priceRange) {
          if (priceRange.low && priceRange.high) {
            if (!this.isPriceLRangeLoading) {
              this.sliderOptions = {
                ...SLIDER_OPTIONS,
                ceil: priceRange.high,
                floor: priceRange.low,
              };
            }

            this.low = priceRange.low;
            this.high = priceRange.high;
            this.isPriceLRangeLoading = true;
            this.$state.set({
              values: [priceRange.low, priceRange.high],
            });
          }
        }
      },
      { allowSignalWrites: true }
    );

    effect(
      (): void => {
        const state: { values: number[] } = this.$state();
        const category: string = this.$_category();
        const rating: string | number = this.$rating();
        const sortPrice: string = this.$sortPrice();
        const pageNumber: number = this.$pageNumber();
        const searchValue: string = this.$_searchValue();

        if (
          state.values[0] ||
          state.values[1] ||
          category ||
          rating ||
          sortPrice ||
          searchValue ||
          pageNumber
        ) {
          this._queryProducts();
        }
      },
      { allowSignalWrites: true }
    );
  }

  public ngOnInit(): void {
    this._route.queryParams.subscribe((params: Params): void => {
      this.$_category.set(params['category']);
      this.$_searchValue.set(params['value']);
    });

    this._store.dispatch(homeActions.priceRangeProduct());
  }

  public setRating(value: number | string): void {
    this.$rating.set(value);
  }

  public resetRating(): void {
    this.$rating.set('');

    this._queryProducts(true);
  }

  public selectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;

    this.$sortPrice.set(target.value);
  }

  public onPageChange(page: number): void {
    console.log(page);
  }

  public onPriceChange(): void {
    const response: PriceRange = { low: this.low, high: this.high };

    this._store.dispatch(homeActions.updatePriceRange({ response }));
  }

  private _queryProducts(reset?: boolean): void {
    const query: QueryProductsRequest = {
      low: this.$state().values[0],
      high: this.$state().values[1],
      category: this.$_category()!,
      rating: reset ? '' : this.$rating(),
      sortPrice: this.$sortPrice(),
      pageNumber: this.$pageNumber(),
      searchValue: this.$_searchValue()!,
    };

    this._store.dispatch(homeActions.queryProducts({ query }));
  }
}
