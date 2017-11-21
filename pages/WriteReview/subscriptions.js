/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { routeDidEnter } from '@shopgate/pwa-common/streams/history';
import { ITEM_PATH } from '@shopgate/pwa-common-commerce/product/constants';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import {
  getCurrentProductId,
} from '@shopgate/pwa-common-commerce/product/selectors/product';
import {
  userDidLogout$,
} from '@shopgate/pwa-common/streams/user';

import {
  requestReviewSubmit$,
  responseReviewSubmit$,
  successReviewSubmit$,
} from '@shopgate/pwa-common-commerce/reviews/streams';
import goBackHistory from '@shopgate/pwa-common/actions/history/goBackHistory';
import setViewLoading from '@shopgate/pwa-common/actions/view/setViewLoading';
import unsetViewLoading from '@shopgate/pwa-common/actions/view/unsetViewLoading';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import getUserReview from '@shopgate/pwa-common-commerce/reviews/actions/getUserReview';
import flushUserReview from '@shopgate/pwa-common-commerce/reviews/actions/flushUserReview';
import { DIALOG_TEXT_MESSAGE } from 'Components/Dialog/constants';
/**
 * Review form subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default function writeReview(subscribe) {
  const reviewsRouteDidEnter$ = routeDidEnter(ITEM_PATH);

  /**
   * Gets triggered on entering the write review route.
   */
  subscribe(reviewsRouteDidEnter$, ({ dispatch, getState }) => {
    const state = getState();
    const productId = getCurrentProductId(state);

    if (!state.user.login.isLoggedIn) {
      return;
    }
    // Only dispatch when review is not yet in store
    dispatch(getUserReview(productId));
  });

  /**
   * Get triggered when a review submit is requested.
   */
  subscribe(requestReviewSubmit$, ({ dispatch, getState }) => {
    dispatch(setViewLoading(getHistoryPathname(getState())));
  });

  /**
   * Get triggered when a review submitted got a response.
   */
  subscribe(responseReviewSubmit$, ({ dispatch, getState }) => {
    dispatch(unsetViewLoading(getHistoryPathname(getState())));
  });

  /**
   * Get triggered when a review was successfully submitted
   */
  subscribe(successReviewSubmit$, ({ dispatch }) => {
    dispatch(goBackHistory());
    dispatch(showModal({
      confirm: 'modal.ok',
      dismiss: null,
      type: DIALOG_TEXT_MESSAGE,
      message: 'reviews.modal_message',
      title: 'reviews.modal_title',
    }));
  });
  /**
   * When user is logged out reviews relation should be removed.
   */
  subscribe(userDidLogout$, ({ dispatch }) => dispatch(flushUserReview()));
}
