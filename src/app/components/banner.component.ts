import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>banner works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent { }
