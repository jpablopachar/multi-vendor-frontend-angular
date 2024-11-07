import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  Signal,
  ViewEncapsulation,
  effect,
  inject,
  input,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { ProductInfo, UserInfo } from '@app/models'
import { selectUserInfo } from '@app/store/auth'
import {
  cardActions,
  selectErrorMessage,
  selectSuccessMessage,
} from '@app/store/card'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'
import { RatingComponent } from '../rating.component'

@Component({
  selector: 'app-feature-products',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink, RatingComponent],
  templateUrl: './feature-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FeatureProductsComponent {
  private readonly _store = inject(Store);
  private readonly _router: Router = inject(Router);
  private readonly _toastr: ToastrService = inject(ToastrService);

  readonly $products: InputSignal<ProductInfo[]> =
    input.required<ProductInfo[]>();

  public $userInfo: Signal<UserInfo | null> =
    this._store.selectSignal(selectUserInfo);
  public $successMessage: Signal<string> =
    this._store.selectSignal(selectSuccessMessage);
  public $errorMessage: Signal<string> =
    this._store.selectSignal(selectErrorMessage);

  public faEye: IconDefinition = faEye;
  public faHeart: IconDefinition = faHeart;
  public faShoppingCart: IconDefinition = faShoppingCart;

  constructor() {
    effect(
      (): void => {
        const successMessage: string = this.$successMessage();

        if (successMessage) {
          this._toastr.success(successMessage);

          this._store.dispatch(cardActions.messageClear());
        }

        const errorMessage: string = this.$errorMessage();

        if (errorMessage) {
          this._toastr.error(errorMessage);

          this._store.dispatch(cardActions.messageClear());
        }
      },
      { allowSignalWrites: true }
    );
  }

  public addCard(id: string): void {
    if (this.$userInfo()) {
      console.log('Add product to card: ', id);
    } else {
      this._router.navigate(['/login']);
    }
  }

  public addWishlist(product: ProductInfo): void {
    console.log('Add product to wishlist: ', product);
  }
}
