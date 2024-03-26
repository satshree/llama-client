import moment from "moment";

export function parseDate(
  date: string,
  format: string = "DD. MMM, YYYY hh:mm a"
): Date {
  return moment(date, format).toDate();
}

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT || "localhost:8080";

export * from "./storage";
