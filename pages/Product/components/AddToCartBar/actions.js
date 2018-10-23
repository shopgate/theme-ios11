import {
  INCREMENT_ACTION_COUNT,
  DECREMENT_ACTION_COUNT,
  RESET_ACTION_COUNT,
  SHOW_ADD_TO_CART_BAR,
  HIDE_ADD_TO_CART_BAR,
} from './constants';

/**
 * Dispatches the INCREMENT_ACTION_COUNT action.
 * @return {Object}
 */
export const incrementActionCount = () => ({
  type: INCREMENT_ACTION_COUNT,
});

/**
 * Dispatches the DECREMENT_ACTION_COUNT action.
 * @return {Object}
 */
export const decrementActionCount = () => ({
  type: DECREMENT_ACTION_COUNT,
});

/**
 * Dispatches the INCREMENT_ACTION_COUNT action.
 * @return {Object}
 */
export const resetActionCount = () => ({
  type: RESET_ACTION_COUNT,
});

/**
 * Dispatches the SHOW_ADD_TO_CART_BAR action.
 * @return {Object}
 */
export const showAddToCartBar = () => ({
  type: SHOW_ADD_TO_CART_BAR,
});

/**
 * Dispatches the HIDE_ADD_TO_CART_BUTTON action.
 * @return {Object}
 */
export const hideAddToCartBar = () => ({
  type: HIDE_ADD_TO_CART_BAR,
});
