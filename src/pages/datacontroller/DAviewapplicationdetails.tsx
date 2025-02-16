import '../Styles/DataControllerStyles.css'; 
import DASidebar from '../components/NavigationBars/DAsidebar';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
export interface PersonalInformation {
    lastName: string;
    firstName: string;
    middleInitial?: string; // Optional
    permanentAddress?: string; // Optional
    currentlyResiding: boolean;
    temporaryAddress?: string; // Optional
    dateOfBirth?: Date; // Optional
    age?: number; // Optional
    placeOfBirth?: string; // Optional
    citizenship?: string; // Optional
    civilStatus?: string; // Optional
    gender?: string; // Optional
    height?: string; // Optional
    weight?: string; // Optional
    mobileTel?: string; // Optional
    email?: string; // Optional
    educationalAttainment?: string; // Optional
    natureOfWork?: string; // Optional
    placeOfWork?: string; // Optional
    companyName?: string; // Optional
    workpermitclassification?: string;
  }
  
  export interface EmergencyContact {
    name2?: string; // Optional
    mobileTel2?: string; // Optional
    address?: string; // Optional
  }
  
  export interface Files {
    document1: string | null; // Optional
    document2: string | null; // Optional
    document3: string | null; // Optional
    document4: string | null; // Optional
  }
  
  export interface Receipt {
    receiptId?: string; // Optional
    modeOfPayment?: string; // Optional
    receiptDate?: string; // Optional
    amountPaid?: string; // Optional
    receiptFile?: string;
  }
  
  export interface FormData {
    personalInformation: PersonalInformation;
    emergencyContact: EmergencyContact;
    files: Files;
  
  }
  
  export interface WorkPermit {
    _id: string; // Mongoose generated ID
    id: string;
    userId?: string; // Can be a string for front end
    permittype?: string; // Default value can be handled in logic
    workpermitstatus: string;
    classification: string;
    transaction: string;
    transactionstatus: string;
    applicationdateIssued?: Date; // Optional
    formData: FormData;
    createdAt: string;
    receipt: Receipt
    permitFile: string;
    applicationComments: string;
  }

const DataControllerViewApplicationDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Extract work permit ID from URL
    const [workPermit, setWorkPermit] = useState<WorkPermit | null>(null);
    const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
    const [modalFile, setModalFile] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch('http://localhost:3000/auth/check-auth-datacontroller', {
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



    useEffect(() => {
        const fetchWorkPermitDetails = async () => {
            if (!token) {
                navigate('/'); // Redirect to login if no token
                return;
              } 
          try {
            console.log(id);
            const response = await axios.get(`http://localhost:3000/datacontroller/workpermitdetails/${id}`, {

            });
            setWorkPermit(response.data as WorkPermit); // Set the work permit details to state
          } catch (error) {
            console.error('Error fetching work permit details:', error);
         
          } }
    
        fetchWorkPermitDetails(); // Call the fetch function
      }, [id, token, navigate]);

// REJECT Modal @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      const openRejectModal = () => {
        setShowRejectModal(true);

      };

      const [isCommentVisible, setIsCommentVisible] = useState(false); // State to track comment visibility
      const [comments, setComments] = useState(''); // State for comments
    
      const closeModal = () => {
        setIsModalOpen(false)
        setShowRejectModal(false);
        setIsCommentVisible(false); // Reset comment visibility when closing
        setComments(''); // Reset comments when closing
      };
    
      const handleConfirm = () => {
        setIsCommentVisible(true); // Show the comment input area
      };
    
      const handleFinalConfirm = async () => {
        // Logic to handle submission of comments
        console.log('Updating permit with ID:', workPermit?._id); // Log ID for debugging
      
        try {
          const response = await axios.put(`http://localhost:3000/datacontroller/workpermitreject/${workPermit?._id}`, {
            status: 'Rejected',
            comments: comments,
          });
          console.log('Updated Permit:', response.data);
      
          // Update local state with the response data
          setWorkPermit(response.data);
          alert('Work Permit Application updated successfully!');
          navigate(-1);
        } catch (error) {
          console.error('Error updating work permit:', error);
        } console.log('Application rejected with comments:', comments);
        closeModal(); // Close modal after confirmation
      };


//End REJECT MODAL @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      const openModal = (filePath: string) => {
        setModalFile(filePath);
        setIsModalOpen(true);
      };
    
      const closeRejectModal = () => {
        setIsModalOpen(false);
        setShowRejectModal(false);
        setModalFile(null);
      };
    
      const fetchDocumentUrl = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts'): string | null => {
        if (!fileName) return null;
        
        // Return the file URL based on the folder specified
        return `http://localhost:3000/${folder}/${fileName}`;
      };
      
    const renderDocument = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts') => {
      const fileUrl = fetchDocumentUrl(fileName, folder);
      if (!fileUrl) return <span>Not uploaded</span>;
    
      const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
      console.log(fileUrl);
      return (
        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => openModal(fileUrl)}>
          {fileExtension === 'pdf' ? 'View PDF' : 'View Document'}
        </span>
      );
    };

    const handleUpdate = async () => {
      console.log('Updating permit with ID:', workPermit?._id); // Log ID for debugging
  
      try {
          let newStatus;
  
          // Check the classification and set the new status accordingly
          if (workPermit?.formData.personalInformation.workpermitclassification === 'New') {
              newStatus = 'Released';
          } else if (workPermit?.formData.personalInformation.workpermitclassification=== 'Renew') {
              newStatus = 'Waiting for Payment';
          }
  
          // If newStatus is set, proceed with the update
          if (newStatus) {
              const response = await axios.put(`http://localhost:3000/datacontroller/workpermithandleupdate/${workPermit?._id}`, {
                  status: newStatus,
              });
  
              console.log('Updated Permit:', response.data);
  
              // Update local state with the response data
              setWorkPermit(response.data);
              alert('Work Permit Application updated successfully!');
              navigate(-1);
          } else {
              alert('No valid classification found to update the status.');
          }
      } catch (error) {
          console.error('Error updating work permit:', error);
      }
  };
  

