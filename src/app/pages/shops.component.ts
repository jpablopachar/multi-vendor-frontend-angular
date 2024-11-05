import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './shops.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopsComponent { }
