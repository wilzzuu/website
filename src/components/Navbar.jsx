import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles.css';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

function Navbar() {
  const { currentUser } = useAuth();
  return (
    <nav>
      <ul>
        <li id="homeLink"><Link to="/">Home</Link></li>
        <li id="portfolioLink"><Link to="/portfolio">Portfolio</Link></li>
        {currentUser ? (
            <>
                <li id="todoLink"><Link to="/todo">TODO List</Link></li>
                <li id="financeLink"><Link to="/finance">Financial Tracker</Link></li>
                <li id="weekplannerLink"><Link to="/weekplanner">Week Planner</Link></li>
                <LogoutButton />
            </>
        ) : (
            <LoginButton />
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
