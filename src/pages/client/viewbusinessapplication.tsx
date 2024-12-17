
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../Styles/ClientStyles.css';
import ClientSideBar from '../components/ClientSideBar';
import React from 'react';
import axios from 'axios';

export interface BusinessPermit {
    _id: string;
    id: string;
    userId: string;
    permittype?: string;
    businesspermitstatus?: string;
    businessstatus?: string;
    classification?: string;
    transaction?: string;
    amountToPay?: string;
    permitFile?: string;
    permitDateIssued?: string;
    permitExpiryDate?: string;
    expiryDate?: string;
    applicationdateIssued: Date;
    applicationComments?: string;
  
    owner: Owner;
    business: Business;
    otherbusinessinfo: OtherBusiness;
    mapview: MapView;
    businesses: Businesses[];
    files: Files;
    department: Department; // Change to object with key-value pairs
    statementofaccount: Statement;
  
    createdAt?: string;
  }
  
  export interface Owner {
  corporation?: boolean;
  lastname?: string;
  firstname?: string;
  middleinitial?: string;
  civilstatus?: string;
  companyname?: string;
  gender?: string;
  citizenship?: string;
  tinnumber?: string;
  representative?: boolean;
  houseandlot?: string;
  buildingstreetname?: string;
  subdivision?: string;
  region?: string;
  province?: string;
  municipality?: string;
  barangay?: string;
  telephonenumber?: string;
  mobilenumber?: string;
  email?: string;
  representativedetails?: RepDetails;
  }
  
  export interface RepDetails {
  repfullname: string,
  repdesignation: string,
  repmobilenumber: string,
  }
  
  export interface Business {
  businessname?: string,
  businessscale?: string,
  paymentmethod?: string,
  businessbuildingblocklot?: string,
  businessbuildingname?: string,
  businesssubcompname?: string,
  businessregion?: string,
  businessprovince?: string,
  businessmunicipality?: string,
  businessbarangay?: string,
  businesszip?: string,
  businesscontactnumber?: string,
  ownershiptype?: string,
  agencyregistered?: string,
  dtiregistrationnum?: string,
  dtiregistrationdate?: string,
  dtiregistrationexpdate?: string,
  secregistrationnum?: string,
  birregistrationnum?: string,
  industrysector?: string,
  businessoperation?: string,
  typeofbusiness?: string,
  
  }
  
  export interface OtherBusiness {
  dateestablished?: string,
  startdate?: string,
  occupancy?: string,
  otherbusinesstype?: string,
  businessemail?: string,
  businessarea?: string,
  businesslotarea?: string,
  numofworkermale?: string,
  numofworkerfemale?: string,
  numofworkertotal?: string,
  numofworkerlgu?: string,
  lessorfullname?: string,
  lessormobilenumber?: string,
  monthlyrent?: string,
  lessorfulladdress?: string,
  lessoremailaddress?: string,
  }
  
  export interface MapView{
  lat: string,
  lng: string,
  }
  
  export interface Businesses {
  _id: string;
  businessNature: string;
  businessType: string;
  capitalInvestment: string;
  }
  
  
  export interface Department{
   
    Zoning: string;
    OffBldOfcl: string;
    CtyHlthOff: string;
    BreuFrPrt: string;
  
  }
  
  export interface Files {
  document1: string | null; // Optional
  document2: string | null; // Optional
  document3: string | null; // Optional
  document4: string | null; // Optional
  document5: string | null; // Optional
  document6: string | null; // Optional
  remarksdoc1: string;
  remarksdoc2: string;
  remarksdoc3: string;
  remarksdoc4: string;
  remarksdoc5: string;
  remarksdoc6: string;
  }

  export interface Statement{
    permitassessed: string;
    dateassessed: string;
    mayorspermit: string;
    sanitary:  string;
    health:  string;
    businessplate:  string;
    zoningclearance:  string;
    annualInspection:  string;
    environmental:  string;
    miscfee:  string;
    liquortobaco:  string;
    liquorplate:  string;
    statementofaccountfile: string;
}
  

  interface GroupedBusinessPermit {
    _id?: string;
    id: string; // Business ID
    permits: BusinessPermit[]; // Array of BusinessPermit
  }
  
