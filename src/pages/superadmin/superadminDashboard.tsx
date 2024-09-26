import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Adjust the import path as necessary


// interface DataController {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   EmpID: string;
// }

// interface Admin {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   EmpID: string; 
// }

const SuperAdminDashboard: React.FC = () => {

  const { isAuthenticated, user } = useAuth(); // Assuming `token` is available in `useAuth`
  const navigate = useNavigate();
  // const [dataControllers, setDataControllers] = useState<DataController[]>([]);
  // const [admins, setAdmins] = useState<Admin[]>([]); // State for Admin data
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'superadmin') {
      navigate('/superadmin/login')
    }
  }, [isAuthenticated, user, navigate]);

  // useEffect(() => {
  //   const fetchDataControllers = async () => {
  //     try {
  //       const response = await fetch('/dataController', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       setDataControllers(data);
  //     } catch (error) {
  //       setError(error as Error);
  //     }
  //  };

  //   const fetchAdmins = async () => {
  //     try {
  //       const response = await fetch('/admin', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       setAdmins(data);
  //     } catch (error) {
  //       setError(error as Error);
  //     }
  //   };

  //   fetchDataControllers();
  //   fetchAdmins();
  // }, []);


  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.role !== 'superadmin') {
    return <div>Unauthorized access</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="menu-toggle">
          <span>&#9776;</span>
        </div>
        <div className="logo">Dashboard</div>
        <div className="user-actions">
          <a href="/superadmin/login" className="logout">Log Out</a>
          <span className="notification">&#128276;</span>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home / Dashboard</span>
      </div>

      {/* Main Dashboard Layout */}
      <div className="dashboard">
        {/* Top Action Buttons */}
        <div className="top-actions">
          <div className="action-card">
            <div className="icon create-account"></div>
            <a href="/accountadd">Create Account</a>
          </div>
          <div className="action-card">
            <div className="icon accounts"></div>
            <a href="/account">Accounts</a>
          </div>
          <div className="action-card">
            <div className="icon logbook"></div>
            <a href="/logbook">Logbook</a>
          </div>
        </div>

        {/* Grid Panels */}
        <div className="grid">
          {/* Admin Panel */}
          <div className="panel admin-panel">
          <div className="panel-header">
              <h3>Admin</h3>
              <input type="text" placeholder="Search..." className="search-box" />
            </div>
            <div className="panel-content">
                <table>
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Employee ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {admins.map((admin) => (
                      <tr key={admin._id}>
                        <td>{`${admin.firstName} ${admin.lastName}`}</td>
                        <td>{admin.EmpID}</td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
            </div>
          </div>

          {/* Data Controller Panel */}
          <div className="panel data-controller-panel">
            <div className="panel-header">
              <h3>Data Controller</h3>
              <input type="text" placeholder="Search..." className="search-box" />
            </div>
            <div className="panel-content">
                <table>
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Employee ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {dataControllers.map((controller) => (
                      <tr key={controller._id}>
                        <td>{`${controller.firstName} ${controller.lastName}`}</td>
                        <td>{controller.EmpID}</td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
            </div>
          </div>

          {/* Logbook Panel */}
          <div className="panel logbook-panel">
            <div className="panel-header">
              <h3>Logbook</h3>
              <input type="text" placeholder="Search..." className="search-box" />
            </div>
            <div className="panel-content">
              <table>
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>Date & Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Logbook rows */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Online Accounts Panel */}
          <div className="panel online-accounts-panel">
            <h3>Online Accounts</h3>
            <ul>
              {/* Online accounts rows */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;