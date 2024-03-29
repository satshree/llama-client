"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";

import { GlobalState } from "@/types";
import {
  clearAllIntervals,
  loadAuthStateFromLocalStorage,
  saveAuthStateToLocalStorage,
} from "@/utils";
import { refreshTokens, setTokens } from "@/api/auth";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: GlobalState) => state);

  const refreshAccessToken = async (refresh: string) => {
    await dispatch(refreshTokens(refresh));
  };

  useEffect(() => {
    if (auth.token.access) {
      saveAuthStateToLocalStorage(auth);
    }

    const localAuth = loadAuthStateFromLocalStorage();

    if (localAuth.token.refresh) {
      setInterval(
        () => refreshAccessToken(localAuth.token.refresh),
        5 * // minutes -> x minutes
          60 * // s -> 1 minute
          1000 // ms -> 1 second
      );
      dispatch(setTokens(localAuth));
    } else {
      clearAllIntervals();
    }
  }, []);

  return <ChakraProvider>{children}</ChakraProvider>;
}