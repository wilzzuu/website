import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

function Navbar() {
  const { currentUser } = useAuth();
  return (
    <nav className="navigationBar">
      <ul>
        <li id="homeLink"><Link to="/">Home</Link></li>
        <li id="portfolioLink"><Link to="/portfolio">Portfolio</Link></li>
        {currentUser ? (
            <>
                <li id="cvLink"><Link to="/CV">CV</Link></li>
                <li id="todoLink"><Link to="/todo">TODO List</Link></li>
                <li id="financeLink"><Link to="/finance">Financial Tracker</Link></li>
                <li id="weekplannerLink"><Link to="/weekplanner">Week Planner</Link></li>
                <p id="loggedInText">Logged in as: {currentUser.email.split("@website.local")}</p>
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
