import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockStore } from '@shopgate/pwa-common/store';
import {
  SCANNER_SCOPE_DEFAULT,
  SCANNER_TYPE_BARCODE,
} from '@shopgate/pwa-core/constants/Scanner';
import { scannerPath } from '@shopgate/pwa-common/constants/RoutePaths';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import { hasScannerSupport } from '@shopgate/pwa-common/selectors/client';
import SuggestionList from './components/SuggestionList';
import styles from './style';
import SearchField from './index';

jest.mock('@shopgate/pwa-core/classes/AppCommand');
jest.mock('@shopgate/pwa-common/actions/router', () => ({
  historyPush: jest.fn().mockReturnValue({ type: 'FOO' }),
}));
jest.mock('./components/SuggestionList');

jest.mock('@shopgate/pwa-common/selectors/client', () => ({
  hasScannerSupport: jest.fn().mockReturnValue(true),
}));

let mockedHasNoScanner = false;
jest.mock('@shopgate/pwa-common/helpers/config', () => ({
  themeConfig: {
    colors: {
      accent: '',
    },
    variables: {
      gap: {},
    },
  },
  get hasNoScanner() { return mockedHasNoScanner; },
}));

const store = createMockStore();

const mockContext = {
  context: {
    i18n: () => ({ __: () => '' }),
  },
  childContextTypes: {
    i18n: PropTypes.func.isRequired,
  },
};

/**
 * @return {JSX}
 */
const createWrapper = () => mount((
  <Provider store={store}>
    <SearchField pageId="1234" query="foo" />
  </Provider>), mockContext);

describe('<Content />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedHasNoScanner = false;
  });

  it('should render with initial search query', () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input').prop('value')).toEqual('foo');
    expect(wrapper.find(`button.${styles.scannerIcon}`)).toExist();
  });

  it('should render with the scanner icon when the scanner is enabled and supported', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(`button.${styles.scannerIcon}`)).toExist();
  });

  it('should not render with the scanner icon when the scanner is not supported', () => {
    hasScannerSupport.mockReturnValueOnce(false);
    const wrapper = createWrapper();
    expect(wrapper.find(`button.${styles.scannerIcon}`)).not.toExist();
  });

  it('should not render with the scanner icon when the scanner is not enabled', () => {
    mockedHasNoScanner = true;
    const wrapper = createWrapper();
    expect(wrapper.find(`button.${styles.scannerIcon}`)).not.toExist();
  });

  it('should show suggestions when focused', () => {
    const wrapper = createWrapper();

    // Suggestion should not be visible when blured.
    expect(wrapper.find(SuggestionList).length).toEqual(0);
    jest.useFakeTimers();
    wrapper.find('input').simulate('focus');
    jest.runAllTimers();
    wrapper.update();

    // Should be rendered now with current query.
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(SuggestionList).length).toEqual(1);
    expect(wrapper.find(SuggestionList).prop('searchPhrase')).toEqual('foo');
    expect(wrapper.find(`button.${styles.scannerIcon}`)).not.toExist();
  });

  it('should submit search', () => {
    const wrapper = createWrapper();

    // Change serach and submit.
    wrapper.find('input').simulate('change', { target: { value: 'foo bar' } });
    wrapper.find('form').simulate('submit');
    wrapper.update();

    expect(historyPush).toHaveBeenCalledWith({
      pathname: '/search?s=foo%20bar',
    });
  });

  it('should open the scanner', () => {
    const wrapper = createWrapper();
    wrapper.find(`button.${styles.scannerIcon}`).simulate('click');
    expect(historyPush).toHaveBeenCalledWith({
      pathname: scannerPath(SCANNER_SCOPE_DEFAULT, SCANNER_TYPE_BARCODE),
      title: 'navigation.scanner',
    });
  });
});
