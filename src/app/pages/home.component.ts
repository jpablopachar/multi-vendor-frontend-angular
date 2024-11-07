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
import { ProductInfo } from '@app/models'
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
        <app-feature-products [$products]="$products()" />
      </div>
      <div class="py-10">
        <div class="w-[85%] flex flex-wrap mx-auto">
          <div
            class="grid w-full grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-7"
          >
            <div class="overflow-hidden">
              <app-products
                [title]="'Latest Product'"
                [$products]="$latestProduct()"
              />
            </div>
            <div class="overflow-hidden">
              <app-products
                [title]="'Top Rated Product'"
                [$products]="$topRatedProduct()"
              />
            </div>
            <div class="overflow-hidden">
              <app-products
                [title]="'Discount Product'"
                [$products]="$discountProduct()"
              />
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

  public $products: Signal<ProductInfo[]> =
    this._store.selectSignal(selectProducts);
  public $latestProduct: Signal<ProductInfo[][]> =
    this._store.selectSignal(selectLatestProduct);
  public $topRatedProduct: Signal<ProductInfo[][]> = this._store.selectSignal(
    selectTopRatedProduct
  );
  public $discountProduct: Signal<ProductInfo[][]> = this._store.selectSignal(
    selectDiscountProduct
  );

  ngOnInit(): void {
    this._store.dispatch(homeActions.getProducts());
  }
}
