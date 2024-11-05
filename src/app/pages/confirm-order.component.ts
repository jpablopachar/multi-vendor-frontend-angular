import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>confirm-order works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmOrderComponent { }
