import React, { Component, Fragment } from 'react';
import Portal from '@shopgate/pwa-common/components/Portal';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
import { CartIcon, TabBar, } from '@shopgate/pwa-ui-ios';
import colors from 'Styles/colors';
import {
  TAB_BAR_CART,
  TAB_BAR_CART_BEFORE,
  TAB_BAR_CART_AFTER,
} from '../../constants';
import consume from '../../consumer';
import { DEFAULT_ICON_COLOR } from '../../';
import styles from './style';

class CartButton extends Component {
  get color() {
    return (this.props.routePattern === CART_PATH) ? colors.accent : DEFAULT_ICON_COLOR;
  }

  get icon() {
    return <CartIcon className={styles} />;
  }

  handleClick = () => {
    if (this.props.routePattern === CART_PATH) {
      return;
    }

    this.props.historyPush(CART_PATH);
  }

  render() {
    return (
      <Fragment>
        <Portal name={TAB_BAR_CART_BEFORE} />
        <Portal name={TAB_BAR_CART}>
          <TabBar.Item
            color={this.color}
            icon={this.icon}
            label="tab_bar.cart"
            onClick={this.handleClick}
          />
        </Portal>
        <Portal name={TAB_BAR_CART_AFTER} />
      </Fragment>
    );
  }
}

export default consume(CartButton);
