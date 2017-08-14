import React, { Component } from "react";
import { authenticated } from '../../ducks/reducer';
import { connect } from "react-redux";

import api from "../../api";

class Login extends Component {
  componentDidMount() {
    const { authenticated, user, history } = this.props;
    if ( user === null ) {
      authenticated( history, '/' );
    } else if ( user !== null ) {
      history.push('/');
    }
  }

  render() {
    return (
      <div>
        This is a test {process.env.DOMAIN}
        <a href={ process.env.REACT_APP_LOGIN }>Login/Register { process.env.REACT_APP_LOGIN } { process.env.REACT_APP_LOGOUT }</a>
      </div>
    )
  }
}

export default connect( state => state, { authenticated } )( Login );
