"use client";

import moment from "moment";

import { AddressType } from "@/types";

export function parseDate(
  date: string,
  format: string = "DD. MMM, YYYY hh:mm a"
): Date {
  return moment(date, format).toDate();
}

export function roundDecimal(num: number): number {
  return parseFloat((Math.round(num * 100) / 100).toFixed(2));
}

export function parseAddress(address: string): AddressType {
  if (address === "") {
    return {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    };
  }
  const addressSplit = address.split(",");

  return {
    street: addressSplit[0]?.includes("undefined")
      ? ""
      : addressSplit[0].replace(" ", ""),
    city: addressSplit[1]?.includes("undefined")
      ? ""
      : addressSplit[1].replace(" ", ""),
    state: addressSplit[2]?.includes("undefined")
      ? ""
      : addressSplit[2].replace(" ", ""),
    zip: addressSplit[3]?.includes("undefined")
      ? ""
      : addressSplit[3].replace(" ", ""),
    country:
      addressSplit[4]?.includes("undefined") || addressSplit[4] === undefined
        ? ""
        : addressSplit[4].replace(" ", ""),
  };
}

export function clearAllIntervals(): void {
  // CLEAR OUT THE INTERVALS
  const interval_id = window.setInterval(function () {},
  Number.MAX_SAFE_INTEGER);

  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }
}

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT || "localhost:8080";

export * from "./storage";
