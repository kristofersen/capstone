import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/dashboard.css'; // Import your CSS file

// Define the WorkPermit interface
interface WorkPermit {
  _id: string;
  id: string;
  workpermitstatus: string;
}

const Dashboard: React.FC = () => {
  const [userDetails, setUserDetails] = useState<{ email: string; firstName: string; lastName: string; id: string} | null>(null);;
  const [workPermits, setWorkPermits] = useState<WorkPermit[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/'); // Redirect to login if no token
      return;
    }

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
        localStorage.setItem('profile', JSON.stringify(userData.user));
        localStorage.setItem('userId', userData.id);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile, please try again.');
      }
    };

    const fetchWorkPermits = async (token: string) => {
      try {
        const response = await fetch('http://localhost:3000/workpermits', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        const WorkPermitData = await response.json();
        setWorkPermits(WorkPermitData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile, please try again.');
      }
    };
    fetchWorkPermits(token);
    fetchProfile(token);
   
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from 
    
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
<div className='workpermittable'>
  <p>Released Work Permit Applications</p>
<table className="permit-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {workPermits.map((permit) => (
            <tr key={permit._id}>
              <td>{permit.id}</td>
              <td>{permit.workpermitstatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>


      </div>
    </section>
  );
};

export default Dashboard;