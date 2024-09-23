import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Adjust the import path as necessary

const SuperAdminDashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuth(); // Assuming `token` is available in `useAuth`
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);

    if (!isAuthenticated || user?.role !== 'superadmin') {
      console.log('Redirecting to login');
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.role !== 'superadmin') {
    return <div>Unauthorized access</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="menu-toggle">
          <span>&#9776;</span>
        </div>
        <div className="logo">Dashboard</div>
        <div className="user-actions">
          <a href="#" className="logout">Log Out</a>
          <span className="notification">&#128276;</span>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home / Dashboard</span>
      </div>

      {/* Main Dashboard Layout */}
      <div className="dashboard">
        {/* Top Action Buttons */}
        <div className="top-actions">
          <div className="action-card">
            <div className="icon create-account"></div>
            <a href="superadmin/accountadd">Create Account</a>
          </div>
          <div className="action-card">
            <div className="icon accounts"></div>
            <a href="/superadmin/account">Accounts</a>
          </div>
          <div className="action-card">
            <div className="icon logbook"></div>
            <a href="/superadmin/logbook">Logbook</a>
          </div>
        </div>

        {/* Grid Panels */}
        <div className="grid">
          {/* Admin Panel */}
          <div className="panel admin-panel">
            <div className="panel-header">
              <h3>Admin</h3>
              <input type="text" placeholder="Search..." className="search-box" />
            </div>
            <div className="panel-content">
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Admin data rows */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Data Controller Panel */}
          <div className="panel data-controller-panel">
            <div className="panel-header">
              <h3>Data Controller</h3>
              <input type="text" placeholder="Search..." className="search-box" />
            </div>
            <div className="panel-content">
              <table>
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Data controller rows */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Logbook Panel */}
          <div className="panel logbook-panel">
            <div className="panel-header">
              <h3>Logbook</h3>
              <input type="text" placeholder="Search..." className="search-box" />
            </div>
            <div className="panel-content">
              <table>
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>Date & Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Logbook rows */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Online Accounts Panel */}
          <div className="panel online-accounts-panel">
            <h3>Online Accounts</h3>
            <ul>
              {/* Online accounts rows */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;