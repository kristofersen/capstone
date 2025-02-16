import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../Styles/ClientSidebarStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

interface ClientSidebarProps {
  handleLogout: (event: React.MouseEvent) => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ handleLogout }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helper function to determine if the current link is active
  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar Container */}
      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar">
          <div className="sidebar-logo">
            <img src="/obpwlslogo.svg" alt="Logo" className="logo-image" />
          </div>
          <ul className="sidebar-list">
            <li>
              <a
                href="/dashboard"
                className={isActive('/dashboard') ? 'sidebar-linkactive' : 'sidebar-link'}
              >
                <img src="/dashboardlogo.svg" alt="Logo" className="sidebarlogoimage" />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/workpermitpage"
                className={isActive('/workpermitpage') ? 'sidebar-linkactive' : 'sidebar-link'}
              >
                <img src="/applicationslogo.svg" alt="Logo" className="sidebarlogoimage" />
                Work Permit
              </a>
            </li>
            <li>
              <a
                href="/businesspermitpage"
                className={isActive('/businesspermitpage') ? 'sidebar-linkactive' : 'sidebar-link'}
              >
                <img src="/applicationslogo.svg" alt="Logo" className="sidebarlogoimage" />
                Business Permit
              </a>
            </li>
            <li>
              <a
                href="/viewworkpermitapplication"
                className={isActive('/viewworkpermitapplication') ? 'sidebar-linkactive' : 'sidebar-link'}
              >
                <img src="/viewspecificapplicationlogo.svg" alt="Logo" className="sidebarlogoimage" />
                View WP Applications
              </a>
            </li>
            <li>
              <a
                href="/viewbusinessapplication"
                className={isActive('/viewbusinessapplication') ? 'sidebar-linkactive' : 'sidebar-link'}
              >
                <img src="/viewspecificapplicationlogo.svg" alt="Logo" className="sidebarlogoimage" />
                View BP Applications
              </a>
            </li>
            <li>
              <a
                href="/account"
                className={isActive('/account') ? 'sidebar-linkactive' : 'sidebar-link'}
              >
                <img src="/accountlogo.svg" alt="Logo" className="sidebarlogoimage" />
                Account
              </a>
            </li>
            <li>
              <a onClick={handleLogout} className="sidebar-link">
                <img src="/logoutlogo.svg" alt="Logo" className="sidebarlogoimage" />
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ClientSidebar;
