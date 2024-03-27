import { combineReducers } from "redux";

import authReducer from "@/api/auth";
import productsReducer from "@/api/products";
import categoryReducer from "@/api/category";

export default combineReducers({
  auth: authReducer,
  products: productsReducer,
  categories: categoryReducer,
});
