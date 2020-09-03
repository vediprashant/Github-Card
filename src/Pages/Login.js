import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../Components/app.css";
import "./login.css";
import { Redirect } from "react-router-dom";
import validatingUser from "../ActionCreator";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      token: "",
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
    event.preventDefault();
    this.props.validate(this.state.token, this.state.username);
  }
  render() {
    return (
      <div>
        {this.props.loggedIn ? <Redirect to="/" /> : null}
        <div className="logo">
          <i aria-hidden="true" className="github massive icon"></i>
        </div>
        <Grid textAlign="center">
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
                  {this.props.isLoading ? (
                    <div className="ui active centered inline tiny inverted loader"></div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Segment>
            </Form>
            {this.props.isError ? (
              <div className="error">Please Provide Valid Credentials</div>
            ) : this.props.apiError ? (
              <div className="error">Internal Issue...Please try again</div>
            ) : null}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loggedIn: state.currentUser.loggedIn,
  isLoading: state.fetchUser.isLoading,
  isError: state.fetchUser.isError,
  apiError: state.fetchUser.apiError,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { validate: (token, userName) => validatingUser(token, userName) },
    dispatch
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
