import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import style from './style';

/**
 * Favorites icon badge.
 */
export class FavoritesIconBadge extends Component {
  static MAX_NUMBER = 999;

  static propTypes = {
    favoritesCount: PropTypes.number,
  };

  static defaultProps = {
    favoritesCount: 0,
  };

  /**
   * Disallows component to update when favorites count is the same or above the maximum limit.
   * @param {Object} nextProps Next props.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps) {
    if (nextProps.favoritesCount === this.props.favoritesCount) {
      return false;
    }
    // No re-render if it's 999+
    if (
      nextProps.favoritesCount > this.constructor.MAX_NUMBER
      && this.props.favoritesCount > this.constructor.MAX_NUMBER
    ) {
      return false;
    }
    return true;
  }

  /**
   * Renders component.
   * @returns {JSX}
   */
  render() {
    if (this.props.favoritesCount === 0) {
      return null;
    }
    const number = (this.props.favoritesCount > this.constructor.MAX_NUMBER) ?
      `${this.constructor.MAX_NUMBER}+`
      : this.props.favoritesCount;
    return (
      <div className={`${style} theme__tab-bar__favorites-icon-badge theme__badge`}>{number}</div>
    );
  }
}

export default connect(FavoritesIconBadge);
