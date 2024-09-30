import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create this file to style the navbar if needed

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/todo">TODO List</Link>
        </li>
        <li>
          <Link to="/finance">Financial Tracker</Link>
        </li>
        <li>
          <Link to="/weekplanner">Week Planner</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
