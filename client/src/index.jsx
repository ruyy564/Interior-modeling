import './styles/styles.css';
import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container); 

const App = () => (
  <div>Hello</div>
);

root.render(<App tab="home" />);