const ViewBusinessApplication: React.FC = () => {
    const navigate = useNavigate();
    const [businessPermits, setBusinessPermits] = useState<GroupedBusinessPermit[]>([]);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const [activePermitId, setActivePermitId] = useState<BusinessPermit | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    //Payment Modal
    const [viewpayment, setViewPayment] = useState(false);



    //Logout
    const handleLogout = () => {
        sessionStorage.clear(); 
        alert('You have been logged out.');
        navigate('/'); 
    };


  useEffect(() => {
    const fetchBusinessPermits = async () => {
      try {
        const response = await fetch('http://localhost:3000/client/business-permits', {
          method: 'GET',
          credentials: 'include', // Ensure cookies (containing the token) are sent
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const businessPermitData = await response.json();
        setBusinessPermits(businessPermitData);
      } catch (error) {
        console.error('Error fetching business permits:', error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchBusinessPermits();
  }, []);


  // Toggle the visibility of past permits for a specific business ID
  const toggleRowExpansion = (businessId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(businessId)) {
        newSet.delete(businessId);
      } else {
        newSet.add(businessId);
      }
      return newSet;
    });
  };
  
  const closeviewpayment = () => {
    setViewPayment(false);
    setActivePermitId(null);

  };

  const handlePrint = () => {
    if (!activePermitId || !activePermitId.statementofaccount?.statementofaccountfile) {
      console.warn("No active permit or file URL available for printing.");
      return; // Exit if there is no active permit or file URL
    }
  
    const fileUrl = fetchDocumentUrl(activePermitId.statementofaccount.statementofaccountfile, 'receipts');
    
    // Open a new window
    const newWindow = window.open('', '', 'height=500,width=800');
    
    if (newWindow) {
    
      
      // Embed the PDF file using iframe
      newWindow.document.write(`
        <iframe
          src="${fileUrl}"
          style="width: 100%; height: 100%; border: none;"
          title="PDF Viewer"
        ></iframe>
      `);
      newWindow.document.close();  // Ensure the document is fully loaded
  
      // Wait for the content to load, then print
      newWindow.onload = () => {
        newWindow.print();  // Open the print dialog
      };
    }
  };
  
  // Function to handle the payment update
  const handlePayment = async () => {
    try {
      // Call the API to update the payment status
      const response = await axios.put(`http://localhost:3000/client/updatepayments/${activePermitId?._id}`, {
        paymentStatus: 'Paid',
        businesspermitstatus: 'Released'
      });

      if (response.status === 200) {
        console.log('Payment status updated successfully');
      } else {
        console.error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };



      const fetchDocumentUrl = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts'): string | null => {
        if (!fileName) return null;
        
        // Return the file URL based on the folder specified
        return `http://localhost:3000/datacontroller/${folder}/${fileName}`;
      };
  const renderFile = (fileUrl: string | null) => {
    if (!fileUrl) return <p>No file selected.</p>;

    if (fileUrl.endsWith('.pdf')) {
      return (
        <iframe
          src={fileUrl}
          style={{ width: '100%', height: '400px', marginTop: '10px' }}
          title="PDF Viewer"
        />
      );
    } else {
      return (
        <img
          src={fileUrl}
          alt="Document"
          style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
        />
      );
    }
  };

  const handleActionBP = (action: string,  permitId: BusinessPermit) => {
    console.log(permitId._id);
    setActivePermitId(null);
  
    switch (action) {
      case 'editowner':
        setActivePermitId(permitId);  // Set the selected permit
        break;
      case 'payment':
        setViewPayment(true);
        setActivePermitId(permitId);
        break;
      case 'renewbusiness':
        navigate(`/businesspermitrenew/${permitId._id}`);
        break;
  
  
      default:
        console.warn('Unknown action');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

    return (
        <section className="dashboard-container">
            <div className="sidebar-container">
            <ClientSideBar handleLogout={handleLogout} /> {/* Pass handleLogout to ClientSideBar */}
            </div>

            <div className="content">
                <header>
                    <h1>View Business Permit Applications</h1>
                </header>
                

                <div className='businesspermitcontainer'>
                <p>Business Permits</p>
      <table className="permit-table">
        <thead>
          <tr>
            <th>Business Information</th>
            <th>Business ID</th>
            <th>Status</th>
            <th>Application Date</th>
            <th>Business Status</th>
            <th>Show Previous</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {businessPermits.map((group) => {
            const isExpanded = expandedRows.has(group.id);
            return (
              <React.Fragment key={group.id}>
                <tr>
                  <td>{group.permits[0].business?.businessname || 'N/A'}</td>
                  <td>{group.id}</td>
                  <td>{group.permits[0].businesspermitstatus || 'N/A'}</td>
                  <td>
                    {group.permits[0].applicationdateIssued
                      ? new Date(group.permits[0].applicationdateIssued).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>{group.permits[0].businessstatus || 'N/A'}</td>
                  <td>
                    <button className="table-button" onClick={() => toggleRowExpansion(group.id)}>
                      {isExpanded ? 'Hide Past Permits' : 'Show Past Permits'}
                    </button>
                  </td>
                  <td>
                  <select
            defaultValue=""
            onChange={(e) => {
 handleActionBP(e.target.value, group.permits[0]);  // Pass action and permit to handler
 e.target.value = ""; // Reset dropdown to default after selection
            }}
            className="dropdown-button"
          >
            <option value="" disabled>
              Select Action
            </option>
              <>
                <option value="viewApplication">View Application</option>
                <option value="assessment">View Assessment</option>
                <option value="department">Department</option>
                  {/* Conditionally render the "Payment" option */}
  {group.permits[0].businesspermitstatus === 'Waiting for Payment' && (
    <option value="payment">Payment</option>
  )}
    {group.permits[0].businessstatus === 'Active' && (
    <option>Retire Business</option>
  )}
      {group.permits[0].businesspermitstatus === 'Expired' && (
    <option value="renewbusiness">Renew Business</option>
  )}
   <option value="renewbusiness">Renew Business</option>
              </>
          </select>
                  </td>
                </tr>
                {isExpanded &&
                  group.permits.slice(1).map((permit, index) => (
                    <tr key={`${group.id}-${index}`} className="past-permit-row">
                      <td>{permit.business?.businessname || 'N/A'}</td>
                      <td>{group.id}</td>
                      <td>{permit.businesspermitstatus || 'N/A'}</td>
                      <td>
                        {permit.applicationdateIssued
                          ? new Date(permit.applicationdateIssued).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td>{permit.businessstatus || 'N/A'}</td>
                      <td></td>
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
            {viewpayment && activePermitId &&(
              <div className="modal-overlay" onClick={closeviewpayment}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <label>{activePermitId._id}</label>
                  <label>{activePermitId.statementofaccount.statementofaccountfile}</label>

                        {/* Render the PDF or image file */}
      {renderFile(fetchDocumentUrl(activePermitId.statementofaccount?.statementofaccountfile, 'receipts'))}

      <button onClick={handlePrint}>Print</button>
      <button onClick={handlePayment}>Pay</button> {/* Add the handler for Pay button */}
          </div>
        </div>
            )}
            </div>


            </div>
        </section>
    );
};

export default ViewBusinessApplication;
