import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ShowProjectPage from './pages/ShowProjectPage';
import AdminPanelPage from './pages/AdminPanelPage';
import AuthPage from './pages/AuthPage';

export const useRoutes = (isAuthenticated, isAdmin) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/create" element={<CreateProjectPage />} />
        <Route path="/open/:id" element={<ShowProjectPage />} />
        <Route path="/show" element={<ShowProjectPage />} />
        {isAdmin && <Route path="/admin" element={<AdminPanelPage />} />}
        <Route path="*" element={<CreateProjectPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};
