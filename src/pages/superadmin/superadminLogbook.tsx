import React, { useState, useEffect } from 'react';

interface LogEntry {
    userId: string;
    firstName: string;
    lastName: string;
    dateTime: string;
    accountOpenedDate: string;
}

interface OnlineEmployee {
    userId: string;
    firstName: string;
    lastName: string;
    onlineStatus: boolean;
}

const Logbook: React.FC = () => {
    const [adminLogs, setAdminLogs] = useState<LogEntry[]>([]);
    const [dataControllerLogs, setDataControllerLogs] = useState<LogEntry[]>([]);
    const [onlineAdmins, setOnlineAdmins] = useState<OnlineEmployee[]>([]);
    const [onlineDataControllers, setOnlineDataControllers] = useState<OnlineEmployee[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminLogsResponse = await fetch('http://localhost:3000/adminusers');
                const dataControllerLogsResponse = await fetch('http://localhost:3000/datacontrollers');
                const onlineAdminsResponse = await fetch('http://localhost:3000/api/onlineAdmins');
                const onlineDataControllersResponse = await fetch('http://localhost:3000/api/onlineDataControllers');

                if (!adminLogsResponse.ok || !dataControllerLogsResponse.ok || !onlineAdminsResponse.ok || !onlineDataControllersResponse.ok) {
                    throw new Error('Error fetching data');
                }

                const adminLogsData = await adminLogsResponse.json();
                const dataControllerLogsData = await dataControllerLogsResponse.json();
                const onlineAdminsData = await onlineAdminsResponse.json();
                const onlineDataControllersData = await onlineDataControllersResponse.json();

                setAdminLogs(adminLogsData);
                setDataControllerLogs(dataControllerLogsData);
                setOnlineAdmins(onlineAdminsData);
                setOnlineDataControllers(onlineDataControllersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        
        <div>

            <div className="SAnavbar">
        <div className="logo">Logbook</div>
        <div className="user-actions">
          <a href="/superadmin/login" className="logout">Log Out</a>
          <span className="notification">&#128276;</span>
        </div>
      </div>
            <h1>Admin Logbook</h1>
            <table>
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>DateTime</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {adminLogs.map(log => {
                        return (
                            <tr key={log.userId}>
                            <td>{log.accountOpenedDate}</td>
                            <td>{log.dateTime}</td>
                            <td>{log.firstName}</td>
                            <td>{log.lastName}</td>
                            <td>{log.userId}</td>
                        </tr>
                        );
                    })
                }
                </tbody>
            </table>

            <h1>Data Controller Logbook</h1>
            <table>
                <thead>
                    <tr>
                        <th>DateTime</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {dataControllerLogs.map(log => {
                        return (
                            <tr key={log.userId}>
                            <td>{log.dateTime}</td>
                            <td>{log.firstName}</td>
                            <td>{log.lastName}</td>
                            <td>{log.userId}</td>
                        </tr>
                          );
                        })
                    }
                </tbody>
            </table>

            <h1>Online Admins</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {onlineAdmins.map(admin => {
                        return (
                            <tr key={admin.userId}>
                            <td>{admin.firstName}</td>
                            <td>{admin.lastName}</td>
                            <td>{admin.userId}</td>
                            <td>{admin.onlineStatus ? 'Online' : 'Offline'}</td>
                        </tr>
                        );
                    }
                )}
                </tbody>
            </table>

            <h1>Online Data Controllers</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {onlineDataControllers.map(controller => {
                        return (
                            <tr key={controller.userId}>
                            <td>{controller.firstName}</td>
                            <td>{controller.lastName}</td>
                            <td>{controller.userId}</td>
                            <td>{controller.onlineStatus ? 'Online' : 'Offline'}</td>
                        </tr>
                        );
                    } 
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Logbook;
