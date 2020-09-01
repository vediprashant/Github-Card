import React, { Component } from "react";

import "./suggestions.css";
import Suggestion from "./Suggestion";
import getSuggestions from "../../utils/getSuggestions";
import getRandomUser from "../../utils/getRandomUser";
import followUser from "../../utils/followUser";

export default class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { login: "1", avatar_url: "", html_url: "" },
        { login: "2", avatar_url: "", html_url: "" },
        { login: "3", avatar_url: "", html_url: "" },
      ],
      loading: [false, false, false],
    };
    this.removeHandler = this.removeHandler.bind(this);
    this.followHandler = this.followHandler.bind(this);
    // this.clickHandler = this.clickHandler.bind(this);
  }
  extract = ({ login, avatar_url, html_url }) => {
    return { login, avatar_url, html_url };
  };
  fetchUsers = async () => {
    const users = await getSuggestions();
    const newUsers = await users.map((user) => this.extract(user));
    this.setState({ users: newUsers });
  };
  clickHandler = async () => {
    await this.fetchUsers();
  };
  async removeHandler(login) {
    const randomUser = await getRandomUser();
    console.log(randomUser);
    const newUsers = this.state.users.map((user) => {
      if (user.login == login) {
        return this.extract(randomUser[0]);
      }
      return user;
    });
    this.setState({ users: newUsers });
  }
  async followHandler(login) {
    const success = await followUser(login);
    console.log(success);
    await this.removeHandler(login);
  }

  componentDidMount() {
    this.clickHandler();
  }

  render() {
    return (
      <div>
        <div className="suggestion">
          <div className="ui card fluid">
            <div className="content">
              <div className="header">
                Who To Follow
                <a onClick={this.clickHandler}>Refresh</a>
              </div>
            </div>
            <div className="content">
              <div className="ui feed">
                {this.state.users.map((suggestion) => (
                  <Suggestion
                    key={suggestion.login}
                    login={suggestion.login}
                    avatar_url={suggestion.avatar_url}
                    html_url={suggestion.html_url}
                    onRemoveClick={this.removeHandler}
                    onFollowClick={this.followHandler}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
