import React, { Component } from "react";
import { connect } from "react-redux";
import { getPeople, authenticated, searchPeople, getFriends, addFriend, removeFriend } from '../../ducks/reducer';

import User from './User/User';
import Pagination from './Pagination/Pagination';

import './Search.css';

class Search extends Component {
  componentDidMount() {
    const { getPeople, user, history, authenticated, match, getFriends } = this.props;

    if ( user === null ) {
      authenticated( history );
    } else {
      console.log('USER FOUND:', user);
      getPeople( user.id, match.params.page );
      getFriends( user.id );
    }
  }

  componentWillReceiveProps( nextProps ) {
    const { getPeople, history, match, getFriends } = this.props;

    if ( nextProps.user !== null && this.props.user === null ) {
      getPeople( nextProps.user.id, match.params.page );
      getFriends( nextProps.user.id );
    } else if ( nextProps.user !== null && this.props.user !== null ) {
      if ( match.params.page !== nextProps.match.params.page ) {
        getPeople( nextProps.user.id, nextProps.match.params.page );
      }

      this.setState({ people: nextProps.people, pages: nextProps.pages, friends: nextProps.friends });
    }
  }

  constructor() {
    super();
    this.state = {
      searchBy: 'first',
      name: '',
      people: [],
      pages: [],
      friends: []
    };

    this.updateState = this.updateState.bind( this );
    this.search = this.search.bind( this );
    this.reset = this.reset.bind( this );
  }

  updateState( prop, val ) {
    this.setState({ [prop]: val });
  }

  search() {
    const { searchPeople } = this.props;
    const { searchBy, name } = this.state;

    searchPeople( searchBy, name );
  }

  reset() {
    const { getPeople, match, user } = this.props;
    this.setState({ searchBy: 'first', name: '' });
    getPeople( user.id, match.params.page );
  }

  render() {
    const { friends } = this.state;
    const { addFriend, removeFriend, user } = this.props;

    const UserComponents = this.state.people.map( person => (
      <User key={ person.id } 
            person_id={ person.id } 
            user_id={ user.id }
            picture={ person.picture } 
            first={ person.first } 
            last={ person.last } 
            friended={ friends.indexOf(person.id) !== -1 ? true : false }
            add={ addFriend }
            remove={ removeFriend } />
    ));

    const PaginationComponents = this.state.pages.map( page => (
      <Pagination key={ page } page={ page } />
    ));

    return (
      <div id="Search__container">
        <select value={ this.state.searchBy } onChange={ ( e ) => this.updateState( 'searchBy', e.target.value ) }>
          <option value="first"> First Name </option>
          <option value="last"> Last Name </option>
        </select>
        <input value={ this.state.name } onChange={ ( e ) => this.updateState( 'name', e.target.value ) } />
        <button onClick={ this.search }> Search </button>
        <button onClick={ this.reset }> Reset </button>
        <br />
        <br />
        <br />
        <div id="Search__users_container">
          {
            UserComponents
          }
        </div>
        <div id="Search__pagination_container">
          {
            PaginationComponents
          }
        </div>
      </div>
    )
  }
}

export default connect( state => state, { getPeople, authenticated, searchPeople, getFriends, addFriend, removeFriend } )( Search );