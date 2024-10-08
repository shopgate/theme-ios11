import React, { Fragment } from 'react';
import { Portal } from '@shopgate/engage/components';
import {
  NAV_MENU_RETURN_POLICY_BEFORE,
  NAV_MENU_RETURN_POLICY,
  NAV_MENU_RETURN_POLICY_AFTER,
  showReturnPolicy,
} from '@shopgate/engage/market';
import { RETURN_POLICY_PATH } from '@shopgate/engage/page/constants';
import portalProps from '../../../../portalProps';
import Item from '../../../Item';

/**
 * The ReturnPolicyComponent.
 * @returns {JSX.Element}
 */
const ReturnPolicy = () => (
  <Fragment>
    <Portal name={NAV_MENU_RETURN_POLICY_BEFORE} props={portalProps} />
    {showReturnPolicy && (
      <Portal name={NAV_MENU_RETURN_POLICY} props={portalProps}>
        <Item href={RETURN_POLICY_PATH} label="navigation.return_policy" />
      </Portal>
    )}
    <Portal name={NAV_MENU_RETURN_POLICY_AFTER} props={portalProps} />
  </Fragment>
);

export default ReturnPolicy;
