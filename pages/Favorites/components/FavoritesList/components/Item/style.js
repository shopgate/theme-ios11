/**
 * Copyright (c) 2017 - present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { css } from 'glamor';
import variables from 'Styles/variables';

const favItemTransitionDuration = 500;

const row = css({
  padding: variables.gap.big,
  justifyContent: 'space-between',
}).toString();

const leftColumn = css({
  paddingRight: variables.gap.small,
  flexShrink: 0,
  flexGrow: 1,
  minWidth: 126,
  maxWidth: 200,
  width: '19%',
}).toString();

const rightColumn = css({
  paddingLeft: variables.gap.small,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}).toString();

/**
 * Styling for the wrapping div
 * @type {{overflow: string}}
 */
const itemWrapper = css({
  overflow: 'hidden',
}).toString();

const defaultTransitionStyle = {
  position: 'relative',
  zIndex: 1,
  transition: `margin-top ${favItemTransitionDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
};

const transitionStyles = {
  exited: {
    height: 0,
  },
  exiting: {
    height: 'auto',
  },
};

/**
 * Creates an object with style attributes to enable a cart item transition.
 * @param {string} state A state of the react-transition-group/Transition component.
 * @return {Object}
 */
const getFavItemTransitionStyle = (state, visible, height) => (
  css({
    ...defaultTransitionStyle,
    ...transitionStyles[state],
    ...!visible && {
      zIndex: 0,
      marginTop: `-${height}`,
    },
  }).toString()
);

export default {
  leftColumn,
  rightColumn,
  row,
  itemWrapper,
  favItemTransitionDuration,
  getFavItemTransitionStyle,
};
