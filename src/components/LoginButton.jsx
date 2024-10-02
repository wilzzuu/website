import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after logout

const LoginButton = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  const handleNavigation = () => {
    navigate('/login')
  }

  return (
    <button id="loginButton" onClick={handleNavigation} style={styles.logoutButton}>
      Login
    </button>
  );
};

// Optional inline styles for the button
const styles = {
  logoutButton: {
    padding: '6px 15px',
    backgroundColor: '#8ce06e',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
  },
};

export default LoginButton;
