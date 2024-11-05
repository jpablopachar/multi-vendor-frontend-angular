import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>change-password works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent { }
