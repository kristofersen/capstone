import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/viewapplicationdetails.css';

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
  }
  
  export interface FormData {
    personalInformation: PersonalInformation;
    emergencyContact: EmergencyContact;
    files: Files;
    receipt: Receipt;
  }
  
  export interface WorkPermit {
    _id: string; // Mongoose generated ID
    id: string;
    userId?: string; // Can be a string for front end
    permittype?: string; // Default value can be handled in logic
    workpermitstatus: string;
    transaction: string;
    transactionstatus: string;
    dateIssued?: Date; // Optional
    formData: FormData;
  }

const ViewApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract work permit ID from URL
  const [workPermit, setWorkPermit] = useState<WorkPermit | null>(null);
  const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
  const [modalFile, setModalFile] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkPermitDetails = async () => {
        if (!token) {
            navigate('/'); // Redirect to login if no token
            return;
          } 
      try {
        console.log(id);
        const response = await axios.get(`http://localhost:3000/workpermitdetails/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        });
        setWorkPermit(response.data as WorkPermit); // Set the work permit details to state
      } catch (error) {
        console.error('Error fetching work permit details:', error);
     
      } }

    fetchWorkPermitDetails(); // Call the fetch function










  }, [id, token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from 
    navigate('/'); // Redirect to home page
  };






   const openModal = (filePath: string) => {
    setModalFile(filePath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalFile(null);
  };

  const fetchDocumentUrl = (fileName: string | null): string | null => {
    if (!fileName) return null;
    // Assuming the backend is serving files from '/files' route
    return `http://localhost:3000/uploads/${fileName}`;
  };

  const renderDocument = (fileName: string | null) => {
    const fileUrl = fetchDocumentUrl(fileName);
    if (!fileUrl) return <span>Not uploaded</span>;

    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();

    return (
      <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => openModal(fileUrl)}>
        {fileExtension === 'pdf' ? 'View PDF' : 'View Document'}
      </span>
    );
  };









  return (
    <section className="dashboard-container">
      <div className="sidebar-container">
        <div className="sidebar">
          <div className="sidebar-logo">
            <img src="/obpwlslogo.svg" alt="Logo" className="logo-image" />
          </div>
          <ul className="sidebar-list">
            <li><a href="/dashboard" className="sidebar-linkactive">Dashboard</a></li>
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
        <div>
        
        <h1>Work Permit Details</h1>
        {workPermit ? (
          <>
            <h1>Personal Information Details</h1>
            <p><strong>Application ID:</strong> {workPermit.id}</p>
            <p><strong>Fullname:</strong>  {workPermit.formData.personalInformation.lastName}, {workPermit.formData.personalInformation.firstName} {workPermit.formData.personalInformation.middleInitial}</p>
            <p><strong>Permanent Address:</strong> {workPermit.formData.personalInformation.permanentAddress}</p>
            <p><strong>Currently Residing:</strong> {workPermit.formData.personalInformation.currentlyResiding}</p>
            <p><strong>Temporary Address:</strong> {workPermit.formData.personalInformation.temporaryAddress}</p>
            <p><strong>Birth Date:</strong> {workPermit.formData.personalInformation.dateOfBirth?.toLocaleDateString()}</p>
            <p><strong>Age:</strong> {workPermit.formData.personalInformation.age}</p>
            <p><strong>Place of Birth:</strong> {workPermit.formData.personalInformation.placeOfBirth}</p>
            <p><strong>Citizenship:</strong> {workPermit.formData.personalInformation.citizenship}</p>
            <p><strong>Civil Status:</strong> {workPermit.formData.personalInformation.civilStatus}</p>
            <p><strong>Gender:</strong> {workPermit.formData.personalInformation.gender}</p>
            <p><strong>Height:</strong> {workPermit.formData.personalInformation.height}</p>
            <p><strong>Weight:</strong> {workPermit.formData.personalInformation.weight}</p>
            <p><strong>Mobile Number:</strong> {workPermit.formData.personalInformation.age}</p>
            <p><strong>Email:</strong> {workPermit.formData.personalInformation.email}</p>
            <p><strong>Educational Attainment:</strong> {workPermit.formData.personalInformation.educationalAttainment}</p>
            <p><strong>Nature of Work:</strong> {workPermit.formData.personalInformation.natureOfWork}</p>
            <p><strong>Place of Work:</strong> {workPermit.formData.personalInformation.placeOfWork}</p>
            <p><strong>Company Name:</strong> {workPermit.formData.personalInformation.companyName}</p>
            <p><strong>Email:</strong> {workPermit.formData.personalInformation.email}</p>
            <p><strong>Work Permit Classifiation:</strong> {workPermit.formData.personalInformation.workpermitclassification}</p>

            <h1>Emergency Contact Details</h1>
            <p><strong>Name:</strong> {workPermit.formData.emergencyContact.name2}</p>
            <p><strong>Mobile Number:</strong> {workPermit.formData.emergencyContact.mobileTel2}</p>
            <p><strong>Address:</strong> {workPermit.formData.emergencyContact.address}</p>


            <h3>Documents</h3>
            <div>
            <p>Document 1: {renderDocument(workPermit.formData.files.document1)}</p>
            <p>Document 2: {renderDocument(workPermit.formData.files.document2)}</p>
            <p>Document 3: {renderDocument(workPermit.formData.files.document3)}</p>
            <p>Document 4: {renderDocument(workPermit.formData.files.document4)}</p>
            </div>



            
    
            {/* Render additional fields as necessary */}
            
          </>
        ) : (
          <p>No work permit details available.</p>
        )}

{isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalFile && (
              <div>
                {modalFile.endsWith('.pdf') ? (
                  <iframe src={modalFile} style={{ width: '100%', height: '600px' }} title="PDF Viewer" />
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

export default ViewApplicationDetails;
