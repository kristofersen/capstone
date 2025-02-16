import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../Styles/AdminSideBarStyles.css';



const DASidebar: React.FC = () => {
const location = useLocation();
 const navigate = useNavigate();
  // Helper function to determine if the current link is active
const isActive = (path: string) => location.pathname === path;

const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
  
      if (response.ok) {
        // Clear any local storage data (if applicable)
        localStorage.removeItem('profile');
        localStorage.removeItem('userId');
  
        // Redirect to the login page
        navigate('/');
      } else {
        // Handle any errors from the server
        const errorData = await response.json();
        console.error('Logout error:', errorData.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
return (
    <div className="Asidebar">
    <div className="Asidebar-logo">
        <img src="/obpwlsDAlogo.svg" alt="Logo" className="Alogo-image" />
    </div>
    <ul className="Asidebar-list">
        <li>
        <a href="/Adashboard" className={isActive('/Adashboard') ? "Asidebar-linkactive" : "Asidebar-link"}>
            <img src="/dashboardlogo.svg" alt="Dashboard Icon" className="sidebarlogoimage" />Dashboard
        </a>
        </li>
        <li>
        <a href="/Aforassessment" className={isActive('/Aforassessment') ? "Asidebar-linkactive" : "Asidebar-link"}>
            <img src="/DAforassessmentlogo.svg" alt="Assessment Icon" className="sidebarlogoimage" />For Assessment
        </a>
        </li>
        <li>
        <a href="/Areleasedpermits" className={isActive('/Areleasedpermits') ? "Asidebar-linkactive" : "Asidebar-link"}>
            <img src="/releasedpermitlogo.svg" alt="Released Permits Icon" className="sidebarlogoimage" />Released Permits
        </a>
        </li>
        <li>
        <a href="/Areportandgraph" className={isActive('/Areportandgraph') ? "Asidebar-linkactive" : "Asidebar-link"}>
            <img src="/reportsngraphlogo.svg" alt="Reports/Graphs Icon" className="sidebarlogoimage" />Reports/Graphs
        </a>
        </li>
        <li>
            <a href="/Aaccount" className="Asidebar-link">
            <img src="/accountlogo.svg" alt="Logo" className="sidebarlogoimage" />Account
            </a>
            </li>
        <li>
        <a href="/" onClick={handleLogout} className="Asidebar-link">
            <img src="/logoutlogo.svg" alt="Logout Icon" className="sidebarlogoimage" />Log Out
        </a>
        </li>
    </ul>
    </div>
);
};

export default DASidebar;
