import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActionButton from '@shopgate/pwa-ui-shared/ActionButton';

import styles from './style';

/**
 * Remove component made for Favorites.
 */
class RemoveArea extends Component {
  /**
   * Renders the remove area
   * @returns {XML}
   */
  render() {
    return (
      <div
        className={styles.removeArea}
        style={{ display: !this.props.show ? 'none' : 'flex' }}
      >
        <ActionButton
          onClick={this.handleRemove}
        >
          REM
        </ActionButton>
      </div>
    );
  }
}

RemoveArea.propTypes = {
  productId: PropTypes.string.isRequired,
  show: PropTypes.bool,
};

RemoveArea.defaultProps = {
  show: false,
};

export default RemoveArea;
