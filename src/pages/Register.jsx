import React, { useState } from 'react';
import { auth } from '../firebase/firebase'; // Import Firebase auth instance
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use for navigation after registration

  async function handleRegister(e) {
    const email = `${username}@website.local`;
    e.preventDefault();
    try {
      // Create a new user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to the home page after registration
    } catch (err) {
      console.error('Error registering user: ', err);
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
