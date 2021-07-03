import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginRegisterContaienr from "../containers/LoginRegisterContainer";
import StockContainer from "../containers/StockContainer";
import RouteGuard from "../components/RouteGuard";
import { Routes } from "./Routes";

interface Props {
  authentificationToken: string;
}

const MainRouter = (props: Props) => {
  return (
    <Router>
      <Switch>
        <Route exact path={Routes.Login} component={LoginRegisterContaienr} />
        <RouteGuard
          uid={props.authentificationToken}
          exact={true}
          path={Routes.SpecificStock}
        >
          <StockContainer />
        </RouteGuard>
      </Switch>
    </Router>
  );
};

export default MainRouter;