return (
    <section className="DAbody">
        <div className="DAsidebar-container">
        <DASidebar /> {/* Pass handleLogout to DASidebar */}
      </div>
    <div className="DAcontent">
        <header className='DAheader'>
            <h1>Online Business and Work Permit Licensing System</h1>
        </header>
        <div className="panel">
  <h1>Work Permit Details</h1>
  {workPermit ? (
    <>
        <label>Date Issued:</label>
        <input
          type="text"
          value={workPermit.createdAt ? new Date(workPermit.createdAt).toLocaleDateString() : 'N/A'}
          readOnly
        />
        <label>Work Permit Status:</label>
        <input type="text" value={workPermit.workpermitstatus || ""} readOnly />
        <label>Classification:</label>
        <input type="text" value={workPermit.classification || ""} readOnly />
        
      <h1>Personal Information Details</h1>
      <div className="grid-container">
          <label>Application ID:</label>
          <input type="text" value={workPermit.id || ""} readOnly />
          <label>Full Name:</label>
          <input
            type="text"
            value={`${workPermit.formData.personalInformation.lastName|| ""}, ${workPermit.formData.personalInformation.firstName|| ""} ${workPermit.formData.personalInformation.middleInitial|| ""}`}
            readOnly
          />
          <label>Permanent Address:</label>
          <input type="text" value={workPermit.formData.personalInformation.permanentAddress|| ""} readOnly />
          <label>Currently Residing:</label>
          <input type="text" value={workPermit.formData.personalInformation.age|| ""} readOnly />
          <label>Temporary Address:</label>
          <input type="text" value={workPermit.formData.personalInformation.temporaryAddress || ""} readOnly />
          <label>Birth Date:</label>
          <input
            type="text"
            value={workPermit.formData.personalInformation.dateOfBirth ? new Date(workPermit.formData.personalInformation.dateOfBirth).toLocaleDateString() : 'N/A'}
            readOnly
          />
          <label>Age:</label>
          <input type="text" value={workPermit.formData.personalInformation.age|| ""} readOnly />
          <label>Place of Birth:</label>
          <input type="text" value={workPermit.formData.personalInformation.placeOfBirth|| ""} readOnly />
          <label>Citizenship:</label>
          <input type="text" value={workPermit.formData.personalInformation.citizenship|| ""} readOnly />
          <label>Company Name:</label>
          <input type="text" value={workPermit.formData.personalInformation.companyName|| ""} readOnly />
        {/* Add the remaining fields in similar fashion */}
      </div>

      <h1>Emergency Contact Details</h1>
          <label>Name:</label>
          <input type="text" value={workPermit.formData.emergencyContact.name2|| ""} readOnly />
          <label>Mobile Number:</label>
          <input type="text" value={workPermit.formData.emergencyContact.mobileTel2|| ""} readOnly />
          <label>Address:</label>
          <input type="text" value={workPermit.formData.emergencyContact.address|| ""} readOnly />
        

      <h1>Documents</h1>
      <div style={{display: 'flex',justifyContent: 'center', gap: '16px',flexWrap: 'wrap' }}>
    <p>1x1 Picture: {workPermit.formData.files && renderDocument(workPermit.formData.files.document1, 'uploads')}</p>

    <p>Cedula: {workPermit.formData.files && renderDocument(workPermit.formData.files.document2, 'uploads')}</p>

    {!workPermit.formData.personalInformation.currentlyResiding && (
  <p>
    Referral Letter: 
    {workPermit.formData.files && renderDocument(workPermit.formData.files.document3, 'uploads')}
  </p>
)}
  
  {workPermit.classification === 'New' && (
    <p>FTJS (First Time Job Seeker) Certificate: {workPermit.formData.files && renderDocument(workPermit.formData.files.document4, 'uploads')}</p>
)}

  </div>

      <div>
  {workPermit.receipt?.receiptFile && (
    <p>Receipt: {renderDocument(workPermit.receipt.receiptFile, 'receipts')}</p>
  )}
  {workPermit.permitFile && (
    <p>Work Permit: {renderDocument(workPermit.permitFile, 'permits')}</p>
  )}
  {workPermit.applicationComments && (
    <p>Comments: {workPermit.applicationComments}</p>
  )}
</div>




            {workPermit.workpermitstatus === 'Pending' && (
              <p>
        <button className="btn btn-success" onClick={handleUpdate}>Accept Application</button>
        <button className="btn btn-danger" onClick={openRejectModal}>Reject Application</button>
        </p>
      )}
    
            {/* Render additional fields as necessary */}
            
          </>
        ) : (
          <p>No work permit details available.</p>
        )}

{isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {modalFile && (
              <div>
                {modalFile}
                {modalFile.endsWith('.pdf') ? (
                  <iframe src={modalFile} style={{ width: '100%', height: '600px' }} title="PDF Viewer" />
                ) : (
                  <img src={modalFile} alt="Document" style={{ maxWidth: '100%', height: 'auto' }} />
                )}
              </div>
            )}
            <button className="cancel-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}


      

{showRejectModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Reject Application</h2>
            {!isCommentVisible ? (
              <>
                <p>Are you sure you want to reject this application?</p>
                <button className="DAactionbutton" onClick={handleConfirm}>Confirm</button>
                <button className="actionreject-button" onClick={closeRejectModal}>Cancel</button>
              </>
            ) : (
              <>
                <h3>Comments</h3>
                <label htmlFor="comments">Enter your comments:</label>
                <textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                  style={{ width: '100%' }} // Adjust width as needed
                />
                <button className="DAactionbutton" onClick={handleFinalConfirm}>Submit</button>
                <button className="actionreject-button" onClick={() => setIsCommentVisible(false)}>Back</button>
              </>
            )}
          </div>
        </div>
      )}
        </div>
    </div>
    </section>
);

};

export default DataControllerViewApplicationDetails;