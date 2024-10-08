import { combineReducers } from 'redux';
import {
  persistedReducers,
  configuration,
  RESET_APP_REDUCERS,
} from '@shopgate/engage/core';
import backInStock from '@shopgate/engage/back-in-stock/reducers';
import client from '@shopgate/pwa-common/reducers/client';
import url from '@shopgate/pwa-common/reducers/url';
import user from '@shopgate/pwa-common/reducers/user';
import page from '@shopgate/pwa-common/reducers/page';
import router from '@shopgate/pwa-common/reducers/router';
import menu from '@shopgate/pwa-common/reducers/menu';
import modal from '@shopgate/pwa-common/reducers/modal';
import cart from '@shopgate/pwa-common-commerce/cart/reducers';
import appRating from '@shopgate/engage/app-rating/reducers';
import pushOptIn from '@shopgate/engage/push-opt-in/reducers';
import category from '@shopgate/pwa-common-commerce/category/reducers';
import favorites from '@shopgate/pwa-common-commerce/favorites/reducers';
import filter from '@shopgate/pwa-common-commerce/filter/reducers';
import product from '@shopgate/pwa-common-commerce/product/reducers';
import search from '@shopgate/pwa-common-commerce/search/reducers';
import reviews from '@shopgate/pwa-common-commerce/reviews/reducers';
import extensions from 'Extensions/reducers';
import tabBar from 'Components/TabBar/reducer';
import { app } from '@shopgate/engage/core/reducers';
import tracking from '@shopgate/engage/tracking/reducers';

persistedReducers.set([
  'cart',
  'client.info',
  'page',
  'url',
  'user',
  'appRating',
  'pushOptIn.optInTrigger',
  'tracking.cookieConsentModal',
  'tracking.cookieSettings',
]);

configuration.set(RESET_APP_REDUCERS, [
  'cart',
  'category',
  'product',
  'favorites',
  'filter',
  'reviews',
  'search',
]);

const reducers = combineReducers({
  router,
  cart,
  category,
  backInStock,
  client,
  app,
  ...extensions && { extensions: combineReducers(extensions) },
  favorites,
  filter,
  menu,
  modal,
  page,
  product,
  reviews,
  search,
  ui: combineReducers({
    tabBar,
  }),
  url,
  user,
  appRating,
  pushOptIn,
  tracking,
});

export default reducers;
