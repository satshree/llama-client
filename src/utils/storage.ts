"use client";

import { AuthStateType } from "@/types";

export function loadAuthStateFromLocalStorage(): AuthStateType {
  const defaultReturn = JSON.stringify({
    token: {
      access: "",
      refresh: "",
    },
    user: {
      id: "",
      username: "",
      super: false,
    },
  });

  try {
    return JSON.parse(localStorage.getItem("auth") || `${defaultReturn}`);
  } catch {
    return JSON.parse(defaultReturn);
  }
}

export function saveAuthStateToLocalStorage(auth: AuthStateType) {
  localStorage.setItem("auth", JSON.stringify(auth));
}

export function removeAuthStateFromLocalStorage() {
  localStorage.removeItem("auth");
}
