import React from 'react';
import { shallow } from 'enzyme';
import Price from './index';

jest.mock('@shopgate/engage/product/contexts', () => ({
  ProductContext: {
    Consumer: ({ children }) => children({}),
  },
}));
jest.mock('@shopgate/engage/components');
jest.mock('./connector', () => cmp => cmp);

describe('<Price />', () => {
  const price = {
    unitPrice: 90.5,
    unitPriceMin: 80.5,
    discount: 0,
    currency: 'USD',
  };

  it('should render portals', () => {
    const wrapper = shallow(<Price price={price} hasProductVariants />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass unitPriceMin for variants', () => {
    const wrapper = shallow(<Price price={price} hasProductVariants />)
      .find('Content').dive()
      .find('Consumer')
      .dive();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Price').prop('unitPriceMin')).toBe(price.unitPriceMin);
  });

  it('should not pass unitPriceMin for non variants', () => {
    const wrapper = shallow(<Price price={price} hasProductVariants={false} />)
      .find('Content').dive()
      .find('Consumer')
      .dive();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Price').prop('unitPriceMin')).toBe(0);
  });
});

