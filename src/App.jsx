/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './context/UserContext';
import { UserProvider } from './context/UserContext';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <Outlet />;
};

// Main App Component
function App() {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
}

export default App;