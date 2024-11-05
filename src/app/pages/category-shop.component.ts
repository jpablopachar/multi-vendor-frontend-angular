import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-category-shop',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './category-shop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryShopComponent { }
