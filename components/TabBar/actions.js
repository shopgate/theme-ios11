import {
  TAB_BAR_HIDE_ACTION,
  TAB_BAR_SHOW_ACTION,
} from './constants';

/**
 * Changes tabBar ui settings, so it's allowed for TabBar to be visible.
 * @return {Object}
 */
export const showTabBar = () => ({
  type: TAB_BAR_SHOW_ACTION,
});

/**
 * Forces the TabBar to be hidden.
 * @return {Object}
 */
export const hideTabBar = () => ({
  type: TAB_BAR_HIDE_ACTION,
});
