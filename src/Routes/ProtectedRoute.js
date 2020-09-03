import React from "react";
import { Redirect, Route } from "react-router-dom";
import KEYS from "../Constants/keyConstants";
import ROUTES from "../Constants/pathConstants";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem(KEYS.TOKEN) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN_ROUTE,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
