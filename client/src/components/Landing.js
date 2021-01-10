import fetch from 'node-fetch';
import React, { Component } from 'react';
import '../App.css';

export default class Landing extends Component {
  componentDidMount = async () => {
    if (this.props.user) {
      const res = await fetch("/user/profile");
      const data = await res.json();
      console.log(data);
    }
  }

  render() {
    if (this.props.user) {
      return (
        <>
          <p>{this.props.user.battletag}</p>
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
