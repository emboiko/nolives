import fetch from 'node-fetch';
import React, { Component } from 'react';
import '../App.css';

export default class Landing extends Component {
  render() {
    if (this.props.user) {
      return (
        <>
          <p>User in landing: {this.props.user.battletag}</p>
        </>
      );

    } else {
      return (
        <>
          <p>No user in landing</p>
        </>
      );

    }

  }
}
