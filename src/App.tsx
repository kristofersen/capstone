// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home'; 
import Login from './pages/login'; 
import Signup from './pages/signup'; 
import Dashboard from './pages/dashboard'; 
import Account from './pages/account'; 
import BusinessPermit from './pages/businesspermitpage';
import WorkPermit from './pages/workpermitpage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/businesspermitpage" element={<BusinessPermit />} />
        <Route path="/workpermitpage" element={<WorkPermit />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
