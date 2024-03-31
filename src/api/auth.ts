"use client";

import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  API_ROOT,
  clearAllIntervals,
  loadAuthStateFromLocalStorage,
  removeAuthStateFromLocalStorage,
  removeCartFromLocalStorage,
  saveAuthStateToLocalStorage,
} from "@/utils";
import { AuthStateType } from "@/types";

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

const authTokenSlice = createSlice({
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
    refreshToken(state, action: PayloadAction<string>) {
      state.token.access = action.payload;

      let localAuth = loadAuthStateFromLocalStorage();
      localAuth.token.access = action.payload;
      saveAuthStateToLocalStorage(state);
    },
    clearTokens(state) {
      state.token = initialState.token;
      state.user = initialState.user;

      console.log("HUH?", state);

      removeAuthStateFromLocalStorage();
      removeCartFromLocalStorage();
      clearAllIntervals();
    },
  },
});

export const fetchTokens =
  (credentials: CredentialType) => async (dispatch: Dispatch) => {
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
      await dispatch(setTokens(authData));

      if (authData.isSuper) {
        window.location.href = "/management";
      } else {
        window.location.href = "/browse";
      }
    }
  };

export const refreshTokens =
  (refresh: string) => async (dispatch: Dispatch) => {
    const response = await fetch(API_ROOT + "/api/auth/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });

    if (response.status !== 200) {
      console.dir(response);
      throw new Error("Something went wrong");
    } else {
      const authData = await response.json();
      await dispatch(refreshToken(authData.access));
    }
  };

export const endSession = () => async (dispatch: Dispatch) =>
  dispatch(clearTokens());

export const { setTokens, refreshToken, clearTokens } = authTokenSlice.actions;
export default authTokenSlice.reducer;
