import '../Styles/AdminStyles.css'; 
import AdminSideBar from '../components/NavigationBars/AdminSideBar';
import React, {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';// Import your CSS file

const AdminForAssessment: React.FC = () => {
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
            console.error('Error fetching Ashboard Ata:', error);
          } 
        };
      
        checkAuth();
      }, [navigate]); // Only depend on navigate, which is necessary for the redirection


      return (
        <section className="Abody">
            <div className="Asidebar-container">
                <AdminSideBar />
            </div>

            <div className="Acontent">
                <header className="Aheader">
                    <h1>Online Business and Work Permit Licensing System</h1>
                </header>

                <div className="button-container"> {/* Centering container */}
                    <a href="/AforassessmentWP" className="DAworkpermitbutton">
                        For Assessment New Working Permit
                    </a>

                    <a href="/AforassessmentWP" className="DAworkpermitbutton">
                        For Assessment Renew Working Permit
                    </a>

                    <a href="/AforassessmentWP" className="DAworkpermitbutton">
                        View All For Assessment Working Permit
                    </a>
          
            </div>
            <div className="button-container"> {/* Centering container */}
                    <a href="/AforassessmentBP/renew" className="DAbusinesspermitbutton">
                        For Assessment Renew Business Permit
                    </a>
                    <a href="/AforassessmentBP/new" className="DAbusinesspermitbutton">
                        For Assessment New Business Permit
                    </a>

                    <a href="/AforassessmentBP/" className="DAbusinesspermitbutton">
                        View All For Assessment Business Permit
                    </a>          
            </div>
            </div>
        </section>
    );
};

export default AdminForAssessment;