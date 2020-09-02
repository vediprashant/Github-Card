import React, { useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import handleTokens from "../../utils/handleTokens";
import "./header.css";
import "../app.css";

const Header = (props) => {
  useEffect(() => {
    if (handleTokens.getToken("token")) {
      props.dispatch({ type: "LOGGED_IN" });
    }
  }, []);
  const clickHanlder = () => {
    handleTokens.removeToken("token");
    handleTokens.removeToken("user");
    props.dispatch({
      type: "LOGGED_OUT",
    });
    props.history.push("/login");
  };
  return (
    <nav className="navbar">
      <NavLink className="menu" to="/">
        Github-Card
      </NavLink>
      <NavLink className="menu" to="/card">
        Card
      </NavLink>
      {props.loggedIn ? (
        <button className="ui primary button logout" onClick={clickHanlder}>
          Log Out
        </button>
      ) : null}
    </nav>
  );
};
const mapStateToProps = (state) => ({
  loggedIn: state.logger.loggedIn,
  userData: state.logger.userData,
  userName: state.logger.userName,
});

Header.propTypes = {
  loggedIn: PropTypes.bool,
};

export default connect(mapStateToProps)(withRouter(Header));
