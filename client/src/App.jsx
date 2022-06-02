import React from 'react';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

export default function App() {
  const { token, login, logout, userId, role } = useAuth();
  console.log('ad-role', role);
  const isAuthenticated = !!token;
  const isAdmin = role === 'ADMIN';
  const routes = useRoutes(isAuthenticated, isAdmin);

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated, isAdmin }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContext.Provider>
  );
}
