// eslint-disable react-hooks/exhaustive-deps

import './index.scss';

import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
