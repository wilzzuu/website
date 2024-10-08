import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { PomodoroProvider } from './context/PomodoroContext';
import PrivateRoute from './PrivateRoute';

import AddTransactionForm from './components/AddTransactionForm';
import Navbar from './components/Navbar';
import Home from './pages/Home';
{/*import Register from './pages/Register';*/}
import Login from './pages/Login'
import Portfolio from './pages/Portfolio';
import AddProjectForm from './components/AddProjectForm';
import EditProject from './components/EditProject';
import ProjectPage from './pages/ProjectPage';
import TodoList from './pages/Todo';
import Pomodoro from './pages/Pomodoro';
import FinancialTracker from './pages/FinancialTracker';
import WeekPlanner from './pages/WeekPlanner';
import CV from './pages/CV';

import './index.css';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <AuthProvider>
                <App />
            </AuthProvider>
        </React.StrictMode>
    </QueryClientProvider>
)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
                <Router>
                <PomodoroProvider>
                    <div>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            {/*<Route path="/register" element={<Register />} />*/}
                            <Route path="/login" element={<Login />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="/portfolio/:projectId" element={<ProjectPage />} />
                            <Route path="/edit-project/:projectId" element={<EditProject />} />
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
                                path="/pomodoro"
                                element={
                                    <PrivateRoute>
                                        <Pomodoro />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/finance"
                                element={
                                    <PrivateRoute>
                                        <FinancialTracker />
                                        <AddTransactionForm />
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
                    </PomodoroProvider>
                </Router>
        </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
