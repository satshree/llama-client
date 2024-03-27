import { combineReducers } from "redux";

import authReducer from "@/api/auth";
import productsReducer from "@/api/products";

export default combineReducers({
  auth: authReducer,
  products: productsReducer,
});
