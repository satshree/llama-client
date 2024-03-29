import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  API_ROOT,
  loadAuthStateFromLocalStorage,
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "@/utils";
import { CartType } from "@/types";

interface CartState {
  open: true | false;
  cart: CartType;
}

const initialState: CartState = {
  open: false,
  cart: {
    id: "",
    updated: "",
    total: 0,
    user: {
      id: "",
      username: "",
    },
    items: [],
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    updateCart(state, action: PayloadAction<CartType>) {
      state.cart = action.payload;

      saveCartToLocalStorage(action.payload);
    },
  },
});

export const fetchCart = () => async (dispatch: Dispatch) => {
  const auth = loadAuthStateFromLocalStorage();
  const cart = loadCartFromLocalStorage();

  let api = "/api/website/cart/";
  if (auth.user.id) {
    api += `?user=${auth.user.id}`; // fetch cart for user
  } else if (cart.id) {
    api += `${cart.id}/`; // fetch existing
  }

  const response = await fetch(API_ROOT + api);

  if (response.status !== 200) {
    console.dir(response);
    throw new Error("Something went wrong");
  } else {
    const cartData = await response.json();
    dispatch(updateCart(cartData));
  }
};

export const { toggleCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
