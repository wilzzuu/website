import React from 'react';

const notificationStyle = {
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  padding: '10px 20px',
  backgroundColor: '#333',
  color: '#fff',
  borderRadius: '5px',
  zIndex: 1000,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
};

const Notification = ({ message }) => {
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
