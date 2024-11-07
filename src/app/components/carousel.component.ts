/* eslint-disable @typescript-eslint/no-explicit-any */

import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  InputSignal,
  TemplateRef,
} from '@angular/core'
import { CarouselConfig } from '@app/models'
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o'

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  template: `
    <owl-carousel-o [options]="carouselOptions">
      @for (item of $items(); track item._id; let idx = $index) {
      <ng-template carouselSlide>
        <ng-container
          [ngTemplateOutlet]="itemTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"
        ></ng-container>
      </ng-template>
      }
    </owl-carousel-o>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  @Input({ required: true }) itemTemplate!: TemplateRef<any>;
  @Input() set config(value: Partial<CarouselConfig>) {
    this.carouselOptions = { ...this.defaultOptions, ...value };
  }

  $items: InputSignal<any[]> = input.required<any[]>();

  private defaultOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    smartSpeed: 700,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
    nav: true,
  };

  carouselOptions: OwlOptions = this.defaultOptions;
}
