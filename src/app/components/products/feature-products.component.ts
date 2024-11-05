import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-feature-products',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>feature-products works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureProductsComponent { }
