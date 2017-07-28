import axios from "axios";
import api from "../api";

const initialState = {
  user: null,
  people: [],
  peopleCount: null,
  pages: [],
  friends: [],
  recommended: []
};

const LOGOUT = "LOGOUT";
const AUTHENTICATED = "AUTHENTICATED";
const PATCH_USER = "PATCH_USER";
const GET_PEOPLE = "GET_PEOPLE";
const SEARCH_PEOPLE = "SEARCH_PEOPLE";
const GET_FRIENDS = "GET_FRIENDS";
const ADD_FRIEND = "ADD_FRIEND";
const REMOVE_FRIEND = "REMOVE_FRIEND";
const GET_RECOMMENDED = "GET_RECOMMENDED";
const ADD_RECOMMENDED = "ADD_RECOMMENDED";

export default ( state = initialState, action ) => {
  console.log('Action:', action);
  console.log('State', state);

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

    case SEARCH_PEOPLE + '_FULFILLED':
      console.log('Search completed:', payload);
      return Object.assign( {}, state, { people: payload.users, peopleCount: payload.count, pages: payload.availablePages });

    case GET_FRIENDS + '_FULFILLED':
      console.log('Found friends:', payload);
      return Object.assign( {}, state, { friends: payload });

    case ADD_FRIEND + '_FULFILLED':
      return Object.assign({}, state, { friends: payload });

    case REMOVE_FRIEND + '_FULFILLED':
      return Object.assign({}, state, { friends: payload });

    case GET_RECOMMENDED + '_FULFILLED':
      console.log('Got recommended people:', payload);
      return Object.assign( {}, state, { recommended: payload });

    case ADD_RECOMMENDED + '_FULFILLED':
      console.log('Got recommended people:', payload);
      return Object.assign( {}, state, { recommended: payload });

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

export function searchPeople( filter, name ) {
  const promise = axios.get( `${api.searchUsers}?filter=${filter}&name=${name}` ).then( response => response.data );

  return {
    type: SEARCH_PEOPLE,
    payload: promise
  };
}

export function getFriends( id ) {
  const promise = axios.get( `${api.friendList}?id=${id}` ).then( response => response.data );

  return {
    type: GET_FRIENDS,
    payload: promise
  };
}

export function addFriend( user_id, friend_id ) {
  const promise = axios.post( api.addFriend, { user_id, friend_id } ).then( response => response.data );

  return {
    type: ADD_FRIEND,
    payload: promise
  };
}

export function removeFriend( user_id, friend_id ) {
  const promise = axios.post( api.removeFriend, { user_id, friend_id } ).then( response => response.data );

  return {
    type: REMOVE_FRIEND,
    payload: promise
  };
}

export function getRecommended( user, filter ) {
  const promise = axios.post( api.recommended, { user, filter } ).then( response => response.data );

  return {
    type: GET_RECOMMENDED,
    payload: promise
  };
}

export function addRecommended( user, filter, friend_id ) {
  const promise = axios.post( api.addRecommended, { user, filter, friend_id } ).then( response => response.data );

  return { 
    type: ADD_RECOMMENDED,
    payload: promise
  };
}