import '../Styles/DataControllerStyles.css'; 
import AdminSideBar from '../components/NavigationBars/AdminSideBar';
import React, {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';// Import your CSS file


const Areleasedpermits: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const response = await fetch('http://localhost:3000/auth/check-auth-admin', {
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
    <section className="Abody">
    <div className="Asidebar-container">
        <AdminSideBar />{/* Pass handleLogout to DASidebar */}
      </div>

    <div className="Acontent">
        <header className='Aheader'>
            <h1>Online Business and Work Permit Licensing System</h1>
        </header>

        <div className="button-container">
        <a href="/AreleasedpermitsBP/new" className='DAbusinesspermitbutton'>
              Released New Business Permit
            </a>

            <a href="/AreleasedpermitsBP/renew" className='DAbusinesspermitbutton'>
              Released Renew Business Permit
            </a>

            <a href="/AreleasedpermitsBP/" className='DAbusinesspermitbutton'>
              View All Released  Business Permit
            </a>   
        </div>
      
        <div className="button-container">
            <a href="/AreleasedpermitsWP/new" className='DAworkpermitbutton'>
              Released New Working Permit
            </a>

            <a href="/AreleasedpermitsWP/renew" className='DAworkpermitbutton'>
              Released Renew Working Permit
            </a>

            <a href="/AreleasedpermitsWP/" className='DAworkpermitbutton'>
              View All Released  Working Permit
            </a>
        </div>
    </div>
    </section>
);

};

export default Areleasedpermits;