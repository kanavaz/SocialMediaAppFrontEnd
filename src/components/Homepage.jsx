import Login from "./Login"
import Dashboard from "./Dashboard"
import PropTypes from "prop-types";
import React, { Component } from "react";


export default class HomePage extends Component {
  state = {
    user: {},
    error: null,
    authenticated: false
  };

  componentDidMount() {
    fetch("http://localhost:4000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  render() {
    const { authenticated } = this.state;
    const { user } = this.state;
    return (
      <div>
        {!authenticated ? (
          <div>
            <Login></Login>
          </div>
        ) : (
          <div> 
            <Dashboard 
              authenticated={authenticated}
              user = {user}
              handleNotAuthenticated={this._handleNotAuthenticated}>
            </Dashboard>
          </div>
        )}
      </div>
      
      
    );
  }

  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };
}