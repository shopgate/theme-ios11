import {
  TAB_BAR_SHOW_ACTION,
  TAB_BAR_HIDE_ACTION,
} from './constants';

/**
 * Stores all TabBar state.
 * When .show prop is false, then TabBar would be always hidden. When it's true, then TabBar
 * is visible if other conditions don't apply.
 * @param {Object} [state={show: true}] State.
 * @param {Object} action Action.
 * @returns {{show: boolean}}
 */
export default (state = { show: true }, action) => {
  switch (action.type) {
    case TAB_BAR_SHOW_ACTION:
      return {
        show: true,
      };
    case TAB_BAR_HIDE_ACTION:
      return {
        show: false,
      };
    default:
      return state;
  }
};
