import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/viewapplication.css';

const ViewApplication: React.FC = () => {
    const navigate = useNavigate();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State to manage Payment modal visibility
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false); // State to manage Receipt modal visibility
    const [isPermitModalOpen, setIsPermitModalOpen] = useState(false); // State to manage Permit modal visibility

    const handleLogout = () => {
        sessionStorage.clear(); // Example: clear session storage
        alert('You have been logged out.');
        navigate('/'); // Redirect to home or login page
    };

    // Open/Close Modal Functions
    const openPaymentModal = () => {
        setIsPaymentModalOpen(true); // Open the payment modal
    };

    const closePaymentModal = () => {
        setIsPaymentModalOpen(false); // Close the payment modal
    };

    const openReceiptModal = () => {
        setIsReceiptModalOpen(true); // Open the receipt modal
    };

    const closeReceiptModal = () => {
        setIsReceiptModalOpen(false); // Close the receipt modal
    };

    const openPermitModal = () => {
        setIsPermitModalOpen(true); // Open the permit modal
    };

    const closePermitModal = () => {
        setIsPermitModalOpen(false); // Close the permit modal
    };

    return (
        <section className="dashboard-container">
            <div className="sidebar-container">
                <div className="sidebar">
                    <div className="sidebar-logo">
                        <img src="/obpwlslogo.svg" alt="Logo" className="logo-image" />
                    </div>
                    <ul className="sidebar-list">
                        <li><Link to="/dashboard" className="sidebar-link">Dashboard</Link></li>
                        <li><Link to="/workpermitpage" className="sidebar-link">Apply for Work Permit</Link></li>
                        <li><Link to="/businesspermitpage" className="sidebar-link">Apply for Business Permit</Link></li>
                        <li><Link to="/viewapplication" className="sidebar-linkactive">View Applications</Link></li>
                        <li><Link to="/" onClick={handleLogout} className="sidebar-link">Log Out</Link></li>
                    </ul>
                </div>
            </div>

            <div className="content">
                <header>
                    <h1>View Applications</h1>
                    <nav>
                        <ul>
                            <li><Link to="/account" className="button">Account</Link></li>
                            <li><Link to="/" onClick={handleLogout} className="button">Logout</Link></li>
                        </ul>
                    </nav>
                </header>

                <div className="contentcontainer">
                    <div className="applicationstatus">
                        <h2>Current Application Status: </h2>
                    </div>
                    <div className="paymentandviewpermitcontainer">
                        <div className="payment">
                            <h2>Payment</h2>
                            <div className='paymentbuttoncontainer'>
                                <button className='paybutton' onClick={openPaymentModal}>Pay</button>
                                <button className='viewReceiptbutton' onClick={openReceiptModal}>View Receipt</button>
                            </div>
                        </div>
                        <div className="viewpermit">
                            <h2>Recently Released Permit:</h2>
                            <button className='viewpermitbutton' onClick={openPermitModal}>View Permit</button>
                        </div>
                    </div>
                </div>

                <div className="application-history-container">
                    <h2 className="table-title">Application History</h2>
                    <table className="application-history-table">
                        <thead>
                            <tr>
                                <th>Application Type</th>
                                <th>Application Status</th>
                                <th>Application Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Business Permit</td>
                                <td>Approved</td>
                                <td>2024-09-10</td>
                            </tr>
                            <tr>
                                <td>Work Permit</td>
                                <td>Approved</td>
                                <td>2024-09-15</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Payment Modal */}
                {isPaymentModalOpen && (
                    <div className="modal-overlay" onClick={closePaymentModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Payment</h2>
                            <p>Choose your payment method:</p>
                            <div className='paymentbuttons'>
                                <p>E-Wallet/Gcash</p>
                                <p>Pay at Counter/Cash</p>
                                <p>Online Banking</p>
                            </div>
                            <button className='closebuttonmodalpayment' onClick={closePaymentModal}>Close</button>
                        </div>
                    </div>
                )}

                {/* Receipt Modal */}
                {isReceiptModalOpen && (
                    <div className="modal-overlay" onClick={closeReceiptModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Receipt</h2>
                            <p>Here is your payment receipt:</p>
                            <p>Receipt No: 123456789</p>
                            <p>Date: 2024-09-15</p>
                            <button className='closebuttonmodalviewreceipt' onClick={closeReceiptModal}>Close</button>
                        </div>
                    </div>
                )}

                {/* View Permit Modal */}
                {isPermitModalOpen && (
                    <div className="modal-overlay" onClick={closePermitModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Recently Released Permit</h2>
                            <p>Permit ID: 987654321</p>
                            <p>Date Issued: 2024-09-15</p>
                            <button className='closebuttonmodalviewpermit' onClick={closePermitModal}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ViewApplication;
