import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  Signal,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { FooterComponent, HeaderComponent } from '@app/components'
import { CardProduct, OutOfStockProduct, Product, UserInfo } from '@app/models'
import { MathOperationsPipe } from '@app/pipes'
import { selectUserInfo } from '@app/store/auth'
import {
  cardActions,
  selectBuyProductItem,
  selectCardProducts,
  selectOutOfStockProducts,
  selectPrice,
  selectShippingFee,
  selectSuccessMessage,
} from '@app/store/card'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    MathOperationsPipe,
  ],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _router: Router = inject(Router);
  private readonly _toastr: ToastrService = inject(ToastrService);

  public $userInfo: Signal<UserInfo | null> =
    this._store.selectSignal(selectUserInfo);
  public $cardProducts: Signal<CardProduct[]> =
    this._store.selectSignal(selectCardProducts);
  public $successMessage: Signal<string> =
    this._store.selectSignal(selectSuccessMessage);
  public $price: Signal<number> = this._store.selectSignal(selectPrice);
  public $buyProductItem: Signal<number> =
    this._store.selectSignal(selectBuyProductItem);
  public $shippingFee: Signal<number> =
    this._store.selectSignal(selectShippingFee);
  public $outOfStockProducts: Signal<OutOfStockProduct[]> =
    this._store.selectSignal(selectOutOfStockProducts);

  public faArrowRight: IconDefinition = faArrowRight;

  constructor() {
    effect(
      (): void => {
        const successMessage: string = this.$successMessage();

        if (successMessage) {
          this._toastr.success(successMessage);

          this._store.dispatch(cardActions.messageClear());

          this._store.dispatch(
            cardActions.getCardProducts({ userId: this.$userInfo()!.id })
          );
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    if (!this.$userInfo()) {
      this._store.dispatch(
        cardActions.getCardProducts({ userId: this.$userInfo()!.id })
      );
    }
  }

  public trackByItems(index: number, item: Product): string {
    return item.id;
  }

  public redirect(): void {
    this._router.navigate(['/shipping'], {
      state: {
        products: this.$cardProducts(),
        price: this.$price(),
        shipping_fee: this.$shippingFee(),
        items: this.$buyProductItem(),
      },
    });
  }

  public inc(quantity: number, stock: number, cardId: string): void {
    const temp: number = quantity + 1;

    if (temp <= stock)
      this._store.dispatch(cardActions.quantityInc({ cardId }));
  }

  public dec(quantity: number, cardId: string): void {
    const temp: number = quantity - 1;

    if (temp !== 0) this._store.dispatch(cardActions.quantityDec({ cardId }));
  }

  public deleteCard(productId: string): void {
    this._store.dispatch(cardActions.deleteCardProduct({ cardId: productId }));
  }
}
