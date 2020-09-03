import React, { useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import handleTokens from "../../utils/handleTokens";
import actions from "../../Actions";
import KEYS from "../../Constants/keyConstants";
import ROUTES from "../../Constants/pathConstants";
import "./header.css";
import "../app.css";

const Header = (props) => {
  useEffect(() => {
    if (handleTokens.getToken(KEYS.TOKEN)) {
      props.dispatch({ type: actions.LOGGED_IN });
    }
  }, []);
  const clickHanlder = () => {
    handleTokens.removeToken(KEYS.TOKEN);
    handleTokens.removeToken(KEYS.USER);
    props.dispatch({
      type: actions.LOGGED_OUT,
    });
    props.history.push(ROUTES.LOGIN_ROUTE);
  };
  return (
    <nav className="navbar">
      {props.loggedIn ? (
        <div>
          <NavLink className="menu" to={ROUTES.HOME_ROUTE}>
            Github-Card
          </NavLink>
          <NavLink className="menu" to={ROUTES.CARD_ROUTE}>
            Card
          </NavLink>
          <button className="ui primary button logout" onClick={clickHanlder}>
            Log Out
          </button>
        </div>
      ) : null}
    </nav>
  );
};
const mapStateToProps = (state) => ({
  loggedIn: state.currentUser.loggedIn,
});

Header.propTypes = {
  loggedIn: PropTypes.bool,
};

export default connect(mapStateToProps)(withRouter(Header));
