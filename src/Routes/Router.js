import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Header from "../Components/Header/Header";
import HomePage from "../Pages/HomePage";
import CardPage from "../Pages/CardPage";
import NotFoundPage from "../Pages/NotFoundPage";
import LoginForm from "../Pages/Login";
import pathConstants from "../Constants/pathConstants";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <ProtectedRoute
          path={pathConstants.HOME_ROUTE}
          component={HomePage}
          exact={true}
        />
        <ProtectedRoute
          path={pathConstants.CARD_ROUTE}
          component={CardPage}
          exact={true}
        />
        <Route
          path={pathConstants.LOGIN_ROUTE}
          component={LoginForm}
          exact={true}
        />
        <ProtectedRoute
          path={pathConstants.USER_CARD_ROUTE}
          component={CardPage}
        />
        <ProtectedRoute
          path={pathConstants.INVALID_ROUTE}
          component={NotFoundPage}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
