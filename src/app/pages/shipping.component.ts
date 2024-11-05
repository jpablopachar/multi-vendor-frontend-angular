import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './shipping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingComponent { }
