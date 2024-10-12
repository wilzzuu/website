import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import toggleIcon from '../assets/layout-sidebar.svg';
import homeIcon from '../assets/home.svg';
import portfolioIcon from '../assets/portfolio.svg';
import cvIcon from '../assets/cv.svg';
import weekplannerIcon from '../assets/calendar.svg';
import financeIcon from '../assets/credit-card.svg';
import todoIcon from '../assets/clipboard.svg';
import pomodoroIcon from '../assets/clock.svg';
import notablesIcon from '../assets/notables.svg';

function Sidebar() {
  // State to track if the sidebar is collapsed or expanded
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle the sidebar's collapsed state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <nav className="sideBar">
        <button className="toggle-button" onClick={toggleSidebar}>
            <img src={toggleIcon} alt="Toggle Sidebar" />
        </button>
        <ul>
          <li id="homeLink">
            <Link to="/">
              <img src={homeIcon} alt="Home" />
              <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>Home</span>
            </Link>
          </li>
          <li id="portfolioLink">
            <Link to="/portfolio">
                <img src={portfolioIcon} alt="Portfolio" />
                <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>Portfolio</span>
            </Link>
          </li>
          <li id="cvLink">
            <Link to="/cv">
                <img src={cvIcon} alt="CV" />
                <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>CV</span>
            </Link>
          </li>
          <li id="pomodoroLink">
            <Link to="/pomodoro">
              <img src={pomodoroIcon} alt="Pomodoro" />
              <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>Pomodoro</span>
            </Link>
          </li>
          <li id="todoLink">
            <Link to="/todo">
              <img src={todoIcon} alt="Todo" />
              <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>TODO List</span>
            </Link>
          </li>
          <li id="weekplannerLink">
            <Link to="/weekplanner">
              <img src={weekplannerIcon} alt="Weekplanner" />
              <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>Week Planner</span>
            </Link>
          </li>
          <li id="financeLink">
            <Link to="/finance">
              <img src={financeIcon} alt="Finance" />
              <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>Financial Tracker</span>
            </Link>
          </li>
          <li id="notablesLink">
            <Link to="/notables">
                <img src={notablesIcon} alt="Notables" />
                <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>Notables</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;