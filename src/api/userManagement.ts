import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { API_ROOT, loadAuthStateFromLocalStorage } from "@/utils";
import { UserType } from "@/types";

interface UserState {
  users: UserType[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserType[]>) {
      state.users = action.payload;
    },
  },
});

export const fetchUsers = () => async (dispatch: Dispatch) => {
  const auth = loadAuthStateFromLocalStorage();
  const response = await fetch(API_ROOT + "/api/management/user/", {
    headers: {
      Authorization: `Bearer ${auth.token.access}`,
    },
  });

  if (response.status !== 200) {
    console.dir(response);
    throw new Error("Something went wrong");
  } else {
    const userData = await response.json();
    dispatch(setUsers(userData));
  }
};

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
