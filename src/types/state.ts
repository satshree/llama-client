import {
  BillType,
  CartType,
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
  user: UserType;
  products: ProductType[];
  cart: CartType;
  wishlist: WishlistType;
  userBills: BillType[];
}
