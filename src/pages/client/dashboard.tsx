import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/dashboard.css'; // Import your CSS file
import { v4 as uuidv4 } from 'uuid';

const Dashboard: React.FC = () => {
  const [userDetails, setUserDetails] = useState<{ email: string; firstName: string; lastName: string } | null>(null);
  const [businessPermits, setBusinessPermits] = useState<{ id: number; status: string; transaction: string; dateIssued: number; expiryDate: number }[] | null>(null);
  const [workPermits, setWorkPermits] = useState<{ id: number; status: string; transaction: string; dateIssued: number; expiryDate: number }[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token')); // Initialize token with localStorage value

  const navigate = useNavigate();

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const userData = await response.json();
      setUserDetails(userData.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile, please try again.');
    }
  };

  const fetchWorkPermits = async () => {
    if (!token) {
      throw new Error('Token is null or undefined');
    }
    try {
      const response = await fetch('http://localhost:3000/workpermitpage', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const workPermitsData = await response.json();
      setWorkPermits(workPermitsData);
    } catch (error) {
      console.error('Error fetching work permits:', error);
      setError('Failed to fetch work permits, please try again.');
    }
  };
  
  const fetchBusinessPermits = async () => {
    if (!token) {
      throw new Error('Token is null or undefined');
    }
    try {
      const response = await fetch('http://localhost:3000/businesspermitpage', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const businessPermitsData = await response.json();
      setBusinessPermits(businessPermitsData);
    } catch (error) {
      console.error('Error fetching business permits:', error);
      setError('Failed to fetch business permits, please try again.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile(token);
      fetchWorkPermits();
      fetchBusinessPermits();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null); // Update the state variable
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
            <li><a href="/workpermitpage" className="sidebar-link">Apply for Work Permit</a></li>
            <li><a href="/businesspermitpage" className="sidebar-link">Apply for Business Permit</a></li>
            <li><a href="/viewapplication" className="sidebar-link">View Applications</a></li>
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
        <a href="/businesspermitpage" className='businesspermitbutton'>
            Apply for Business Permit
        </a>
    </div>
    <div>
        <a href="/workpermitpage" className='workpermitbutton'>
            Apply for Work Permit
        </a>
    </div>
</div>

            <div className="businesspermittable">
        <p>Released Business Permit Applications</p>
        <table className="permit-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Status</th>
              <th>Transaction</th>
              <th>Date Issued</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
          {businessPermits && businessPermits.length > 0 ? (
  businessPermits.map((permit) => (
    <tr key={uuidv4()}>
      <td><button className="table-button">View</button></td>
      <td>{permit.status}</td>
      <td>{permit.transaction}</td>
      <td>{new Date(permit.dateIssued).toLocaleDateString()}</td>
      <td>{new Date(permit.expiryDate).toLocaleDateString()}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={5}>No business permits available.</td>
  </tr>
)}
          </tbody>
        </table>
      </div>

<div className='workpermittable'>
  <p>Released Work Permit Applications</p>
  <table className="permit-table">
    <thead>
      <tr>
        <th>Action</th>
        <th>Status</th>
        <th>Transaction</th>
        <th>Date Issued</th>
        <th>Expiry Date</th>
      </tr>
    </thead>
    <tbody>
    {workPermits && workPermits.length > 0 ? (
    workPermits?.map((permit) => (
              <tr key={uuidv4()}>
                <td><button className="table-button">View</button></td>
                <td>{permit.status}</td>
                <td>{permit.transaction}</td>
                <td>{new Date(permit.dateIssued).toLocaleDateString()}</td>
                <td>{new Date(permit.expiryDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No work permits available.</td>
            </tr>
            )}
    </tbody>
  </table>
</div>
</div>
    </section>
  );
};

export default Dashboard;