export const mockedStateDefault = {
  history: {
    pathname: '/',
    queryParams: {},
  },
  cart: {
    items: [],
  },
  ui: {
    tabBar: {
      show: true,
    },
  },
};

/**
 * @param {string} path The route pathname
 * @returns {Object}
 */
export const mockedStateRoute = path => ({
  ...mockedStateDefault,
  history: {
    ...mockedStateDefault.history,
    pathname: path,
  },
});
