import React, { Component } from "react";
import { connect } from "react-redux";
import { getPeople, authenticated } from '../../ducks/reducer';

class Search extends Component {
  componentDidMount() {
    const { getPeople, user, history, authenticated } = this.props;
    if ( user === null ) {
      authenticated( history );
    } else {
      getPeople( user.id, 0 );
    }
  }

  componentWillReceiveProps( nextProps ) {
    const { getPeople, history } = this.props;
    if ( nextProps.user !== null && this.props.user === null ) {
      getPeople( nextProps.user.id, this.state.page );
    } else if ( nextProps.user !== null && this.props.user !== null ) {
      this.setState({ people: nextProps.people });
    }
  }

  constructor() {
    super();
    this.state = {
      searchBy: 'first',
      name: '',
      page: 0,
      people: []
    };

    this.updateState = this.updateState.bind( this );
  }

  updateState( prop, val ) {
    this.setState({ [prop]: val });
  }

  search() {

  }

  render() {
    console.log( 'STATE:', this.state );
    return (
      <div>
        <select value={ this.state.searchBy } onChange={ ( e ) => this.updateState( 'searchBy', e.target.value ) }>
          <option value="first"> First Name </option>
          <option value="last"> Last Name </option>
          <option value="full"> Full Name </option>
        </select>
        <input value={ this.state.name } onChange={ ( e ) => this.updateState( 'name', e.target.value ) } />
      </div>
    )
  }
}

export default connect( state => state, { getPeople, authenticated } )( Search );