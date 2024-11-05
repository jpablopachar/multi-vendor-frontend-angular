import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shop-products',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>shop-products works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopProductsComponent { }
