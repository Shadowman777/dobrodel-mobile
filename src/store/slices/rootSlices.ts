import {combineReducers} from 'redux';

import {mainReducer} from './mainSlice/mainSlice';
import {shopReducer} from 'store/slices/shopSlice/shopSlice';
import {authReducer} from 'store/slices/authSlice/authSlice';
import {loadingReducer} from 'store/slices/loadingSlice/loadingSlice';
import {profileReducer} from 'store/slices/profileSlice/profileSlice';
import {actionsReducer} from 'store/slices/actionsSlice/actionsSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
  profile: profileReducer,
  shop: shopReducer,
  actions: actionsReducer,
  loading: loadingReducer,
});
