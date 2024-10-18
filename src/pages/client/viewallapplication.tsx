import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/viewallapplication.css';
import WorkPermit from './workpermitpage';
import axios from 'axios';

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
  }

  export interface Receipt {
   receiptFile: string;
  }


const ViewWorkPermitApplication: React.FC = () => {
    const navigate = useNavigate();
    const [workPermits, setWorkPermits] = useState<WorkPermit[]>([]);
    const [, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');
    const [latestPermitID, setLatestPermitID] = useState<string | null>(null);
    const [latestPermitmainID, setLatestPermitmainID] = useState<string | null>(null);
    const [latestStatus, setLatestStatus] = useState<string | null>(null);
    const [latestPermitFile, setLatestPermitFile] = useState<string |null>(null);
    const [latestReceiptFile, setLatestReceiptFile] = useState<string |null>(null);


const [latestReleasedPermitID, setLatestReleasedPermitID] = useState<string | null>(null);
const [latestReleasedPermitIDMain, setLatestReleasedPermitIDMain] = useState<string | null>(null);




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
    const dateA = new Date(a.applicationdateIssued);
    const dateB = new Date(b.applicationdateIssued);

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
  
  }
};
const handleViewLatestReleasedApplication = () => {
  
    console.log(`Edit permit ID: ${latestReleasedPermitIDMain}`);
    navigate(`/viewapplicationdetails/${latestReleasedPermitIDMain}`);
  

};

const handleDelete = () => {
  if (activePermit) {
    console.log(`Delete permit ID: ${activePermit._id}`);
    // Implement your delete logic here
    closeModal(); // Close the modal after action
  }
};
//END CODE FOR TABLE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    //MODAL TESTING FOR PAYMENT @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const [showPaymentMethod, setShowPaymentMethod] = useState(false);
    const [modalStep, setModalStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null); // Explicit type declaration
    const [paymentType, setPaymentType] = useState<string | null>(null);
    const [accountNumber, setAccountNumber] = useState<string | null>(null);
    const [amount, setAmount] = useState<string | null>(null);
    const [paymentName, setPaymentName] = useState<string | null>(null);
   



    const openPaymentMethod = () => {
      setShowPaymentMethod(true);
      setModalStep(0); // Reset to the first step when opening
      setPaymentMethod(null); // Reset payment method
    };
  
    const closePaymentMethod = () => {
      setShowPaymentMethod(false);
      setModalStep(0); // Reset when closing
      setPaymentMethod(null); // Reset payment method
    };
  
    // Close modal on overlay click
    const handleOverlayClick = () => {
      closePaymentMethod();
    };
  
    const handleNextStep = (method: string) => { // Explicit type for method
      if (method) {
        setPaymentMethod(method);
      }
      setModalStep((prevStep) => prevStep + 1);
    };
  
    const handlePreviousStep = (method: string | null) => {
      if (method) {
        setPaymentMethod(method); // Restore the previous method if applicable
      }
      setModalStep((prevStep) => Math.max(prevStep - 1, 0));
    };
  
    const handleSubmitPayment = async () => {
      console.log(accountNumber);
      console.log(amount);
      console.log(latestPermitID);

      console.log('Updating permit with ID:', latestPermitmainID); // Log ID for debugging
      
        try {
          const response = await axios.put(`http://localhost:3000/handlepayments/${latestPermitmainID}`, {
            accountNumber: accountNumber,
            amount: amount,
            paymentName: paymentName,
            paymentMethod: paymentMethod,
            paymentType: paymentType,
          });
          console.log('Updated Permit:', response.data);
          setModalStep(2);
        } catch (error) {
          console.error('Error updating work permit:', error);
        }
      // Reset the state variables to null
      setAccountNumber(null); // Clear account number
      setAmount(null); // Clear amount
    };

    //ENDMODAL TESTING @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
