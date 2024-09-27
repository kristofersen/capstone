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
  }
  
  export interface EmergencyContact {
    name2?: string; // Optional
    mobileTel2?: string; // Optional
    address?: string; // Optional
  }
  
  export interface Files {
    document1?: string; // Optional
    document2?: string; // Optional
    document3?: string; // Optional
    document4?: string; // Optional
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
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
        setError('Failed to fetch work permit details.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchWorkPermitDetails(); // Call the fetch function
  }, [id, token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from 
    navigate('/'); // Redirect to home page
  };


  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>; // Show error message
  }

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
            <p><strong>Permanent Address: {workPermit.formData.personalInformation.permanentAddress}</strong></p>
            <p><strong>Currently Residing: {workPermit.formData.personalInformation.currentlyResiding}</strong></p>
            <p><strong>Temporary Address: {workPermit.formData.personalInformation.temporaryAddress}</strong></p>
            <p><strong>Birth Date: {workPermit.formData.personalInformation.dateOfBirth?.toLocaleDateString()}</strong></p>
            <p><strong>Age: {workPermit.formData.personalInformation.age}</strong></p>
            <p><strong>Place of Birth: {workPermit.formData.personalInformation.placeOfBirth}</strong></p>
            <p><strong>Citizenship: {workPermit.formData.personalInformation.citizenship}</strong></p>
            <p><strong>Civil Status: {workPermit.formData.personalInformation.civilStatus}</strong></p>
            <p><strong>Gender: {workPermit.formData.personalInformation.gender}</strong></p>
            <p><strong>Height: {workPermit.formData.personalInformation.height}</strong></p>
            <p><strong>Weight: {workPermit.formData.personalInformation.weight}</strong></p>
            <p><strong>Mobile Number: {workPermit.formData.personalInformation.age}</strong></p>
            <p><strong>Email: {workPermit.formData.personalInformation.email}</strong></p>
            <p><strong>Educational Attainment: {workPermit.formData.personalInformation.educationalAttainment}</strong></p>
            <p><strong>Nature of Work: {workPermit.formData.personalInformation.natureOfWork}</strong></p>
            <p><strong>Place of Work: {workPermit.formData.personalInformation.placeOfWork}</strong></p>
            <p><strong>Company Name: {workPermit.formData.personalInformation.companyName}</strong></p>
            <p><strong>Email: {workPermit.formData.personalInformation.email}</strong></p>

            <h1>Emergency Contact Details</h1>
            <p><strong>Name: {workPermit.formData.emergencyContact.name2}</strong></p>
            <p><strong>Mobile Number: {workPermit.formData.emergencyContact.mobileTel2}</strong></p>
            <p><strong>Address: {workPermit.formData.emergencyContact.address}</strong></p>






            
    
            {/* Render additional fields as necessary */}
            
          </>
        ) : (
          <p>No work permit details available.</p>
        )}
        </div>
        
    
      </div>
    </section>
  );
};

export default ViewApplicationDetails;
