import * as actions from './actions';
import {
  TAB_BAR_SHOW,
  TAB_BAR_HIDE,
} from './constants';

describe('TabBar actions', () => {
  it('should generate TAB_BAR_SHOW', () => {
    expect(actions.showTabBar()).toEqual({ type: TAB_BAR_SHOW });
  });
  it('should generate TAB_BAR_HIDE', () => {
    expect(actions.hideTabBar()).toEqual({ type: TAB_BAR_HIDE });
  });
});