export type AddressType = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export interface IAnalytics {
  totalSales: number;
  totalCashFlow: number;
  totalProducts: number;
  totalUsers: {
    total: number;
    adminUser: number;
  };
}

export * from "./state";
export * from "./models";
