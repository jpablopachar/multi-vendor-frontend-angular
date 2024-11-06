import {
  AuthResponse,
  AuthResponseError,
  LoginRequest,
  RegisterRequest,
} from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    messageClear: emptyProps(),
    customerRegister: props<{ request: RegisterRequest }>(),
    customerRegisterSuccess: props<{ response: AuthResponse }>(),
    customerRegisterError: props<{ response: AuthResponseError }>(),
    customerLogin: props<{ request: LoginRequest }>(),
    customerLoginSuccess: props<{ response: AuthResponse }>(),
    customerLoginError: props<{ response: AuthResponseError }>(),
  },
});
