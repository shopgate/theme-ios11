import React from 'react';
import { mount } from 'enzyme';
import Discount from '.';

jest.mock('@shopgate/engage/components');

describe('<LiveshoppingDiscount />', () => {
  it('should not render the widget without any data', () => {
    const wrapper = mount(<Discount
      discount={50}
      productId="12345"
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
