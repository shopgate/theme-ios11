import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import appConfig from '@shopgate/pwa-common/helpers/config';
import ModalContainer from '@shopgate/pwa-common/components/ModalContainer';
import App from '@shopgate/pwa-common/App';
// import {
//   INDEX_PATH,
//   PAGE_PATH,
//   LOGIN_PATH,
//   REGISTER_PATH,
//   CHECKOUT_PATH,
// } from '@shopgate/pwa-common/constants/RoutePaths';
// import { CATEGORY_PATH } from '@shopgate/pwa-common-commerce/category/constants';
// import { FAVORITES_PATH } from '@shopgate/pwa-common-commerce/favorites/constants';
// import { FILTER_PATH } from '@shopgate/pwa-common-commerce/filter/constants';
// import { ITEM_PATH } from '@shopgate/pwa-common-commerce/product/constants';
// import { SEARCH_PATH } from '@shopgate/pwa-common-commerce/search/constants';
// import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
// import { ORDERS_PATH } from '@shopgate/pwa-common-commerce/orders/constants';
// import { BROWSE_PATH } from 'Pages/Browse/constants';
// import { MORE_PATH } from 'Pages/More/constants';
import Portal from '@shopgate/pwa-common/components/Portal';
import { AppContext, ThemeContext } from '@shopgate/pwa-common/context';
import { /* APP_ROUTES, */APP_GLOBALS } from '@shopgate/pwa-common/constants/Portals';
import Viewport from 'Components/Viewport';
import View from 'Components/View';
import Dialog from '@shopgate/pwa-ui-shared/Dialog';
import locale from '../locale';
// import * as routes from './routes';

/**
 * The theme's main component defines all the routes (views) inside the application.
 * @returns {JSX}
 */
const Pages = ({ store }) => (
  <App locale={locale} store={store}>
    <AppContext.Provider value={{ ...appConfig }}>
      <ThemeContext.Provider value={{ View }}>
        <Portal name={APP_GLOBALS} />
        <Viewport>
          <ModalContainer component={Dialog} />
          <div>Hello World!</div>
          {/*
          <Route path={`${INDEX_PATH}`} component={routes.Page} />
          <Route path={`${PAGE_PATH}/:pageId`} component={routes.Page} />
          <Route path={`${CATEGORY_PATH}`} component={routes.Category} />
          <Route path={`${CATEGORY_PATH}/:categoryId?/:selection?`} component={routes.Category} />
          <Route path={`${FILTER_PATH}`} component={routes.Filter} />
          <Route path={`${FILTER_PATH}/:attribute`} component={routes.FilterAttribute} />
          <Route path={`${ITEM_PATH}/:productId`} component={routes.Product} />
          <Route path={`${ITEM_PATH}/:productId/gallery/:initialSlide?`} component={routes.ProductGallery} />
          <Route path={`${ITEM_PATH}/:productId/reviews/`} component={routes.Reviews} />
          <Route path={`${CART_PATH}`} component={routes.Cart} />
          {
            appConfig.hasFavorites
            && <Route path={`${FAVORITES_PATH}`} component={routes.Favorites} />
          }
          <Route path={`${SEARCH_PATH}`} component={routes.Search} />
          <Route path={`${LOGIN_PATH}`} component={routes.Login} />
          <Route path={`${REGISTER_PATH}`} />
          <Route path={`${MORE_PATH}`} component={routes.More} />
          <Route path={`${BROWSE_PATH}`} component={routes.Browse} />

          <AuthRoutes to={`${LOGIN_PATH}`}>
            <Route path={`${CHECKOUT_PATH}`} component={routes.Checkout} />
            <Route path={`${ORDERS_PATH}`} component={routes.Orders} />
            <Route path={`${ITEM_PATH}/:productId/write_review/`} component={routes.WriteReview} />
          </AuthRoutes>

          <Portal name={APP_ROUTES} props={{ View }} />
          */}
        </Viewport>
      </ThemeContext.Provider>
    </AppContext.Provider>
  </App>
);

Pages.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default hot(module)(Pages);
