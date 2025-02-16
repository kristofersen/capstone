
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import '../Styles/SuperAdminStyles.css';
import { useNavigate } from 'react-router-dom';

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

const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dataControllers, setDataControllers] = useState<DataController[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);


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
    const fetchUserLogs = async () => {
      try {
        const adminResponse = await axios.get('http://localhost:3000/superadmin/getadminuser');
        const datacontrollerResponse = await axios.get('http://localhost:3000/superadmin/getdatacontrolleruser');
        setUserLogs([...adminResponse.data, ...datacontrollerResponse.data]);
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


  return (
    <div>
      {/* Navbar */}
      <div className="SAnavbar">
        <div className="logo">Dashboard</div>
        <div className="user-actions">
          <a href="/superadmin/login" onClick={handleLogout} className="logout">Log Out</a>
        </div>
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
            <a href="/superadmin/accounts">Accounts</a>
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
                  {admins.map(admin => (
                    <tr key={admin.userId}>
                      <td>{admin.userId}</td>
                      <td>{admin.firstName} {admin.lastName}</td>
                    </tr>
                  ))}
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
                  {dataControllers.map(dataController => (
                    <tr key={dataController.userId}>
                      <td>{dataController.userId}</td>
                      <td>{dataController.firstName} {dataController.lastName}</td>
                    </tr>
                  ))}
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
                  </tr>
                </thead>
                <tbody>
                  {userLogs.map(log => (
                    <tr key={log.userId}>
                      <td>{log.firstName} {log.lastName}</td>
                      <td>{log.userId}</td>
                      <td>{log.lastLoginDate ? new Date(log.lastLoginDate).toLocaleString() : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Online Accounts Panel */}
          <div className="panel online-accounts-panel">
            <div className="panel-header">
              <h3>Online Accounts</h3>
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
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {onlineUsers.map(online => (
                    <tr key={online.userId}>
                      <td>{online.firstName} {online.lastName}</td>
                      <td>{online.userrole}</td>
                      <td>{online.isOnline ? 'Online' : 'Offline'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;