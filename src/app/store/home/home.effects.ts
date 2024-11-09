import { inject } from '@angular/core'
import {
  GetCategoriesResponse,
  GetProductsResponse,
  ProductPriceRangeLatestResponse,
} from '@app/models'
import { HomeService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { homeActions } from './home.actions'

export const getCategoriesEffect = createEffect(
  (
    actions$ = inject(Actions),
    homeService: HomeService = inject(HomeService)
  ) => {
    return actions$.pipe(
      ofType(homeActions.getCategories),
      switchMap(() => {
        return homeService.getCategories().pipe(
          map((response: GetCategoriesResponse) => {
            return homeActions.getCategoriesSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);

export const getProductsEffect = createEffect(
  (
    actions$ = inject(Actions),
    homeService: HomeService = inject(HomeService)
  ) => {
    return actions$.pipe(
      ofType(homeActions.getProducts),
      switchMap(() => {
        return homeService.getProducts().pipe(
          map((response: GetProductsResponse) => {
            return homeActions.getProductsSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);

export const priceRangeProductEffect = createEffect(
  (
    actions$ = inject(Actions),
    homeService: HomeService = inject(HomeService)
  ) => {
    return actions$.pipe(
      ofType(homeActions.priceRangeProduct),
      switchMap(() => {
        return homeService.priceRangeProduct().pipe(
          map((response: ProductPriceRangeLatestResponse) => {
            return homeActions.priceRangeProductSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);
