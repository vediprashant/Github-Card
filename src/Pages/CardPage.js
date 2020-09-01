import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import CardLayout from "../Components/CardLayout/CardLayout";
import "../Components/app.css";
import "./cardPage.css";
import Button from "../Components/Button/Button";
import Search from "../Components/SearchField/Search";
import getUser from "../utils/getUser";

function CardPage(props) {
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
  useEffect(() => {
    const fetchData = async () => {
      setUserName(searchParam);
      setPending(true);
      setIsLoading(true);
      setIsError(false);
      const jsonData = await getUser(searchParam);
      if (jsonData.message) {
        setIsError(true);
        setUserData(initialState);
        setIsLoading(false);
      } else {
        setIsError(false);
        if (pending) {
          setData(jsonData);
        }
        setIsLoading(false);
      }
    };
    if (searchParam) {
      fetchData();
    }
    return () => {
      setUserData(initialState);
      setPending(false);
    };
  }, [searchParam]);

  useEffect(() => {
    if (searchString) {
      setSearchParam(searchString);
    }
    if (searchString === undefined) {
      setUserName("");
      setSearchParam("");
    }
    setIsError(false);
    setUserData(initialState);
    setPending(true);
  }, [searchString]);

  const onChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (userName) props.history.push(`/card/${userName}`);
  };

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
          {" "}
          <div className="error">User Not Found ...</div>
          <i className="fas fa-exclamation-triangle fa-10x error"></i>
        </div>
      ) : isLoading ? (
        <div className="loading-container">
          <div className="load"></div>
        </div>
      ) : (
        <CardLayout userData={userData} />
      )}
    </div>
  );
}

CardPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      searchString: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default CardPage;
