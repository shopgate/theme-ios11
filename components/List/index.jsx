import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseList from '@shopgate/pwa-common/components/List';
import BaseListItem from '@shopgate/pwa-common/components/List/components/Item';
import Item from './components/Item';
import styles from './style';

/**
 * The list component.
 */
class List extends Component {
  static Item = Item;

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
    hasImages: PropTypes.bool,
    testId: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    className: null,
    hasImages: false,
    testId: null,
  };

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const {
      children, className, hasImages, testId,
    } = this.props;

    if (!React.Children.count(children)) {
      return null;
    }

    return (
      <BaseList className={className}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }
          // The key for each child.
          const key = `child-${index}`;
          // Selected state for the child.
          const { isSelected } = child.props;

          const classes = [styles.item];

          if (hasImages) {
            classes.push(styles.itemWithImage);
          }

          return (
            <BaseListItem
              className={classNames(classes)}
              isSelected={isSelected}
              key={key}
            >
              <div className={styles.innerContainer} data-test-id={testId}>
                {child}
              </div>
            </BaseListItem>
          );
        })}
      </BaseList>
    );
  }
}

export default List;
