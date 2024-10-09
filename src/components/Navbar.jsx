import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import '../styles/Global.css';
import '../styles/Navbar.css';

function Navbar() {
  const { currentUser } = useAuth();
  return (
    <nav className="navigationBar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/todo">TODO List</Link></li>
        <li><Link to="/pomodoro">Pomodoro</Link></li>
        {currentUser ? (
            <>
                <li><Link to="/CV">CV</Link></li>
                <li><Link to="/finance">Financial Tracker</Link></li>
                <li><Link to="/weekplanner">Week Planner</Link></li>
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
