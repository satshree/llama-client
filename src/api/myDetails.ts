import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  API_ROOT,
  loadAuthStateFromLocalStorage,
  removeAuthStateFromLocalStorage,
} from "@/utils";
import { UserType } from "@/types";

interface UserState {
  user: UserType;
}

const initialState: UserState = {
  user: {
    id: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    is_super: false,
    last_login: "",
    date_joined: "",
    cart_id: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
  },
});

export const fetchMyDetails = () => async (dispatch: Dispatch) => {
  const auth = loadAuthStateFromLocalStorage();
  const response = await fetch(API_ROOT + "/api/user/", {
    headers: {
      Authorization: `Bearer ${auth.token.access}`,
    },
  });

  if (response.status !== 200) {
    console.dir(response);
    removeAuthStateFromLocalStorage();
    dispatch(setUser(initialState.user));
    throw new Error("Something went wrong");
  } else {
    const userData = await response.json();
    dispatch(setUser(userData));
  }
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
