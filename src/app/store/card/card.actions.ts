import {
  AddProductToCardRequest,
  AddProductToCardResponse,
  AddProductToWishlistRequest,
  GetCardProductsResponse,
  GetWhishlistProductsResponse,
  ResponseError,
  ResponseSuccess,
} from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const cardActions = createActionGroup({
  source: 'Card',
  events: {
    messageClear: emptyProps(),
    addProductToCard: props<{ request: AddProductToCardRequest }>(),
    addProductToCardSuccess: props<{ response: AddProductToCardResponse }>(),
    addProductToCardError: props<{ response: ResponseError }>(),
    getCardProducts: props<{ userId: string }>(),
    getCardProductsSuccess: props<{ response: GetCardProductsResponse }>(),
    deleteCardProduct: props<{ cardId: string }>(),
    deleteCardProductSuccess: props<{ response: ResponseSuccess }>(),
    quantityInc: props<{ cardId: string }>(),
    quantityIncSuccess: props<{ response: ResponseSuccess }>(),
    quantityDec: props<{ cardId: string }>(),
    quantityDecSuccess: props<{ response: ResponseSuccess }>(),
    addProductToWishlist: props<{ request: AddProductToWishlistRequest }>(),
    addProductToWishlistSuccess: props<{ response: ResponseSuccess }>(),
    addProductToWishlistError: props<{ response: ResponseError }>(),
    getWishlistProducts: props<{ userId: string }>(),
    getWishlistProductsSuccess: props<{
      response: GetWhishlistProductsResponse;
    }>(),
  },
});
