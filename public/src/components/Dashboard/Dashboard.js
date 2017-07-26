import React, { Component } from "react";
import axios from "axios";
import api from '../../api';
import { connect } from "react-redux";
import { setUser, logout } from "../../ducks/reducer";

import User from './User/User';

class Dashboard extends Component {
  componentDidMount() {
    const { user, history } = this.props;

    if ( user === null ) {
      axios.get( api.authenticated ).then( response => {
        if ( response.data ) {
          // User is authenticated
          console.log('User:', response.data);
          setUser( response.data );
        } else {
          // User is not authenticated
          history.push('/auth');
        }
      });
    }
  }

  render() {
    const { logout, history } = this.props;
    return (
      <div >
        Dashboard
        <User logout={ logout } history={ history } />
      </div>
    )
  }
}

export default connect( state => state, { setUser, logout } )( Dashboard );
