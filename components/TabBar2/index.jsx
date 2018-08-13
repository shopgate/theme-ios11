import React, { Component } from 'react';
import appConfig from '@shopgate/pwa-common/helpers/config';
import { TabBar as Bar } from '@shopgate/pwa-ui-ios';
import { tabBar } from 'Refs';
import HomeButton from './components/HomeButton';
import BrowseButton from './components/BrowseButton';
import CartButton from './components/CartButton';
import FavoritesButton from './components/FavoritesButton';
import MoreButton from './components/MoreButton';
import inject from './injector';

export const DEFAULT_ICON_COLOR = '#9b9b9b';

// handle colors - need route pattern to come from correct place

/**
 * 
 */
class TabBar extends Component {
  render() {
    return (
      <Bar visible={true} nodeRef={tabBar}>
        <HomeButton />
        <BrowseButton />
        <CartButton />
        {appConfig.hasFavorites && (
          <FavoritesButton />
        )}
        <MoreButton />
      </Bar>
    );
  }
}

export default TabBar;
