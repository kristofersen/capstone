import '../Styles/DataControllerStyles.css'; 
import DASidebar from '../components/NavigationBars/DAsidebar';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';// Import your CSS file
import MapLocationView from '../components/MapContents/MapLocationView';

export interface BusinessPermit {
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
  applicationdateIssued?: string;
  applicationComments?: string;

  owner: Owner;
  business: Business;
  otherbusinessinfo: OtherBusiness;
  mapview: MapView;
  businesses: Businesses[];
  files: Files;
  department: Department; // Change to object with key-value pairs

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
}


const DataControllerViewApplicationDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Extract work permit ID from URL
    const [businessPermit, setBusinessPermit] = useState<BusinessPermit | null>(null);
    const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
    const [modalFile, setModalFile] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch('http://localhost:3000/auth/check-auth-datacontroller', {
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
    }, [navigate]); // Only depend on navigate, which is necessary for the redirection

    useEffect(() => {
      const fetchBusinessPermitDetails = async () => {
          if (!token) {
              navigate('/'); // Redirect to login if no token
              return;
            } 
        try {
          console.log(id);
          const response = await axios.get(`http://localhost:3000/datacontroller/businesspermitdetails/${id}`, {

          });
          setBusinessPermit(response.data as BusinessPermit); // Set the work permit details to state
        } catch (error) {
          console.error('Error fetching business permit details:', error);
       
        } }
  
        fetchBusinessPermitDetails(); // Call the fetch function
    }, [id, token, navigate]);



//End REJECT MODAL @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      const openModal = (filePath: string) => {
        setModalFile(filePath);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setModalFile(null);
      };
    
      const fetchDocumentUrl = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts' ): string | null => {
        if (!fileName) return null;
        
        // Return the file URL based on the folder specified
        return `http://localhost:3000/${folder}/${fileName}`;
      };
      
    const renderDocument = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts') => {
      const fileUrl = fetchDocumentUrl(fileName, folder);
      console.log(fileUrl);
      if (!fileUrl) return <span>Not uploaded</span>;
    
      const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
      console.log(fileExtension);
      return (
        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => openModal(fileUrl)}>
          {fileExtension === 'pdf' ? 'View PDF' : 'View Document'}
        </span>
      );
    };

   
  

