import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LibraryPage from './pages/LibraryPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ShowProjectPage from './pages/ShowProjectPage';
import AdminPanelPage from './pages/AdminPanelPage';
import AuthPage from './pages/AuthPage';

export const useRoutes = (isAuthenticated, isAdmin) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/create:id" element={<CreateProjectPage />} />
        <Route path="/create" element={<CreateProjectPage />} />
        <Route path="/show:id" element={<ShowProjectPage />} />
        {isAdmin ? (
          <>
            <Route path="/main" element={<AdminPanelPage />} />
            <Route path="*" element={<AdminPanelPage />} />
          </>
        ) : (
          <>
            <Route path="/main" element={<MainPage />} />
            <Route path="*" element={<MainPage />} />
          </>
        )}
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
