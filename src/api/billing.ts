import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { API_ROOT, loadAuthStateFromLocalStorage } from "@/utils";
import { BillType } from "@/types";

interface BillState {
  bills: BillType[];
}

const initialState: BillState = {
  bills: [],
};

const billSlice = createSlice({
  name: "userBills",
  initialState,
  reducers: {
    setBills(state, action: PayloadAction<BillType[]>) {
      state.bills = action.payload;
    },
  },
});

export const fetchBills = (userID: string) => async (dispatch: Dispatch) => {
  const response = await fetch(
    API_ROOT + `/api/website/billing/get-my-bills/${userID}/`
  );

  if (response.status !== 200) {
    console.dir(response);
    throw new Error("Something went wrong");
  } else {
    const billingData = await response.json();
    dispatch(setBills(billingData));
  }
};

export const fetchBillsByPhone =
  (phone: string) => async (dispatch: Dispatch) => {
    const response = await fetch(
      API_ROOT + `/api/website/billing/get-by-phone/?phone=${phone}`
    );

    if (response.status !== 200) {
      console.dir(response);
      throw new Error("Something went wrong");
    } else {
      const billingData = await response.json();
      dispatch(setBills(billingData));
    }
  };

export const { setBills } = billSlice.actions;
export default billSlice.reducer;
