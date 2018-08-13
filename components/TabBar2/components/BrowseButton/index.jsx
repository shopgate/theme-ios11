import React, { Component, Fragment } from 'react';
import Portal from '@shopgate/pwa-common/components/Portal';
import { BrowseIcon, TabBar, } from '@shopgate/pwa-ui-ios';
import { BROWSE_PATH } from 'Pages/Browse/constants';
import { CATEGORY_PATH } from '@shopgate/pwa-common-commerce/category/constants';
import { SEARCH_PATH } from '@shopgate/pwa-common-commerce/search/constants';
import colors from 'Styles/colors';
import {
  TAB_BAR_BROWSE,
  TAB_BAR_BROWSE_BEFORE,
  TAB_BAR_BROWSE_AFTER,
} from '../../constants';
import consume from '../../consumer';
import { DEFAULT_ICON_COLOR } from '../../';
import styles from './style';

const whitelist = [
  BROWSE_PATH,
  CATEGORY_PATH,
  SEARCH_PATH,
];

class BrowseButton extends Component {
  get color() {
    return (whitelist.includes(this.props.routePattern)) ? colors.accent : DEFAULT_ICON_COLOR;
  }

  get icon() {
    return <BrowseIcon className={styles} />;
  }

  handleClick = () => {
    if (this.props.routePattern === BROWSE_PATH) {
      return;
    }

    this.props.historyPush(BROWSE_PATH);
  }

  render() {
    return (
      <Fragment>
        <Portal name={TAB_BAR_BROWSE_BEFORE} />
        <Portal name={TAB_BAR_BROWSE}>
          <TabBar.Item
            color={this.color}
            icon={this.icon}
            label="tab_bar.browse"
            onClick={this.handleClick}
          />
        </Portal>
        <Portal name={TAB_BAR_BROWSE_AFTER} />
      </Fragment>
    );
  }
}

export default consume(BrowseButton);
