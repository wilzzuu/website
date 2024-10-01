import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import './index.css';

import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';

import Navbar from './components/Navbar';
import Home from './pages/Home';
{/*import Register from './pages/Register';*/}
import Login from './pages/Login'
import Portfolio from './pages/Portfolio';
import AddProjectForm from './pages/AddProjectForm';
import ProjectPage from './pages/ProjectPage';
import TodoList from './pages/TodoList';
import FinancialTracker from './pages/FinancialTracker';
import WeekPlanner from './pages/WeekPlanner';
import CV from './pages/CV';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
)

function App() {
  return (
    <AuthProvider>
        <Router>
            <div>
                <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/*<Route path="/register" element={<Register />} />*/}
                        <Route path="/login" element={<Login />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/portfolio/:projectId" element={<ProjectPage />} />
                        <Route
                            path="/portfolio/addproject" 
                            element={
                                <PrivateRoute>
                                    <AddProjectForm/>
                                </PrivateRoute>
                            } 
                        />
                        <Route path="/CV" element={
                            <PrivateRoute>
                                <CV />
                            </PrivateRoute>
                            }
                        />
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
