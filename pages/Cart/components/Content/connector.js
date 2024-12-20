import { connect } from 'react-redux';
import {
  getCartItems, getCartMessages, getCurrency, getFlags, getPromotionCoupons, isDirectShipOnly,
} from '@shopgate/engage/cart';
import { isUserLoggedIn } from '@shopgate/pwa-common/selectors/user';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  isUserLoggedIn: isUserLoggedIn(state),
  cartItems: getCartItems(state),
  isDirectShipOnly: isDirectShipOnly(state),
  messages: getCartMessages(state),
  currency: getCurrency(state),
  flags: getFlags(state),
  hasPromotionCoupons: !!getPromotionCoupons(state).length,
});

export default connect(mapStateToProps);
