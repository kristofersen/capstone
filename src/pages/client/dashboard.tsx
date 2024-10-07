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
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<{ email: string; firstName: string; lastName: string; id: string} | null>(null);;
  const [workPermits, setWorkPermits] = useState<WorkPermit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');
  // CODE FOR TABLE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const [activePermit, setActivePermit] = useState<WorkPermit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(workPermits.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = workPermits.slice(startIndex, endIndex);
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const openModal = (permit: WorkPermit) => {
    setActivePermit(permit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActivePermit(null);
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    if (activePermit) {
      console.log(`Edit permit ID: ${activePermit._id}`);
      navigate(`/viewapplicationdetails/${activePermit._id}`);
      // Implement your edit logic here
      closeModal(); // Close the modal after action
    }
  };

  const handleDelete = () => {
    if (activePermit) {
      console.log(`Delete permit ID: ${activePermit._id}`);
      // Implement your delete logic here
      closeModal(); // Close the modal after action
    }
  };
//END CODE FOR TABLE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const handleLogout = () => {
  localStorage.removeItem('token'); // Remove token from 
  navigate('/'); // Redirect to home page
};

  useEffect(() => {
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

  }, [navigate, token]);

  return (
    <section className="dashboard-container">
      <div className="sidebar-container">
        <div className="sidebar">
          <div className="sidebar-logo">
            <img src="/obpwlslogo.svg" alt="Logo" className="logo-image" />
          </div>
          <ul className="sidebar-list">
            <li>
              <a href="/dashboard" className="sidebar-linkactive">
              <img src="/dashboardlogo.svg" alt="Logo" className="sidebarlogoimage" />Dashboard
              </a>
            </li>
            <li>
              <a href="/workpermitpage" className="sidebar-link">
              <img src="/applicationslogo.svg" alt="Logo" className="sidebarlogoimage" />Work Permit
              </a>
            </li>
            <li>
              <a href="/businesspermitpage" className="sidebar-link">
              <img src="/applicationslogo.svg" alt="Logo" className="sidebarlogoimage" />Business Permit
              </a>
            </li>
            <li>
              <a href="/viewworkpermitapplication" className="sidebar-link">
              <img src="/viewspecificapplicationlogo.svg" alt="Logo" className="sidebarlogoimage" />View WP Applications
              </a>
            </li>
            <li>
              <a href="/viewbusinessapplication" className="sidebar-link">
              <img src="/viewspecificapplicationlogo.svg" alt="Logo" className="sidebarlogoimage" />View BP Applications
              </a>
            </li>
            <li>
              <a href="/viewallapplication" className="sidebar-link">
              <img src="/viewallapplicationslogo.svg" alt="Logo" className="sidebarlogoimage" />View All Applications
              </a>
            </li>
            <li>
              <a href="/account" className="sidebar-link">
              <img src="/accountlogo.svg" alt="Logo" className="sidebarlogoimage" />Account
              </a>
            </li>
            <li>
              <a href="/" onClick={handleLogout} className="sidebar-link">
              <img src="/logoutlogo.svg" alt="Logo" className="sidebarlogoimage" />Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
  
      <div className="content">
        <header>
          <h1>Online Business and Work Permit Licensing System</h1>
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
              {currentItems.map((permit) => (
                <tr key={permit._id}>
                  <td>{permit.id}</td>
                  <td>{permit.workpermitstatus}</td>
                  <td>
                    <button onClick={() => openModal(permit)}>
                    <h3>Choose an Action for Permit ID: {permit.id}</h3> {/* Display the permit ID */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons">
            {currentPage > 0 && (
              <button onClick={handlePreviousPage}>Back</button>
            )}
            {currentPage < totalPages - 1 && (
              <button onClick={handleNextPage}>Next</button>
            )}
          </div>
          {/* Modal for Action Options */}
          {isModalOpen && activePermit && (
            <div className="modal-overlay">
              <div className="modal">
              <h3>Choose an Action for Permit ID: {activePermit.id}</h3> {/* Display the permit ID */}
                <button onClick={handleEdit}>View Application</button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
  
};

export default Dashboard;