import React, { Component } from "react";

import './Recommended.css';

export default class Recommended extends Component {
  render() {
    const { logged_in_user, recommended_user, filter, add } = this.props;
    return (
      <div id="Recommended__user_container">
        <img src={ recommended_user.picture } width="100px" />
        <br />
        { recommended_user.first } { recommended_user.last }
        <br />
        <button onClick={ () => add( logged_in_user, filter, recommended_user.id ) }> Add Friend </button>
      </div>
    )
  }
}