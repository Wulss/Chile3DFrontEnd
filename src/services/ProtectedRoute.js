import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return (
    isAuthenticated ? ( <AdminPage/> ) : ( <Navigate to={{ pathname: '/login'}} /> )

  );
  /* return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  ); */
};

export default ProtectedRoute;
