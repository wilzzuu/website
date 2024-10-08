import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { PomodoroProvider } from './context/PomodoroContext';
import { TodoProvider } from './context/TodoContext';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';

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
import FinanceTracker from './pages/FinanceTracker';
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
                <TodoProvider>
                <Navbar />
                    <div>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            {/*<Route path="/register" element={<Register />} />*/}
                            <Route path="/login" element={<Login />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="/portfolio/:projectId" element={<ProjectPage />} />
                            <Route 
                                path="/portfolio/edit-project/:projectId"
                                element={
                                    <PrivateRoute>
                                        <EditProject />
                                    </PrivateRoute>
                                } 
                            />
                            <Route
                                path="/portfolio/addproject" 
                                element={
                                    <PrivateRoute>
                                        <AddProjectForm/>
                                    </PrivateRoute>
                                } 
                            />
                            <Route path="/cv"
                                element={
                                    <PrivateRoute>
                                        <CV />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/todo"
                                element={
                                    <TodoList />
                                }
                            />
                            <Route
                                path="/pomodoro"
                                element={
                                    <Pomodoro />
                                }
                            />
                            <Route
                                path="/finance"
                                element={
                                    <PrivateRoute>
                                        <FinanceTracker />
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
                    </TodoProvider>
                    </PomodoroProvider>
                </Router>
        </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
