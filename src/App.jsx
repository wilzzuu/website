// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import FinancialTracker from './pages/FinancialTracker';
import WeekPlanner from './pages/WeekPlanner';
import Navbar from './components/Navbar';

// Initialize Netlify Identity
netlifyIdentity.init();

function PrivateRoute({ children }) {
    const user = netlifyIdentity.currentUser();
    return user ? children : <Navigate to="/" />;
  }
  
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    netlifyIdentity.on('login', () => setIsAuthenticated(true));
    netlifyIdentity.on('logout', () => setIsAuthenticated(false));
  }, []);

  return (
    <Router>
      <div>
        <Navbar /> {/* Include the navigation bar on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<PrivateRoute><TodoList /></PrivateRoute>} />
          <Route path="/finance" element={<PrivateRoute><FinancialTracker /></PrivateRoute>} />
          <Route path="/weekplanner" element={<PrivateRoute><WeekPlanner /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
