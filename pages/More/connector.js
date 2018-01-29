/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import { isUserLoggedIn } from '@shopgate/pwa-common/selectors/user';
import logout from '@shopgate/pwa-common/actions/user/logout';
import { getMenuById } from '@shopgate/pwa-common/selectors/menu';
import appConfig from '@shopgate/pwa-common/helpers/config';
import { QUICKLINKS_MENU } from '@shopgate/pwa-common/constants/MenuIDs';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  user: isUserLoggedIn(state) ? state.user.data : null,
  isLoggedIn: isUserLoggedIn(state),
  entries: {
    quicklinks: getMenuById(state, QUICKLINKS_MENU).entries,
  },
  scannerAvailable: !appConfig.hasNoScanner,
});

/**
 * Connects the dispatch function to a callable function in the props.
 * @param  {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

/**
 * Connects a component to the global store.
 * @param {Object} Component A react component.
 * @return {Object} The react component with extended props.
 */
const connector = Component => (
  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Component)
);

export default connector;
