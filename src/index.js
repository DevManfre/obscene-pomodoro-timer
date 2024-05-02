import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PomodoroTimer from './components/PomodoroTimer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PomodoroTimer />
  </React.StrictMode>
);