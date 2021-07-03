import { translations } from "../i18n/translation";
import { Routes } from "../router/Routes";

export interface OneRoute {
  name: string;
  path: string;
  asideIndex: number;
  iconType: RouteIconType;
}

export interface Route {
  [key: number]: OneRoute;
}

export enum RouteIconType {
  Favorites,
  MostTraded,
  UserStocks,
}

export const routesNames: Route = {
  0: {
    name: translations.user_stocks,
    path: Routes.UserTrades,
    asideIndex: 0,
    iconType: RouteIconType.UserStocks,
  },
  1: {
    name: translations.favorites,
    path: Routes.Favorites,
    asideIndex: 1,
    iconType: RouteIconType.Favorites,
  },
  2: {
    name: translations.most_traded,
    path: Routes.MostTraded,
    asideIndex: 2,
    iconType: RouteIconType.MostTraded,
  },
};
