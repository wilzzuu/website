import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        const email = `${username}@website.local`;
        e.preventDefault();
        try {
        setError('');
        setLoading(true);
        await login(email, password);
        navigate('/login');
        } catch {
        setError('Failed to log in');
        }
        setLoading(false);
    }

    return (
        <div className='login-page-container'>
            {currentUser ? (
                <div className='login-page-card-loggedIn'>
                    <h1 className='login-page-header'>Welcome, {currentUser.email.split("@website.local")}!</h1>
                    <div className='login-page-home-btn'>
                        <button onClick={() => navigate('/')}>Go to Home Page</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className='login-page-header'>Log In</h2>
                    {error && <p>{error}</p>}
                    <div className='login-page-card-loggedOut'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input className='login-page-username-field' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div>
                                <input className='login-page-password-field' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className='login-page-login-btn-container'>
                                <button type="submit" disabled={loading}>Log In</button>
                            </div>
                            {/*<div className='login-page-password-reset'>
                                <a href="">Forgot Password?</a>
                            </div>*/}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}