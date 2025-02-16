
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../Styles/ClientStyles.css';
import ClientNavbar from '../components/NavigationBars/clientnavbar';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { GroupedBusinessPermit} from "../components/Interface(Front-end)/Types";
import BusinessPermitTable from "../components/Tables/BusinessPermitTable-Client";

  
const ViewBusinessApplication: React.FC = () => {

    const [businessPermits, setBusinessPermits] = useState<GroupedBusinessPermit[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

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
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchBusinessPermits();
  }, []);

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
      } 
    };
  
    checkAuth();
  }, [navigate]); // Only depend on navigate, which is necessary for the redirection

 

  if (loading) {
    return <p>Loading...</p>;
  }

    return (
        <section className="dashboard-container">
               {/* Navbar */}
      <ClientNavbar/>
      
            <div className="content">
                <header>
                    <h1>View Business Permit Applications</h1>
                </header>
                
                <BusinessPermitTable businessPermits={businessPermits}/>

            </div>
        </section>
    );
};

export default ViewBusinessApplication;
