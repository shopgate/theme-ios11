import { createSelector } from 'reselect';

/**
 * Selects the addToCartBar state.
 * @param {Object} state The current application state.
 * @return {Object}
 */
const getAddToCartBarState = state => state.ui.addToCartBar;

/**
 * Selects the current added count from the addToCartBar state.
 * @param {Object} state The current application state.
 * @return {number}
 */
export const selectActionCount = createSelector(
  getAddToCartBarState,
  state => state.added
);

/**
 * Returns whether the add to cart bar is visible or not.
 * @params {Object} state The application state.
 * @returns {boolean}
 */
export const shouldBeVisible = createSelector(
  getAddToCartBarState,
  state => state.show
);
