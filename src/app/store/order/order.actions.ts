import {
  GetOrderDetailsResponse,
  GetOrdersResponse,
  OrderQuery,
  PlaceOrderRequest,
  PlaceOrderResponse,
  PlaceOrderSuccessParams
} from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const orderActions = createActionGroup({
  source: 'Order',
  events: {
    messageClear: emptyProps(),
    placeOrder: props<{ request: PlaceOrderRequest }>(),
    placeOrderSuccess: props<{ params: PlaceOrderSuccessParams, response: PlaceOrderResponse }>(),
    getOrders: props<{ query: OrderQuery }>(),
    getOrdersSuccess: props<{ response: GetOrdersResponse }>(),
    getOrderDetails: props<{ query: { orderId: string } }>(),
    getOrderDetailsSuccess: props<{ response: GetOrderDetailsResponse }>(),
  },
});
