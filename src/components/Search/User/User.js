import React from "react";

import './User.css';

export default function User({ person_id, user_id, first, last, picture, friended, add, remove }) {
  return (
    <div id="Search__user">
      <img className="user_image" src={ picture } alt="profile" />
      <p>{ first } { last }</p>
      {
        friended
        ?
          <button onClick={ () => remove( user_id, person_id ) }> Remove Friend </button>
        :
          <button onClick={ () => add( user_id, person_id) }> Add Friend </button>
      }
    </div>
  )
}
