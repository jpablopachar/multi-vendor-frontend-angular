import { HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import {
  AddProductToCardResponse,
  GetCardProductsResponse,
  GetWhishlistProductsResponse,
  ResponseSuccess,
} from '@app/models'
import { CardService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { cardActions } from './card.actions'

export const addProductToCardEffect = createEffect(
  (
    actions$ = inject(Actions),
    cardService: CardService = inject(CardService)
  ) => {
    return actions$.pipe(
      ofType(cardActions.addProductToCard),
      switchMap(({ request }) => {
        return cardService.addToCard(request).pipe(
          map((response: AddProductToCardResponse) => {
            return cardActions.addProductToCardSuccess({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              cardActions.addProductToCardError({
                response: errorResponse.error,
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

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

export const addProductToWishlistEffect = createEffect(
  (
    actions$ = inject(Actions),
    cardService: CardService = inject(CardService)
  ) => {
    return actions$.pipe(
      ofType(cardActions.addProductToWishlist),
      switchMap(({ request }) => {
        return cardService.addToWishlist(request).pipe(
          map((response: ResponseSuccess) => {
            return cardActions.addProductToWishlistSuccess({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              cardActions.addProductToWishlistError({
                response: errorResponse.error,
              })
            )
          )
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
