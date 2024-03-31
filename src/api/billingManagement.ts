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
  name: "bills",
  initialState,
  reducers: {
    setBills(state, action: PayloadAction<BillType[]>) {
      state.bills = action.payload;
    },
  },
});

export const fetchBills =
  (date: string = "") =>
  async (dispatch: Dispatch) => {
    let api = "/api/management/billing/";
    if (date !== "") {
      api = `/api/management/billing/?date=${date}`;
    }

    const auth = loadAuthStateFromLocalStorage();
    const response = await fetch(API_ROOT + api, {
      headers: {
        Authorization: `Bearer ${auth.token.access}`,
      },
    });

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
