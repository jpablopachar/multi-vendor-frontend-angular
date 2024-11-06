import {
  GetCardProductsResponse,
  GetWhishlistProductsResponse
} from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const cardActions = createActionGroup({
  source: 'Card',
  events: {
    messageClear: emptyProps(),
    getCardProducts: props<{ userId: string }>(),
    getCardProductsSuccess: props<{ response: GetCardProductsResponse }>(),
    getWishlistProducts: props<{ userId: string }>(),
    getWishlistProductsSuccess: props<{
      response: GetWhishlistProductsResponse;
    }>(),
  },
});
