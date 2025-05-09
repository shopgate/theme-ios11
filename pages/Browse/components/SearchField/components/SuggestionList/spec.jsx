import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockStore } from '@shopgate/pwa-common/store';
import { getSuggestions } from '@shopgate/pwa-common-commerce/search/selectors';
import SuggestionList, { UnwrappedSuggestionList } from './index';

const store = createMockStore();

let mockedFetchingState;
jest.mock('@shopgate/engage/components');
jest.mock('@shopgate/pwa-common-commerce/search/selectors', () => ({
  getSuggestions: () => ([
    'foo',
    'foo bar',
    'foo bar buz',
    'foo bar buz quz',
  ]),
  getSuggestionsFetchingState: () => mockedFetchingState,
}));

describe('<SuggestionList />', () => {
  beforeEach(() => {
    mockedFetchingState = false;
  });

  it('should render a list of suggestions', () => {
    const expectedSuggestions = getSuggestions({});

    const wrapper = mount((
      <Provider store={store}>
        <SuggestionList bottomHeight={10} onClick={() => {}} visible />
      </Provider>
    ));

    expect(wrapper).toMatchSnapshot();
    expectedSuggestions.forEach((suggestion) => {
      expect(wrapper.exists(`button[value="${suggestion}"]`)).toEqual(true);
    });
  });

  it('should not update while suggestions are fetching', () => {
    const suggestionsOne = getSuggestions();
    const suggestionsTwo = [...suggestionsOne].reverse();

    const wrapper = mount((
      <UnwrappedSuggestionList
        bottomHeight={10}
        onClick={() => { }}
        suggestions={suggestionsOne}
        fetching={false}
        visible
      />
    ));

    expect(wrapper).toMatchSnapshot();

    suggestionsOne.forEach((suggestion) => {
      expect(wrapper.exists(`button[value="${suggestion}"]`)).toEqual(true);
    });

    wrapper.setProps({
      fetching: true,
      suggestions: suggestionsTwo,
    });

    expect(wrapper).toMatchSnapshot();
    suggestionsOne.forEach((suggestion) => {
      expect(wrapper.exists(`button[value="${suggestion}"]`)).toEqual(true);
    });

    wrapper.setProps({ fetching: false });

    expect(wrapper).toMatchSnapshot();
    suggestionsTwo.forEach((suggestion) => {
      expect(wrapper.exists(`button[value="${suggestion}"]`)).toEqual(true);
    });
  });

  it('should call onClick with suggestion', () => {
    const onClickMock = jest.fn();
    const wrapper = mount((
      <Provider store={store}>
        <SuggestionList bottomHeight={10} onClick={onClickMock} visible />
      </Provider>
    ));

    wrapper.find('button').at(2).simulate('click');

    expect(onClickMock).toHaveBeenCalledWith(expect.anything(), 'foo bar buz');
  });

  it('should render portal without suggestions', () => {
    const wrapper = mount((
      <UnwrappedSuggestionList bottomHeight={0} onClick={() => { }} suggestions={null} visible />
    ));
    expect(wrapper).toMatchSnapshot();
  });
});
