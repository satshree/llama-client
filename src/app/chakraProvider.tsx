"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";

import { GlobalState } from "@/types";
import {
  loadAuthStateFromLocalStorage,
  saveAuthStateToLocalStorage,
} from "@/utils";
import { setTokens } from "@/api/auth";

export function CustomChakraProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: GlobalState) => state);

  useEffect(() => {
    if (auth.token.access) {
      saveAuthStateToLocalStorage(auth);
    } else {
      const localAuth = loadAuthStateFromLocalStorage();
      dispatch(setTokens(localAuth));
    }
  }, []);

  return <ChakraProvider>{children}</ChakraProvider>;
}
