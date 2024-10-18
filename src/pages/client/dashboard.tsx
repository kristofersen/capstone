import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/dashboard.css'; // Import your CSS file

// Define the WorkPermit interface
interface WorkPermit {
  _id: string;
  id: string;
  workpermitstatus: string;
  classification: string;
  createdAt: string;
  permitExpiryDate: string;
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
  const sortedWorkPermits = workPermits
  .slice() // Make a copy of the array to avoid modifying the original
  .sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // Check if both dates are valid
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0; // If either date is invalid, keep their order (or handle as needed)
    }

    return dateB.getTime() - dateA.getTime(); // Sort in descending order
  });

// Now slice the sorted array to get the current items
const currentItems = sortedWorkPermits.slice(startIndex, endIndex);
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

  const handleViewApplication = () => {
    if (activePermit) {
      console.log(`Edit permit ID: ${activePermit._id}`);
      navigate(`/viewapplicationdetails/${activePermit._id}`);
      // Implement your edit logic here
      closeModal(); // Close the modal after action
    }
  };

  const handleDelete = async () => {
    if (activePermit) {
      console.log(`Delete permit ID: ${activePermit._id}`);
      try {
        const response = await fetch(`http://localhost:3000/deletePermit/${activePermit._id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert("Permit deleted successfully"); 
          window.location.reload(); 
          closeModal(); // Close the modal after action
        } else {
          alert("Failed to delete permit");
        }
      } catch (error) {
        console.error("Error deleting permit:", error);
      }
    }
  };
  
//END CODE FOR TABLE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//Fetch PErmits
    const [latestStatus, setLatestStatus] = useState<string | null>(null);
//ENd Fetch PEmtirs

const handleLogout = () => {
  localStorage.removeItem('token'); // Remove token from 
  navigate('/'); // Redirect to home page
};

useEffect(() => {
  if (!token) {
    navigate('/'); // Redirect to login if no token
    return;
  }

  const fetchProfile = async () => {
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

  const fetchWorkPermits = async () => {
    try {
      const response = await fetch('http://localhost:3000/workpermits', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const workPermitData = await response.json();
      setWorkPermits(workPermitData);
    } catch (error) {
      console.error('Error fetching work permits:', error);
      setError('Failed to fetch work permits, please try again.');
    }
  };

  fetchProfile();
  fetchWorkPermits();
}, [navigate, token]); // Remove workPermits from dependencies

useEffect(() => {
  if (workPermits.length > 0) {
    // Function to extract and convert DDMMYYYY to YYYYMMDD for comparison
    const convertDateForComparison = (permitID: string) => {
      const dateString = permitID.slice(-8); // Extract the last 8 characters (DDMMYYYY)
      const day = dateString.slice(0, 2);
      const month = dateString.slice(2, 4);
      const year = dateString.slice(4, 8);
      return `${year}${month}${day}`; // Return YYYYMMDD for proper sorting
    };

    // Function to extract sequenceString for comparison
    const extractSequenceString = (permitID: string) => {
      return permitID.match(/\d+/)?.[0] || '0'; // Extract the number from the sequence, assuming it's digits
    };

    // Sort work permits based on date first, then sequenceString
    const sortedPermits = workPermits.sort((a, b) => {
      const dateA = convertDateForComparison(a.id);
      const dateB = convertDateForComparison(b.id);

      // If dates are the same, compare sequenceString
      if (dateA === dateB) {
        const seqA = parseInt(extractSequenceString(a.id), 10);
        const seqB = parseInt(extractSequenceString(b.id), 10);
        return seqB - seqA; // Sort by sequence number (higher number means more recent)
      }
      return dateB.localeCompare(dateA); // Sort by date in descending order
    });

    // The first item in the sorted array is the latest
    setLatestStatus(sortedPermits[0].workpermitstatus);
  }
}, [workPermits]); // This effect now depends only on workPermits


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
          <a 
           href={!(latestStatus === 'Pending' || latestStatus === 'Waiting for Payment' || latestStatus === 'Released') ? "/workpermitpage" : "#"} 
           className='workpermitbutton'
           onClick={(e) => {
           if (latestStatus === 'Pending' || latestStatus === 'Waiting for Payment' || latestStatus === 'Released') {
           e.preventDefault(); // Disable click if status is 'For Assessment', 'Waiting for Payment', or 'Released'
           }
           }}
            >
          Apply for Work Permit
          </a>
          </div>
        </div>
        
        <div className='workpermittable'>
  <p>Work Permit Applications</p>
  <table className="permit-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Status</th>
        <th>Transaction</th>
        <th>Date Issued</th>
        <th>Date Expired</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {currentItems.map((permit) => (
        <tr key={permit._id}>
          <td>{permit.id}</td>
          <td>{permit.workpermitstatus}</td>
          <td>{permit.classification}</td>
          <td>{new Date(permit.createdAt).toLocaleDateString()}</td>
          <td>
            {permit.permitExpiryDate 
              ? new Date(permit.permitExpiryDate).toLocaleDateString() 
              : '---'}
          </td>
          <td>
            <button onClick={() => openModal(permit)} className="action-button">
              Choose Action
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
              <button onClick={handleViewApplication}>View Application</button>
               {/* Conditionally render the Delete button */}
               {activePermit.workpermitstatus === 'Pending' && (
              <button onClick={handleDelete}>Delete</button>
           )}

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