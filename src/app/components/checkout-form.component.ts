import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>checkout-form works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent { }
