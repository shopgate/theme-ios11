import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Transition from 'react-transition-group/Transition';
import Grid from '@shopgate/pwa-common/components/Grid';
import { getAbsoluteHeight } from '@shopgate/pwa-common/helpers/dom';
import Swiper from 'react-id-swiper';
import CardItem from '@shopgate/pwa-ui-shared/CardList/components/Item';
import Image from './components/Image';
import ProductInfo from './components/ProductInfo';
import RemoveArea from './components/ProductInfo/components/RemoveArea';
import styles from './style';

/**
 * Renders Favorites list item.
 * @param {Object} product Product.
 * @returns {XML}
 */
class Item extends Component {
  static propTypes = {
    product: PropTypes.shape().isRequired,
  };

  /**
   * Constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      marginLeft: '0px',
      showRemove: false,
    };
    this.swiper = null;
  }

  /**
   * Component did update callback.
   */
  componentDidUpdate() {
    this.height = this.getHeight();
  }

  /**
   * Measures height.
   * @returns {number}
   */
  getHeight = () => {
    if (!this.refElement) {
      return 0;
    }
    // eslint-disable-next-line react/no-find-dom-node
    return getAbsoluteHeight(findDOMNode(this.refElement));
  };

  /**
   * Get the element height to determin the translate distance
   * @param {Object} element Component ref
   */
  saveRef = (element) => {
    if (this.refElement) {
      return;
    }
    this.refElement = element;
  };

  handleTouchEnd = () => {
    if (this.swiper.translate < 0) {
      this.setState({
        marginLeft: '-100px',
        showRemove: true,
      });
    } else {
      this.setState({
        marginLeft: '0px',
        showRemove: false,
      });
    }
  }

  handleRemove = () => {
  }

  /**
   * Renders favorite list item
   * @returns {XML}
   */
  render() {
    return (
      <Transition
        in={this.state.visible}
        timeout={styles.favItemTransitionDuration}
        key={this.props.product.id}
      >
        {state => (
          <CardItem
            ref={this.saveRef}
            className={
              styles.getFavItemTransitionStyle(state, this.state.visible, this.height)
            }
          >
            <Swiper
              onInit={(swiper) => { this.swiper = swiper; }}
              onTouchEnd={() => this.handleTouchEnd()}
            >
              <Grid style={{ marginLeft: this.state.marginLeft }} className={styles.row}>
                <Grid.Item className={styles.leftColumn}>
                  <Image product={this.props.product} />
                </Grid.Item>
                <Grid.Item grow={1} className={styles.rightColumn}>
                  <ProductInfo product={this.props.product} />
                </Grid.Item>
              </Grid>
              <RemoveArea productId={this.props.product.id} show={this.state.showRemove} />
            </Swiper>
          </CardItem>
        )}
      </Transition>
    );
  }
}

export default Item;
