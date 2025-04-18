import { registerEvents, APP_EVENT_APPLICATION_WILL_ENTER_FOREGROUND } from '@shopgate/pwa-core';
import authRoutes from '@shopgate/pwa-common/collections/AuthRoutes';
import redirects from '@shopgate/pwa-common/collections/Redirects';
import { LoadingProvider } from '@shopgate/pwa-common/providers';
import { getCurrentPathname } from '@shopgate/pwa-common/selectors/router';
import { hasScannerSupport } from '@shopgate/pwa-common/selectors/client';
import { appWillStart$ } from '@shopgate/pwa-common/streams/app';
import {
  CHECKOUT_PATH,
  LOGIN_PATH,
  ORDERS_PATH,
  ACCOUNT_PATH,
  ACCOUNT_PATTERN,
} from '@shopgate/pwa-common/constants/RoutePaths';
import { LEGACY_URL as ORDERS_LEGACY_PATH } from '@shopgate/pwa-common-commerce/orders/constants';
import {
  ITEM_PATH,
  productImageFormats,
  enableRedirectHandler,
  setDefaultProductFetchParams,
  getProductImageSettings,
} from '@shopgate/engage/product';
import { grantCameraPermissions } from '@shopgate/engage/core';
import { SCANNER_PATH } from '@shopgate/pwa-common-commerce/scanner/constants';
import {
  CHECKOUT_ADDRESS_BOOK_PATTERN,
  CHECKOUT_ADDRESS_BOOK_CONTACT_PATTERN,
} from '@shopgate/engage/checkout';
import {
  PRODUCT_SLIDER_IMAGE_COLLECTION_KEY,
  PRODUCT_SLIDER_IMAGE_FORMATS,
} from './Product/constants';
import {
  GALLERY_SLIDER_IMAGE_COLLECTION_KEY,
  GALLERY_SLIDER_IMAGE_FORMATS,
} from './ProductGallery/constants';

/**
 * App subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default function app(subscribe) {
  subscribe(appWillStart$, ({ dispatch, getState }) => {
    registerEvents([APP_EVENT_APPLICATION_WILL_ENTER_FOREGROUND]);

    authRoutes.set(CHECKOUT_PATH, LOGIN_PATH);
    authRoutes.set(ORDERS_PATH, LOGIN_PATH);
    authRoutes.set(ACCOUNT_PATH, LOGIN_PATH);
    authRoutes.set(ACCOUNT_PATTERN, LOGIN_PATH);
    authRoutes.set(`${ITEM_PATH}/:productId/write_review`, LOGIN_PATH);
    authRoutes.set(CHECKOUT_ADDRESS_BOOK_PATTERN, LOGIN_PATH);
    authRoutes.set(CHECKOUT_ADDRESS_BOOK_CONTACT_PATTERN, LOGIN_PATH);

    redirects.set(ORDERS_PATH, ORDERS_LEGACY_PATH);

    // Protect the scanner path with a camera permissions check.
    redirects.set(SCANNER_PATH, ({ action }) => new Promise((resolve) => {
      LoadingProvider.unsetLoading(getCurrentPathname(getState()));
      const hasSupport = hasScannerSupport(getState());

      if (!hasSupport) {
        return resolve(null);
      }

      const { params: { pathname } } = action;

      dispatch(grantCameraPermissions())
        .then((granted) => {
          resolve(granted ? pathname : null);
        });

      return true;
    }));

    // set formats for product images
    let { HeroImage: pdpResolutions, GalleryImage: galleryResolutions } = getProductImageSettings();

    if (!(pdpResolutions && pdpResolutions.length)) {
      pdpResolutions = PRODUCT_SLIDER_IMAGE_FORMATS;
    }

    if (!(galleryResolutions && galleryResolutions.length)) {
      galleryResolutions = GALLERY_SLIDER_IMAGE_FORMATS;
    }

    productImageFormats.set(PRODUCT_SLIDER_IMAGE_COLLECTION_KEY, pdpResolutions);
    productImageFormats.set(GALLERY_SLIDER_IMAGE_COLLECTION_KEY, galleryResolutions);

    /**
     * This feature is currently in BETA testing.
     * It should only be used for approved BETA Client Projects
     */
    enableRedirectHandler();

    /**
     * This feature is currently in BETA testing.
     * It should only be used for approved BETA Client Projects
     */
    setDefaultProductFetchParams();
  });
}
