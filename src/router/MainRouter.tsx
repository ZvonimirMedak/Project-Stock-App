import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginRegisterContaienr from "../containers/LoginRegisterContaienr";
import RouteGuard from "../components/RouteGuard";
import { Routes } from "./Routes";
import AsideWrapper from "../wrappers/AsideWrapper";
import StockWrapper, { ScreenType } from "../containers/StockContainer";
import SpecificStockContainer from "../containers/SpecificStockContainer";

interface Props {
  authentificationToken: string;
}

const MainRouter = (props: Props) => {
  return (
    <Router>
      <AsideWrapper authentificationToken={props.authentificationToken} />
      <Switch>
        <Route exact path={Routes.Login} component={LoginRegisterContaienr} />
        <RouteGuard
          key={ScreenType.MOST_TRADED}
          uid={props.authentificationToken}
          exact={true}
          path={Routes.MostTraded}
        >
          <StockWrapper screenType={ScreenType.MOST_TRADED} />
        </RouteGuard>
        <RouteGuard
          key={ScreenType.FAVORITES}
          uid={props.authentificationToken}
          exact={true}
          path={Routes.Favorites}
        >
          <StockWrapper screenType={ScreenType.FAVORITES} />
        </RouteGuard>

        <RouteGuard
          key={ScreenType.PURCHASED}
          uid={props.authentificationToken}
          exact={true}
          path={Routes.UserTrades}
        >
          <StockWrapper screenType={ScreenType.PURCHASED} />
        </RouteGuard>
        <RouteGuard
          uid={props.authentificationToken}
          exact={true}
          path={Routes.SpecificStock}
        >
          <SpecificStockContainer />
        </RouteGuard>
      </Switch>
    </Router>
  );
};

export default MainRouter;
