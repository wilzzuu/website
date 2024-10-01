import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after logout

const AddProjectButton = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  const handleNavigation = () => {
    navigate('/portfolio/addproject')
  }

  return (
    <button id="addProjectButton" onClick={handleNavigation} style={styles.addProjectButton}>
      Add Project
    </button>
  );
};

// Optional inline styles for the button
const styles = {
  logoutButton: {
    padding: '6px 10px',
    backgroundColor: '#8ce06e',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
    
  },
};

export default AddProjectButton;
