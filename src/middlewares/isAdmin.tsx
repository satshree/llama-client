"use client";

import { redirect } from "next/navigation";
import {
  loadAuthStateFromLocalStorage,
  removeAuthStateFromLocalStorage,
} from "@/utils";
import { useEffect } from "react";

export default function isAdmin(Component: any) {
  return function isAuthenticated(props: any) {
    useEffect(() => {
      const { user } = loadAuthStateFromLocalStorage();

      if (!user.super) {
        removeAuthStateFromLocalStorage();

        if (typeof window !== "undefined") {
          window.alert("Unauthorized access!");
          window.location.href = "/";
        } else {
          redirect("/");
        }
      }
    }, []);

    return <Component {...props} />;
  };
}
