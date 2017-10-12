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
        <a href={ process.env.REACT_APP_LOGIN }>Login/Register</a>
        <p>
          With create-react-app applications, we can pull in enviromnet variables from a .env file so long as they start with REACT_APP_  .  So in this build our REACT_APP_LOGIN is - { process.env.REACT_APP_LOGIN } -
        </p>
        <p>
          But other .env variables are not avaialbe to us. This is an attempt to make sure we do not accidently send out enviromnet variables we should be keeping secret.  So if we try to get say our SECRET for Auth0.  -  { process.env.SECRET } - we see that React does not give it to us.
        </p>
      </div>
    )
  }
}

export default connect( state => state, { authenticated } )( Login );
