import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { FooterComponent, HeaderComponent } from '@app/components'
import { LoginRequest, UserInfo } from '@app/models'
import {
  authActions,
  selectErrorMessage,
  selectLoader,
  selectSuccessMessage,
  selectUserInfo,
} from '@app/store/auth'
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FontAwesomeModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly _store = inject(Store);
  private readonly _router: Router = inject(Router);
  private readonly _toastr: ToastrService = inject(ToastrService);

  public $loader: Signal<boolean> = this._store.selectSignal(selectLoader);
  public $successMessage: Signal<string> =
    this._store.selectSignal(selectSuccessMessage);
  public $errorMessage: Signal<string> =
    this._store.selectSignal(selectErrorMessage);
  public $userInfo: Signal<UserInfo | null> =
    this._store.selectSignal(selectUserInfo);

  public faFacebookF: IconDefinition = faFacebookF;
  public faGoogle: IconDefinition = faGoogle;

  public form = {
    email: signal(''),
    password: signal(''),
  };

  constructor() {
    effect(
      (): void => {
        if (this.$successMessage()) {
          this._toastr.success(this.$successMessage());

          this._store.dispatch(authActions.messageClear());
        }

        if (this.$errorMessage()) {
          this._toastr.error(this.$errorMessage());

          this._store.dispatch(authActions.messageClear());
        }

        if (this.$userInfo()) {
          this._router.navigate(['/']);
        }
      },
      { allowSignalWrites: true }
    );
  }

  public login(isValid: boolean | null): void {
    if (isValid) {
      const request: LoginRequest = {
        email: this.form.email(),
        password: this.form.password(),
      };

      this._store.dispatch(authActions.customerLogin({ request }));
    }
  }
}
