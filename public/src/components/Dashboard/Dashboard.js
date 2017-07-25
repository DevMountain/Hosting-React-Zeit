import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  componentDidMount() {
    const { user, history } = this.props;

    console.log('user:', user);
    if ( user === null ) {
      history.push('/auth');
    }
  }

  render() {
    return (
      <div>
        Dashboard
      </div>
    )
  }
}

export default connect( state => state, {} )( Dashboard );
