import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
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
export class RatingComponent {
  readonly $ratings: InputSignal<number> = input.required<number>();

  public $starTypes: WritableSignal<('full' | 'half' | 'empty')[]> = signal([]);

  public fasStar: IconDefinition = fasStar;
  public farStar: IconDefinition = farStar;
  public faStarHalfAlt: IconDefinition = faStarHalfAlt;

  constructor() {
    effect(
      (): void => {
        if (this.$ratings()) {
          console.log('ratings', this.$ratings());
          this._calculateStars();
        }
      },
      { allowSignalWrites: true }
    );
  }

  private _calculateStars(): void {
    this.$starTypes.set([]);

    for (let i = 1; i <= 5; i++) {
      if (this.$ratings() >= i) {
        this.$starTypes.update((starTypes) => [...starTypes, 'full']);
      } else if (this.$ratings() >= i - 0.5) {
        this.$starTypes.update((starTypes) => [...starTypes, 'half']);
      } else {
        this.$starTypes.update((starTypes) => [...starTypes, 'empty']);
      }
    }
  }
}