// Content CODE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from 
    navigate('/'); // Redirect to home page
  };

  useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to login if no token
      return;
    }
  
    const fetchWorkPermits = async () => {
      try {
        const response = await fetch('http://localhost:3000/fetchuserworkpermits', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
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
    if (workPermits.length > 0) {
      // Logic for processing work permits
      const convertDateForComparison = (permitID: string) => {
        const dateString = permitID.slice(-8); // Extract the last 8 characters (DDMMYYYY)
        const day = dateString.slice(0, 2);
        const month = dateString.slice(2, 4);
        const year = dateString.slice(4, 8);
        return `${year}${month}${day}`; // Return YYYYMMDD for proper sorting
      };
    
      const extractSequenceString = (permitID: string) => {
        return permitID.match(/\d+/)?.[0] || '0'; // Extract the number from the sequence
      };
    
      // Sort permits by date and sequence number
      const sortedPermits = workPermits.sort((a, b) => {
        const dateA = convertDateForComparison(a.id);
        const dateB = convertDateForComparison(b.id);
    
        if (dateA === dateB) {
          const seqA = parseInt(extractSequenceString(a.id), 10);
          const seqB = parseInt(extractSequenceString(b.id), 10);
          return seqB - seqA; // Sort by sequence number
        }
        return dateB.localeCompare(dateA); // Sort by date
      });
    
      // Set latest permit data (regardless of status)
      setLatestPermitID(sortedPermits[0].id);
      setLatestPermitmainID(sortedPermits[0]._id);
      setLatestStatus(sortedPermits[0].workpermitstatus);
      setLatestPermitFile(sortedPermits[0].permitFile);
      setLatestReceiptFile(sortedPermits[0].receipt.receiptFile);
    
      // Now filter permits to get only those with a status of 'released'
      const releasedPermits = sortedPermits.filter(
        (permit) => permit.workpermitstatus === 'Released'
      );
    
      if (releasedPermits.length > 0) {
        // Set latest released permit data
        setLatestReleasedPermitID(releasedPermits[0].id);
        setLatestReleasedPermitIDMain(releasedPermits[0]._id);

      }
    }
    
  }, [workPermits]); // This effect runs when workPermits changes
  

  const handleOpenPermitPDF = () => {
    // Assuming the PDFs are served from the '/permits' route
    const pdfUrl = `http://localhost:3000/permits/${latestPermitFile}`;
    
    // Open the PDF in a new tab
    window.open(pdfUrl, '_blank');
  };

  const handleOpenReceiptPDF = () => {
    const pdfUrl = `http://localhost:3000/receipts/${latestReceiptFile}`;
    
    // Open the PDF in a new tab
    window.open(pdfUrl, '_blank');
  };
    return (
        <section className="dashboard-container">
            <div className="sidebar-container">
                <div className="sidebar">
                    <div className="sidebar-logo">
                        <img src="/obpwlslogo.svg" alt="Logo" className="logo-image" />
                    </div>
                    <ul className="sidebar-list">
            <li>
                <a href="/dashboard" className="sidebar-link">
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
                <a href="/viewallapplication" className="sidebar-linkactive">
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
                    <h1>All Applications</h1>
                </header>

                <div className="contentcontainer">
                    <div className="applicationStatusContainer">
                        <div className="applicationstatusWorkPermit">
                            <h2>Current Application Status For Work Permit:</h2>
                            <div>
      {latestPermitID ? (
        <>
        <p>Latest Work Permit Application ID: {latestPermitID}</p>
        <p>Latest Status: {latestStatus}</p>
        </>
      ) : (
        <p>No work permits found</p>
      )}

{latestStatus === 'Waiting for Payment' && (
        <p>
          <button onClick={openPaymentMethod}>Payment</button>
        </p>
      )}

      {/* Payment Modal */}
      {showPaymentMethod && (
        <div className="modal-overlay-pay" onClick={handleOverlayClick}>
          <div className="modal-content-pay" onClick={(e) => e.stopPropagation()}>
            <button className="close-button-pay" onClick={closePaymentMethod}>✖</button>

            {modalStep === 0 && (
              <div>
                <h2>Select Payment Method</h2>
                <button onClick={() => handleNextStep('online')}>Online Payment</button>
                <button onClick={() => handleNextStep('onsite')}>Onsite Payment</button>
              </div>
            )}

            {modalStep === 1 && paymentMethod === 'online' && (
              <div>
                <h2>Select Online Payment Method</h2>
                <div>
                  <input
                    type="radio"
                    id="gcash"
                    name="paymentMethod"
                    value="gcash"
                    checked={paymentType === 'gcash'}
                    onChange={() => setPaymentType('gcash')}
                  />
                  <label htmlFor="gcash">GCash</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="onlineBanking"
                    name="paymentMethod"
                    value="onlineBanking"
                    checked={paymentType === 'onlineBanking'}
                    onChange={() => setPaymentType('onlineBanking')}
                  />
                  <label htmlFor="onlineBanking">Online Banking</label>
                </div>
                <div>
                </div>

                {paymentType === 'gcash' && (
                  <div>
                    <h2>Enter GCash Details</h2>
                    <input type="text" placeholder="Full Name" onChange={(e) => setPaymentName(e.target.value)} required />
                    <input type="text" placeholder="GCash Number" onChange={(e) => setAccountNumber(e.target.value)} />
                    <input type="text" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
                  </div>
                )}

                {paymentType === 'onlineBanking' && (
                  <div>
                    <h2>Enter Online Banking Details</h2>
                    <input type="text" placeholder="Card Number" onChange={(e) => setAccountNumber(e.target.value)} required />
                    <h2>Billing Information</h2>
                    <input type="text" placeholder="Full Name" onChange={(e) => setPaymentName(e.target.value)} required />
                    <input type="text" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} required />
                  </div>
                )}

                <button onClick={handleSubmitPayment}>Submit Payment</button>
                <button onClick={() => handlePreviousStep('online')}>Back</button>
              </div>
            )}

            {modalStep === 1 && paymentMethod === 'onsite' && (
              <div>
                <h2>Enter Payment Details</h2>
                <input type="text" placeholder="Your Name" />
                <input type="text" placeholder="Payment Amount" />
                <button onClick={handleSubmitPayment}>Submit Payment</button>
                <button onClick={() => handlePreviousStep('onsite')}>Back</button>
              </div>
            )}


            {modalStep === 2 && (
              <div>
                <h2>Receipt</h2>
                <p>Your payment has been processed!</p>
                <button onClick={closePaymentMethod}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

{latestStatus === 'Released' && (
        <p>
          <button onClick={handleOpenReceiptPDF}>View Receipt</button>
          <button onClick={handleOpenPermitPDF}>View Released Permit</button>
        </p>
      )}





    </div>  
                                <button className='viewapplicationbutton'  onClick={() => navigate(`/viewapplicationdetails/${latestPermitmainID}`)}>View Application</button>
                        
                        </div>
                    </div>

                    <div className="paymentandviewpermitcontainer">
                        <div className="viewpermit">
                            <h2>Recently Released Permit:</h2>
                            <p>Latest Released Permit ID: {latestReleasedPermitID}</p>
                            <button className='viewpermitbutton' onClick={handleViewLatestReleasedApplication}>View Permit</button>
                        </div>
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
          <td>{new Date(permit.applicationdateIssued).toLocaleDateString()}</td>
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

export default ViewWorkPermitApplication;
