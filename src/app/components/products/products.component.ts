import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  InputSignal,
  ViewChild,
} from '@angular/core'
import { RouterLink } from '@angular/router'
import { CarouselConfig, ProductInfo } from '@app/models'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { CarouselComponent } from '../carousel.component'

const CAROUSEL_OPTIONS: CarouselConfig = {
  loop: false,
  nav: false,
  autoplay: false,
  smartSpeed: 500,
  responsive: {
    0: {
      items: 1,
    },
    464: {
      items: 1,
    },
    1024: {
      items: 1,
    },
    3000: {
      items: 1,
    },
    4000: {
      items: 1,
    },
  },
};

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CarouselComponent, RouterLink, FontAwesomeModule],
  template: `
    <div class="flex gap-8 flex-col">
      <div class="flex justify-between items-center mb-4">
        <div class="text-xl font-bold text-slate-600">{{ title }}</div>
        <div class="flex justify-center items-center gap-3 text-slate-600">
          <button
            (click)="previous()"
            class="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <fa-icon [icon]="faChevronLeft"></fa-icon>
          </button>
          <button
            (click)="next()"
            class="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <fa-icon [icon]="faChevronRight"></fa-icon>
          </button>
        </div>
      </div>
      <app-carousel
        #carousel
        [$items]="$products()"
        [itemTemplate]="productTemplate"
        [config]="carouselConfig"
      >
        <ng-template #productTemplate let-prod>
          <div class="flex flex-col justify-start gap-2">
            <ng-container *ngFor="let product of prod; trackBy: trackByIndex">
              <a [routerLink]="['#']" class="flex justify-start items-start">
                <img
                  style="width: 110px; height: 110px;"
                  [src]="product.images[0]"
                  alt=""
                />
                <div
                  class="px-3 flex justify-start items-start gap-1 flex-col text-slate-600"
                >
                  <h2>{{ product.name }}</h2>
                  <span class="text-lg font-bold">{{
                    product.price | currency
                  }}</span>
                </div>
              </a>
            </ng-container>
          </div>
        </ng-template>
      </app-carousel>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  @ViewChild('carousel') carousel!: CarouselComponent<ProductInfo>;

  @Input({ required: true }) title!: string;

  readonly $products: InputSignal<ProductInfo[][]> =
    input.required<ProductInfo[][]>();

  protected readonly carouselConfig = CAROUSEL_OPTIONS;

  public faChevronLeft: IconDefinition = faChevronLeft;
  public faChevronRight: IconDefinition = faChevronRight;

  public trackByIndex(index: number, item: ProductInfo[]): ProductInfo[] {
    return item;
  }

  public previous(): void {
    this.carousel.prev();
  }

  public next(): void {
    this.carousel.next();
  }
}
