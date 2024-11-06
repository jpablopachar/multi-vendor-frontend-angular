import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {
  IconDefinition,
  faArrowDown,
  faHeart,
  faPhone,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public faPhone: IconDefinition = faPhone;
  public faArrowDown: IconDefinition = faArrowDown;
  public faHeart: IconDefinition = faHeart;
  public faShoppingCart: IconDefinition = faShoppingCart;
}
