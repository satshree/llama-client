/**
 * USER TYPES
 */

export type UserType = {
  id: string;
  first_name?: string;
  last_name?: string;
  username: string;
  email?: string;
  address?: string;
  phone?: string;
  is_super?: false;
  last_login?: string;
  date_joined?: string;
  cart_id?: string;
};

/**
 * PRODUCT TYPES
 */

export type CategoryType = {
  id: string;
  name: string;
};

export type ImageType = {
  id: string;
  name: string;
  ext: string;
  size: number;
  full_name: string;
  image: string;
  product_id: string;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  category: CategoryType;
  images: ImageType[];
};

/**
 * CART TYPES
 */

export type CartItemsType = {
  id: string;
  product: ProductType;
  quantity: number;
  total: number;
};

export type CartType = {
  id: string;
  updated: string;
  total: number;
  user: {
    id: string;
    username: string;
  };
  items: CartItemsType[];
};

/**
 * WISHLIST TYPE
 */

export type WishlistType = {
  id: string;
  notes?: string;
  user: {
    id: string;
    username: string;
  };
  product: ProductType;
};

/**
 * BILLING TYPES
 */

export type OrderType = {
  id: string;
  title: string;
  bill: string;
  unit_price: number;
  quantity: number;
  total: number;
  product: ProductType;
};

export type PaidType = {
  id: string;
  card: string;
  amount: number;
  bill_id: string;
};

export type BillInfoType = {
  id: string;
  customer: {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
};

export type BillType = {
  id: string;
  date: string;
  info: BillInfoType;
  subtotal: number;
  discount: number;
  tax: number;
  grand_total: number;
  paid: PaidType[];
  orders: OrderType[];
};
