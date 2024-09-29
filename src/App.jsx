// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import FinancialTracker from './pages/FinancialTracker';
import WeekPlanner from './pages/WeekPlanner';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Include the navigation bar on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/finance" element={<FinancialTracker />} />
          <Route path="/weekplanner" element={<WeekPlanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
