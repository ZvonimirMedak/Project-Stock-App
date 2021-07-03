import { routesNames } from "../consts/routeNames";

export const getActiveIndex = (location: any) =>
  Object.values(routesNames)!.find((route) => {
    const temp = route.path.split("/")[1];
    if (!temp && location.pathname !== "/") return false;
    return (location.pathname as string).includes(temp);
  })?.asideIndex || 0;
