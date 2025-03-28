import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const userUID = localStorage.getItem('userUID'); // Get UID from local storage

  return userUID ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
