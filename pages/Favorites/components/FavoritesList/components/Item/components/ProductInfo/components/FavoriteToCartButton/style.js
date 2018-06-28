import { css } from 'glamor';
import variables from 'Styles/variables';

const ctaButtonWrapper = css({
  paddingLeft: variables.gap.small,
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
}).toString();

export default {
  ctaButtonWrapper,
};
