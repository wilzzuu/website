import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after logout
import { auth } from '../firebase/firebase'; // Import your Firebase configuration
import { signOut } from 'firebase/auth'; // Import signOut function from Firebase

const LogoutButton = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out successfully.');
        navigate('/login'); // Redirect to login page
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <button id="logoutButton"  onClick={handleLogout} style={styles.logoutButton}>
      Logout
    </button>
  );
};

// Optional inline styles for the button
const styles = {
  logoutButton: {
    padding: '6px 15px',
    backgroundColor: '#e06e6e',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
  },
};

export default LogoutButton;
