import React, { Component } from "react";
import { connect } from "react-redux";

class Search extends Component {
  render() {
    return (
      <div>
        Search
      </div>
    )
  }
}

export default connect( state => state, {} )( Search );