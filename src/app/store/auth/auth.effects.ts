import { HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { AuthResponse } from '@app/models'
import { AuthService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { authActions } from './auth.actions'

export const customerRegisterEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService: AuthService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(authActions.customerRegister),
      switchMap(({ request }) => {
        return authService.customerRegister(request).pipe(
          map((response: AuthResponse) => {
            return authActions.customerRegisterSuccess({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.customerRegisterError({
                response: errorResponse.error.error,
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const customerLoginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService: AuthService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(authActions.customerLogin),
      switchMap(({ request }) => {
        return authService.customerLogin(request).pipe(
          map((response: AuthResponse) => {
            return authActions.customerLoginSuccess({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.customerLoginError({
                response: errorResponse.error.error,
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);
