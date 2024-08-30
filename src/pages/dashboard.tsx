import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; // Import your CSS file

const Dashboard: React.FC = () => {
  const [userDetails, setUserDetails] = useState<{ email: string; firstName: string; lastName: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/'); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserDetails(data.user);
          setError(null);
        } else {
          setError(data.error || 'Error fetching user details.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details, please try again.');
      }
    };
    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Redirect to home page
  };

  return (
    <section className="dashboard-container">
      <div className="sidebar-container">
        <div className="sidebar">
          <div className="sidebar-logo">
            <img src="/obpwlslogo.svg" alt="Logo" className="logo-image" />
          </div>
          <ul className="sidebar-list">
            <li><a href="/dashboard" className="sidebar-linkactive" >Dashboard</a></li>
            <li><a href="/apply-work-permit" className="sidebar-link">Apply for Work Permit</a></li>
            <li><a href="/apply-business-permit" className="sidebar-link">Apply for Business Permit</a></li>
            <li><a href="/view-applications" className="sidebar-link">View Applications</a></li>
            <li><a href="/" onClick={handleLogout} className="sidebar-link">Log Out</a></li>
          </ul>
        </div>
      </div>

      <div className="content">
        <header>
          <h1>Online Business and Work Permit Licensing System</h1>
          <nav>
            <ul>
              <li><a href="/account" className="button">Account</a></li>
              <li><a href="/" onClick={handleLogout} className="button">Logout</a></li>
            </ul>
          </nav>
        </header>

        {error && <p className="error">{error}</p>}
        {userDetails ? (
          <div className="user-details">
            <h2>Welcome, {userDetails.firstName} {userDetails.lastName}!</h2>
            {/* Display other user details as needed */}
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
            <div className="applicationcontainer">
                <div>
                    <a href="/#" className='businesspermitbutton'> Apply for Business Permit</a>
                </div>
                <div>
                    <a href="/#" className='workpermitbutton'> Apply for Work Permit</a>
                </div>
            </div>
            <div className='businesspermittable'>
                <p>Released Business Permit Applications</p>
            <table className="permit-table">
    <thead>
      <tr>
        <th>Action</th>
        <th>Active</th>
        <th>Transaction</th>
        <th>ID No.</th>
        <th>Date Issued</th>
        <th>Expiry Date</th>
      </tr>
    </thead>
    <tbody>
      {/* Sample data rows (Replace with dynamic data as needed) */}
      <tr>
        <td><button className="table-button">View</button></td>
        <td>Expired</td>
        <td>Business Permit Renewal</td>
        <td>123456</td>
        <td>01/01/2024</td>
        <td>01/01/2025</td>
      </tr>
      <tr>
        <td><button className="table-button">View</button></td>
        <td>Pending</td>
        <td>New Business Registration</td>
        <td>789012</td>
        <td>03/01/2024</td>
        <td>03/01/2025</td>
      </tr>
      {/* Add more rows as needed */}
    </tbody>
  </table>
            </div>
            <div className='workpermittable'>

            </div>
      </div>
    </section>
  );
};

export default Dashboard;
