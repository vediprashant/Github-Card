import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../Components/app.css";
import "./homePage.css";
import CardLayout from "../Components/CardLayout/CardLayout";
import getUser from "../utils/getUser";
import handleTokens from "../utils/handleTokens";
import Suggestions from "../Components/Suggestions/Suggestions";

const HomePage = (props) => {
  useEffect(() => {
    const user = handleTokens.getToken("user");
    const fetchData = async () => {
      const jsonData = await getUser(user);
      props.dispatch({
        type: "SET_DATA",
        payload: {
          userData: jsonData,
          userName: user,
        },
      });
    };

    fetchData();
  }, []);
  return (
    <div className="home">
      {props.userData ? <CardLayout userData={props.userData} /> : null}
      <Suggestions />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
  userName: state.userName,
  loggedIn: state.loggedIn,
});

HomePage.propTypes = {
  loggedIn: PropTypes.bool,
  userData: PropTypes.object,
  userName: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(HomePage);
