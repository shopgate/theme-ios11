import { css } from 'glamor';
import colors from 'Styles/colors';
import variables from 'Styles/variables';

const container = css({
  background: colors.light,
  width: '100%',
  height: '100%',
  zIndex: 1,
}).toString();

/**
 * Creates the content style.
 * @param {boolean} hasNavigator Whether to add the top offset when the navigator is visible.
 * @param {boolean} isFullscreen Whether remove all offsets,
 *                  so that it's really fullscreen (including the notch).
 * @param {boolean} noScroll Wheather the view should be scrollable or not.
 * @return {string} The content style class.
 */
const content = (
  hasNavigator = true,
  isFullscreen = false,
  noScroll = false
) => {
  const navHeight = hasNavigator ? variables.navbar.height : 0;
  const overflow = noScroll ? 'hidden' : 'auto';

  return css({
    overflow,
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
    width: '100%',
    position: 'absolute',
    top: isFullscreen ? 0 : `calc(${navHeight}px + var(--safe-area-inset-top))`,
    display: 'flex',
    flexDirection: 'column',
    bottom: 0,
  }).toString();
};

const padding = css({
  paddingBottom: 'calc(var(--tabbar-height) + var(--safe-area-inset-bottom))',
});

export default {
  container,
  content,
  padding,
};
