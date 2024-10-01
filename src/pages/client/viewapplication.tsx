import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/viewapplication.css';

// Define the WorkPermit interface
interface WorkPermit {
    _id: string;
    id: string;
    workpermitstatus: string;
  }


const ViewApplication: React.FC = () => {
    const navigate = useNavigate();
    const [workPermits, setWorkPermits] = useState<WorkPermit[]>([]);
    const [, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');
    const [latestPermitID, setLatestPermitID] = useState<string | null>(null);
    const [latestPermitmainID, setLatestPermitmainID] = useState<string | null>(null);

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

    
    
// Content CODE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from 
    navigate('/'); // Redirect to home page
  };

  



useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to login if no token
      return;
    }
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
      setLatestPermitID(sortedPermits[0].id);
      setLatestPermitmainID(sortedPermits[0]._id);
    }

  }, [navigate, token, workPermits]);

    return (
        <section className="dashboard-container">
            <div className="sidebar-container">
                <div className="sidebar">
                    <div className="sidebar-logo">
                        <img src="/obpwlslogo.svg" alt="Logo" className="logo-image" />
                    </div>
                    <ul className="sidebar-list">
                        <li><Link to="/dashboard" className="sidebar-link">Dashboard</Link></li>
                        <li><Link to="/workpermitpage" className="sidebar-link">Apply for Work Permit</Link></li>
                        <li><Link to="/businesspermitpage" className="sidebar-link">Apply for Business Permit</Link></li>
                        <li><Link to="/viewapplication" className="sidebar-linkactive">View Work Permit Applications</Link></li>
                        <li><Link to="/viewbusinessapplication" className="sidebar-link">View Business Permit Applications</Link></li>
                        <li><Link to="/" onClick={handleLogout} className="sidebar-link">Log Out</Link></li>
                    </ul>
                </div>
            </div>

            <div className="content">
                <header>
                    <h1>View Applications</h1>
                    <nav>
                        <ul>
                            <li><Link to="/account" className="button">Account</Link></li>
                            <li><Link to="/" onClick={handleLogout} className="button">Logout</Link></li>
                        </ul>
                    </nav>
                </header>

                <div className="contentcontainer">
                    <div className="applicationStatusContainer">
                        <div className="applicationstatusWorkPermit">
                            <h2>Current Application Status For Work Permit:</h2>
                            <div>
      {latestPermitID ? (
        <p>Latest Work Permit Application ID: {latestPermitID}</p>
      ) : (
        <p>No work permits found</p>
      )}
    </div>  
                                <button className='viewapplicationbutton'  onClick={() => navigate(`/viewapplicationdetails/${latestPermitmainID}`)}>View Application</button>
                        
                        </div>
                    </div>

                    <div className="paymentandviewpermitcontainer">
                        <div className="viewpermit">
                            <h2>Recently Released Permit:</h2>
                            <button className='viewpermitbutton'>View Permit</button>
                        </div>
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

export default ViewApplication;
