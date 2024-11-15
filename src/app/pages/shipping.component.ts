 

import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { FooterComponent, HeaderComponent } from '@app/components'
import {
  CardProduct,
  PlaceOrderRequest,
  Product,
  ShippingForm,
  ShippingParams,
  UserInfo,
} from '@app/models'
import { MathOperationsPipe } from '@app/pipes'
import { selectUserInfo } from '@app/store/auth'
import { orderActions } from '@app/store/order'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    MathOperationsPipe,
  ],
  templateUrl: './shipping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingComponent implements OnInit {
  private readonly _store = inject(Store);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  public $userInfo: Signal<UserInfo | null> =
    this._store.selectSignal(selectUserInfo);

  public $products: WritableSignal<CardProduct[]> = signal([]);
  public $price: WritableSignal<number> = signal(0);
  public $shippingFee: WritableSignal<number> = signal(0);
  public $items: WritableSignal<number> = signal(0);
  public $res: WritableSignal<boolean> = signal(false);

  public shippingForm: FormGroup<ShippingForm> = this._formBuilder.group({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    address: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phone: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    post: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    province: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    city: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    area: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public faChevronRight: IconDefinition = faChevronRight;

  public ngOnInit(): void {
    this._getParams();
  }

  public trackByFn(index: number, item: Product): string {
    return item.id;
  }

  private _getParams(): void {
    const params: ShippingParams = history.state.data;

    const { items, price, products, shippingFee } = params;

    this.$products.set(products);
    this.$price.set(price);
    this.$shippingFee.set(shippingFee);
    this.$items.set(items);
  }

  public save(): void {
    if (this.shippingForm.invalid) return;

    this.$res.set(true);
  }

  public placeOrder(): void {
    const request: PlaceOrderRequest = {
      price: this.$price(),
      products: this.$products(),
      shippingFee: this.$shippingFee(),
      items: this.$items(),
      shippingInfo: this.shippingForm.getRawValue(),
      userId: this.$userInfo()?.id || '',
    };

    this._store.dispatch(orderActions.placeOrder({ request }));
  }
}
