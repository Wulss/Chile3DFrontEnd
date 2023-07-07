import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';

// Ruta protegida para el administrador
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return (
    isAuthenticated ? ( <AdminPage/> ) : ( <Navigate to={{ pathname: '/login'}} /> )

  );
};

export default ProtectedRoute;
