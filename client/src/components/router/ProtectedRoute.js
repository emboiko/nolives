import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

export default class ProtectedRoute extends Component {
  render() {
    const Component = this.props.render;
    if (!this.props.user) {
      return (
        <Redirect to="/" />
      );
    } else {
      return (
        <Route {...this.props} render={
          routeProps => <Component {...this.props} {...routeProps} />
        } />
      );
    }
  }
}
