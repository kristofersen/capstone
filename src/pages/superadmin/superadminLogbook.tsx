import React, { useState, useEffect } from 'react';


interface LogEntry {
    employeeName: string;
    employeeID: string;
    dateTime: string;
    action: string;
}

interface OnlineEmployee {
    employeeName: string;
    employeeID: string;
}

const Logbook: React.FC = () => {
    const [adminLogs, setAdminLogs] = useState<LogEntry[]>([]);
    const [dataControllerLogs, setDataControllerLogs] = useState<LogEntry[]>([]);
    const [onlineAdmins, setOnlineAdmins] = useState<OnlineEmployee[]>([]);
    const [onlineDataControllers, setOnlineDataControllers] = useState<OnlineEmployee[]>([]);

    useEffect(() => {
        // Fetch data from the backend
        const fetchData = async () => {
            try {
                const adminLogsResponse = await fetch('http://localhost:3000/adminLogs');
                const dataControllerLogsResponse = await fetch('http://localhost:3000/dataControllerLogs');
                const onlineAdminsResponse = await fetch('/api/onlineAdmins');
                const onlineDataControllersResponse = await fetch('/api/onlineDataControllers');

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
        <div className="logbook-page">
            <header className="page-header">
                <h1>Logbook</h1>
                <a href="/home">Home / Logbook</a>
            </header>

            {/* Admin Logbook */}
            <section className="log-section">
                <h2>Admin</h2>
                <div className="filter-search">
                    <span>Filter:</span>
                    <input type="text" placeholder="" />
                    <span>Search:</span>
                    <input type="text" placeholder="" />
                </div>
                <table className="log-table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee ID</th>
                            <th>Date & Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminLogs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.employeeName}</td>
                                <td>{log.employeeID}</td>
                                <td>{log.dateTime}</td>
                                <td>{log.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Data Controller Logbook */}
            <section className="log-section">
                <h2>Data Controller</h2>
                <div className="filter-search">
                    <span>Filter:</span>
                    <input type="text" placeholder="" />
                    <span>Search:</span>
                    <input type="text" placeholder="" />
                </div>
                <table className="log-table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee ID</th>
                            <th>Date & Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataControllerLogs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.employeeName}</td>
                                <td>{log.employeeID}</td>
                                <td>{log.dateTime}</td>
                                <td>{log.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Currently Online Admin */}
            <section className="online-section">
                <h2>Currently Online Admin</h2>
                <table className="online-table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {onlineAdmins.map((admin, index) => (
                            <tr key={index}>
                                <td>
                                    <span className="status-indicator online"></span>
                                    {admin.employeeName}
                                </td>
                                <td>{admin.employeeID}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Currently Online Data Controller */}
            <section className="online-section">
                <h2>Currently Online Data Controller</h2>
                <table className="online-table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {onlineDataControllers.length === 0 ? (
                            <tr>
                                <td colSpan={2}>No Data Controllers Online</td>
                            </tr>
                        ) : (
                            onlineDataControllers.map((controller, index) => (
                                <tr key={index}>
                                    <td>
                                        <span className="status-indicator online"></span>
                                        {controller.employeeName}
                                    </td>
                                    <td>{controller.employeeID}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Logbook;
