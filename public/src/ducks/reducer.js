const initialState = {
  user: null
};

const SET_USER = "SET_USER";

export default ( state = initialState, action ) => {
  const { payload, type } = action;

  switch( type ) {
    case SET_USER:
      return Object.assign( {}, this.state, { user: payload } );

    default: return state;
  }
};

export function setUser( user ) {
  return {
    type: SET_USER,
    payload: user
  };
}