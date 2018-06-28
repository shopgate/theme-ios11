import React from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '@shopgate/pwa-common-commerce/favorites/constants/Portals';
import AddToCartButton from '@shopgate/pwa-ui-shared/AddToCartButton';
import styles from './style';
import connect from './connector';

/**
 * Handles the add to cart action.
 * @param {Object} props The Component props
 */
const handleAddToCart = ({
  productId, addToCart, showVariantModal, isBaseProduct,
}) => {
  if (isBaseProduct) {
    showVariantModal(productId);
    return;
  }

  const productData = {
    productId,
    quantity: 1,
  };

  addToCart([productData]);
};

/**
 * Favorites item CTA buttons
 * @param {Object} props The component props.
 * @constructor
 */
const FavoriteToCartButton = props => (
  <div className={styles.ctaButtonWrapper}>
    <Portal name={portals.FAVORITES_ADD_TO_CART_BEFORE} />
    <Portal
      name={portals.FAVORITES_ADD_TO_CART}
      props={{
        className: styles.cartButton,
        handleAddToCart: () => handleAddToCart(props),
        isLoading: false,
        isBaseProduct: props.isBaseProduct,
        isDisabled: !props.isOrderable,
        noShadow: false,
        productId: props.productId,
      }}
    >
      <AddToCartButton
        handleAddToCart={() => handleAddToCart(props)}
        isLoading={false}
        isDisabled={!props.isOrderable}
        isOrderable={!props.isBaseProduct && props.isOrderable}
        noShadow
      />
    </Portal>
    <Portal name={portals.FAVORITES_ADD_TO_CART_AFTER} />
  </div>
);

/* eslint-disable react/no-unused-prop-types */
FavoriteToCartButton.propTypes = {
  productId: PropTypes.string.isRequired,
  addToCart: PropTypes.func,
  isBaseProduct: PropTypes.bool,
  isOrderable: PropTypes.bool,
  onRippleComplete: PropTypes.func,
  showVariantModal: PropTypes.func,
};

FavoriteToCartButton.defaultProps = {
  addToCart: () => {},
  isBaseProduct: true,
  isOrderable: true,
  onRippleComplete: () => {},
  showVariantModal: () => {},
};
/* eslint-enable react/no-unused-prop-types */

export default connect(FavoriteToCartButton);
