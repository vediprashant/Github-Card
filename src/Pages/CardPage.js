import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CardLayout from "../Components/CardLayout/CardLayout";
import "../Components/app.css";
import "./cardPage.css";
import Button from "../Components/Button/Button";
import Search from "../Components/SearchField/Search";
import getUser from "../utils/getUser";
import actions from "../Actions";

/**
 * A Page to search for a user and show its card having its details
 */
function CardPage(props) {
  /* Initial details of the Card */
  const initialState = {
    avatar_url: "https://avatars3.githubusercontent.com/u/583231?v=4",
    login: "sample",
    location: "Github-Card",
    following: 12,
    followers: 33,
    bio: "A sample user card",
    html_url: "https://github.com/sample!",
    blog: "social-card.me",
    email: "sample@githubcardapp.com",
  };
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(initialState);
  const [isError, setIsError] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const searchString = props.match.params.searchString;
  /* To get the details of the user from the api */
  const fetchUserDetails = async () => {
    props.dispatch({ type: actions.UNSET_API_ERROR });
    /* Sets username according to param */
    setUserName(searchParam);
    /* pending represents if response from api is awaited or not*/
    setPending(true);
    /*sets loading state to show loader*/
    setIsLoading(true);
    /* sets value of error state based on the result */
    setIsError(false);
    /* getUser calls the api and gets the result */
    try {
      const jsonData = await getUser(searchParam);
      if (jsonData.message) {
        props.dispatch({ type: actions.UNSET_API_ERROR });
        setIsError(true);
        setUserData(initialState);
        setIsLoading(false);
      } else {
        props.dispatch({ type: actions.UNSET_API_ERROR });
        setIsError(false);
        if (pending) {
          setData(jsonData);
        }
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
      props.dispatch({ type: actions.SET_API_ERROR });
    }
  };

  useEffect(() => {
    if (searchParam) {
      fetchUserDetails();
    }
    return () => {
      setUserData(initialState);
      setPending(false);
    };
  }, [searchParam]);
  /* It will set searchParam to further call the api */
  useEffect(() => {
    if (searchString) {
      setSearchParam(searchString);
      setIsLoading(true);
    }
    if (searchString === undefined) {
      setUserName("");
      setSearchParam("");
    }
    props.dispatch({ type: actions.UNSET_API_ERROR });
    setIsError(false);
    setUserData(initialState);
    setPending(true);
  }, [searchString]);

  /*It will set the username as you provide input in search field */
  const onChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  /* It will call the url for a user on button click */
  const submitHandler = (e) => {
    e.preventDefault();
    if (userName) {
      props.history.push(`/card/${userName}`);
    }
  };
  /* It will set the state of userdata having details of the user */
  const setData = ({
    avatar_url,
    login,
    location,
    following,
    followers,
    bio,
    html_url,
    blog,
    email,
  }) => {
    setUserData({
      avatar_url,
      login,
      location,
      following,
      followers,
      bio,
      html_url,
      blog,
      email,
    });
  };

  return (
    <div className="container">
      <div className="find">
        <Search onChange={onChangeHandler} value={userName} />
        <Button onClick={submitHandler} text={"Search"} />
      </div>
      {isError ? (
        <div>
          <div className="error">User Not Found ...</div>
          <i className="fas fa-exclamation-triangle fa-10x error"></i>
        </div>
      ) : isLoading ? (
        <div className="loading-container">
          <div className="load"></div>
        </div>
      ) : props.apiError ? (
        <div>
          <div className="error">Api Error..Please Try Again!</div>
          <i className="fas fa-exclamation-triangle fa-10x error"></i>
        </div>
      ) : (
        /* CardLayout component will be called with the details of the user to render card */
        <CardLayout
          avatar_url={userData.avatar_url}
          bio={userData.bio}
          blog={userData.blog}
          email={userData.email}
          followers={userData.followers}
          following={userData.following}
          html_url={userData.html_url}
          location={userData.location}
          login={userData.login}
          cardPage={true}
        />
      )}
    </div>
  );
}

CardPage.propTypes = {
  /* prop provided by router having searchstring param in url */
  match: PropTypes.shape({
    params: PropTypes.shape({
      searchString: PropTypes.string,
    }),
  }).isRequired,
  /* prop provided by router having a stack with history of pages navigated */
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  apiError: state.fetchUser.apiError,
});

export default connect(mapStateToProps)(CardPage);
