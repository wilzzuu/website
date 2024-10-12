/* REACT */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

/* CONTEXT */
import { AuthProvider } from './context/AuthContext';
import { PomodoroProvider } from './context/PomodoroContext';
import { TodoProvider } from './context/TodoContext';

/* COMPONENTS */

import Sidebar from './components/sidebar';
import AddProjectForm from './components/AddProjectForm';
import EditProject from './components/EditProject';


/* PAGES */
import Home from './pages/Home';
{/*import Register from './pages/Register';*/}
import Login from './pages/Login'
import Portfolio from './pages/Portfolio';
import ProjectPage from './pages/ProjectPage';
import TodoList from './pages/Todo';
import Pomodoro from './pages/Pomodoro';
import FinanceTracker from './pages/FinanceTracker';
import WeekPlanner from './pages/WeekPlanner';
import Calendar from './pages/Calendar';
import CV from './pages/CV';
import Notables from './pages/Notables';

/* OTHER */
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';
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
                <Sidebar />
                    <div>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            {/*<Route path="/register" element={<Register />} />*/}
                            <Route path="/login" element={<Login />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="/portfolio/:projectId" element={<ProjectPage />} />
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
                            <Route 
                                path="/cv"
                                element={
                                    <PrivateRoute>
                                        <CV />
                                    </PrivateRoute>
                                }
                            />
                            <Route 
                                path="/calendar"
                                element={
                                    <PrivateRoute>
                                        <Calendar />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/notables"
                                element={
                                    <PrivateRoute>
                                        <Notables />
                                    </PrivateRoute>
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
