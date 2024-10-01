import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      console.log("Current user: ", currentUser)
      await login(email, password);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  }

  return (
    <div>
        {currentUser ? (
            <div>
                <h1>Welcome, {currentUser.email}!</h1>
                <button onClick={() => navigate('/')}>Got to Home</button>
            </div>
        ) : (
            <div>
                <h2>Log In</h2>
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button type="submit" disabled={loading}>Log In</button>
                    </form>
            </div>
        )}
    </div>
  );
}
