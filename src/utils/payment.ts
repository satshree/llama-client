import Payment from "payment";

export const formatCreditCard = (element: HTMLInputElement) =>
  Payment.formatCardNumber(element);
export const formatExpiryDate = (element: HTMLInputElement) =>
  Payment.formatCardExpiry(element);
export const formatCVV = (element: HTMLInputElement) => {
  Payment.formatCardCVC(element);
};

export const validCreditCard = (element: string) =>
  Payment.fns.validateCardNumber(element);

export const validCreditCardCVV = (element: string) =>
  Payment.fns.validateCardCVC(element);

export const validCreditCardExpiry = (element: string) =>
  Payment.fns.validateCardExpiry(element);

export const validZIP = (element: string) =>
  !Number.isNaN(element) ?? element.length < 6;

export const getCardType = (element: string) => Payment.fns.cardType(element);
