import React, { Component } from "react";
import axios from "axios";
import { setUser } from '../../ducks/reducer';
import { connect } from "react-redux";

import api from "../../api";

class Login extends Component {
  componentDidMount() {
    const { setUser, user, history } = this.props;

    if ( user !== null ) {
      history.push('/');
    } else {
      axios.get( api.authenticated ).then( response => {
        if ( response.data ) {
          // User is authenticated
          setUser( response.data );
          history.push('/');
        }
      });
    }
  }

  render() {
    return (
      <div>
        <a href={ `http://localhost:3000${api.login}` }>Login/Register</a>
      </div>
    )
  }
}

export default connect( state => state, { setUser } )( Login );
