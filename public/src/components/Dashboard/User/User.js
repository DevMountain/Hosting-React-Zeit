import React from "react";
import { Link } from "react-router-dom";

export default function User( { logout, history, user } ) {
  return (
    <div>
      <Link to="/profile">
        <div>
          {
            user
            ?
              <span>User Icon Here | { user.first } { user.last }</span>
            :
              null
          }
        </div>
      </Link>

      <div onClick={ () => logout( history ) }>
        Logout
      </div>
    </div>
  )
}
