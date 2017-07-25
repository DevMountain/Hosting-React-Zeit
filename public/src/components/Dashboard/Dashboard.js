import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  componentDidMount() {
    const { user, history } = this.props;

    if ( user === null ) {
      history.push('/login');
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
