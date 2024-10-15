// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

// MAIN PAGES
import Home from './pages/home'; 
import Signup from './pages/signup'; 
import Login from './pages/login'; 
import EmailVerification from './pages/emailverification';
import ForgotPassword from './pages/forgotpassword';

// CLIENT PAGES
import Dashboard from './pages/client/dashboard'; 
import Account from './pages/client/account'; 
import BusinessPermit from './pages/client/businesspermitpage';
import WorkPermit from './pages/client/workpermitpage';
import ViewBusinessApplication from './pages/client/viewbusinessapplication';
import ViewApplication from './pages/client/viewapplication';

// SUPERADMIN PAGES
import SuperAdminLogin from './pages/superadmin/superadminLogin';
import SuperAdminDashboard from './pages/superadmin/superadminDashboard';
import SuperAdminEditUser from './pages/superadmin/superadminAccountEdit';
import SuperAdminAccount from './pages/superadmin/superadminAccounts';
import SuperAdminLogbook from './pages/superadmin/superadminLogbook';
import SuperadminAddUser from './pages/superadmin/superadminAccountAdd';

// DATA CONTROLLER PAGES
import DataControllerDashboard from './pages/datacontroller/DAdashboard';

// SuperAdminLayout Component
const SuperAdminLayout: React.FC = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);
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
        <Route path="/viewbusinessapplication/" element={<ViewBusinessApplication />} />
        <Route path="/viewapplicationdetails/:id" element={<ViewApplicationDetails />} />
        <Route path="/viewapplicationdetails/" element={<ViewApplicationDetails />} />
        <Route path="/apptest" element={<AppTest />} />
        <Route path="/apptest2" element={<AppTest2 />} />
        <Route path="/DAdashboard" element={<DataControllerDashboard />} />
        {/* Add more routes as needed */}
        <Route element={<SuperAdminLayout />}>
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
          <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/superadmin/edituser/:id" element={<SuperAdminEditUser />} />
          <Route path="/superadmin/account" element={<SuperAdminAccount />} />
          <Route path="/superadmin/logbooks" element={<SuperAdminLogbook />} />
          <Route path="/superadmin/accountadd" element={<SuperadminAddUser />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;