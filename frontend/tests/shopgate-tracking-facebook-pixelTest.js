/* eslint global-require: "off" */

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import mochaJsdom from 'mocha-jsdom';

import storageMock from '../helpers/localStorage-mock';
import { sgData } from '../data/tracking.testData';
import SGLink from '../../Library/1.0/common/shopgate-link';

const expect = chai.expect;
const rerequire = mochaJsdom.rerequire;

chai.use(sinonChai);

describe('SgFbPixelTracking', () => {
  let SgFbPixelTracking;
  let trackingCoreEvents;
  let spyFbq;
  let $;
  mochaJsdom();

  before(() => {
    global.window = window;
    global.sgData = window.sgData = sgData;
    global.fbq = () => {};
    global.$ = $ = global.jQuery = global.window.$ = global.window.jQuery = rerequire('jquery');
    global.$.shopgate = {};
    global.localStorage = storageMock();

    document.body.innerHTML = '<head><script></script></head><body></body>';

    SgFbPixelTracking = require('../../Library/1.0/common/tracking/plugins/trackers/shopgate-tracking-facebook-pixel').default;
    trackingCoreEvents = require('../helpers/triggerTrackingCoreEvents');

    spyFbq = sinon.spy(global, 'fbq');

    new SgFbPixelTracking({
      config: {
        pixelIds: ['7117', '2222'],
      },
    });
    window.SgTrackingCore.registerFinished();
  });

  it('should throw errors for wrong init', () => {
    const spyConsole = sinon.spy(console, 'warn');
    new SgFbPixelTracking();
    new SgFbPixelTracking({ useNativeSdk: true });

    expect(spyConsole).to.have.been.calledWith('SgFbPixelTracking: pixels missing');
    expect(spyConsole).to.have.been.calledWith('SgFbPixelTracking: no native SDK support for this plugin');
  });

  it('should load the fb sdk', () => {
    expect($('script').get(0).src.indexOf('connect.facebook.net/en_US/fbevents.js')).to.not.equal(-1);
  });

  it('should send init events', () => {
    const callCount = spyFbq.callCount;

    expect(spyFbq.getCall(callCount - 3).args).to.eql(['init', '7117', undefined]);
    expect(spyFbq.getCall(callCount - 2).args).to.eql(['addPixelId', '2222', undefined]);
    expect(spyFbq.getCall(callCount - 1).args).to.eql(['track', 'PageView', undefined]);
  });

  it('should send completedRegistration', () => {
    const input = trackingCoreEvents.completedRegistration();
    expect(spyFbq.withArgs('track', 'CompleteRegistration', { content_name: input.registrationType })).to.have.been.calledOnce;
  });

  it('should send viewContent', () => {
    const input = trackingCoreEvents.viewContent();
    const contentType = new SGLink(input.page.link).action || 'index';

    expect(spyFbq.withArgs('track', 'ViewContent', {
      content_name: input.page.name,
      content_ids: [''],
      content_type: contentType,
    })).to.have.been.calledOnce;
  });

  it('should send addedPaymentInfo', () => {
    trackingCoreEvents.addedPaymentInfo();
    expect(spyFbq.withArgs('track', 'AddPaymentInfo', undefined)).to.have.been.calledOnce;
  });

  it('should send purchase', () => {
    const input = trackingCoreEvents.purchase();
    const productIds = input.order.products.map(product => product.productNumber || product.uid);

    const expected = {
      content_ids: productIds,
      content_type: 'product',
      value: parseFloat(input.order.amount.gross),
      currency: input.order.amount.currency,
    };

    if (productIds.length === 1) {
      expected.content_name = input.order.products[0].name;
    }

    expect(spyFbq.withArgs('track', 'Purchase', expected)).to.have.been.calledOnce;
  });

  it('should send initiatedCheckout', () => {
    const input = trackingCoreEvents.initiatedCheckout();
    const productIds = input.cart.products.map(product => product.productNumber || product.uid);

    const expected = {
      content_ids: productIds,
      content_type: 'product',
      value: parseFloat(input.cart.amount.gross),
      currency: input.cart.amount.currency,
      num_items: input.cart.productsCount,
    };

    if (productIds.length === 1) {
      expected.content_name = input.cart.products[0].name;
    }

    expect(spyFbq.withArgs('track', 'InitiateCheckout', expected)).to.have.been.calledOnce;
  });

  it('should send addToCart', () => {
    const input = trackingCoreEvents.addToCart();
    let value = 0;
    const productIds = input.products.map((product) => {
      value += parseFloat(product.amount.gross);
      return product.productNumber || product.uid;
    });

    const expected = {
      content_ids: productIds,
      content_type: 'product',
      value,
      currency: input.products[0].amount.currency,
    };

    if (productIds.length === 1) {
      expected.content_name = input.products[0].name;
    }

    expect(spyFbq.withArgs('track', 'AddToCart', expected)).to.have.been.calledOnce;
  });

  it('should send addToWishlist', () => {
    const input = trackingCoreEvents.addToWishlist();
    let value = 0;
    const productIds = input.favouriteListProducts.map((product) => {
      value += parseFloat(product.unit_amount_with_tax) / 100;
      return product.product_number_public || product.product_number;
    });

    const expected = {
      content_ids: productIds,
      content_type: 'product',
      value,
      currency: input.favouriteListProducts[0].currency_id,
    };

    if (productIds.length === 1) {
      expected.content_name = input.favouriteListProducts[0].name;
    }

    expect(spyFbq.withArgs('track', 'AddToWishlist', expected)).to.have.been.calledOnce;
  });

  it('should send search', () => {
    const input = trackingCoreEvents.search();
    const productIds = input.products.map(product => product.productNumber || product.uid);

    expect(spyFbq.withArgs('track', 'Search', {
      content_ids: productIds,
      content_type: 'product',
      search_string: input.search.query,
    })).to.have.been.calledOnce;
  });

  it('should be added to the window object', () => {
    expect(window.SgFbPixelTracking).to.equal(SgFbPixelTracking);
  });

  after(() => {
    // reset global namespace again
    delete global.window;
    delete global.$;
    delete global.jQuery;
    delete global.sgData;
    delete global.fbq;
  });
});
