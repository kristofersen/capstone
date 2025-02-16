import '../Styles/AdminStyles.css';
import React, { useEffect, useState } from 'react';
import AdminSideBar from '../components/NavigationBars/AdminSideBar';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js
import * as XLSX from 'xlsx';

const AdminReportsAndGraph: React.FC = () => {
  interface LocationData {
    labels: string[];
    data: number[];
    _id: string;
    count: number;
  }
  interface MonthlyData {
    _id: string;
    count: number;
    labels: string[];
    paid: number[];
    unpaid: number[];
    month: string;
  }
  interface WorkPermitData {
    labels: string[];
    data: number[];
    _id: string;
    count: number;
    month: string;
  }
  interface BusinessPermitData {
    labels: string[];
    data: number[];
    _id: string;
    count: number;
    month: string;
  }

  interface ExcelData {
    [key: string]: string | number;

  }

  const navigate = useNavigate();
  const [locationData, setLocationData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });
  const [monthlyData, setMonthlyData] = useState<{ labels: string[], paid: number[], unpaid: number[] }>({ labels: [], paid: [], unpaid: [] });
  const [workPermitData, setWorkPermitData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });
  const [businessPermitData, setBusinessPermitData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });

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

    const barangays = [
      "Burol I", "Burol II", "Burol III", "Datu Esmael", "Datu Esmael II", "Fatima I", "Fatima II", "Fatima III",
      "Fatima IV", "Fatima V", "Fatima VI", "Langkaan I", "Langkaan II", "Paliparan I", "Paliparan II", "Paliparan III",
      "Salawag", "Sampaloc I", "Sampaloc II", "Sampaloc III", "Sampaloc IV", "Sampaloc V", "San Agustin I", "San Agustin II",
      "San Agustin III", "San Agustin IV", "San Andres I", "San Andres II", "San Andres III", "San Andres IV",
      "San Antonio de Padua I", "San Antonio de Padua II", "San Esteban", "San Francisco", "San Isidro Labrador I",
      "San Isidro Labrador II", "San Juan Bautista I", "San Juan Bautista II", "San Lorenzo Ruiz I", "San Lorenzo Ruiz II",
      "Rural Barangays", "Sabang", "Salitran I", "Salitran II", "Salitran III", "Salitran IV", "Salitran V", "Salitran VI",
      "San Jose", "San Miguel", "San Nicolas I", "San Nicolas II", "San Roque", "Santa Cruz I", "Santa Cruz II",
      "Santa Cruz III", "Santa Cruz IV", "Santa Fe", "Santiago", "Santo Cristo", "Santo Domingo", "Santo Niño I",
      "Santo Niño II", "Santo Niño III", "Zone I", "Zone II", "Zone III", "Zone IV", "Zone V", "Zone VI", "Zone VII",
      "Zone VIII", "Zone IX", "Zone X", "Zone XI", "Zone XII"
    ];

    fetch('http://localhost:3000/datacontroller/graphbusinesspermitlocation')
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter((item: LocationData) => barangays.includes(item._id));
        const labels = filteredData.map((item: LocationData) => item._id);
        const counts = filteredData.map((item: LocationData) => item.count);
        setLocationData({ labels, data: counts });
      })
      .catch(error => console.error('Error fetching location data:', error));

    fetch('http://localhost:3000/datacontroller/graphmonthlypaymentstatus')
      .then(response => response.json())
      .then(data => {
        const labels = data.map((item: MonthlyData) => item.month);
        const paid = data.map((item: MonthlyData) => item.paid);
        const unpaid = data.map((item: MonthlyData) => item.unpaid);
        setMonthlyData({ labels, paid, unpaid });
      })
      .catch(error => console.error('Error fetching monthly payment data:', error));

    fetch('http://localhost:3000/datacontroller/graphpermitapplicationcategory')
      .then(response => response.json())
      .then(data => {
        const labels = data.map((item: WorkPermitData) => item.month);
        const counts = data.map((item: WorkPermitData) => item.count);
        setWorkPermitData({ labels, data: counts });
      })
      .catch(error => console.error('Error fetching work permit data:', error));

    fetch('http://localhost:3000/datacontroller/businesspermitmonthlyappication')
      .then(response => response.json())
      .then(data => {
        const labels = data.map((item: BusinessPermitData) => item.month);
        const counts = data.map((item: BusinessPermitData) => item.count);
        setBusinessPermitData({ labels, data: counts });
      })
      .catch(error => console.error('Error fetching business permit data:', error));
  }, [navigate]);

  const downloadExcel = (data: ExcelData[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const handlePieClick = () => {
    const data = locationData.labels.map((label, index) => ({
      Barangay: label,
      Count: locationData.data[index]
    }));
    downloadExcel(data, 'BusinessPermitLocations');
  };

  const handleBarClick = () => {
    const data = monthlyData.labels.map((label, index) => ({
      Month: label,
      Paid: monthlyData.paid[index],
      Unpaid: monthlyData.unpaid[index]
    }));
    downloadExcel(data, 'MonthlyPaymentStatus');
  };

  const pieData = {
    labels: locationData.labels,
    datasets: [
      {
        data: locationData.data,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB',
          '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB',
          '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40'
        ]
      }
    ]
  };

  const barData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Paid',
        data: monthlyData.paid,
        backgroundColor: '#36A2EB'
      },
      {
                label: 'Unpaid',
                data: monthlyData.unpaid,
                backgroundColor: '#FF6384'
            }
        ]
    };

    const workPermitChartData = {
        labels: workPermitData.labels,
        datasets: [
          {
            label: 'Work Permit Applications',
            data: workPermitData.data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      };
    
      const businessPermitChartData = {
        labels: businessPermitData.labels,
        datasets: [
          {
            label: 'Business Permit Applications',
            data: businessPermitData.data,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
          },
        ],
      };

    return (
        <section className="Abody">
            <div className="Asidebar-container">
                <AdminSideBar />
            </div>
            <div className="Acontent">
                <header className='DAheader'>
                    <h1>Online Business and Work Permit Licensing System</h1>
                </header>
                <div className="DAchart-container">
                    <div className="DAchart" onClick={handlePieClick}>
                        <h2>Business Permit Locations</h2>
                        {pieData.datasets[0].data.length > 0 ? (
                            <Doughnut data={pieData} />
                        ) : (
                            <p>There is no data</p>
                        )}
                    </div>
                    <div className="DAchart" onClick={handleBarClick}>
                        <h2>Monthly Payment Status</h2>
                        {barData.datasets[0].data.length > 0 ? (
                            <Bar data={barData} />
                        ) : (
                            <p>There is no data</p>
                        )}
                    </div>
                    <div className="DAchart">
                        <h2>Monthly Applications Trend Business</h2>
                        {businessPermitChartData.datasets[0].data.length > 0 ? (
                            <Line data={businessPermitChartData} />
                        ) : (
                            <p>There is no data</p>
                        )}
                    </div>
                    <div className="DAchart">
                        <h2>Monthly Applications Trend Work</h2>    
                        {workPermitChartData.datasets[0].data.length > 0 ? (
                            <Line data={workPermitChartData} />
                        ) : (
                            <p>There is no data</p>
                        )}
                        </div>
                </div>
            </div>
        </section>
    );
}

export default AdminReportsAndGraph;