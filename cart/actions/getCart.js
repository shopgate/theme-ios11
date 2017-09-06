/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { logger } from '@shopgate/pwa-core/helpers';
import {
  receiveCart,
  requestCart,
  errorCart,
  setCartProductPendingCount,
} from '../action-creators';
import { getProductPendingCount } from '../selectors';

/**
 * Get the current cart of the user.
 * @return {Function} A redux thunk.
 */
const getCart = () => (dispatch, getState) => {
  dispatch(requestCart());

  new PipelineRequest('getCart')
    .dispatch()
    .then((response) => {
      dispatch(receiveCart(response));
    })
    .catch((error) => {
      if (error) {
        // Check if we have an error (no error means an outdated request has been rejected).
        logger.error(error);
        dispatch(errorCart());
      }
    })
    .then(() => {
      const state = getState();
      const pendingProductCount = getProductPendingCount(state);

      dispatch(setCartProductPendingCount(pendingProductCount - 1));
    });
};

export default getCart;
