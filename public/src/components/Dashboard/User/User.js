import React, { Component } from "react";
import { connect } from "react-redux";

class User extends Component {
  render() {
    return (
      <div>
        User
      </div>
    )
  }
}

export default connect( state => state, {} )( User );