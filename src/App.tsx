// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
import BusinessPermitRenew from './pages/client/businesspermitrenew';
import WorkPermit from './pages/client/workpermitpage';
import ViewWorkPermitApplication from './pages/client/viewworkpermitapplication';
import ViewBusinessApplication from './pages/client/viewbusinessapplication';
import ViewApplicationDetails from './pages/client/viewapplicationdetails';
import ViewApplicationDetailsBusiness from './pages/client/viewapplicationdetailsbusiness';

// SUPERADMIN PAGES
import SuperAdminLogin from './pages/superadmin/superadminLogin';
import SuperAdminDashboard from './pages/superadmin/superadminDashboard';
import SuperAdminEditUser from './pages/superadmin/superadminAccountEdit';
import SuperAdminAccount from './pages/superadmin/superadminAccounts';
import SuperAdminLogbook from './pages/superadmin/superadminLogbook';
import SuperadminAddUser from './pages/superadmin/superadminAccountAdd';

// DATA CONTROLLER PAGES
import DataControllerDashboard from './pages/datacontroller/DAdashboard';
import DataControllerBusinessAssessment from './pages/datacontroller/DABusinessAssessment';
import DataControllerForAssessment from './pages/datacontroller/DAforassessment';
import DataControllerForAssessmentBP from './pages/datacontroller/DAforassessmentBP';
import DataControllerForAssessmentWP from './pages/datacontroller/DAforassessmentWP';
import DataControllerForPayment from './pages/datacontroller/DAforpayment';
import DataControllerForPaymentWP from './pages/datacontroller/DAforpaymentWP';
import DataControllerForPaymentBP from './pages/datacontroller/DAforpaymentBP';
import DataControllerReleasedPermit from './pages/datacontroller/DAreleasedpermits';
import DataControllerReleasedPermitWP from './pages/datacontroller/DAreleasedpermitsWP';
import DataControllerReleasedPermitBP from './pages/datacontroller/DAreleasedpermitsBP';
import DataControllerReportandGraph from './pages/datacontroller/DAreportsngraph';
import DataControllerRetireBusiness from './pages/datacontroller/DAretirebusiness';
import DataControllerViewApplicationDetails from './pages/datacontroller/DAviewapplicationdetails';
import DataControllerViewBusinessApplicationDetails from './pages/datacontroller/DAviewbusinessapplicationdetails';
import DataControllerAccount from './pages/datacontroller/DAaccount';
import DataControllerEditBusinessNature from './pages/datacontroller/DAEditBusinessNature';

// ADMIN PAGES
import AdminDashboard from './pages/admin/Adashboard';
import AdminAccount from './pages/admin/Aaccount';
import AdminForAssessment from './pages/admin/Aforassessment';
import AdminForAssessmentBusinessPermit from './pages/admin/AforassessmentBP';
import AdminForAssessmentWP from './pages/admin/AforassessmentWP';
import AdminReleasedPermits from './pages/admin/Areleasedpermits';
import AdminReleasedPermitsWP from './pages/admin/AreleasedpermitsWP';
import AdminReleasedPermitsBP from './pages/admin/AreleasedpermitsBP';
import AdminReportsAndGraph from './pages/admin/Areportandgraph';
import AdminViewApplicationDetails from './pages/admin/Aviewapplicationdetails';

import Apptest from './pages/apptest';
const App: React.FC = () => {
  return (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/businesspermitpage" element={<BusinessPermit />} />
        <Route path="/businesspermitrenew/:id?" element={<BusinessPermitRenew />} />
        <Route path="/workpermitpage" element={<WorkPermit />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/viewbusinessapplication" element={<ViewBusinessApplication />} />
        <Route path="/viewworkpermitapplication" element={<ViewWorkPermitApplication />} />
        <Route path="/viewapplicationdetails/:id?" element={<ViewApplicationDetails />} />
        <Route path="/viewapplicationdetailsbusiness/:id?" element={<ViewApplicationDetailsBusiness />} />


        {/* Routes for Data Controller */}
        <Route path="/DAdashboard" element={<DataControllerDashboard />} />
        <Route path="/DAforassessment" element={<DataControllerForAssessment />} />
        <Route path="/DAforassessmentBP/:type?" element={<DataControllerForAssessmentBP />} />
        <Route path="/DAforassessmentWP/:type?" element={<DataControllerForAssessmentWP />} />
        <Route path="/DAforpayment" element={<DataControllerForPayment />} />
        <Route path="/DAforpaymentWP/:type?" element={<DataControllerForPaymentWP />} />
        <Route path="/DAforpaymentBP/:type?" element={<DataControllerForPaymentBP />} />
        <Route path="/DAreleasedpermits" element={<DataControllerReleasedPermit />} />
        <Route path="/DAreleasedpermitsWP/:type?" element={<DataControllerReleasedPermitWP />} />
        <Route path="/DAreleasedpermitsBP/:type?" element={<DataControllerReleasedPermitBP/>} />
        <Route path="/DAreportsngraph" element={<DataControllerReportandGraph />} />
        <Route path="/DAretirebusiness" element={<DataControllerRetireBusiness />} />
        <Route path="/DAviewapplicationdetails/:id?" element={<DataControllerViewApplicationDetails />} />
        <Route path="/DAviewbusinessapplicationdetails/:id?" element={<DataControllerViewBusinessApplicationDetails />} />
        <Route path="/DAaccount" element={<DataControllerAccount />} />
        <Route path="/DAEditBusinessNature/:id?" element={<DataControllerEditBusinessNature />} />
        <Route path="/DABusinessAssessment/:id?" element={<DataControllerBusinessAssessment />} />

        {/* Routes for Superadmin */}
  
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
          <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/superadmin/edituser/:id?" element={<SuperAdminEditUser />} />
          <Route path="/superadmin/accounts" element={<SuperAdminAccount />} />
          <Route path="/superadmin/logbooks" element={<SuperAdminLogbook />} />
          <Route path='/superadmin/accountadd' element={<SuperadminAddUser />} />

          {/* Routes for Admin */}
          <Route path="/Adashboard" element={<AdminDashboard />} />
          <Route path="/Aaccount" element={<AdminAccount />} />
          <Route path="/Aforassessment" element={<AdminForAssessment />} />
          <Route path="/AforassessmentBP/:type?" element={<AdminForAssessmentBusinessPermit />} />
          <Route path="/AforassessmentWP/:type?" element={<AdminForAssessmentWP />} />
          <Route path="/Areleasedpermits" element={<AdminReleasedPermits />} />
          <Route path="/AreleasedpermitsWP/:type?" element={<AdminReleasedPermitsWP />} /> 
          <Route path="/AreleasedpermitsBP/:type?" element={<AdminReleasedPermitsBP />} />
          <Route path="/Areportandgraph" element={<AdminReportsAndGraph />} />
          <Route path="/Aviewapplicationdetails" element={<AdminViewApplicationDetails />} />

          <Route path="/apptest" element={<Apptest />} />
      </Routes>
      </Suspense>
    </Router>
  );
};

export default App;