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

  return JSON.parse(localStorage.getItem("auth") || `${defaultReturn}`);
}

export function saveAuthStateToLocalStorage(auth: AuthStateType) {
  // let state: any = {
  //   token: {
  //     access: auth.token.access,
  //   },
  //   user: auth.user,
  // };

  localStorage.setItem("auth", JSON.stringify(auth));
}

export function removeAuthStateFromLocalStorage() {
  localStorage.removeItem("auth");
}

// export function saveRefreshToCookies(refresh: string) {
//   document.cookie = `refresh=${refresh};max-age=${
//     60 * // seconds
//     60 * // minutes
//     24 // 1 day
//   };SameSite;Secure;`;
// }

// export function getRefreshFromCookies(): string | undefined {
//   const cookie = document.cookie
//     .split(";")
//     .filter((cookie) => cookie === "refresh");

//   if (cookie.length > 0) {
//     return cookie[0];
//   }
// }
