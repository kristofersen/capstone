import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext'; // Adjust the import path as necessary
import '../Styles/SAdashboard.css';


interface DataController {
  userId: string;
  firstName: string;
  lastName: string;
  userrole: string;
  isOnline: boolean; // Added isOnline property
}

interface Admin {
  userId: string;
  firstName: string;
  lastName: string;
  userrole: string; 
  isOnline: boolean; // Added isOnline property
}

interface UserLog {
  userId: string;
  username: string;
  timeIn: string;
  timeOut: string;
}


const SuperAdminDashboard: React.FC = () => {

  const { isAuthenticated, user } = useAuth(); // Assuming `token` is available in `useAuth`
  const navigate = useNavigate();
  const [dataControllers, setDataControllers] = useState<DataController[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]); 
  const [onlineUsers, setOnlineUsers] = useState<(DataController | Admin)[]>([]);
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);

  useEffect(() => {
    // if (!isAuthenticated || user?.role !== 'superadmin') {
    //   navigate('/superadmin/login')
    // }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/adminusers');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDataControllers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/datacontrollers');
        setDataControllers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataControllers();
  fetchAdmins();
}, []);


// useEffect(() => {
//   fetch('http://localhost:3000/online-users')
//     .then(response => response.json())
//     .then(data => setOnlineUsers(data)) 
//     .catch(error => console.error('Error fetching online users:', error));
// }, []);

useEffect(() => {
  const fetchUserLogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/userlogs');
      setUserLogs(response.data);
    } catch (error) {
      console.error('Error fetching user logs:', error);
    }
  };

  fetchUserLogs();
}, []);

  
useEffect(() => {
  const onlineAdmins = admins.filter(admin => admin.isOnline);
  const onlineDataControllers = dataControllers.filter(controller => controller.isOnline);
  setOnlineUsers([...onlineAdmins, ...onlineDataControllers]);
}, [admins, dataControllers]);

  return (
    <div>
  {/* Navbar */}
  <div className="SAnavbar">
    <div className="logo">Dashboard</div>
    <div className="user-actions">
      <a href="/superadmin/login" className="logout">Log Out</a>
      <span className="notification">&#128276;</span>
    </div>
  </div>

  {/* Breadcrumb */}
  <div className="SAbreadcrumb">
    <span>Home / Dashboard</span>
  </div>

  {/* Main Dashboard Layout */}
  <div className="SAdashboard">
    {/* Top Action Buttons */}
    <div className="top-actions">
      <div className="action-card">
        <div className="icon create-account"></div>
        <a href="/superadmin/accountadd">Create Account</a>
      </div>
      <div className="action-card">
        <div className="icon accounts"></div>
        <a href="/superadmin/account">Accounts</a>
      </div>
      <div className="action-card">
        <div className="icon logbook"></div>
        <a href="/superadmin/logbooks">Logbook</a>
      </div>
    </div>

    {/* Grid Panels */}
    <div className="grid">
      {/* Admin Panel */}
      <div className="panel admin-panel">
        <div className="panel-header">
          <h3>Admin</h3>
        </div>
        <div className="panel-searchbar">
          <h3>Search</h3>
          <input type="text" placeholder="Enter Employee Name or ID" className="search-box" />
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
            {
            admins.map(admin => {
              return (
                <tr>
                   <td>{admin.userId}</td>
                  <td>{admin.firstName} {admin.lastName}</td>
                </tr>
              );
            })
            }
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Controller Panel */}
      <div className="panel data-controller-panel">
      <div className="panel-header">
          <h3>Data Controller</h3>
        </div>
        <div className="panel-searchbar">
          <h3>Search</h3>
          <input type="text" placeholder="Enter Employee Name or ID" className="search-box" />
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
              {
            dataControllers.map(dataController => {
              return (
                <tr>
                  <td>{dataController.userId}</td>
                  <td>{dataController.firstName} {dataController.lastName}</td>
                </tr>
              );
              })
            }
            </tbody>
          </table>
        </div>
      </div>

      {/* Logbook Panel */}
      <div className="panel logbook-panel">
      <div className="panel-header">
          <h3>Logbook</h3>
        </div>
        <div className="panel-searchbar">
          <h3>Search</h3>
          <input type="text" placeholder="Enter Employee Name or ID" className="search-box" />
        </div>
        <div className="panel-content">
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Time In</th>
                <th>Time Out</th>
              </tr>
            </thead>
            <tbody>
              {
            userLogs.map(log => {
              return (
            <tr key={log.userId}>
              <td>{log.userId}</td>
              <td>{new Date(log.timeIn).toLocaleString()}</td>
              <td>{new Date(log.timeOut).toLocaleString()}</td>
            </tr>
              );
            }
          )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Online Accounts Panel */}

      <div className="panel online-accounts-panel">
        <h3>Online Accounts</h3>
        <ul>
        {onlineUsers.map(user => (
          <li key={user.userId}>
            {user.firstName} {user.lastName} ({user.userrole})
          </li>
        ))}
        </ul>
      </div>
    </div>
  </div>
</div>

  );
};

export default SuperAdminDashboard;