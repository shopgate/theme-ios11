import { consume } from 'redux-props';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import { getCurrentPattern } from '@shopgate/pwa-common/selectors/router';

/**
 * @param {Object} params.dispatch The dispatch function.
 * @return {Object}
 */
function mapProps({ state, dispatch }) {
  return {
    historyPush: pathname => dispatch(historyPush({ pathname })),
    routePattern: getCurrentPattern(state),
  };
}

/**
 * @return {boolean}
 */
function stateChanged() {
  return false;
}

export default consume({
  mapProps,
  // stateChanged,
});
