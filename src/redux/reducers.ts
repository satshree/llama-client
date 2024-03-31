import { combineReducers } from "redux";

import authReducer from "@/api/auth";
import productsReducer from "@/api/products";
import categoryReducer from "@/api/category";
import billManagementReducer from "@/api/billingManagement";
import userManagementReducer from "@/api/userManagement";
import myDetailReducer from "@/api/myDetails";
import cartReducer from "@/api/cart";
import billReducer from "@/api/billing";
import wishlistReducer from "@/api/wishlist";

export default combineReducers({
  auth: authReducer,
  products: productsReducer,
  categories: categoryReducer,
  bills: billManagementReducer,
  userManagement: userManagementReducer,
  user: myDetailReducer,
  cart: cartReducer,
  userBills: billReducer,
  wishlist: wishlistReducer,
});
