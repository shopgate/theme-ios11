import { createSelector } from 'reselect';
import appConfig from '@shopgate/pwa-common/helpers/config';
import { getCurrentPathname } from '@shopgate/pwa-common/selectors/router';
import { INDEX_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
import { CATEGORY_PATH } from '@shopgate/pwa-common-commerce/category/constants';
import { FAVORITES_PATH } from '@shopgate/pwa-common-commerce/favorites/constants';
import { SEARCH_PATH } from '@shopgate/pwa-common-commerce/search/constants';
import { BROWSE_PATH } from 'Pages/Browse/constants';
import { MORE_PATH } from 'Pages/More/constants';
import {
  TAB_HOME,
  TAB_BROWSE,
  TAB_CART,
  TAB_FAVORITES,
  TAB_MORE,
  TAB_NONE,
} from './constants';

/**
 * Returns a tabBar state.
 * @param {Object} state State.
 * @return {Object}
 */
const getTabBarState = state => state.ui.tabBar;

/**
 * Returns what tab is active, returns TAB_NONE if none is active.
 * @param {Object} state The application state.
 * @returns {string}
 */
export const getActiveTab = createSelector(
  getCurrentPathname,
  (pathname) => {
    if (!pathname) {
      return TAB_NONE
    }

    switch (true) {
      case pathname === INDEX_PATH:
        return TAB_HOME;
      case (pathname === BROWSE_PATH
        || pathname.startsWith(SEARCH_PATH)
        || pathname.startsWith(CATEGORY_PATH)):
        return TAB_BROWSE;
      case pathname === CART_PATH:
        return TAB_CART;
      case pathname === MORE_PATH:
        return TAB_MORE;
      case pathname === FAVORITES_PATH:
        return TAB_FAVORITES;
      default:
        return TAB_NONE;
    }
  }
);

/**
 * Checks if the tab bar is currently enabled.
 * @return {boolean}
 */
export const isTabBarEnabled = createSelector(
  getTabBarState,
  state => state.enabled
);

/**
 * Checks if the tab bar is currently visible.
 * @return {boolean}
 */
export const isTabBarVisible = createSelector(
  getTabBarState,
  isTabBarEnabled,
  (state, enabled) => {
    if (!enabled) {
      return false;
    }

    return state.visible;
  }
);

/**
 * Returns all visible tabs.
 * @note This is prepared to be a state, it could be fetched by a pipeline.
 * @returns {Array}
 */
export const getVisibleTabs = () => {
  const config = [
    {
      type: TAB_HOME,
      label: 'tab_bar.home',
    },
    {
      type: TAB_BROWSE,
      label: 'tab_bar.browse',
    },
    {
      type: TAB_CART,
      label: 'tab_bar.cart',
    },
    {
      type: TAB_FAVORITES,
      label: 'tab_bar.favorites',
    },
    {
      type: TAB_MORE,
      label: 'tab_bar.more',
    },
  ];

  if (!appConfig.hasFavorites) {
    config.splice(3, 1);
  }

  return config;
};
