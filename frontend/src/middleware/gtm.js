import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import {
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import TagManager from "react-gtm-module";

export const event = ({ eventName, details }) => {
  window.dataLayer.push(["event", eventName, details]);
};

export const gtmMiddleware = (store) => (next) => (action) => {
  event({ eventName: action.type, details: action.payload });
  next(action);
};