return (
    <section className="DAbody">
        <div className="DAsidebar-container">
        <DASidebar /> {/* Pass handleLogout to DASidebar */}
      </div>
      <div className="DAcontent">
        <header className='DAheader'>
            <h1>Online Business and Work Permit Licensing System</h1>
        </header>
        <div>

        <div className="panel">
  <h1>Business Permit Details</h1>
  {businessPermit ? (
    <>
      <div className="section">
        <p><strong>Date Issued:</strong> {businessPermit.createdAt ? new Date(businessPermit.createdAt).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Business Permit Status:</strong> {businessPermit.businesspermitstatus}</p>
      </div>

      <h1>Personal Information Details</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'left' }}>
        <p><strong>Application ID:</strong> {businessPermit.id}</p>
        {businessPermit?.owner?.corporation ? (
          <p><strong>Company Name:</strong> {businessPermit.owner.companyname}</p>
        ) : (
          <>
            <p><strong>Full Name:</strong> {`${businessPermit.owner?.lastname}, ${businessPermit.owner?.firstname} ${businessPermit.owner?.middleinitial}`}</p>
            <p><strong>Civil Status:</strong> {businessPermit.owner?.civilstatus}</p>
            <p><strong>Gender:</strong> {businessPermit.owner?.gender}</p>
          </>
        )}
        <p><strong>Citizenship:</strong> {businessPermit.owner?.citizenship}</p>
        <p><strong>TIN Number:</strong> {businessPermit.owner?.tinnumber}</p>
        {businessPermit?.owner?.representative && businessPermit.owner.representativedetails && (
          <>
            <p><strong>Representative Full Name:</strong> {businessPermit.owner.representativedetails?.repfullname}</p>
            <p><strong>Representative Designation:</strong> {businessPermit.owner.representativedetails?.repdesignation}</p>
            <p><strong>Representative Mobile Number:</strong> {businessPermit.owner.representativedetails?.repmobilenumber}</p>
          </>
        )}
      </div>

      <h1>Contact Information</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'left' }}>
        <p><strong>House/Bldg No./Blk and Lot:</strong> {businessPermit.owner?.houseandlot}</p>
        <p><strong>Building Name / Street Name:</strong> {businessPermit.owner?.buildingstreetname}</p>
        <p><strong>Subdivision / Compound Name:</strong> {businessPermit.owner?.subdivision}</p>
        <p><strong>Region:</strong> {businessPermit.owner?.region}</p>
        <p><strong>Province:</strong> {businessPermit.owner?.province}</p>
        <p><strong>Municipality:</strong> {businessPermit.owner?.municipality}</p>
        <p><strong>Barangay:</strong> {businessPermit.owner?.barangay}</p>
        <p><strong>Telephone Number:</strong> {businessPermit.owner?.telephonenumber}</p>
        <p><strong>Mobile Number:</strong> {businessPermit.owner?.mobilenumber}</p>
        <p><strong>Email Address:</strong> {businessPermit.owner?.email}</p>
      </div>

      <h1>Business Information</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'left' }}>
        <p><strong>Business Name:</strong> {businessPermit.business?.businessname}</p>
        <p><strong>Business Scale:</strong> {businessPermit.business?.businessscale}</p>
        <p><strong>Payment Mode:</strong> {businessPermit.business?.paymentmethod}</p>
      </div>

              <h1>Business Contact Information</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'left' }}>
              <p><strong>House/Bldg No./Blk and Lot:</strong> {businessPermit.business?.businessbuildingblocklot}</p>
              <p><strong>Building Name/Street Name:</strong> {businessPermit.business?.businessbuildingname}</p>
              <p><strong>Subdivision/Compound Name:</strong> {businessPermit.business?.businesssubcompname}</p>
              <p><strong>Region:</strong> {businessPermit.business?.businessregion}</p>
              <p><strong>Province:</strong> {businessPermit.business?.businessprovince}</p>
              <p><strong>City/Municipality:</strong> {businessPermit.business?.businessmunicipality}</p>
              <p><strong>Barangay</strong> {businessPermit.business?.businessbarangay}</p>
              <p><strong>Zip:</strong> {businessPermit.business?.businesszip}</p>
              <p><strong>Contact Number:</strong> {businessPermit.business?.businesscontactnumber}</p>
              </div>

              <h1>Necessities Information</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'left' }}>
              <p><strong>Ownership Type:</strong> {businessPermit.business?.ownershiptype}</p>
              <p><strong>Agency Registered No:</strong> {businessPermit.business?.agencyregistered}</p>
              <p><strong>DTI Registration No:</strong> {businessPermit.business?.dtiregistrationnum}</p>
              <p><strong>DTI Registration Date:</strong> {businessPermit.business?.dtiregistrationdate}</p>
              <p><strong>DTI Expiration Date:</strong> {businessPermit.business?.dtiregistrationexpdate}</p>
              <p><strong>SEC Registration No:</strong> {businessPermit.business?.secregistrationnum}</p>
              <p><strong>BIR Registration No:</strong> {businessPermit.business?.birregistrationnum}</p>
              <p><strong>Industry Sector:</strong> {businessPermit.business?.industrysector}</p>
              <p><strong>Business Operation:</strong> {businessPermit.business?.businessoperation}</p>
              <p><strong>Business Type:</strong> {businessPermit.business?.typeofbusiness}</p>
              </div>

              <h1>Other Information</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'left' }}>
              <p><strong>Date Established:</strong> {businessPermit.otherbusinessinfo?.dateestablished}</p>
              <p><strong>Start Date:</strong> {businessPermit.otherbusinessinfo?.startdate}</p>
              <p><strong>Occupancy:</strong> {businessPermit.otherbusinessinfo?.occupancy}</p>
              <p><strong>Business Type:</strong> {businessPermit.otherbusinessinfo?.otherbusinesstype}</p>
              <p><strong>Email Address:</strong> {businessPermit.otherbusinessinfo?.businessemail}</p>
              <p><strong>Business Area:</strong> {businessPermit.otherbusinessinfo?.businessarea}</p>
              <p><strong>Lot Area:</strong> {businessPermit.otherbusinessinfo?.businesslotarea}</p>
              <p><strong>No. of Workers (Male):</strong> {businessPermit.otherbusinessinfo?.numofworkermale}</p>
              <p><strong>No. of Workers (Female):</strong> {businessPermit.otherbusinessinfo?.numofworkerfemale}</p>
              <p><strong>Total No. of Workers:</strong> {businessPermit.otherbusinessinfo?.numofworkertotal}</p>
              <p><strong>Employees Residing within LGU:</strong> {businessPermit.otherbusinessinfo?.numofworkerlgu}</p>
              </div>
              <h1>Lessor's Information</h1>
              <p>
  {businessPermit?.otherbusinessinfo?.occupancy === "Agree" ? (
    <>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'left' }}>
      <p><strong>Lessor's Full Name:</strong> {businessPermit.otherbusinessinfo?.lessorfullname}</p>
      <p><strong>Lessor's Mobile Number:</strong> {businessPermit.otherbusinessinfo?.lessormobilenumber}</p>
      <p><strong>Monthly Rent:</strong> {businessPermit.otherbusinessinfo?.monthlyrent}</p>
      <p><strong>Lessor's Full Address:</strong> {businessPermit.otherbusinessinfo?.lessorfulladdress}</p>
      <p><strong>Lessor's Email Address:</strong> {businessPermit.otherbusinessinfo?.lessoremailaddress}</p>
      </div>
    </>
  ) : null}
