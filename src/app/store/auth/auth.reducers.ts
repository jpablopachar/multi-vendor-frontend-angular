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
