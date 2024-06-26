import {
  BillType,
  CartType,
  CategoryType,
  ProductType,
  UserType,
  WishlistType,
} from "./models";

/**
 * AUTHENTICATION TYPES
 */

export type AuthTokenStateType = {
  access: string;
  refresh?: string;
};

export type AuthUserStateType = {
  id: string;
  username: string;
  super: boolean;
};

export interface AuthStateType {
  token: AuthTokenStateType;
  user: AuthUserStateType;
}

/**
 * GLOBAL/ROOT STATE
 */

export interface GlobalState {
  auth: AuthStateType;
  user: {
    user: UserType;
  };
  userManagement: {
    users: UserType[];
  };
  products: {
    products: ProductType[];
  };
  categories: {
    categories: CategoryType[];
  };
  cart: {
    open: true | false;
    cart: CartType;
  };
  wishlist: {
    open: true | false;
    wishlist: WishlistType[];
  };
  bills: {
    bills: BillType[];
  };
  userBills: {
    bills: BillType[];
  };
}
