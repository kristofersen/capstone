import '../Styles/DAforassessment.css'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface WorkPermit {
    _id: string;
    id: string;
    workpermitstatus: string;
  }


const DataControllerForAssessment: React.FC = () => {
    const [workPermits, setWorkPermits] = useState<WorkPermit[]>([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from 
        navigate('/'); // Redirect to home page
    };

    // CODE FOR TABLE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const [activePermit, setActivePermit] = useState<WorkPermit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(workPermits.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = workPermits.slice(startIndex, endIndex);
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

  const handleEdit = () => {
    if (activePermit) {
      console.log(`Edit permit ID: ${activePermit._id}`);
      navigate(`/DAviewapplicationdetails/${activePermit._id}`);
      // Implement your edit logic here
      closeModal(); // Close the modal after action
    }
  };

  const handleDelete = () => {
    if (activePermit) {
      console.log(`Delete permit ID: ${activePermit._id}`);
      // Implement your delete logic here
      closeModal(); // Close the modal after action
    }
  };
//END CODE FOR TABLE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to login if no token
      return;
    }
   
    const fetchWorkPermits = async () => {
      try {
        const response = await fetch('http://localhost:3000/getworkpermits', {
          method: 'GET',
          headers: {
   
            'Content-Type': 'application/json',
          },
        });
        
        const WorkPermitData = await response.json();
        setWorkPermits(WorkPermitData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchWorkPermits();

  }, [navigate, token]);

return (
    <section className="DAforassessment-container">
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
                            <a href="/DAforassessment" className="DAsidebar-linkactive">
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
                            <a href="/DAreportsngraph" className="DAsidebar-link">
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
        <div className='workpermittable'>
          <p>Work Permit For Assessment</p>
          <table className="permit-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((permit) => (
                <tr key={permit._id}>
                  <td>{permit.id}</td>
                  <td>{permit.workpermitstatus}</td>
                  <td>
                    <button onClick={() => openModal(permit)}>
                    <h3>Choose an Action for Permit ID: {permit.id}</h3> {/* Display the permit ID */}
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
                <button onClick={handleEdit}>View Application</button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </div>
          )}
        </div>
    </div>
    </section>
);

};

export default DataControllerForAssessment;