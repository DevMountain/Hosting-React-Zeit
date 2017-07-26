import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, authenticated } from "../../ducks/reducer";

import User from './User/User';

class Dashboard extends Component {
  componentDidMount() {
    const { user, history, authenticated } = this.props;
    if ( user === null ) authenticated( history );
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

export default connect( state => state, { logout, authenticated } )( Dashboard );
