import axios from "axios";
import api from "../api";

const initialState = {
  user: null
};

const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

export default ( state = initialState, action ) => {
  console.log('Action:', action);
  const { payload, type } = action;

  switch( type ) {
    case SET_USER:
      return Object.assign( {}, this.state, { user: payload } );
    
    case LOGOUT + '_FULFILLED': 
      return Object.assign( {}, this.state, { user: null } );

    default: return state;
  }
};

export function setUser( user ) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function logout( history ) {
  const promise = axios.post( api.logout ).then( response => history.push('/auth') );
  return {
    type: LOGOUT,
    payload: promise
  };
}