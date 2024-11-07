import { createFeature, createReducer, on } from '@ngrx/store'
import { cardActions } from './card.actions'
import { CardState } from './card.state'

const cardInitialState: CardState = {
  cardProducts: [],
  cardProductCount: 0,
  wishlistCount: 0,
  wishlist: [],
  price: 0,
  errorMessage: '',
  successMessage: '',
  shippingFee: 0,
  outOfStockProducts: [],
  buyProductItem: 0,
};

const cardFeature = createFeature({
  name: 'card',
  reducer: createReducer<CardState>(
    cardInitialState,
    on(
      cardActions.messageClear,
      (state: CardState): CardState => ({
        ...state,
        errorMessage: '',
        successMessage: '',
      })
    ),
    on(
      cardActions.addProductToCard,
      (state: CardState): CardState => ({
        ...state,
      })
    ),
    on(
      cardActions.addProductToCardSuccess,
      (state: CardState, { response }): CardState => ({
        ...state,
        successMessage: response.message,
        cardProductCount: state.cardProductCount + 1,
      })
    ),
    on(
      cardActions.addProductToCardError,
      (state: CardState, { response }): CardState => ({
        ...state,
        errorMessage: response.error,
      })
    ),
    on(
      cardActions.getCardProducts,
      (state: CardState): CardState => ({
        ...state,
      })
    ),
    on(
      cardActions.getCardProductsSuccess,
      (state: CardState, { response }): CardState => ({
        ...state,
        cardProducts: response.cardProducts,
        price: response.price,
        cardProductCount: response.cardProductCount,
        shippingFee: response.shippingFee,
        outOfStockProducts: response.outOfStockProducts,
        buyProductItem: response.buyProductItem,
      })
    ),
    on(
      cardActions.addProductToWishlist,
      (state: CardState): CardState => ({
        ...state,
      })
    ),
    on(
      cardActions.addProductToWishlistSuccess,
      (state: CardState, { response }): CardState => ({
        ...state,
        successMessage: response.message,
        wishlistCount: state.wishlistCount > 0 ? state.wishlistCount + 1 : 1,
      })
    ),
    on(
      cardActions.addProductToWishlistError,
      (state: CardState, { response }): CardState => ({
        ...state,
        errorMessage: response.error,
      })
    ),
    on(
      cardActions.getWishlistProducts,
      (state: CardState): CardState => ({
        ...state,
      })
    ),
    on(
      cardActions.getWishlistProductsSuccess,
      (state: CardState, { response }): CardState => ({
        ...state,
        wishlist: response.wishList,
        wishlistCount: response.wishListCount,
      })
    )
  ),
});

export const {
  name: cardFeatureKey,
  reducer: cardReducer,
  selectSuccessMessage,
  selectErrorMessage,
  selectCardProductCount,
  selectWishlistCount,
} = cardFeature;
