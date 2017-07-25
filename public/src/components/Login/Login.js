import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      test: null
    };
  }

  componentDidMount() {
    axios.get('/api/auth/login').then( response => {
      console.log( response );
      this.setState({ test: response.data });
    });
  }

  render() {
    return (
      <div>
        { this.state.test }
      </div>
    )
  }
}