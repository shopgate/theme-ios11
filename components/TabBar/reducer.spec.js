import reducer from './reducer';
import {
  TAB_BAR_SHOW,
  TAB_BAR_HIDE,
} from './constants';

describe('TabBar reducer', () => {
  it('should prepare a default state', () => {
    const state = reducer(undefined, { type: 'foo' });
    expect(state).toEqual({ show: true });
  });
  it('should change the state on TAB_BAR_SHOW', () => {
    const state = reducer({ show: false }, { type: TAB_BAR_SHOW });
    expect(state).toEqual({ show: true });
  });
  it('should change the state on TAB_BAR_HIDE', () => {
    const state = reducer({ show: true }, { type: TAB_BAR_HIDE });
    expect(state).toEqual({ show: false });
  });
});
