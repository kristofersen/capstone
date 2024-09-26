// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home'; 
import Login from './pages/login'; 
import Signup from './pages/signup'; 
import Dashboard from './pages/client/dashboard'; 
import Account from './pages/client/account'; 
import BusinessPermit from './pages/client/businesspermitpage';
import WorkPermit from './pages/client/workpermitpage';
import EmailVerification from './pages/emailverification';
import ForgotPassword from './pages/forgotpassword';
import ViewApplication from './pages/client/viewapplication';
import ViewApplicationDetails from './pages/client/viewapplicationdetails';
import AppTest from './pages/apptest';
import AppTest2 from './pages/apptest2';

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
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/viewapplication" element={<ViewApplication />} />
        <Route path="/viewapplicationdetails/:id" element={<ViewApplicationDetails />} />
        <Route path="/viewapplicationdetails/" element={<ViewApplicationDetails />} />
        <Route path="/apptest" element={<AppTest />} />
        <Route path="/apptest2" element={<AppTest2 />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
