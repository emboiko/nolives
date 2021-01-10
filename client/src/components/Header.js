import React, { Component } from 'react';
import '../App.css';

export default class Header extends Component {
  render() {

    if (this.props.user) {

      return (
        <>
          <p>{this.props.user.battletag}</p>
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
