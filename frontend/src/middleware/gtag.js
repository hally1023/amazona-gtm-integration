import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import {
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const event = ({ eventName, details }) => {
  window.gtag("event", eventName, details);
};

export const gtagMiddleware = (store) => (next) => (action) => {
  // switch (action.type) {
  //   case PRODUCT_LIST_SUCCESS:
  //     event({
  //       eventName: "view_item_list",
  //       details: {
  //         items: action.payload,
  //       },
  //     });
  //     return next(action);
  //   case PRODUCT_DETAILS_SUCCESS:
  //     event({
  //       eventName: "view_item",
  //       details: {
  //         content_type: "product",
  //         items: action.payload,
  //       },
  //     });
  //     return next(action);
  //   case CART_ADD_ITEM:
  //     event({
  //       eventName: "add_to_cart",
  //       details: {
  //         items: action.payload,
  //       },
  //     });
  //     return next(action);
  //   case CART_REMOVE_ITEM:
  //     event({
  //       eventName: "remove_from_cart",
  //       details: {
  //         items: action.payload,
  //       },
  //     });
  //     return next(action);
  //   default:
  //     next(action);
  // }

  event({ eventName: action.type, details: action.payload });
  next(action);
};
