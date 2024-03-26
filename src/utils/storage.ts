"use client";

import { GlobalState } from "@/types";

export function loadStateFromLocalStorage(): GlobalState {
  return JSON.parse(localStorage.getItem("state") || "{}");
}

export function saveStateToLocalStorage(state: GlobalState) {
  state.auth.token.refresh = undefined;
  localStorage.setItem("state", JSON.stringify(state));
}

export function saveRefreshToCookies(refresh: string) {
  document.cookie = `refresh=${refresh};max-age=${
    60 * // seconds
    60 * // minutes
    24 // 1 day
  };SameSite;Secure;`;
}

export function getRefreshFromCookies(): string | undefined {
  const cookie = document.cookie
    .split(";")
    .filter((cookie) => cookie === "refresh");

  if (cookie.length > 0) {
    return cookie[0];
  }
}
