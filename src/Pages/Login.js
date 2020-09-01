import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../Components/app.css";
import "./login.css";
import validateUser from "../utils/validateUser";
import handleTokens from "../utils/handleTokens";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      token: "",
      iserror: false,
      isloading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event) {
    this.setState({ username: event.target.value });
  }
  handleTokenChange(event) {
    this.setState({ token: event.target.value });
  }
  async handleSubmit(event) {
    this.setState({ isloading: true });
    event.preventDefault();
    const jsonData = await validateUser(this.state.token);
    if (jsonData.message || jsonData.login !== this.state.username) {
      this.setState({ iserror: true, isloading: false });
    } else {
      this.setState({ iserror: false, isloading: false });
      handleTokens.addToken("token", this.state.token);
      handleTokens.addToken("user", this.state.username);
      this.props.dispatch({
        type: "SET_DATA",
        payload: {
          userData: jsonData,
          userName: this.state.username,
        },
      });
      this.props.dispatch({
        type: "LOGGED_IN",
      });
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div>
        {handleTokens.getToken("token") ? <Redirect to="/" /> : null}
        <div className="logo">
          <i aria-hidden="true" className="github massive icon"></i>
        </div>
        <Grid textAlign="center" style={{ height: "100vh" }}>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="grey" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  onChange={this.handleNameChange}
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Personal Access Token"
                  type="password"
                  onChange={this.handleTokenChange}
                />
                <Button
                  color="blue"
                  fluid
                  size="large"
                  onClick={this.handleSubmit}
                >
                  {this.state.isloading ? (
                    <div className="ui active centered inline loader"></div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Segment>
            </Form>
            {this.state.iserror ? (
              <div className="error">Please Provide Valid Credentials</div>
            ) : (
              ""
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  userData: state.userData,
  userName: state.userName,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
