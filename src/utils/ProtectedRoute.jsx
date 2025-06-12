// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/Firebase';

const ProtectedRoute = () => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
