import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

export default class Header extends Component {
  render() {

    if (this.props.user) {

      return (
        <>
          <p>{this.props.user.battletag}</p>
          <a href='/auth/logout'>Logout</a>
          <br />
          <Link to="/">Home</Link>
          <br />
          <Link to="/dashboard">Dashboard</Link>
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
