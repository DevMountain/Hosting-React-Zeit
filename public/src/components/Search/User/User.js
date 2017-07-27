import React from "react";

import './User.css';

export default function User({ id, first, last, picture, friended }) {
  return (
    <div id="Search__user">
      <img src={ picture } />
      <p>{ first } { last }</p>
      {
        friended
        ?
          <button> Remove Friend </button>
        :
          <button> Add Friend </button>
      }
    </div>
  )
}