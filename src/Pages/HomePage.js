import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../Components/app.css";
import "./homePage.css";
import CardLayout from "../Components/CardLayout/CardLayout";
import getUser from "../utils/getUser";
import handleTokens from "../utils/handleTokens";
import Suggestions from "../Components/Suggestions/Suggestions";
import KEYS from "../Constants/keyConstants";
import actions from "../Actions";

const HomePage = (props) => {
  useEffect(() => {
    const user = handleTokens.getToken(KEYS.USER);
    const fetchData = async () => {
      const jsonData = await getUser(user);
      props.dispatch({
        type: actions.SET_DATA,
        payload: {
          userData: jsonData,
        },
      });
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="welcome">
        <span className="greeting">
          Welcome
          <img
            src={props.userData.avatar_url}
            className="ui avatar image"
            alt="logo"
          />
          {props.userData.login} to the Github Card Viewer
        </span>
      </div>
      <div className="home">
        <div className="loggedInUser">
          <CardLayout
            avatar_url={props.userData.avatar_url}
            bio={props.userData.bio}
            blog={props.userData.blog}
            email={props.userData.email}
            followers={props.userData.followers}
            following={props.userData.following}
            html_url={props.userData.html_url}
            location={props.userData.location}
            login={props.userData.login}
            cardPage={false}
          />
        </div>
        <div className="whoToFollow">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.currentUser.userData,
  loggedIn: state.currentUser.loggedIn,
});

HomePage.propTypes = {
  loggedIn: PropTypes.bool,
  userData: PropTypes.object,
  userName: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(HomePage);
