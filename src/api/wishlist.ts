import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { API_ROOT, loadAuthStateFromLocalStorage } from "@/utils";
import { WishlistType } from "@/types";

interface WishlistState {
  open: true | false;
  wishlist: WishlistType[];
}

const initialState: WishlistState = {
  open: false,
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<WishlistType[]>) {
      state.wishlist = action.payload;
    },
    updateWishlist(state, action: PayloadAction<WishlistType>) {
      state.wishlist = [...state.wishlist, action.payload];
    },
    toggleWishlist(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

export const fetchWishlists = () => async (dispatch: Dispatch) => {
  const auth = loadAuthStateFromLocalStorage();
  const response = await fetch(API_ROOT + "/api/wishlist/", {
    headers: {
      Authorization: `Bearer ${auth.token.access}`,
    },
  });

  if (response.status !== 200) {
    console.dir(response);
    throw new Error("Something went wrong");
  } else {
    const wishlistData = await response.json();
    dispatch(setWishlist(wishlistData));
  }
};

export const addToWishlist =
  (product_id: string) => async (dispatch: Dispatch) => {
    const auth = loadAuthStateFromLocalStorage();
    const response = await fetch(API_ROOT + "/api/wishlist/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token.access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id }),
    });

    if (response.status !== 200) {
      console.dir(response);
      const resp = await response.json();
      console.log(resp);
      throw new Error(resp.message || "Something went wrong");
    } else {
      const wishlistData = await response.json();
      dispatch(updateWishlist(wishlistData));
    }
  };

export const removeFromWishlist =
  (id: string) => async (dispatch: Dispatch) => {
    const auth = loadAuthStateFromLocalStorage();
    const response = await fetch(API_ROOT + `/api/wishlist/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token.access}`,
      },
    });

    if (response.status !== 200) {
      console.dir(response);
      throw new Error("Something went wrong");
    } else {
      dispatch(fetchWishlists());
    }
  };
export const { setWishlist, toggleWishlist, updateWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
