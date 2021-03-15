import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import {
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import {
  ORDER_DELIVER_SUCCESS,
  ORDER_PAY_SUCCESS,
  ORDER_REFUND,
} from "../constants/orderConstants";

export const dataLayer = window.dataLayer;
const currencyCode = "USD";

export const gtmMiddleware = (store) => (next) => (action) => {
  const { getState } = store;

  const cartItems = getState().cart.cartItems;
  const order = getState().orderDetails?.order;

  switch (action.type) {
    case PRODUCT_LIST_SUCCESS:
      dataLayer.push({
        ecommerce: {
          currencyCode, // Local currency is optional.
          impressions: action.payload.map((product) =>
            mapProductToGtm(product)
          ),
        },
      });
      return next(action);

    case PRODUCT_DETAILS_SUCCESS:
      dataLayer.push({
        ecommerce: {
          detail: {
            actionField: { list: "Apparel Gallery" }, // 'detail' actions have an optional list property.
            products: [mapProductToGtm(action.payload)],
          },
        },
      });
      return next(action);

    case CART_ADD_ITEM:
      dataLayer.push({
        event: "addToCart",
        ecommerce: {
          currencyCode,
          add: {
            products: [mapCartItemToGtm(action.payload)],
          },
        },
      });

      return next(action);
    case CART_REMOVE_ITEM:
      dataLayer.push({
        event: "removeFromCart",
        ecommerce: {
          remove: {
            // 'remove' actionFieldObject measures.
            products: [action.payload],
          },
        },
      });

      return next(action);

    case CART_SAVE_SHIPPING_ADDRESS:
      dataLayer.push({
        event: "checkout",
        ecommerce: {
          checkout: {
            products: cartItems.map((item) => mapCartItemToGtm(item)),
          },
        },
      });

      return next(action);

    case CART_SAVE_PAYMENT_METHOD:
      dataLayer.push({
        event: "checkoutOption",
        ecommerce: {
          checkout_option: {
            actionField: { step: "payment method", option: action.payload },
          },
        },
      });

      return next(action);

    case ORDER_PAY_SUCCESS:
      dataLayer.push({
        ecommerce: {
          purchase: {
            actionField: {
              id: order._id,
              affiliation: "Online Store",
              revenue: order.itemsPrice,

              currency: "USD",
              tax: order.taxPrice,
              shipping: order.shippingPrice,
            },
            products: order.orderItems.map((item) => mapCartItemToGtm(item)),
          },
        },
      });

      return next(action);

    case ORDER_DELIVER_SUCCESS:
      dataLayer.push({
        'ecommerce': {
          'order_delivered': {
            'actionField': { 'id': order._id }         // Transaction ID. Required for purchases and refunds.
          }
        }
      })

      return next(action);

    case ORDER_REFUND:
      dataLayer.push({
        'ecommerce': {
          'refund': {
            'actionField': { 'id': order._id }         // Transaction ID. Required for purchases and refunds.
          }
        }
      })

      return next(action);

    default:
      next(action);
  }
};

const mapCartItemToGtm = (product) => {
  return {
    name: product.name,
    list_name: "List",
    quantity: product?.qty,
    price: product.price,
  };
};

const mapProductToGtm = (product) => {
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
