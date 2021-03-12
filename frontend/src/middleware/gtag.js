import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import { ORDER_CREATE_SUCCESS } from "../constants/orderConstants";
import {
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const event = ({ eventName, details }) => {
  window.gtag("event", eventName, details);
};

export function trackPageView() {
  event({
    eventName: "page_view",
    details: {
      page_path: window.location.pathname,
    },
  });
}

export const gtagMiddleware = (store) => (next) => (action) => {
  const { getState } = store;

  const cartItems = getState().cart.cartItems;
  switch (action.type) {
    case PRODUCT_LIST_SUCCESS:
      event({
        eventName: "view_item_list",
        details: {
          items: action.payload.map((product) => mapProductToGtag(product)),
        },
      });
      return next(action);
    case PRODUCT_DETAILS_SUCCESS:
      event({
        eventName: "view_item",
        details: {
          content_type: "product",
          items: [mapProductToGtag(action.payload)],
        },
      });
      return next(action);
    case CART_ADD_ITEM:
      event({
        eventName: "add_to_cart",
        details: {
          items: [mapCartItemToGtag(action.payload)],
        },
      });
      return next(action);
    case CART_REMOVE_ITEM:
      event({
        eventName: "remove_from_cart",
        details: {
          items: action.payload,
        },
      });
      return next(action);

    case CART_SAVE_SHIPPING_ADDRESS:
      event({
        eventName: "begin_checkout",
        details: {
          items: cartItems.map((item) => mapCartItemToGtag(item)),
        },
      });
      event({
        eventName: "checkout_progress",
        details: {
          items: cartItems.map((item) => mapCartItemToGtag(item)),
        },
      });
      return next(action);

    case CART_SAVE_PAYMENT_METHOD:
      event({
        eventName: "set_checkout_option",
        details: {
          checkout_step: 2,
          checkout_option: "payment method",
          value: action.payload,
        },
      });
      event({
        eventName: "checkout_progress",
        details: {
          items: cartItems.map((item) => mapCartItemToGtag(item)),
        },
      });

      return next(action);

    case ORDER_CREATE_SUCCESS:
      event({
        eventName: "purchase",
        details: {
          transaction_id: action.payload._id,
          value: action.payload.itemsPrice,
          currency: "USD",
          tax: action.payload.taxPrice,
          shipping: action.payload.shippingPrice,
          items: cartItems.map((item) => mapCartItemToGtag(item)),
        },
      });

      return next(action);

    default:
      next(action);
  }

  // event({ eventName: action.type, details: action.payload });
  // next(action);
};

const mapCartItemToGtag = (product) => {
  return {
    name: product.name,
    list_name: "List",
    quantity: product?.qty,
    price: product.price,
  };
};

const mapProductToGtag = (product) => {
  return {
    id: product._id,
    name: product.name,
    list_name: "List",
    brand: product.brand,
    category: product.category,
    quantity: product?.countInStock,
    price: product.price,
  };
};
