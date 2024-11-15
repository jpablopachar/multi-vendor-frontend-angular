import { provideHttpClient } from '@angular/common/http'
import {
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideToastr } from 'ngx-toastr'
import { routes } from './app.routes'
import { AuthEffects, authFeatureKey, authReducer } from './store/auth'
import { CardEffects, cardFeatureKey, cardReducer } from './store/card'
import { HomeEffects, homeFeatureKey, homeReducer } from './store/home'
import { OrderEffects, orderFeatureKey, orderReducer } from './store/order'

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      [authFeatureKey]: authReducer,
      [cardFeatureKey]: cardReducer,
      [homeFeatureKey]: homeReducer,
      [orderFeatureKey]: orderReducer,
    }),
    provideEffects(AuthEffects, CardEffects, HomeEffects, OrderEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
