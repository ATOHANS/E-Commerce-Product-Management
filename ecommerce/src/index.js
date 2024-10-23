import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AdminPage from './AdminPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/App" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
