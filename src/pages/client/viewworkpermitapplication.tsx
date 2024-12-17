import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ClientStyles.css';
import WorkPermit from './workpermitpage';
import ClientSideBar from '../components/ClientSideBar';


// Define the WorkPermit interface
export interface WorkPermit {
    _id: string;
    id: string;
    workpermitstatus: string;
    classification: string;
    applicationdateIssued: string;
    permitExpiryDate: string;
    permitFile: string;
    receipt: Receipt;
    createdAt: string;
  }

  export interface Receipt {
   receiptFile: string;
  }


const ViewWorkPermitApplication: React.FC = () => {
    const navigate = useNavigate();
    const [workPermits, setWorkPermits] = useState<WorkPermit[]>([]);
    const [, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');
 

   const [modalFile, setModalFile] = useState<string | null>(null);

   const [isModalOpenFile, setIsModalOpenFile] = useState(false);





// CODE FOR TABLE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
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


const openModal = (filePath: string) => {
  setModalFile(filePath);
  setIsModalOpenFile(true);
};

const closeModal = () => {
  setIsModalOpenFile(false);
  setModalFile(null);
};




const handleDelete = async (permitId: string) => {
  console.log(`Delete permit ID: ${permitId}`);
  try {
    const response = await fetch(`http://localhost:3000/datacontroller/deletePermit/${permitId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert("Permit deleted successfully");
      window.location.reload(); // Reload the page to refresh the data
    } else {
      alert("Failed to delete permit");
    }
  } catch (error) {
    console.error("Error deleting permit:", error);
  }
};
//END CODE FOR TABLE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

   



  
  


    
  const fetchDocumentUrl = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts'): string | null => {
    if (!fileName) return null;
    
    // Return the file URL based on the folder specified
    return `http://localhost:3000/datacontroller/${folder}/${fileName}`;
  };
  
  const renderDocument = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts') => {
    const fileUrl = fetchDocumentUrl(fileName, folder);
  
    if (!fileUrl) return <span>Not uploaded</span>;
  
    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
  
    // Automatically open the modal if a valid file is found
   
        openModal(fileUrl); // Open the modal automatically
  
  
    return (
      <span>
        {fileExtension === 'pdf' ? 'View PDF' : 'View Document'}
      </span>
    );
  };

    //ENDMODAL TESTING @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
// Content CODE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const handleAction = (action: string, permit: WorkPermit) => {
  switch (action) {
    case 'viewApplication':
  console.log(`Edit permit ID: ${permit._id}`);
    navigate(`/viewapplicationdetails/${permit._id}`);
      break;
    case 'delete':
      handleDelete(permit._id);
      console.log(`Delete permit: ${permit._id}`);
      break;
    case 'viewReceipt':
      if (permit.receipt?.receiptFile) { // Check if the receipt file exists
          renderDocument(permit.receipt.receiptFile, 'receipts'); // Automatically open modal
          console.log(`View receipt for permit: ${permit.id}`);
        } else {
          console.log(`No receipt file found for permit: ${permit.id}`);
        }
      break;
    case 'viewPermit':
   
      renderDocument(permit.permitFile, 'permits');

      console.log(`View permit: ${permit.permitFile}`);
      console.log(`View permit: ${permit.id}`);
      break;
    default:
      console.warn('Unknown action');
  }
};

const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:3000/client/logout', {
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

  useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to login if no token
      return;
    }
  
    const fetchWorkPermits = async () => {
      try {
        const response = await fetch('http://localhost:3000/client/fetchuserworkpermits', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const WorkPermitData = await response.json();
        setWorkPermits(WorkPermitData);
      } catch (error) {
        console.error('Error fetching work permits:', error);
        setError('Failed to fetch work permits, please try again.');
      }
    };
  
    fetchWorkPermits();
  }, [navigate, token]); // Only run when token changes
  

  

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/client/check-auth-client', {
          method: 'GET',
          credentials: 'include', // This ensures cookies are sent with the request
        });
  
        if (response.status === 401) {
          // If unauthorized, redirect to login
          console.error('Access denied: No token');
          navigate('/login');
          return;
        }
  
        if (response.status === 204) {
          console.log('Access Success');
          return;
        }
  
        // Handle unexpected response
        console.error('Unexpected response status:', response.status);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } 
    };
  
    checkAuth();
  }, [navigate]); // Only depend on navigate, which is necessary for the redirection


    return (
        <section className="dashboard-container">
            <div className="sidebar-container">
            <ClientSideBar handleLogout={handleLogout} /> {/* Pass handleLogout to ClientSideBar */}
            </div>

            <div className="content">
                <header>
                    <h1>View Work Permit Applications</h1>
                </header>

                <div className='workpermitcontainer'>
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
        <td>{new Date(permit.applicationdateIssued).toLocaleDateString()}</td>
        <td>
          {permit.permitExpiryDate
            ? new Date(permit.permitExpiryDate).toLocaleDateString()
            : '---'}
        </td>
        <td>
          <select
            defaultValue=""
            onChange={(e) => {
              handleAction(e.target.value, permit);
              e.target.value = ""; // Reset dropdown to default
            }}
            className="dropdown-button"
          >
            <option value="" disabled>
              Select Action
            </option>
            {permit.workpermitstatus === 'Pending' && (
              <>
                <option value="viewApplication">View Application</option>
                <option value="delete">Delete</option>
              </>
            )}
            {permit.workpermitstatus === 'Waiting for Payment' && (
              <>
                <option value="viewApplication">View Application</option>
                <option value="pay">Pay</option>
              </>
            )}
            {permit.workpermitstatus === 'Released' && (
              <>
                <option value="viewApplication">View Application</option>
                <option value="viewReceipt">View Receipt</option>
                <option value="viewPermit">View Permit</option>
              </>
            )}
          </select>
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
          {isModalOpenFile && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalFile && (
              <div>
                {modalFile.endsWith('.pdf') ? (
                  <iframe src={modalFile} style={{ width: '500px', height: '600px' }} title="PDF Viewer" />
                ) : (
                  <img src={modalFile} alt="Document" style={{ maxWidth: '100%', height: 'auto' }} />
                )}
              </div>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
        </div>
            </div>
        </section>
    );
};

export default ViewWorkPermitApplication;