import fetch from 'node-fetch';
import React, { Component } from 'react';
import '../App.css';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { loaded: false, accountData: null }
  }

  componentDidMount = async () => {
    const headers = {
      Authorization: `Bearer ${this.props.user.token}`,
    };
    let url = `https://us.api.blizzard.com/profile/user/wow`;
    url += `?:region=us&namespace=profile-us&locale=en_US`;

    const res = await fetch(url, { headers });
    const data = await res.json();
    this.setState({ loaded: true, accountData: data });
  }

  render() {
    if (this.state.loaded) {
      console.log(this.state.accountData);

      let characters = [];

      this.state.accountData.wow_accounts.forEach((account) => {
        account.characters.forEach((character) => {
          characters.push(character.name);
        })
      })

      let charNames = characters.map((character, i) => {
        return (
          <li key={i}>{character}</li>
        );
      })

      return (
        <>
          <p>Dashboard</p>
          {charNames}
        </>
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
