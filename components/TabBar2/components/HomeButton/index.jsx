import React, { Component, Fragment } from 'react';
import Portal from '@shopgate/pwa-common/components/Portal';
import { HomeIcon, TabBar, } from '@shopgate/pwa-ui-ios';
import { INDEX_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import colors from 'Styles/colors';
import {
  TAB_BAR_HOME,
  TAB_BAR_HOME_BEFORE,
  TAB_BAR_HOME_AFTER,
} from '../../constants';
import consume from '../../consumer';
import { DEFAULT_ICON_COLOR } from '../../';
import styles from './style';

class HomeButton extends Component {
  get color() {
    return (this.props.routePattern === INDEX_PATH) ? colors.accent : DEFAULT_ICON_COLOR;
  }

  get icon() {
    return <HomeIcon className={styles} />;
  }

  handleClick = () => {
    if (this.props.routePattern === INDEX_PATH) {
      return;
    }

    this.props.historyPush(INDEX_PATH);
  }

  render() {
    return (
      <Fragment>
        <Portal name={TAB_BAR_HOME_BEFORE} />
        <Portal name={TAB_BAR_HOME}>
          <TabBar.Item
            color={this.color}
            icon={this.icon}
            label="tab_bar.home"
            onClick={this.handleClick}
          />
        </Portal>
        <Portal name={TAB_BAR_HOME_AFTER} />
      </Fragment>
    );
  }
}

export default consume(HomeButton);
