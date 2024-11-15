import { FormControl } from "@angular/forms"

export interface ShippingForm {
  name: FormControl<string>;
  address: FormControl<string>;
  phone: FormControl<string>;
  post: FormControl<string>;
  province: FormControl<string>;
  city: FormControl<string>;
  area: FormControl<string>;
}