import React from "react";
import { Link } from "react-router-dom";

export default function User( { logout, history } ) {
  return (
    <div>
      <Link to="/profile">
        <div>
          User Icon Here | User Name Here
        </div>
      </Link>

      <div onClick={ () => logout( history ) }>
        Logout
      </div>
    </div>
  )
}
