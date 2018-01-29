/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from 'Components/View';
import ClientInformation from 'Components/ClientInformation';
import Headline from 'Components/Headline';
import List from 'Components/List';
import {
  PAGE_PATH,
  SCANNER_PATH,
} from '@shopgate/pwa-common/constants/RoutePaths';
import connect from './connector';
import UserMenu from './components/UserMenu/index';

/**
 * The More component.
 */
class More extends Component {
  static propTypes = {
    entries: PropTypes.shape(),
    isLoggedIn: PropTypes.bool,
    logout: PropTypes.func,
    scannerAvailable: PropTypes.bool,
    user: PropTypes.shape(),
  };

  static defaultProps = {
    entries: null,
    isLoggedIn: false,
    logout: () => {},
    scannerAvailable: true,
    user: null,
  };

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const {
      entries, isLoggedIn, logout, user, scannerAvailable,
    } = this.props;
    const showQuickLinks = entries.quicklinks && !!entries.quicklinks.length;

    return (
      <View>
        <UserMenu isLoggedIn={isLoggedIn} logout={logout} user={user} />
        <Headline text="navigation.store_information" small />
        <List>
          <List.Item title="navigation.shipping" link={`${PAGE_PATH}/shipping`} />
          <List.Item title="navigation.payment" link={`${PAGE_PATH}/payment`} />
          <List.Item title="navigation.terms" link={`${PAGE_PATH}/terms`} />
          <List.Item title="navigation.privacy" link={`${PAGE_PATH}/privacy`} />
          <List.Item title="navigation.contact" link={`${PAGE_PATH}/imprint`} />
        </List>
        {(showQuickLinks || scannerAvailable) && (
          <div>
            <Headline small text="navigation.more_menu" />
            <List>
              { scannerAvailable && (
                <List.Item title="navigation.scanner" link={SCANNER_PATH} />
              )}
              { showQuickLinks && entries.quicklinks.map(entry => (
                <List.Item key={entry.url} title={entry.label} link={entry.url} />
              ))}
            </List>
          </div>
        )}
        <ClientInformation />
      </View>
    );
  }
}

export default connect(More);