</p>

<div>
      <h1>View-Only Map</h1>
      {/* Provide initial latitude and longitude */}
      <MapLocationView 
  initialLat={businessPermit?.mapview?.lat ? parseFloat(businessPermit.mapview.lat) : 0} 
  initialLng={businessPermit?.mapview?.lng ? parseFloat(businessPermit.mapview.lng) : 0} 
/>
    </div>
    <div>


    <h1>List of Businesses</h1>
{businessPermit?.businesses?.length > 0 ? (
  <ul>
    {businessPermit.businesses.map((business) => (
      <li key={business._id} style={{ marginBottom: '1rem' }}>
        <strong>Nature:</strong> {business.businessNature || 'N/A'} <br />
        <strong>Type:</strong> {business.businessType || 'N/A'} <br />
        <strong>Capital Investment:</strong> ${business.capitalInvestment.toLocaleString()}
      </li>
    ))}
  </ul>
) : (
  <div>No businesses to display.</div> 
)}
    </div>

            

  <div style={{display: 'flex',justifyContent: 'center', gap: '16px',flexWrap: 'wrap' }}>
    <p>Document 1: {renderDocument(businessPermit.files?.document1, 'uploads')}</p>
    <p>Document 2: {renderDocument(businessPermit.files?.document2, 'uploads')}</p>
    <p>Document 3: {renderDocument(businessPermit.files?.document3, 'uploads')}</p>
    <p>Document 4: {renderDocument(businessPermit.files?.document4, 'uploads')}</p>
    <p>Document 5: {renderDocument(businessPermit.files?.document5, 'uploads')}</p>
    <p>Document 6: {renderDocument(businessPermit.files?.document6, 'uploads')}</p>
    
  </div>
              


            {/* Render additional fields as necessary 
              
              {workPermit.receipt?.receiptFile && (
    <p>Receipt: {renderDocument(workPermit.receipt.receiptFile, 'receipts')}</p>
  )}
    {workPermit.permitFile && (
    <p>Work Permit: {renderDocument(workPermit.permitFile, 'permits')}</p>
  )}
  {workPermit.applicationComments && (
    <p>Comments: {workPermit.applicationComments}</p>
  )}
    
  */}
            
          </>
        ) : (
          <p>No work permit details available.</p>
        )}

{isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalFile && (
              <div>
                {modalFile.endsWith('.pdf') ? (
                  <iframe src={modalFile} style={{ width: '500px', height: '600px' }} title="PDF Viewer" />
                ) : (
                  <img src={modalFile} alt="Document" style={{ maxWidth: '100%', height: 'auto' }} />
                )}
              </div>
            )}
            <button className="cancel-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
    </section>
);

};

export default DataControllerViewApplicationDetails;