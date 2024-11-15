import { createFeature, createReducer, on } from '@ngrx/store'
import { orderActions } from './order.actions'
import { OrderState } from './order.state'

const orderInitialState: OrderState = {
  orders: [],
  errorMessage: '',
  successMessage: '',
  order: null,
};

const orderFeature = createFeature({
  name: 'order',
  reducer: createReducer<OrderState>(
    orderInitialState,
    on(
      orderActions.messageClear,
      (state: OrderState): OrderState => ({
        ...state,
        errorMessage: '',
        successMessage: '',
      })
    ),
    on(
      orderActions.getOrders,
      (state: OrderState): OrderState => ({
        ...state,
      })
    ),
    on(
      orderActions.getOrdersSuccess,
      (state: OrderState, action): OrderState => ({
        ...state,
        orders: action.response.orders,
      })
    ),
    on(
      orderActions.getOrderDetails,
      (state: OrderState): OrderState => ({
        ...state,
      })
    ),
    on(
      orderActions.getOrderDetailsSuccess,
      (state: OrderState, action): OrderState => ({
        ...state,
        order: action.response.order,
      })
    )
  ),
});

export const {
  name: homeFeatureKey,
  reducer: orderReducer,
  selectSuccessMessage,
  selectErrorMessage,
  selectOrders,
  selectOrder,
} = orderFeature;
