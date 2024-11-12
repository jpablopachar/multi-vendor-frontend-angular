import { createFeature, createReducer, on } from '@ngrx/store'
import { homeActions } from './home.actions'
import { HomeState } from './home.state'

const homeInitialState: HomeState = {
  categories: [],
  products: [],
  totalProduct: 0,
  parPage: 3,
  latestProduct: [],
  topRatedProduct: [],
  discountProduct: [],
  priceRange: { low: null, high: null },
  product: null,
  relatedProducts: [],
  moreProducts: [],
  errorMessage: '',
  successMessage: '',
  totalReview: 0,
  ratingReview: [],
  reviews: [],
  banners: [],
};

const homeFeature = createFeature({
  name: 'home',
  reducer: createReducer<HomeState>(
    homeInitialState,
    on(
      homeActions.messageClear,
      (state: HomeState): HomeState => ({
        ...state,
        errorMessage: '',
        successMessage: '',
      })
    ),
    on(
      homeActions.getCategories,
      (state: HomeState): HomeState => ({
        ...state,
      })
    ),
    on(
      homeActions.getCategoriesSuccess,
      (state: HomeState, action): HomeState => ({
        ...state,
        categories: action.response.categories,
      })
    ),
    on(
      homeActions.getProducts,
      (state: HomeState): HomeState => ({
        ...state,
      })
    ),
    on(
      homeActions.getProductsSuccess,
      (state: HomeState, { response }): HomeState => ({
        ...state,
        products: response.products,
        latestProduct: response.latestProduct,
        topRatedProduct: response.topRatedProduct,
        discountProduct: response.discountProduct,
      })
    ),
    on(
      homeActions.priceRangeProduct,
      (state: HomeState): HomeState => ({
        ...state,
      })
    ),
    on(
      homeActions.priceRangeProductSuccess,
      (state: HomeState, { response }): HomeState => ({
        ...state,
        latestProduct: response.latestProduct,
        priceRange: response.priceRange,
      })
    ),
    on(
      homeActions.queryProducts,
      (state: HomeState): HomeState => ({
        ...state,
      })
    ),
    on(
      homeActions.queryProductsSuccess,
      (state: HomeState, { response }): HomeState => ({
        ...state,
        products: response.products,
        totalProduct: response.totalProducts,
        parPage: response.parPage,
      })
    ),
    on(
      homeActions.updatePriceRange,
      (state: HomeState, { response }): HomeState => ({
        ...state,
        priceRange: response,
      })
    ),
  ),
});

export const {
  name: homeFeatureKey,
  reducer: homeReducer,
  selectCategories,
  selectProducts,
  selectLatestProduct,
  selectTopRatedProduct,
  selectDiscountProduct,
  selectPriceRange,
  selectTotalProduct,
  selectParPage,
} = homeFeature;
