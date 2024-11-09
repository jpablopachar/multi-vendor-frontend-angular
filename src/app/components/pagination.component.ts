import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  InputSignal,
  OnInit,
  Output,
  WritableSignal,
  effect,
  input,
  signal,
} from '@angular/core'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="flex gap-3">
      @if ($pageNumber() > 1) {
      <li
        class="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        (click)="onPageChange($pageNumber() - 1)"
      >
        <fa-icon [icon]="faChevronLeft"></fa-icon>
      </li>
      } @for (page of $pages(); track page;) {
      <li
        class="w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer"
        [ngClass]="{
          'bg-green-700 shadow-lg shadow-indigo-300/50 text-white':
            page === $pageNumber(),
          'bg-slate-600 hover:bg-green-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]':
            page !== $pageNumber()
        }"
      >
        {{ page }}
      </li>
      } @if ($pageNumber() < $totalPages()) {
      <li
        class="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        (click)="onPageChange($pageNumber() + 1)"
      >
        <fa-icon [icon]="faChevronLeft"></fa-icon>
      </li>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  readonly $pageNumber: InputSignal<number> = input.required<number>();
  readonly $totalItem: InputSignal<number> = input.required<number>();
  readonly $parPage: InputSignal<number> = input.required<number>();
  readonly $showItem: InputSignal<number> = input.required<number>();

  @Output() pageNumberChange: EventEmitter<number> = new EventEmitter<number>();

  public $pages: WritableSignal<number[]> = signal([]);
  public $totalPages: WritableSignal<number> = signal(0);

  public readonly activeClass: string =
    'bg-green-700 shadow-lg shadow-indigo-300/50 text-white';
  public readonly inactiveClass: string =
    'bg-slate-600 hover:bg-green-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]';
  public readonly baseClass: string =
    'w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer';
  public faChevronLeft: IconDefinition = faChevronLeft;
  public faChevronRight: IconDefinition = faChevronRight;

  constructor() {
    effect(
      (): void => {
        if (
          this.$pageNumber() ||
          this.$totalItem() ||
          this.$parPage() ||
          this.$showItem()
        ) {
          this._calculatePages();
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this._calculatePages();
  }

  private _calculatePages(): void {
    this.$totalPages.set(Math.ceil(this.$totalItem() / this.$parPage()));

    let startPage: number = this.$pageNumber();

    const dif: number = this.$totalPages() - this.$pageNumber();

    if (dif <= this.$showItem())
      startPage = this.$totalPages() - this.$showItem();

    let endPage: number =
      startPage < 0 ? this.$showItem() : this.$showItem() + startPage;

    if (startPage <= 0) startPage = 1;

    this.$pages.set([]);

    for (
      let i: number = startPage;
      i < endPage && i <= this.$totalPages();
      i++
    ) {
      this.$pages.update((prev: number[]): number[] => [...prev, i]);
    }
  }

  public getPageClass(page: number): string {
    return `${this.baseClass} ${
      page === this.$pageNumber() ? this.activeClass : this.inactiveClass
    }`;
  }

  public onPageChange(page: number): void {
    this.pageNumberChange.emit(page);
  }
}
