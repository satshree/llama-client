"use client";

import { AuthStateType, CartType } from "@/types";

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

export function saveCartToLocalStorage(cart: CartType) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function loadCartFromLocalStorage(): CartType {
  const defaultReturn = JSON.stringify({
    id: "",
    updated: "",
    total: 0,
    user: {
      id: "",
      username: "",
    },
    items: [],
  });

  try {
    return JSON.parse(localStorage.getItem("cart") || `${defaultReturn}`);
  } catch {
    return JSON.parse(defaultReturn);
  }
}

export function removeCartFromLocalStorage() {
  localStorage.removeItem("cart");
}
