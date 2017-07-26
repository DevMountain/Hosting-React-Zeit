import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticated } from '../../ducks/reducer';

import GPDD from '../../utils/GenerateProfileDropDowns';

class Profile extends Component {
  componentDidMount() {
    const { user, history, authenticated } = this.props;
    if ( user === null ) authenticated( history );
  }

  constructor() {
    super();
    this.state = {};

    this.updateProfile = this.updateProfile.bind( this );
    this.cancel = this.cancel.bind( this );
  }

  updateProfile() {

  }

  cancel() {

  }

  render() {
    const months = GPDD.months;
    const days = GPDD.days;
    const years = GPDD.years;

    return (
      <div>
        <div>
          <div>
            First Name: <input />
          </div>

          <div>
            Last Name: <input />
          </div>

          <div>
            Gender: 
            <select defaultValue="">
              <option disabled value=""> -- Select -- </option>
              <option> Male </option>
              <option> Female </option>
            </select>
          </div>

          <div>
            Hobby:
            <select defaultValue="">
              <option disabled value=""> -- Select -- </option>
              <option> Hobby #1 </option>
              <option> Hobby #2 </option>
              <option> Hobby #3 </option>
              <option> Hobby #4 </option>
            </select>
          </div>

          <div>
            Hair Color:
            <select defaultValue="">
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
            <select defaultValue="">
              <option disabled value=""> -- Select -- </option>
              <option> Brown </option>
              <option> Blue </option>
              <option> Green </option>
            </select>
          </div>

          <div>
            Birthday Month ( MM ):
            <select defaultValue="">
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
            <select defaultValue="">
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
            <select defaultValue="">
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