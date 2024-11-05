import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './search-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchProductComponent { }
