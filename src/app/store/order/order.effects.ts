import { inject } from '@angular/core'
import { Router } from '@angular/router'
import {
  GetOrderDetailsResponse,
  GetOrdersResponse,
  PlaceOrderResponse,
  PlaceOrderSuccessParams,
} from '@app/models'
import { OrderService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap, tap } from 'rxjs'
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
            const { price, shippingFee, items } = request;

            const params: PlaceOrderSuccessParams = {
              price,
              items,
              shippingFee,
              orderId: response.orderId,
            };
            return orderActions.placeOrderSuccess({ params, response });
          })
        );
      })
    );
  },
  { functional: true }
);

export const placeOrderSuccessEffect = createEffect(
  (actions$ = inject(Actions), router: Router = inject(Router)) => {
    return actions$.pipe(
      ofType(orderActions.placeOrderSuccess),
      tap(({ params }) => {
        const { price, items, orderId, shippingFee } = params;
        router.navigate(['/payment'], {
          state: {
            data: {
              price: price + shippingFee,
              items,
              orderId,
            }
          }
        });
      })
    );
  },
  { dispatch: false, functional: true }
);

export const getOrdersEffect = createEffect(
  (
    actions$ = inject(Actions),
    orderService: OrderService = inject(OrderService)
  ) => {
    return actions$.pipe(
      ofType(orderActions.getOrders),
      switchMap(({ query }) => {
        return orderService.getOrders(query.customerId, query.status).pipe(
          map((response: GetOrdersResponse) => {
            return orderActions.getOrdersSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);

export const getOrderDetailsEffect = createEffect(
  (
    actions$ = inject(Actions),
    orderService: OrderService = inject(OrderService)
  ) => {
    return actions$.pipe(
      ofType(orderActions.getOrderDetails),
      switchMap(({ query }) => {
        return orderService.getOrderDetails(query.orderId).pipe(
          map((response: GetOrderDetailsResponse) => {
            return orderActions.getOrderDetailsSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);
