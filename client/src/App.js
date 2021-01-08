import React, { Component } from 'react';
import fetch from "node-fetch";
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = { user: null };
  }

  componentDidMount = async () => {
    const res = await fetch("/auth/me");
    const data = await res.json();
    if (data.id || data.battletag) {
      this.setState({ user: data })
    }
  }

  render() {

    if (this.state.user) {

      return (
        <>
          <p>{this.state.user.battletag}</p>
          <a href='/auth/logout'>Logout</a>
        </>
      );

    } else {

      return (
        <>
          <a href="/auth/bnet">Login</a>
        </>
      );

    }
  }
}
