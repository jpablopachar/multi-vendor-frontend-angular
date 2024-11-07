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
