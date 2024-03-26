import moment from "moment";

export function parseDate(
  date: string,
  format: string = "DD. MMM, YYYY hh:mm a"
): Date {
  return moment(date, format).toDate();
}

export * from "./storage";
