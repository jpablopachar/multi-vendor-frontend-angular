import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { UserInfo } from '@app/models'
import { selectUserInfo } from '@app/store/auth'
import { selectCardProductCount, selectWishlistCount } from '@app/store/card'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import {
  faFacebookF,
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly _store = inject(Store);
  private readonly _router: Router = inject(Router);

  public $userInfo: Signal<UserInfo | null> =
    this._store.selectSignal(selectUserInfo);
  public $cardProductCount: Signal<number> = this._store.selectSignal(
    selectCardProductCount
  );
  public $wishlistCount: Signal<number> =
    this._store.selectSignal(selectWishlistCount);

  public faFacebookF: IconDefinition = faFacebookF;
  public faTwitter: IconDefinition = faTwitter;
  public faLinkedin: IconDefinition = faLinkedin;
  public faGithub: IconDefinition = faGithub;
  public faCartShopping: IconDefinition = faCartShopping;
  public faHeart: IconDefinition = faHeart;

  public navigate(path: string): void {
    this._router.navigate([path]);
  }
}
