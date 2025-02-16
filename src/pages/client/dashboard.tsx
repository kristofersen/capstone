import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ClientStyles.css'; //  CSS file
import ClientNavbar from '../components/NavigationBars/clientnavbar';

import { WorkPermit, GroupedBusinessPermit } from "../components/Interface(Front-end)/Types";
import WorkPermitTable from "../components/Tables/WorkPermitTable-Client";
import BusinessPermitTable from "../components/Tables/BusinessPermitTable-Client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<{ email: string; firstName: string; lastName: string; id: string} | null>(null);;
  const [workPermits, setWorkPermits] = useState<WorkPermit[]>([]);
  const [businessPermits, setBusinessPermits] = useState<GroupedBusinessPermit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [latestStatus, setLatestStatus] = useState<string | null>(null);

  



 

//Content Codes

const checkForPending = async () => {
  try {
    const response = await fetch('http://localhost:3000/client/checkpermitlatest', {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
    });

    if (!response.ok) {
      console.error('Error fetching permit status');
      return;
    }

    const data = await response.json();

    if (data.status === 'Pending') {
      alert('Your permit application is pending approval. Please wait for further updates.');
      return; //Stop execution here
    } 

    if (data.status === 'Waiting for Payment') {
      alert('Your permit is awaiting payment. Please complete the payment.');
      return; //Stop execution here
    } 

    if (data.status === 'Released') {
      alert('You have an ongoing permit. Please wait for expiry.');
      return; //Stop execution here
    }
    if (data.status === 'Expired' || data.status === 'No Permit') {
      navigate('/workpermitpage');
      return; //Stop execution here
    }

    //Only proceed if none of the above conditions were met
    navigate('/workpermitpage');
  } catch (error) {
    console.error('Error checking permit status:', error);
  }
};

const fetchProfile = async () => {
  try {
    const response = await fetch('http://localhost:3000/client/profile', {
      method: 'GET',
      credentials: 'include', // Ensure cookies (containing the token) are sent
      headers: {
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
    const response = await fetch('http://localhost:3000/client/fetchuserworkpermits', {
      method: 'GET',
      credentials: 'include', // Ensure cookies (containing the token) are sent
      headers: {
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

//useEffects
useEffect(() => {
  fetchProfile();
  fetchWorkPermits();
}, []); // Remove workPermits from dependencies

useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/check-auth-client', {
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
      setError('Failed to load dashboard. Please try again.');
    } 
  };

  checkAuth();
}, [navigate]); // Only depend on navigate, which is necessary for the redirection

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

useEffect(() => {
  const fetchBusinessPermits = async () => {
    try {
      const response = await fetch('http://localhost:3000/client/fetchuserbusinesspermits', {
        method: 'GET',
        credentials: 'include', // Ensure cookies (containing the token) are sent
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const businessPermitData = await response.json();
      setBusinessPermits(businessPermitData);
    } catch (error) {
      console.error('Error fetching business permits:', error);
    }
  };

  fetchBusinessPermits();
}, []); // Business Permit



  return (
    <section className="dashboard-container">
        {/* Navbar */}
      <ClientNavbar/>

      <div className="content">
      <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ width: '60%', margin: 'auto' }} >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/public/step1.svg"  className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src="/public/step2.svg"  className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src="/public/step3.svg"  className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src="/public/step4.svg"  className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src="/public/step5.svg"  className="d-block w-100" alt="..."></img>
          </div>
        </div> 
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
  
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
            <a href="/businesspermitpage" className="businesspermitbutton">
              <img 
                src="applicationslogo.svg" 
                alt="Logo" 
                className="button-logo" 
              />
            <span>Apply for Business Permit</span>
            </a>
          </div>
          <div>
          <a 
          href={!(latestStatus === 'Pending' || latestStatus === 'Waiting for Payment' || latestStatus === 'Released') ? "/workpermitpage" : "#"} 
          className='workpermitbutton'
          onClick={checkForPending}
            >
              <img 
                src="applicationslogo.svg" 
                alt="Logo" 
                className="button-logo" 
              />
          <span>Apply for Work Permit</span>
          </a>
          </div>
        </div>



      <WorkPermitTable workPermits={workPermits}/>

      <BusinessPermitTable businessPermits={businessPermits}/>

      </div>
    </section>
  );
  
};

export default Dashboard;