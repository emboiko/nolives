import fetch from 'node-fetch';
import React, { Component } from 'react';
import '../App.css';

export default class Landing extends Component {
  constructor() {
    super();
    this.state = { loaded: false, profile: null };
  }

  componentDidMount = async () => {
    if (this.props.user) {
      // Anywhere we need to reach out to blizzard, proxy it
      // through the backend
      const res = await fetch("/user/profile");
      const data = await res.json();
      this.setState({ profile: data });
    }
    this.setState({ loaded: true });
  }

  handleClick = async (e) => {
    const res = await fetch(e.target.dataset.href, { method: "POST" });
    console.log(await res.json());
  }

  render() {
    if (this.state.loaded) {
      if (this.props.user) {
        console.log(this.state.profile);

        let characters = [];
        this.state.profile.wow_accounts.forEach((account) => {
          account.characters.forEach((character) => {

            // Just about every piece of data that's needed for 
            // any API request is here except for the user's token
            characters.push({
              name: character.name,
              id: character.id,
              realm: {
                name: character.realm.name,
                id: character.realm.id,
                slug: character.realm.slug,
              }
            });

          });
        })

        // Here's one easy way to create some JSX out of the characters array:
        const jsxCharacters = characters.map((character, i) => {
          return (
            <div key={i}>
              <p>{character.name}</p>
              <button
                data-href={
                  `/user/register?realmId=${character.realm.id}` +
                  `&characterId=${character.id}` +
                  `&realmName=${character.realm.name}` +
                  `&characterName=${character.name}`
                }
                onClick={this.handleClick}
              >
                Register
              </button>
            </div>
          );
        });

        return (
          <>
            <h3>Characters:</h3>
            {/* Then just place the JSX in the markup like so */}
            {jsxCharacters}
          </>
        );

      } else {
        return (
          <>
            <p>Landing</p>
          </>
        );

      }

    } else {
      return (
        <>
          <p>Loading...</p>
        </>
      );
    }

  }
}
