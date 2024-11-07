/* eslint-disable @typescript-eslint/no-explicit-any */

import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  WritableSignal,
  signal,
} from '@angular/core'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import {
  faStarHalfAlt,
  faStar as farStar,
} from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    @for (star of $starTypes(); track star; let idx = $index) {
    <span [ngClass]="star === 'empty' ? 'text-slate-600' : 'text-[#EDBB0E]'">
      <fa-icon
        [icon]="
          star === 'full' ? fasStar : star === 'half' ? faStarHalfAlt : farStar
        "
      ></fa-icon>
    </span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements OnChanges {
  @Input({ required: true }) ratings!: number;

  public $starTypes: WritableSignal<('full' | 'half' | 'empty')[]> = signal([]);

  public fasStar: IconDefinition = fasStar;
  public farStar: IconDefinition = farStar;
  public faStarHalfAlt: IconDefinition = faStarHalfAlt;

  public trackByFn(index: number, item: any): string {
    return item._id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ratings']) {
      this._calculateStars();
    }
  }

  private _calculateStars(): void {
    this.$starTypes.set([]);

    for (let i = 1; i <= 5; i++) {
      if (this.ratings >= i) {
        this.$starTypes.update((starTypes) => [...starTypes, 'full']);
      } else if (this.ratings >= i - 0.5) {
        this.$starTypes.update((starTypes) => [...starTypes, 'half']);
      } else {
        this.$starTypes.update((starTypes) => [...starTypes, 'empty']);
      }
    }
  }
}
