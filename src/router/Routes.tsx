export enum Routes {
  Login = "/",
  Favorites = "/favorites",
  MostTraded = "/most-traded",
  UserTrades = "/my-trades",
  SpecificStock = "/specific-stock/:symbol?/:name?",
}

export const RoutesWithParams = {
  SpecificStock: "/specific-stock",
};
