import { NgxSliderModule, Options } from '@angular-slider/ngx-slider'
import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core'
import { Router } from '@angular/router'
import {
  FooterComponent,
  HeaderComponent,
  PaginationComponent,
  ProductsComponent,
  ShopProductsComponent,
  StylesType,
} from '@app/components'
import { Category, PriceRange, ProductInfo } from '@app/models'
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
  floor: 0,
  ceil: 1000,
  step: 5,
  showTicks: false,
  animate: false,
  showSelectionBar: true,
  translate: (value: number): string => {
    return `$${value}`;
  },
};

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxSliderModule,
    MathOperationsPipe,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ShopsComponent,
    PaginationComponent,
    ShopProductsComponent,
  ],
  templateUrl: './shops.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopsComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _router: Router = inject(Router);

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
  public $category: WritableSignal<string> = signal('');
  public $state: WritableSignal<{ values: number[] }> = signal({
    values: [0, 100],
  });

  public sliderOptions: Options = SLIDER_OPTIONS;
  public fasStar: IconDefinition = fasStar;
  public farStar: IconDefinition = farStar;
  public faArrowRight: IconDefinition = faArrowRight;
  public faGrin: IconDefinition = faGrin;
  public faList: IconDefinition = faList;

  public ngOnInit(): void {
    this._store.dispatch(homeActions.priceRangeProduct());
  }

  public queryCategory(event: Event, value: string): void {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.$category.set(value);
    } else {
      this.$category.set('');
    }
  }

  public setRating(value: number | string): void {
    this.$rating.set(value);
  }

  public resetRating(): void {
    this.$rating.set(0);
  }

  public selectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;

    this.$sortPrice.set(target.value);
  }

  public onPageChange(page: number): void {
    console.log(page);
  }
}
