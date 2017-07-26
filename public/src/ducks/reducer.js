import axios from "axios";
import api from "../api";

const initialState = {
  user: null
};

const LOGOUT = "LOGOUT";
const AUTHENTICATED = "AUTHENTICATED";

export default ( state = initialState, action ) => {
  console.log('Action:', action);
  console.log('State', state);

  const { payload, type } = action;

  switch( type ) {
    case LOGOUT + '_FULFILLED': 
      return Object.assign( {}, this.state, { user: null } );

    case AUTHENTICATED + '_FULFILLED':
      console.log('Inside AUTHENTICATED:', payload );
      return Object.assign( {}, this.state, { user: payload } );

    default: return state;
  }
};

export function logout( history ) {
  const promise = axios.post( api.logout ).then( () => history.push('/auth') );

  return {
    type: LOGOUT,
    payload: promise
  };
}

export function authenticated( history, optionalSuccessRedirect ) {
  const promise = axios.get( api.authenticated ).then( response => {
    if ( !response.data ) {
      history.push('/auth');
    } else if ( optionalSuccessRedirect ) {
      history.push( optionalSuccessRedirect );
    }
    
    return response.data || null;
  });

  return {
    type: AUTHENTICATED,
    payload: promise
  };
}