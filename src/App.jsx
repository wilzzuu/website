import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import TodoList from './pages/TodoList';
import FinancialTracker from './pages/FinancialTracker';
import WeekPlanner from './pages/WeekPlanner';

function App() {
  return (
    <AuthProvider>
        <Router>
            <div>
                <Navbar />
                    <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route
                        path="/todo"
                        element={
                            <PrivateRoute>
                                <TodoList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/finance"
                        element={
                            <PrivateRoute>
                                <FinancialTracker />
                                <AddTransactionForm />
                                <TransactionList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/weekplanner"
                        element={
                            <PrivateRoute>
                            <WeekPlanner />
                            </PrivateRoute>
                        }
                    />
                    </Routes>
            </div>
        </Router>
    </AuthProvider>
  );
}

export default App;
