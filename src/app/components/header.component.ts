/* eslint-disable @typescript-eslint/no-explicit-any */

import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { Category, UserInfo } from '@app/models'
import { selectUserInfo } from '@app/store/auth'
import { selectCategories } from '@app/store/home'
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
import {
  faCartShopping,
  faHeart,
  faList,
  faLock,
  faPhoneAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _router: Router = inject(Router);

  public $categories: Signal<Category[]> =
    this._store.selectSignal(selectCategories);
  public $userInfo: Signal<UserInfo | null> =
    this._store.selectSignal(selectUserInfo);

  public $showSidebar: WritableSignal<boolean> = signal(true);
  public $showCategory: WritableSignal<boolean> = signal(true);
  public $searchValue: WritableSignal<string> = signal('');
  public $category: WritableSignal<string> = signal('');

  public pathname!: string;
  public faFacebookF: IconDefinition = faFacebookF;
  public faTwitter: IconDefinition = faTwitter;
  public faLinkedin: IconDefinition = faLinkedin;
  public faGithub: IconDefinition = faGithub;
  public faUser: IconDefinition = faUser;
  public faLock: IconDefinition = faLock;
  public faHeart: IconDefinition = faHeart;
  public faList: IconDefinition = faList;
  public faPhoneAlt: IconDefinition = faPhoneAlt;
  public faCartShopping: IconDefinition = faCartShopping;

  constructor() {
    effect((): void => {
      const userInfo: UserInfo | null = this.$userInfo();

      if (userInfo) {
        // GetCardProducts
        // GetWishlistProducts
      }
    });
  }

  public ngOnInit(): void {
    this.pathname = this._router.url;
  }

  public search(): void {
    this._router.navigate(['/products/search'], {
      queryParams: { category: this.$category(), value: this.$searchValue() },
    });
  }

  public redirectCardPage(): void {
    const url: string = this.$userInfo() ? '/card' : '/login';

    this._router.navigateByUrl(url);
  }

  public navigate(condition: any, path1: string, path2: string): void {
    this._router.navigateByUrl(condition ? path1 : path2);
  }

  public changeValue(element: string, event: Event): void {
    if (element === 'input') {
      this.$searchValue.set((event.target as HTMLInputElement).value);
    } else if (element === 'select') {
      this.$category.set((event.target as HTMLSelectElement).value);
    }
  }
}
