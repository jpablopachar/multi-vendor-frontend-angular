import { NgxSliderModule, Options } from '@angular-slider/ngx-slider'
import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core'
import { Router } from '@angular/router'
import {
  FooterComponent,
  HeaderComponent,
  PaginationComponent,
  ProductsComponent,
} from '@app/components'
import { Category, ProductInfo } from '@app/models'
import {
  selectCategories,
  selectLatestProduct,
  selectProducts,
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
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ShopsComponent,
    PaginationComponent,
  ],
  templateUrl: './shops.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopsComponent {
  private readonly _store = inject(Store);
  private readonly _router: Router = inject(Router);

  public $products: Signal<ProductInfo[]> =
    this._store.selectSignal(selectProducts);
  public $categories: Signal<Category[]> =
    this._store.selectSignal(selectCategories);
  /* public $products =
    this._store.selectSignal(selectPri); */
  public $latestProduct: Signal<ProductInfo[][]> =
    this._store.selectSignal(selectLatestProduct);
  /* public $products =
    this._store.selectSignal(selectTota); */
  /* public $products =
    this._store.selectSignal(selectP); */

  public $filter: WritableSignal<boolean> = signal(true);
  public $styles: WritableSignal<string> = signal('grid');
  public $rating: WritableSignal<number | string> = signal('');
  public $sortPrice: WritableSignal<string> = signal('');
  public $category: WritableSignal<string> = signal('');
  public $state: WritableSignal<{ values: number[] }> = signal({
    values: [0, 100],
  });

  public sliderOptions: Options = SLIDER_OPTIONS;
  public faStar: IconDefinition = fasStar;
  public farStar: IconDefinition = farStar;
  public faArrowRight: IconDefinition = faArrowRight;
  public faGrin: IconDefinition = faGrin;
  public faList: IconDefinition = faList;

  public queryCategory(event: Event, value: string): void {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.$category.set(value);
    } else {
      this.$category.set('');
    }
  }
}
