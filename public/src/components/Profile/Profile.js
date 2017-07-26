import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticated } from '../../ducks/reducer';

import GPDD from '../../utils/GenerateProfileDropDowns';

class Profile extends Component {
  componentDidMount() {
    const { user, history, authenticated } = this.props;
    if ( user === null ) authenticated( history );
  }

  componentWillReceiveProps( { user } ) {
    if ( user !== null ) {
      user.birthday = "1997-03-26";
      for( var i in user ) {
        this.setState({ [i]: user[i] || "" });
      }

      if ( user.birthday ) {
        this.setState({ b_month: user.birthday.slice(5, 7) || "", 
                        b_day: user.birthday.slice(8, 11) || "", 
                        b_year: user.birthday.slice(0, 4) || ""
        });
      }
    }
  }

  constructor( props ) {
    super( props );
    this.state = {
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
  }

  updateProfile() {

  }

  cancel() {

  }

  updateState( prop, val ) {
    this.setState({ [prop]: val });
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
            <input value={ this.state.first } />
          </div>

          <div>
            Last Name: 
            <input value={ this.state.last } />
          </div>

          <div>
            Gender: 
            <select value={ this.state.gender }>
              <option disabled value=""> -- Select -- </option>
              <option> Male </option>
              <option> Female </option>
            </select>
          </div>

          <div>
            Hobby:
            <select value={ this.state.hobby }>
              <option disabled value=""> -- Select -- </option>
              <option> Hobby #1 </option>
              <option> Hobby #2 </option>
              <option> Hobby #3 </option>
              <option> Hobby #4 </option>
            </select>
          </div>

          <div>
            Hair Color:
            <select value={ this.state.h_color }>
              <option disabled value=""> -- Select -- </option>
              <option> Brown </option>
              <option> Blue </option>
              <option> Green </option>
              <option> Red </option>
              <option> Blonde </option>
              <option> White </option>
            </select>
          </div>

          <div>
            Eye Color:
            <select value={ this.state.e_color }>
              <option disabled value=""> -- Select -- </option>
              <option> Brown </option>
              <option> Blue </option>
              <option> Green </option>
            </select>
          </div>

          <div>
            Birthday Month ( MM ):
            <select value={ this.state.b_month }>
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
            <select value={ this.state.b_day }>
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
            <select value={ this.state.b_year }>
              <option value=""> -- Select -- </option>
              {
                years.map( year => (
                  <option key={ year } value={ year }> { year } </option>
                ))
              }
            </select>
          </div>

          <div>
            <button> Update </button>
            <button> Cancel </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect( state => state, { authenticated } )( Profile );