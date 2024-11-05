import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-stripe',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './stripe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripeComponent { }
