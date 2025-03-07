import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { RouteContext } from '@shopgate/pwa-common/context';
import UIEvents from '@shopgate/pwa-core/emitters/ui';
import { SurroundPortals } from '@shopgate/engage/components';
import {
  PRODUCT_ADD_TO_CART_BAR,
} from '@shopgate/engage/product/constants';
import { broadcastLiveMessage, Section } from '@shopgate/engage/a11y';
import { DIRECT_SHIP } from '@shopgate/engage/locations';
import { ProductContext } from '@shopgate/engage/product/contexts';
import * as constants from './constants';
import AddToCartButton from './components/AddToCartButton';
import AddMoreButton from './components/AddMoreButton';
import CartItemsCount from './components/CartItemsCount';
import connect from './connector';
import styles from './style';

/**
 * The AddToCartBar component.
 */
class AddToCartBar extends Component {
  static contextType = ProductContext;

  static propTypes = {
    conditioner: PropTypes.shape().isRequired,
    options: PropTypes.shape().isRequired,
    productId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    addToCart: PropTypes.func,
    disabled: PropTypes.bool,
    isRopeFulfillmentMethodAllowed: PropTypes.bool,
    loading: PropTypes.bool,
    userLocation: PropTypes.shape(),
    userMethod: PropTypes.string,
  };

  static defaultProps = {
    addToCart: () => { },
    disabled: false,
    loading: false,
    isRopeFulfillmentMethodAllowed: false,
    userLocation: null,
    userMethod: null,
  };

  /**
   * Constructor.
   */
  constructor() {
    super();

    this.target = document.getElementById('AppFooter');
    this.state = {
      clicked: false,
      visible: true,
      added: 0,
    };

    this.ref = React.createRef();
    this.moreButtonRef = React.createRef();

    UIEvents.addListener(constants.SHOW_ADD_TO_CART_BAR, this.handleShow);
    UIEvents.addListener(constants.HIDE_ADD_TO_CART_BAR, this.handleHide);
    UIEvents.addListener(constants.INCREMENT_ACTION_COUNT, this.handleIncrement);
    UIEvents.addListener(constants.DECREMENT_ACTION_COUNT, this.handleDecrement);
    UIEvents.addListener(constants.RESET_ACTION_COUNT, this.handleReset);
  }

  /**
   * Unregisters the ui events.
   */
  componentWillUnmount() {
    UIEvents.removeListener(constants.SHOW_ADD_TO_CART_BAR, this.handleShow);
    UIEvents.removeListener(constants.HIDE_ADD_TO_CART_BAR, this.handleHide);
    UIEvents.removeListener(constants.INCREMENT_ACTION_COUNT, this.handleIncrement);
    UIEvents.removeListener(constants.DECREMENT_ACTION_COUNT, this.handleDecrement);
    UIEvents.removeListener(constants.RESET_ACTION_COUNT, this.handleReset);
  }

  handleShow = () => {
    this.setState({ visible: true });
  }

  handleHide = () => {
    this.setState({ visible: false });
  }

  /**
   * @param {number} count count
   */
  handleIncrement = (count) => {
    this.setState(prevState => ({
      added: (prevState.added + count),
    }));
  }

  /**
   * @param {number} count count
   */
  handleDecrement = (count) => {
    this.setState(prevState => ({
      added: (prevState.added > 0 ? prevState.added - count : 0),
    }));
  }

  handleReset = () => {
    this.setState({ added: 0 });
  }

  /**
   * Handles the button click.
   * Checks if the button can be clicked and if
   * all criteria set by the conditioner are met.
   */
  handleAddToCart = () => {
    const {
      loading,
      disabled,
      conditioner,
      addToCart,
      productId,
      options,
      userLocation,
      userMethod,
      isRopeFulfillmentMethodAllowed,
    } = this.props;

    if (this.state.clicked) {
      return;
    }

    if (loading || disabled) {
      return;
    }

    conditioner.check().then((fulfilled) => {
      if (!fulfilled) {
        return;
      }

      this.setState({ clicked: true });

      const addToCartData = {
        productId,
        options,
        quantity: this.context.quantity,
      };

      // Add the user location for ROPIS if it is set.
      if (
        userLocation !== null
        && userMethod !== DIRECT_SHIP
        && isRopeFulfillmentMethodAllowed
      ) {
        addToCartData.fulfillment = {
          method: userMethod,
          location: {
            code: userLocation.code,
            name: userLocation.name,
          },
        };
      }

      addToCart(addToCartData);

      broadcastLiveMessage('product.adding_item', {
        params: { count: this.context.quantity },
      });

      if (this.moreButtonRef.current) {
        this.moreButtonRef.current.focus();
      }

      setTimeout(this.resetClicked, 250);
    });
  }

  resetClicked = () => {
    this.setState({ clicked: false });
  }

  /**
   * @return {JSX}
   */
  render() {
    if (this.state.visible === false) {
      return null;
    }

    const { added } = this.state;

    if (!this.props.visible) {
      return null;
    }

    return ReactDOM.createPortal(
      (
        <SurroundPortals
          portalName={PRODUCT_ADD_TO_CART_BAR}
          portalProps={{
            ...this.props,
            ...this.state,
            handleAddToCart: this.handleAddToCart,
            resetClicked: this.resetClicked,
          }}
        >
          <Section title="product.sections.purchase" className="theme__product__add-to-cart-bar">
            <div className={styles.container}>
              <div className={styles.innerContainer} ref={this.ref}>
                <div className={styles.base}>
                  <div className={styles.statusBar}>
                    <CartItemsCount
                      productId={this.props.productId}
                      itemCount={added}
                    />
                    <AddMoreButton
                      handleAddToCart={this.handleAddToCart}
                      disabled={this.props.disabled}
                      loading={this.props.loading}
                      onReset={this.resetClicked}
                      visible={added > 0}
                      ref={this.moreButtonRef}
                    />
                  </div>
                  <AddToCartButton
                    disabled={this.props.disabled}
                    itemCount={added}
                    handleAddToCart={this.handleAddToCart}
                    onReset={this.resetClicked}
                  />
                </div>
              </div>
            </div>
          </Section>
        </SurroundPortals>
      ),
      this.target
    );
  }
}

export default connect(props => (
  <RouteContext.Consumer>
    {({ visible }) => (
      <AddToCartBar {...props} visible={visible} />
    )}
  </RouteContext.Consumer>
));
