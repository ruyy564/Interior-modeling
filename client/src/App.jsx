import React from 'react';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  const routes = useRoutes(true);

  return <BrowserRouter>{routes}</BrowserRouter>;
}
