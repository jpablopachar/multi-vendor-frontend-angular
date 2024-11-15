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
  Validators
} from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { FooterComponent, HeaderComponent } from '@app/components'
import { CardProduct, ShippingForm, UserInfo } from '@app/models'
import { selectUserInfo } from '@app/store/auth'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
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

  public ngOnInit(): void {
    this._getParams();
  }

  private _getParams(): void {
    this._route.queryParams.subscribe((params: Params): void => {
      const products: CardProduct[] = JSON.parse(params['products']);
      const price = Number(params['price']);
      const shippingFee = Number(params['shippingFee']);
      const items = Number(params['items']);

      this.$products.set(products);
      this.$price.set(price);
      this.$shippingFee.set(shippingFee);
      this.$items.set(items);
    });
  }

  public save(): void {
    /* if (this.shippingForm.invalid) return;

    const { name, address, phone, post, province, city, area } = this.shippingForm.controls; */
  }
}
