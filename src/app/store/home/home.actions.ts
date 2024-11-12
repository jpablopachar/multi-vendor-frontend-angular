import {
  GetCategoriesResponse,
  GetProductsResponse,
  PriceRange,
  ProductPriceRangeLatestResponse,
  QueryProductsRequest,
  QueryProductsResponse,
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
    queryProducts: props<{
      query: QueryProductsRequest;
    }>(),
    queryProductsSuccess: props<{
      response: QueryProductsResponse;
    }>(),
    updatePriceRange: props<{ response: PriceRange }>(),
  },
});
