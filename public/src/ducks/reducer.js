import axios from "axios";
import api from "../api";

const initialState = {
  user: null,
  people: [],
  peopleCount: null,
  pages: []
};

const LOGOUT = "LOGOUT";
const AUTHENTICATED = "AUTHENTICATED";
const PATCH_USER = "PATCH_USER";
const GET_PEOPLE = "GET_PEOPLE";

export default ( state = initialState, action ) => {
  // console.log('Action:', action);
  // console.log('State', state);

  const { payload, type } = action;

  switch( type ) {
    case LOGOUT + '_FULFILLED': 
      return Object.assign( {}, state, { user: null } );

    case AUTHENTICATED + '_FULFILLED':
      console.log('USER AUTHENTICATED:', payload);
      return Object.assign( {}, state, { user: payload } );

    case PATCH_USER + '_FULFILLED':
      return Object.assign( {}, state, { user: payload } );

    case GET_PEOPLE + '_FULFILLED':
      console.log('Found people:', payload);
      return Object.assign( {}, state, { people: payload.users, peopleCount: payload.count, pages: payload.availablePages });

    default: return state;
  }
};

export function logout() {
  const promise = axios.post( api.logout ).then( () => null );

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

export function patchUser( obj ) {
  const promise = axios.post( `${api.patchUser}/${obj.id}`, obj ).then( response => response.data );

  return {
    type: PATCH_USER,
    payload: promise
  };
}

export function getPeople( id, page ) {
  const promise = axios.get( `${api.userList}?page=${page}&id=${id}` ).then( response => response.data );

  return {
    type: GET_PEOPLE,
    payload: promise
  };
}