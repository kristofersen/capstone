import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/viewbusinessapplication.css';

const ViewBusinessApplication: React.FC = () => {
    const navigate = useNavigate();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); 
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false); 
    const [isPermitModalOpen, setIsPermitModalOpen] = useState(false); 
    const [isBusinessPermitApplicationModalOpen, setIsBusinessPermitApplicationModalOpen] = useState(false); 

    const handleLogout = () => {
        sessionStorage.clear(); 
        alert('You have been logged out.');
        navigate('/'); 
    };

    // Open/Close Modal Functions
    const openPaymentModal = () => setIsPaymentModalOpen(true);
    const closePaymentModal = () => setIsPaymentModalOpen(false);
    
    const openReceiptModal = () => setIsReceiptModalOpen(true);
    const closeReceiptModal = () => setIsReceiptModalOpen(false);
    
    const openPermitModal = () => setIsPermitModalOpen(true);
    const closePermitModal = () => setIsPermitModalOpen(false);
    
    const openBusinessPermitApplicationModal = () => setIsBusinessPermitApplicationModalOpen(true); 
    const closeBusinessPermitApplicationModal = () => setIsBusinessPermitApplicationModalOpen(false); 
    

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
                        <li><Link to="/viewapplication" className="sidebar-link">View Work Permit Applications</Link></li>
                        <li><Link to="/viewbusinessapplication" className="sidebar-linkactive">View Business Permit Applications</Link></li>
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
                    <div className="applicationStatusContainer">
                        <div className="applicationstatusBusinessPermit">
                            <h2>Current Application Status For Business Permit:</h2>
                            <button className='viewapplicationbutton' onClick={openBusinessPermitApplicationModal}>View Application</button>
                        </div>
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

                {/* View Application Modal for Business Permit */}
                {isBusinessPermitApplicationModalOpen && (
                    <div className="modal-overlay" onClick={closeBusinessPermitApplicationModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            {/* Owner Information Form */}
                            <form className="businesspermit-form">
                                <h2>Owner's Personal Information</h2>
                                <div className="form-group">
                                    <label>
                                        <input type="checkbox" name="checkifcorporation" />
                                        Check if Corporation
                                    </label>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>LAST NAME:</label>
                                        <input type="text" name="lastName" />
                                    </div>
                                    <div className="form-group">
                                        <label>FIRST NAME:</label>
                                        <input type="text" name="firstName" />
                                    </div>
                                    <div className="form-group">
                                        <label>MIDDLE INITIAL:</label>
                                        <input type="text" name="middleInitial" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>CIVIL STATUS:</label>
                                    <input type="text" name="civilStatus" />
                                </div>
                                <div className="form-group gender-group">
                                    <label>GENDER:</label>
                                    <label>
                                        <input type="radio" name="gender" value="male" />
                                        Male
                                    </label>
                                    <label>
                                        <input type="radio" name="gender" value="female" />
                                        Female
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>CITIZENSHIP:</label>
                                    <input type="text" name="citizenship" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>TIN NUMBER:</label>
                                        <input type="text" name="tinNumber" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <input type="checkbox" name="checkIfRepresentative" id="checkIfRepresentative"/>
                                        Check if Thru Representative
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Representative Full Name:</label>
                                    <input type="text" name="representative.fullName" />
                                </div>
                                <div className="form-group">
                                    <label>Designation/Position:</label>
                                    <input type="text" name="representative.designation" />
                                </div>
                                <div className="form-group">
                                    <label>Representative Mobile Number:</label>
                                    <input type="text" name="representative.mobileNumber" />
                                </div>

                                {/* Business Reference Form */}
                                <h2>Business Reference Form</h2>
                                <div className="form-group">
                                    <label>Business Name:</label>
                                    <input type="text" name="businessName" />
                                </div>
                                <div className="form-group">
                                    <label>Business Scale:</label>
                                    <input type="text" name="businessScale" />
                                </div>
                                <div className="form-group">
                                    <label>Payment Method:</label>
                                    <input type="text" name="paymentMethod" />
                                </div>
                                <div className="form-group">
                                    <label>House/Bldg No./Blk and Lot:</label>
                                    <input type="text" name="houseBuildingNo" />
                                </div>
                                <div className="form-group">
                                    <label>Building Name/Street Name:</label>
                                    <input type="text" name="buildingStreetName" />
                                </div>
                                <div className="form-group">
                                    <label>Subdivision/Compound Name:</label>
                                    <input type="text" name="subdivisionCompoundName"/>
                                </div>
                                <div className="form-group">
                                    <label>Region:</label>
                                    <input type="text" name="region" />
                                </div>
                                <div className="form-group">
                                    <label>Province:</label>
                                    <input type="text" name="province"/>
                                </div>
                                <div className="form-group">
                                    <label>City/Municipality:</label>
                                    <input type="text" name="cityMunicipality" />
                                </div>
                                <div className="form-group">
                                    <label>Barangay:</label>
                                    <input type="text" name="barangay" />
                                </div>
                                <div className="form-group">
                                    <label>Business Street:</label>
                                    <input type="text" name="businessStreet" />
                                </div>
                                <div className="form-group">
                                    <label>Zone:</label>
                                    <input type="text" name="zone"/>
                                </div>
                                <div className="form-group">
                                    <label>Zip:</label>
                                    <input type="text" name="zip"/>
                                </div>
                                <div className="form-group">
                                    <label>Contact Number:</label>
                                    <input type="text" name="contactNumber"/>
                                </div>
                            </form>
                            <button className='closebuttonmodalviewapplication' onClick={closeBusinessPermitApplicationModal}>Close</button>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default ViewBusinessApplication;
