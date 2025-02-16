import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import '../Styles/SuperAdminStyles.css';


interface DataController {
  userId: string;
  firstName: string;
  lastName: string;
  userrole: string;
  isOnline: boolean;
}

interface Admin {
  userId: string;
  firstName: string;
  lastName: string;
  userrole: string;
  isOnline: boolean;
}

interface UserLog {
  userId: string;
  firstName: string;
  lastName: string;
  lastLoginDate: string | null;
  lastLogoutDate: string | null;
}

interface OnlineUser {
  userId: string;
  firstName: string;
  lastName: string;
  userrole: string;
  isOnline: boolean;
}

const Logbook: React.FC = () => {
  const navigate = useNavigate();
  const [adminLogs, setAdminLogs] = useState<UserLog[]>([]);
  const [dataControllerLogs, setDataControllerLogs] = useState<UserLog[]>([]);
  const [dataControllers, setDataControllers] = useState<DataController[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/superadmin/getadminuser');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDataControllers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/superadmin/getdatacontrolleruser');
        setDataControllers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataControllers();
    fetchAdmins();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from the API
        const adminLogsResponse = await fetch('http://localhost:3000/superadmin/getadminuser');
        const dataControllerLogsResponse = await fetch('http://localhost:3000/superadmin/getdatacontrolleruser');
      
        // Check if any of the responses were not OK
        if (!adminLogsResponse.ok || !dataControllerLogsResponse.ok) {
          throw new Error('Error fetching data');
        }

        // Parsing JSON data
        const adminLogsData = await adminLogsResponse.json();
        const dataControllerLogsData = await dataControllerLogsResponse.json();

        // Setting state with fetched data
        setAdminLogs(adminLogsData);
        setDataControllerLogs(dataControllerLogsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const onlineAdmins = admins.filter(admin => admin.isOnline);
    const onlineDataControllers = dataControllers.filter(controller => controller.isOnline);
    setOnlineUsers([...onlineAdmins, ...onlineDataControllers]);
  }, [admins, dataControllers]);

  useEffect(() => {
    // Set up socket.io client
    const socket = io('http://localhost:5173');

    socket.on('statusUpdate', (data: { userId: string; isOnline: boolean }) => {
      setOnlineUsers((prev) => {
        const updatedUsers = prev.map(user => user.userId === data.userId ? { ...user, isOnline: data.isOnline } : user);
        return updatedUsers.some(user => user.userId === data.userId) ? updatedUsers : [...updatedUsers, { ...data, firstName: '', lastName: '', userrole: '' }];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
  
      if (response.ok) {
        // Clear any local storage data (if applicable)
        localStorage.removeItem('profile');
        localStorage.removeItem('userId');
  
        // Redirect to the login page
        navigate('/');
      } else {
        // Handle any errors from the server
        const errorData = await response.json();
        console.error('Logout error:', errorData.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/check-auth-superadmin', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          console.error('Access denied: No token');
          navigate('/superadmin/login');
          return;
        }

        if (response.status === 204) {
          console.log('Access Success');
          return;
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    checkAuth();
  }, [navigate]);

  if (error) {
    return <div>Error: {error}</div>; // Error message
  }

  return (
    <div className="SAbody">
      <div className="SAnavbar">
        <div className="logo">Logbook</div>
        <div className="user-actions">
          <a href="/superadmin/login" onClick={handleLogout} className="logout">Log Out</a>
          <span className="notification">&#128276;</span>
        </div>
      </div>

      <div className="top-actions">
          <div className="action-card">
            <div className="icon create-account"></div>
            <a href="/superadmin/accountadd">Create Account</a>
          </div>
          <div className="action-card">
            <div className="icon accounts"></div>
            <a href="/superadmin/dashboard">Dashboard</a>
          </div>
          <div className="action-card">
            <div className="icon accounts"></div>
            <a href="/superadmin/accounts">Accounts</a>
          </div>
        </div>

      {/* Grid Panels */}
      <div className="grid">
        {/* Admin Logbook Panel */}
        <div className="panel admin-logbook-panel">
          <h3 className="panel-header">Admin Logbook</h3>
          <table>
            <thead>
              <tr>
                <th>Time In</th>
                <th>Time Out</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {adminLogs.map(log => (
                <tr key={log.userId}>
                  <td>{log.lastLoginDate ? new Date(log.lastLoginDate).toLocaleString() : 'N/A'}</td>
                  <td>{log.lastLogoutDate ? new Date(log.lastLogoutDate).toLocaleString() : 'N/A'}</td>
                  <td>{log.firstName}</td>
                  <td>{log.lastName}</td>
                  <td>{log.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Data Controller Logbook Panel */}
        <div className="panel data-controller-logbook-panel">
          <h3 className="panel-header">Data Controller Logbook</h3>
          <table>
            <thead>
              <tr>
                <th>Time In</th>
                <th>Time Out</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {dataControllerLogs.map(log => (
                <tr key={log.userId}>
                  <td>{log.lastLoginDate ? new Date(log.lastLoginDate).toLocaleString() : 'N/A'}</td>
                  <td>{log.lastLogoutDate ? new Date(log.lastLogoutDate).toLocaleString() : 'N/A'}</td>
                  <td>{log.firstName}</td>
                  <td>{log.lastName}</td>
                  <td>{log.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Online Admins Panel */}
        <div className="panel online-accounts-panel">
          <h3 className="panel-header">Status Admins</h3>
          <div className="panel-searchbar">
            <h3>Search</h3>
            <input type="text" placeholder="Enter Employee Name or ID" className="search-box" />
          </div>
          <div className="panel-content">
            <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(user => (
                  <tr key={user.userId}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.userrole}</td>
                    <td>{user.isOnline ? 'Online' : 'Offline'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Online Data Controllers Panel */}
        <div className="panel online-accounts-panel">
          <h3 className="panel-header">Status Data Controllers</h3>
          <div className="panel-searchbar">
            <h3>Search</h3>
            <input type="text" placeholder="Enter Employee Name or ID" className="search-box" />
          </div>
          <div className="panel-content">
            <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dataControllers.map(user => (
                  <tr key={user.userId}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.userrole}</td>
                    <td>{user.isOnline ? 'Online' : 'Offline'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logbook;