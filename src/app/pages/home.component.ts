import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core'
import {
  BannerComponent,
  CategoryComponent,
  FeatureProductsComponent,
  FooterComponent,
  HeaderComponent,
  ProductsComponent,
} from '@app/components'
import { Product } from '@app/models'
import {
  homeActions,
  selectDiscountProduct,
  selectLatestProduct,
  selectProducts,
  selectTopRatedProduct,
} from '@app/store/home'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BannerComponent,
    CategoryComponent,
    FeatureProductsComponent,
    ProductsComponent,
    FooterComponent,
  ],
  template: `
    <div class="w-full">
      <app-header />
      <app-banner />
      <app-category />
      <div class="py-[45px]">
        <app-feature-products />
      </div>
      <div class="py-10">
        <div class="w-[85%] flex flex-wrap mx-auto">
          <div
            class="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7"
          >
            <div class="overflow-hidden">
              <app-products />
            </div>
            <div class="overflow-hidden">
              <app-products />
            </div>

            <div class="overflow-hidden">
              <app-products />
            </div>
          </div>
        </div>
      </div>
      <app-footer />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly _store = inject(Store);

  public $products: Signal<Product[]> =
    this._store.selectSignal(selectProducts);
  public $latestProduct: Signal<Product[]> =
    this._store.selectSignal(selectLatestProduct);
  public $topRatedProduct: Signal<Product[]> = this._store.selectSignal(
    selectTopRatedProduct
  );
  public $discountProduct: Signal<Product[]> = this._store.selectSignal(
    selectDiscountProduct
  );

  ngOnInit(): void {
    this._store.dispatch(homeActions.getProducts());
  }
}
