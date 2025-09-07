import React from 'react';
import { Navigate } from 'react-router-dom';

const isTokenValid = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now(); // Check expiry
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token || !isTokenValid(token)) {
    localStorage.removeItem('token'); // Clean up bad token
    return <Navigate to="/HomeOwnerLogin" replace />;
  }

  return children;
};

export default ProtectedRoute;
