import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import fetch from "node-fetch";
import Header from "./components/Header";
import Landing from "./components/Landing";
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = { user: null, loaded: false };
  }

  componentDidMount = async () => {
    const res = await fetch("/auth/me");
    const data = await res.json();
    if (data.id || data.battletag) this.setState({ user: data });
    this.setState({ loaded: true });
  }

  render() {
    if (this.state.loaded) {
      return (
        <BrowserRouter>
          <Header user={this.state.user} />
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => <Landing {...routeProps} user={this.state.user} />}
            />
          </Switch>
        </BrowserRouter>
      );
    } else {
      return (
        <>
          <p>Loading...</p>
        </>
      );
    }
  }
}
