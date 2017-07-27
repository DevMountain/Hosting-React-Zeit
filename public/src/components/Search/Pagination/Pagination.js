import React from "react";

import { Link } from "react-router-dom";

import './Pagination.css';

export default function Pagination({ page }) {
  return (
    <Link to={ `/search/${page}` }>
      <div id="Pagination__container">
        { page }
      </div>
    </Link>
  )
}