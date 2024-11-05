import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent { }
