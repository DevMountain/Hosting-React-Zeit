import React from "react";

import './User.css';

export default function User({ first, last, picture }) {
  return (
    <div id="Search__user">
      <img src={ picture } />
      <p>{ first } { last }</p>
    </div>
  )
}