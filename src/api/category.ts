import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { API_ROOT } from "@/utils";
import { CategoryType } from "@/types";

interface CategoryStateType {
  categories: CategoryType[];
}

const initialState: CategoryStateType = {
  categories: [],
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<CategoryType[]>) {
      state.categories = action.payload;
    },
  },
});

export const fetchCategories = () => async (dispatch: Dispatch) => {
  const response = await fetch(API_ROOT + "/api/website/product-category/");

  if (response.status !== 200) {
    console.dir(response);
    throw new Error("Something went wrong");
  } else {
    const result = await response.json();
    dispatch(setCategory(result));
  }
};
export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
