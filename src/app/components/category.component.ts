import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core'
import { RouterLink } from '@angular/router'
import { CarouselConfig, Category } from '@app/models'
import { selectCategories } from '@app/store/home'
import { Store } from '@ngrx/store'
import { CarouselComponent } from './carousel.component'

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, CarouselComponent],
  template: `
    <div class="w-[87%] mx-auto relative">
      <div class="w-full">
        <div
          class="text-center flex justify-center items-center flex-col text-3xl text-slate-600 font-bold relative pb-[35px]"
        >
          <h2>Top Category</h2>
          <div class="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
        </div>
      </div>
      <app-carousel
        [$items]="$categories()"
        [itemTemplate]="categoryTemplate"
        [config]="carouselConfig"
      >
        <ng-template #categoryTemplate let-category>
          <a
            class="h-[185px] border block"
            [routerLink]="['/products']"
            [queryParams]="{ category: category.name }"
          >
            <div class="w-full h-full relative p-3">
              <img [src]="category.image" alt="" />
              <div
                class="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center"
              >
                <span class="py-[2px] px-6 bg-[#3330305d] text-white">{{
                  category.name
                }}</span>
              </div>
            </div>
          </a>
        </ng-template>
      </app-carousel>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  private readonly _store = inject(Store);

  public $categories: Signal<Category[]> =
    this._store.selectSignal(selectCategories);

  public carouselConfig: Partial<CarouselConfig> = {
    loop: true,
    nav: true,
    autoplay: true,
    smartSpeed: 500,
    responsive: {
      0: {
        items: 1,
      },
      440: {
        items: 2,
      },
      640: {
        items: 3,
      },
      991: {
        items: 4,
      },
      1024: {
        items: 6,
      },
      3000: {
        items: 6,
      },
    },
    navText: ['<', '>'],
  };
}
