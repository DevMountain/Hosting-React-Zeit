import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, authenticated, getRecommended, addRecommended } from "../../ducks/reducer";
import { Link } from "react-router-dom";

import User from './User/User';
import Recommended from './Recommended/Recommended';

import './Dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    const { user, history, authenticated } = this.props;
    if ( user === null ) authenticated( history );
  }

  componentWillReceiveProps( nextProps ) {
    const { history, getRecommended } = this.props;
    if ( nextProps.user === null && this.props.user !== null ) {
      history.push('/auth');
    }

    if ( nextProps.user !== null && this.props.user === null ) {
      getRecommended( nextProps.user, this.state.filter );
    }
  }

  constructor() {
    super();
    this.state = {
      filter: 'first'
    };

    this.updateFilter = this.updateFilter.bind( this );
  }

  updateFilter( filter ) {
    this.setState({ filter });
    const { user, getRecommended } = this.props;

    getRecommended( user, filter );
  }

  render() {
    const { logout, history, user, addRecommended } = this.props;
    const { filter } = this.state; 

    return (
      <div >
        Dashboard
        <User logout={ logout } history={ history } user={ user } />
        <Link to="/search/0">
          Search for new friends
        </Link>
        <br />
        <br />

        <span> Recommended users for same: </span>
        <select value={ filter } onChange={ ( e ) => this.updateFilter( e.target.value ) }>
          <option value="first"> First Name </option>
          <option value="last"> Last Name </option>
          <option value="gender"> Gender </option>
          <option value="hobby"> Hobby </option>
          <option value="h_color"> Hair Color </option>
          <option value="e_color"> Eye Color </option>
          <option value="birthday"> Birthday </option>
        </select>

        {
          this.props.recommended.length > 0 
          ?
            <div id="Dashboard__recommended_container">
             {
                this.props.recommended.map( user => (
                  <Recommended key={ user.id } logged_in_user={ this.props.user } recommended_user={ user } add={ addRecommended } filter={ filter } />
                ))
             }
            </div>
          :
            <p> No recommendations </p>
        }
      </div>
    )
  }
}

export default connect( state => state, { logout, authenticated, getRecommended, addRecommended } )( Dashboard );
