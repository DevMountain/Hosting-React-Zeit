import React, { Component } from "react";
import axios from "axios";
import { authenticated } from '../../ducks/reducer';
import { connect } from "react-redux";

import api from "../../api";

class Login extends Component {
  componentDidMount() {
    const { authenticated, user, history } = this.props;
    if ( user === null ) authenticated( history, '/' );
  }

  render() {
    return (
      <div>
        <a href={ `http://localhost:3000${api.login}` }>Login/Register</a>
      </div>
    )
  }
}

export default connect( state => state, { authenticated } )( Login );
