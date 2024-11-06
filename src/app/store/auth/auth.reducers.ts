import { returnInfo } from '@app/utils'
import { createFeature, createReducer, on } from '@ngrx/store'
import { authActions } from './auth.actions'
import { AuthState } from './auth.state'

const authInitialState: AuthState = {
  loader: false,
  userInfo: returnInfo(localStorage.getItem('customerToken')),
  successMessage: '',
  errorMessage: '',
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer<AuthState>(
    authInitialState,
    on(
      authActions.messageClear,
      (state: AuthState): AuthState => ({
        ...state,
        errorMessage: '',
        successMessage: '',
      })
    ),
    on(
      authActions.customerRegister,
      (state: AuthState): AuthState => ({
        ...state,
        loader: true,
      })
    ),
    on(
      authActions.customerRegisterSuccess,
      (state: AuthState, { response }): AuthState => ({
        ...state,
        successMessage: response.message,
        userInfo: returnInfo(response.token),
        loader: false,
      })
    ),
    on(
      authActions.customerRegisterError,
      (state: AuthState, { response }): AuthState => ({
        ...state,
        errorMessage: response.error,
        loader: false,
      })
    ),
    on(
      authActions.customerLogin,
      (state: AuthState): AuthState => ({
        ...state,
        loader: true,
      })
    ),
    on(
      authActions.customerLoginSuccess,
      (state: AuthState, { response }): AuthState => ({
        ...state,
        successMessage: response.message,
        userInfo: returnInfo(response.token),
        loader: false,
      })
    ),
    on(
      authActions.customerLoginError,
      (state: AuthState, { response }): AuthState => ({
        ...state,
        errorMessage: response.error,
        loader: false,
      })
    )
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectLoader,
  selectSuccessMessage,
  selectErrorMessage,
  selectUserInfo,
} = authFeature;
