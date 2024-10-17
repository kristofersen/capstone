import '../Styles/DAreportsngraph.css'; 
import { useNavigate } from 'react-router-dom';// Import your CSS file

const DataControllerReportandGraph: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from 
        navigate('/'); // Redirect to home page
    };

return (
    <section className="DAreportsngraph-container">
    <div className="DAsidebar-container">
        <div className="DAsidebar">
        <div className="DAsidebar-logo">
            <img src="/obpwlsDAlogo.svg" alt="Logo" className="logo-image" />
        </div>
        <ul className="DAsidebar-list">
                        <li>
                            <a href="/DAdashboard" className="DAsidebar-link">
                            <img src="/dashboardlogo.svg" alt="Logo" className="sidebarlogoimage" />Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="/DAforassessment" className="DAsidebar-link">
                            <img src="/DAforassessmentlogo.svg" alt="Logo" className="sidebarlogoimage" />For Assessment
                            </a>
                        </li>
                        <li>
                            <a href="/DAforpayment" className="DAsidebar-link">
                            <img src="paymentlogo.svg" alt="Logo" className="sidebarlogoimage" />For Payment
                            </a>
                        </li>
                        <li>
                            <a href="/DAreleasedpermits" className="DAsidebar-link">
                            <img src="releasedpermitlogo.svg" alt="Logo" className="sidebarlogoimage" />Released Permits
                            </a>
                        </li>
                        <li>
                            <a href="/DAreportsngraph" className="DAsidebar-linkactive">
                            <img src="reportsngraphlogo.svg" alt="Logo" className="sidebarlogoimage" />Reports/Graphs
                            </a>
                        </li>
                        <li>
                            <a href="/" onClick={handleLogout} className="DAsidebar-link">
                            <img src="logoutlogo.svg" alt="Logo" className="sidebarlogoimage" />Log Out
                            </a>
                        </li>
                    </ul>
        </div>
    </div>

    <div className="DAcontent">
        <header className='DAheader'>
            <h1>Online Business and Work Permit Licensing System</h1>
        </header>
    </div>
    </section>
);

};

export default DataControllerReportandGraph;