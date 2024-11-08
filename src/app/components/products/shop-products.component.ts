import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  InputSignal,
} from '@angular/core'
import { ProductInfo } from '@app/models'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { RatingComponent } from '../rating.component'

export type StylesType = 'grid' | 'list';

@Component({
  selector: 'app-shop-products',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RatingComponent],
  template: `
    <div
      class="w-full grid gap-3"
      [ngClass]="
        styles === 'grid'
          ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2'
          : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'
      "
    >
      @for (product of $products(); track product._id;) {
      <div
        class="flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 w-full gap-4 bg-white p-1 rounded-md"
        [ngClass]="
          styles === 'grid'
            ? 'flex-col justify-start items-start'
            : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'
        "
      >
        <div
          [ngClass]="
            styles === 'grid'
              ? 'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden'
              : 'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'
          "
        >
          <img
            class="h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-cover"
            [src]="product.images[0]"
            alt=""
          />
          <ul
            class="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3"
          >
            <li
              class="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
            >
              <fa-icon [icon]="faHeart"></fa-icon>
            </li>
            <li
              class="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
            >
              <fa-icon [icon]="faEye"></fa-icon>
            </li>
            <li
              class="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
            >
              <fa-icon [icon]="faShoppingCart"></fa-icon>
            </li>
          </ul>
        </div>
        <div class="flex justify-start items-start flex-col gap-1">
          <h2 class="font-bold">{{ product.name }}</h2>
          <div class="flex justify-start items-center gap-3">
            <span class="text-md font-semibold">{{
              product.price | currency
            }}</span>
            <div class="flex">
              <app-rating [ratings]="product.rating"></app-rating>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopProductsComponent {
  @Input({ required: true }) styles!: StylesType;

  readonly $products: InputSignal<ProductInfo[]> =
    input.required<ProductInfo[]>();

  public faEye: IconDefinition = faEye;
  public faHeart: IconDefinition = faHeart;
  public faShoppingCart: IconDefinition = faShoppingCart;
}
