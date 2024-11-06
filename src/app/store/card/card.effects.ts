import { inject } from '@angular/core'
import {
  GetCardProductsResponse,
  GetWhishlistProductsResponse,
} from '@app/models'
import { CardService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { cardActions } from './card.actions'

export const getCardProductsEffect = createEffect(
  (
    actions$ = inject(Actions),
    cardService: CardService = inject(CardService)
  ) => {
    return actions$.pipe(
      ofType(cardActions.getCardProducts),
      switchMap(({ userId }) => {
        return cardService.getCardProducts(userId).pipe(
          map((response: GetCardProductsResponse) => {
            return cardActions.getCardProductsSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);

export const getWishlistProductsEffect = createEffect(
  (
    actions$ = inject(Actions),
    cardService: CardService = inject(CardService)
  ) => {
    return actions$.pipe(
      ofType(cardActions.getWishlistProducts),
      switchMap(({ userId }) => {
        return cardService.getWhishlistProducts(userId).pipe(
          map((response: GetWhishlistProductsResponse) => {
            return cardActions.getWishlistProductsSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);
