import { css } from 'glamor';
import variables from 'Styles/variables';

const name = css({
  fontWeight: 500,
  lineHeight: 1.125,
  marginBottom: '1em',
  wordBreak: ['keep-all', 'break-word'],
  hyphens: 'auto',
  marginRight: '10%',
}).toString();

const propertiesContainer = css({
  paddingRight: variables.gap.small,
  fontSize: 14,
}).toString();

const priceContainer = css({
  paddingLeft: variables.gap.small,
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  fontSize: 14,
}).toString();

const nameFavoriteConrainer = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}).toString();

const detailsRow = css({
  justifyContent: 'space-between',
  alignItems: 'flex-end',
}).toString();

export default {
  detailsRow,
  name,
  priceContainer,
  propertiesContainer,
  nameFavoriteConrainer,
};
