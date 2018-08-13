import React, { Component, Fragment } from 'react';
import Portal from '@shopgate/pwa-common/components/Portal';
import { FAVORITES_PATH } from '@shopgate/pwa-common-commerce/favorites/constants';
import HeartIcon from '@shopgate/pwa-ui-shared/icons/HeartIcon';
import { TabBar, } from '@shopgate/pwa-ui-ios';
import colors from 'Styles/colors';
import {
  TAB_BAR_FAVORITES,
  TAB_BAR_FAVORITES_BEFORE,
  TAB_BAR_FAVORITES_AFTER,
} from '../../constants';
import consume from '../../consumer';
import { DEFAULT_ICON_COLOR } from '../../';
import styles from './style';

class FavoritesButton extends Component {
  get color() {
    return (this.props.routePattern === FAVORITES_PATH) ? colors.accent : DEFAULT_ICON_COLOR;
  }

  get icon() {
    return <HeartIcon className={styles} />;
  }

  handleClick = () => {
    if (this.props.routePattern === FAVORITES_PATH) {
      return;
    }

    this.props.historyPush(FAVORITES_PATH);
  }

  render() {
    return (
      <Fragment>
        <Portal name={TAB_BAR_FAVORITES_BEFORE} />
        <Portal name={TAB_BAR_FAVORITES}>
          <TabBar.Item
            color={this.color}
            icon={this.icon}
            label="tab_bar.favorites"
            onClick={this.handleClick}
          />
        </Portal>
        <Portal name={TAB_BAR_FAVORITES_AFTER} />
      </Fragment>
    );
  }
}

export default consume(FavoritesButton);
