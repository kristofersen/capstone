import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './account.css'; // Import your CSS file

const Account: React.FC = () => {
  const [userDetails, setUserDetails] = useState<{ email: string; firstName: string; middleName: string; lastName: string } | null>(null);
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
        <li><a href="/dashboard" className="sidebar-link">Dashboard</a></li>
        <li><a href="/workpermitpage" className="sidebar-link">Apply for Work Permit</a></li>
        <li><a href="/businesspermitpage" className="sidebar-link">Apply for Business Permit</a></li>
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

    <div className="account-page">
      {error && <p className="error">{error}</p>}
      {userDetails ? (
        <div className="user-details">
          <div className="profile-info">
            <div className="profile-picture">
              <img src="/profileicon.svg" alt="Profile Icon" />
            </div>
            <h2>{userDetails.firstName} {userDetails.middleName} {userDetails.lastName}</h2>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>

    <div className="businesspermittable">
      <p>Application History</p>
      <table className="permit-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>Status</th>
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
        </tbody>
      </table>
    </div>
  </div>
</section>
  );
};

export default Account;
