import React from 'react';
import { useAuth } from './context/AuthContext';

export default function ProtectedRoute ({ children, requiredRole }) {
    const { userRole } = useAuth();
  
    return userRole === requiredRole ? children : <p>Access Denied</p>;
};

