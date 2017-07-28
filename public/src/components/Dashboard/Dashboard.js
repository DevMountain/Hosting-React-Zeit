import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, authenticated } from "../../ducks/reducer";
import { Link } from "react-router-dom";

import User from './User/User';

class Dashboard extends Component {
  componentDidMount() {
    const { user, history, authenticated } = this.props;
    if ( user === null ) authenticated( history );
  }

  componentWillReceiveProps( nextProps ) {
    const { history } = this.props;
    if ( nextProps.user === null && this.props.user !== null ) {
      history.push('/auth');
    }
  }

  render() {
    const { logout, history, user } = this.props;
    return (
      <div >
        Dashboard
        <User logout={ logout } history={ history } user={ user } />
        <Link to="/search/0">
          Search for new friends
        </Link>
      </div>
    )
  }
}

export default connect( state => state, { logout, authenticated } )( Dashboard );
