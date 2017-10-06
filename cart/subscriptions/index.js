/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { userDidUpdate$ } from '@shopgate/pwa-common/streams/user';
import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import resetHistory from '@shopgate/pwa-common/actions/history/resetHistory';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import { getHistoryLength, getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { INDEX_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import addCouponsToCart from '../actions/addCouponsToCart';
import fetchCart from '../actions/fetchCart';
import {
  cartRequesting$,
  cartReceived$,
  productsAdded$,
  productsModified$,
  productsUpdated$,
  productsDeleted$,
  couponsAdded$,
  couponsUpdated$,
  couponsDeleted$,
  couponLinkOpened$,
  couponPushNotification$,
  remoteCartDidUpdate$,
} from '../streams';
import setCartProductPendingCount from '../action-creators/setCartProductPendingCount';
import { CART_PATH } from '../constants';
/**
 * Cart subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default function cart(subscribe) {
  /**
   * Gets triggered when ever the local cart is out of
   * sync with the remote cart from the server.
   */
  const cartNeedsSync$ = userDidUpdate$.merge(remoteCartDidUpdate$);

  const cartBusy$ = cartRequesting$.merge(
    couponsAdded$,
    couponsDeleted$,
    productsAdded$,
    productsModified$,
    productsDeleted$
  );

  const cartIdle$ = cartReceived$.merge(
    couponsUpdated$,
    productsUpdated$
  );

  subscribe(cartNeedsSync$, ({ dispatch }) => {
    dispatch(fetchCart());
  });

  subscribe(cartBusy$, ({ dispatch }) => {
    dispatch(setViewLoading(CART_PATH));
  });

  subscribe(cartIdle$, ({ dispatch }) => {
    dispatch(unsetViewLoading(CART_PATH));
  });

  /**
   * Gets triggered when the app starts.
   */
  subscribe(appDidStart$, ({ dispatch }) => {
    // Reset the productPendingCount on app start to avoid a wrong value in the cart badge.
    dispatch(setCartProductPendingCount(0));
  });

  /**
   * Gets triggered a coupon link was opened.
   */
  subscribe(couponLinkOpened$, ({ action, dispatch }) => {
    dispatch(addCouponsToCart([action.options.queryParams.coupon]));
  });

  /**
   * Gets triggered when a push notification containing a coupon link was received.
   */
  subscribe(couponPushNotification$, ({ action, code, dispatch, getState }) => {
    const state = getState();
    const historyLength = getHistoryLength(state);
    const historyPathname = getHistoryPathname(state);

    /**
     * Check if the history only has one entry that is the push notification url.
     * Then reset back to the homepage.
     */
    if (historyLength === 1 && historyPathname === action.options.url) {
      dispatch(resetHistory(INDEX_PATH));
    }

    dispatch(addCouponsToCart([code]));
  });
}
