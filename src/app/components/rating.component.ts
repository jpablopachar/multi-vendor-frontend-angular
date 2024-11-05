import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>rating works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent { }
