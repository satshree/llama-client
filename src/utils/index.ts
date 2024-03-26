import moment from "moment";

export function parseDate(date: string): Date {
  return moment(date, "DD. MMM, YYYY hh:mm a").toDate();
}

export * from "./storage";
