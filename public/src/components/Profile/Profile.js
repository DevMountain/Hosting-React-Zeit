import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticated, patchUser } from '../../ducks/reducer';
import { Link } from "react-router-dom";

import GPDD from '../../utils/GenerateProfileDropDowns';

class Profile extends Component {
  formatPropsToState( user ) {
    if ( user !== null ) {
      for( var i in user ) {
        this.setState({ [i]: user[i] || "" });
      }

      if ( user.birthday ) {
        this.setState({ b_month: user.birthday.slice(5, 7) || "", 
                        b_day: user.birthday.slice(8, 10) || "", 
                        b_year: user.birthday.slice(0, 4) || ""
        });
      }
    }
  }

  componentDidMount() {
    const { user, history, authenticated } = this.props;
    if ( user === null ) authenticated( history );
    this.formatPropsToState( user );
  }

  componentWillReceiveProps( { user } ) {
    this.formatPropsToState( user );
  }

  constructor( props ) {
    super( props );
    this.state = {
      id: "",
      first: "",
      last: "",
      birthday: "",
      e_color: "",
      h_color: "",
      gender: "",
      hobby: "",
      b_month: "",
      b_day:  "", 
      b_year: ""
    };

    this.updateProfile = this.updateProfile.bind( this );
    this.cancel = this.cancel.bind( this );
    this.updateState = this.updateState.bind( this );
    this.formatPropsToState = this.formatPropsToState.bind( this );
  }

  updateProfile() {
    const { patchUser } = this.props;
    const { id, first, last, birthday, e_color, h_color, gender, hobby } = this.state;
    patchUser({ id, first, last, birthday, e_color, h_color, gender, hobby });
  }

  cancel() {
    const { user } = this.props;
    this.formatPropsToState( user );
  }

  updateState( prop, val ) {
    this.setState({ [prop]: val });

    if ( prop === "b_month" || prop === "b_day" || prop === "b_year" ) {
      const { b_month, b_day, b_year } = this.state;
      let temp = { b_month, b_day, b_year };
      temp[ prop ] = val;

      this.setState({ birthday: [ temp.b_year, temp.b_month, temp.b_day ].join('-') });
    }
  }

  render() {
    const months = GPDD.months;
    const days = GPDD.days;
    const years = GPDD.years;
    console.log('USER ON STATE', this.state );

    return (
      <div>
        <div>
          <div>
            First Name: 
            <input value={ this.state.first } onChange={ ( e ) => this.updateState( 'first', e.target.value ) } />
          </div>

          <div>
            Last Name: 
            <input value={ this.state.last } onChange={ ( e ) => this.updateState( 'last', e.target.value ) } />
          </div>

          <div>
            Gender: 
            <select value={ this.state.gender } onChange={ ( e ) => this.updateState( 'gender', e.target.value ) } >
              <option disabled value=""> -- Select -- </option>
              <option value="Male"> Male </option>
              <option value="Female"> Female </option>
            </select>
          </div>

          <div>
            Hobby:
            <select value={ this.state.hobby } onChange={ ( e ) => this.updateState( 'hobby', e.target.value ) } >
              <option disabled value=""> -- Select -- </option>
              <option value="Hobby #1"> Hobby #1 </option>
              <option value="Hobby #2"> Hobby #2 </option>
              <option value="Hobby #3"> Hobby #3 </option>
              <option value="Hobby #4"> Hobby #4 </option>
            </select>
          </div>

          <div>
            Hair Color:
            <select value={ this.state.h_color } onChange={ ( e ) => this.updateState( 'h_color', e.target.value ) } >
              <option disabled value=""> -- Select -- </option>
              <option value="Brown"> Brown </option>
              <option value="Red"> Blue </option>
              <option value="Green"> Green </option>
              <option value="Red"> Red </option>
              <option value="Blonde"> Blonde </option>
              <option value="White"> White </option>
            </select>
          </div>

          <div>
            Eye Color:
            <select value={ this.state.e_color } onChange={ ( e ) => this.updateState( 'e_color', e.target.value ) } >
              <option disabled value=""> -- Select -- </option>
              <option value="Brown"> Brown </option>
              <option value="Blue"> Blue </option>
              <option value="Green"> Green </option>
            </select>
          </div>

          <div>
            Birthday Month ( MM ):
            <select value={ this.state.b_month } onChange={ ( e ) => this.updateState( 'b_month', e.target.value ) } >
              <option disabled value=""> -- Select -- </option>
              {
                months.map( ( month, i ) => {
                  var value = i + 1;

                  if ( value < 10 ) {
                    value = '0' + value;
                  } else {
                    value = '' + value;
                  }

                  return (
                    <option key={ value } value={ value }> { month } </option>
                  )
                })
              }
            </select>
          </div>

          <div>
            Birthday Day ( DD ):
            <select value={ this.state.b_day } onChange={ ( e ) => this.updateState( 'b_day', e.target.value ) } >
              <option value=""> -- Select -- </option>
              {
                days.map( day => (
                  <option key={ day } value={ day }> { day } </option>
                ))
              }
            </select> 
          </div>

          <div>
            Birthday Year ( YYYY ):
            <select value={ this.state.b_year } onChange={ ( e ) => this.updateState( 'b_year', e.target.value ) } >
              <option value=""> -- Select -- </option>
              {
                years.map( year => (
                  <option key={ year } value={ year }> { year } </option>
                ))
              }
            </select>
          </div>

          <div>
            <button onClick={ this.updateProfile }> Update </button>
            <button onClick={ this.cancel }> Cancel </button>
            <Link to="/">
              <button> Back to Dashboard </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect( state => state, { authenticated, patchUser } )( Profile );