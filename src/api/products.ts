import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { API_ROOT } from "@/utils";
import { ProductType } from "@/types";

interface ProductState {
  products: ProductType[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductType[]>) {
      state.products = action.payload;
    },
  },
});

export const fetchProduct = () => async (dispatch: Dispatch) => {
  const response = await fetch(API_ROOT + "/api/website/product/");

  if (response.status !== 200) {
    console.dir(response);
    throw new Error("Something went wrong");
  } else {
    const productData = await response.json();
    dispatch(setProducts(productData));
  }
};

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
