export interface LoginInterface {
  email: string;
  password: string;
}

export interface User extends LoginInterface {
  uid: string;
}

export interface Stock {
  value: number;
  id: number;
}

export interface AllStocks {
  country: string;
  currency: string;
  name: string;
  symbol: string;
}

export interface StockInformation {
  name: string;
}

export interface Chart {
  close: number[];
  timestamp: number[];
}

export interface PurchasedStock {
  name: string;
  price: number;
  amount: number;
  symbol: string;
  uuid: string;
}

export interface FavoriteStock {
  name: string;
  uuid: string;
  symbol: string;
}
