import React, { Component, Fragment } from 'react';
import Portal from '@shopgate/pwa-common/components/Portal';
import MoreIcon from '@shopgate/pwa-ui-shared/icons/MoreIcon';
import { TabBar, } from '@shopgate/pwa-ui-ios';
import { MORE_PATH } from 'Pages/More/constants';
import colors from 'Styles/colors';
import {
  TAB_BAR_MORE,
  TAB_BAR_MORE_BEFORE,
  TAB_BAR_MORE_AFTER,
} from '../../constants';
import consume from '../../consumer';
import { DEFAULT_ICON_COLOR } from '../../';
import styles from './style';

class MoreButton extends Component {
  get color() {
    return this.onMoreRoute ? colors.accent : DEFAULT_ICON_COLOR;
  }

  get icon() {
    return <MoreIcon className={styles} />;
  }

  get onMoreRoute() {
    return this.props.routePattern === MORE_PATH;
  }

  handleClick = () => {
    if (this.onMoreRoute) {
      return;
    }

    this.props.historyPush(MORE_PATH);
  }

  render() {
    return (
      <Fragment>
        <Portal name={TAB_BAR_MORE_BEFORE} />
        <Portal name={TAB_BAR_MORE}>
          <TabBar.Item
            color={this.color}
            icon={this.icon}
            label="tab_bar.more"
            onClick={this.handleClick}
          />
        </Portal>
        <Portal name={TAB_BAR_MORE_AFTER} />
      </Fragment>
    );
  }
}

export default consume(MoreButton);
