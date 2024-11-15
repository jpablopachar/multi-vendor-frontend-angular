import { inject } from '@angular/core'
import { PlaceOrderResponse } from '@app/models'
import { OrderService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { orderActions } from './order.actions'

export const placeOrderEffect = createEffect(
  (
    actions$ = inject(Actions),
    orderService: OrderService = inject(OrderService)
  ) => {
    return actions$.pipe(
      ofType(orderActions.placeOrder),
      switchMap(({ request }) => {
        return orderService.placeOrder(request).pipe(
          map((response: PlaceOrderResponse) => {
            return orderActions.placeOrderSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);

export const getOrdersEffect = createEffect(
  (
    actions$ = inject(Actions),
    orderService: OrderService = inject(OrderService)
  ) => {
    return actions$.pipe(
      ofType(orderActions.placeOrder),
      switchMap(({ request }) => {
        return orderService.placeOrder(request).pipe(
          map((response: PlaceOrderResponse) => {
            return orderActions.placeOrderSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);
