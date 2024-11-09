import {
  GetCategoriesResponse,
  GetProductsResponse,
  ProductPriceRangeLatestResponse,
} from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const homeActions = createActionGroup({
  source: 'Home',
  events: {
    messageClear: emptyProps(),
    getCategories: emptyProps(),
    getCategoriesSuccess: props<{ response: GetCategoriesResponse }>(),
    getProducts: emptyProps(),
    getProductsSuccess: props<{ response: GetProductsResponse }>(),
    priceRangeProduct: emptyProps(),
    priceRangeProductSuccess: props<{
      response: ProductPriceRangeLatestResponse;
    }>(),
  },
});
