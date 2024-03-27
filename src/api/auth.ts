import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  API_ROOT,
  removeAUthStateFromLocalStorage,
  saveAuthStateToLocalStorage,
  saveRefreshToCookies,
} from "@/utils";
import { AuthStateType } from "@/types";
// import { AppThunk } from "@/store";

type CredentialType = {
  username: string;
  password: string;
};

type Response = {
  access: string;
  refresh: string;
  type: string;
  id: string;
  username: string;
  isSuper: boolean;
};

const initialState: AuthStateType = {
  token: {
    access: "",
    refresh: "",
  },
  user: {
    id: "",
    username: "",
    super: false,
  },
};

export const authTokenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<Response | AuthStateType>) {
      if (action.payload.hasOwnProperty("token")) {
        state.token = action.payload.token;
      } else {
        state.token = {
          access: action.payload.access,
          refresh: action.payload.refresh,
        };
      }

      if (action.payload.hasOwnProperty("user")) {
        state.user = action.payload.user;
      } else {
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          super: action.payload.isSuper,
        };
      }

      if (state.token.access) {
        saveAuthStateToLocalStorage(state);
      }
    },
    clearTokens(state) {
      state = initialState;
      removeAUthStateFromLocalStorage();
    },
  },
});

// export const login =
//   (credentials: CredentialType): AppThunk =>
//   async (dispatch) => {
// const response = await fetch(API_ROOT + "/api/auth/login/", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(credentials),
// });

// if (response.status !== 200) {
//   console.dir(response);
//   throw new Error("Something went wrong");
// } else {
//   const authData = await response.json();

//   dispatch(setTokens(authData));
// }
//   };

// export const logout = (): AppThunk => async (dispatch) => dispatch(clearTokens);

export const fetchTokens = async (credentials: CredentialType) => {
  const response = await fetch(API_ROOT + "/api/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (response.status !== 200) {
    console.dir(response);
    throw new Error("Something went wrong");
  } else {
    const authData = await response.json();
    return authData;
  }
};

export const { setTokens, clearTokens } = authTokenSlice.actions;
export default authTokenSlice.reducer;
