import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/ClientStyles.css';
import {BusinessPermit} from "../components/Interface(Front-end)/Types";
import { businessNatureMap } from "../components/Interface(Front-end)/BusinessNatureMap"; 
import ClientNavbar from '../components/NavigationBars/clientnavbar';
import MapLocationView from '../components/MapContents/MapLocationView';

const ViewApplicationDetailsBusiness: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract work permit ID from URL
  const [businessPermit, setBusinessPermit] = useState<BusinessPermit | null>(null);
  const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
  const [modalFile, setModalFile] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const navigate = useNavigate();


  useEffect(() => {
    const fetchBusinessPermitDetails = async () => {
        if (!token) {
            navigate('/'); // Redirect to login if no token
            return;
          } 
      try {
        console.log(id);
        const response = await axios.get(`http://localhost:3000/client/fetchbusinesspermitdetails/${id}`, {
          headers: { },
          withCredentials: true, 

        });
        setBusinessPermit(response.data as BusinessPermit); // Set the work permit details to state
      } catch (error) {
        console.error('Error fetching work permit details:', error);
     
      } }

      fetchBusinessPermitDetails(); // Call the fetch function










  }, [id, token, navigate]);

  useEffect(() => {
    console.log(businessPermit); // This will log the updated workPermit when it changes
  }, [businessPermit]); // Dependency array ensures it runs when workPermit updates







   const openModal = (filePath: string) => {
    setModalFile(filePath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalFile(null);
  };

  const fetchDocumentUrl = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts'): string | null => {
    if (!fileName) return null;
    
    // Return the file URL based on the folder specified
    return `http://localhost:3000/${folder}/${fileName}`;
  };
  
const renderDocument = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts') => {
  const fileUrl = fetchDocumentUrl(fileName, folder);
  if (!fileUrl) return <span>Not uploaded</span>;

  const fileExtension = fileUrl.split('.').pop()?.toLowerCase();

  return (
    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => openModal(fileUrl)}>
      {fileExtension === 'pdf' ? 'View PDF' : 'View Document'}
    </span>
  );
};

useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/check-auth-client', {
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

  return (
    <section className="dashboard-container">
          {/* Navbar */}
          <ClientNavbar />
  
      <div className="content">
        <header>
          <h1>Online Business and Work Permit Licensing System</h1>
        </header>
        <div>
        
        <div className="panel">
        <h1>Work Permit Details</h1>
        {businessPermit ? (
          <> 
            <p> Date Issued: {businessPermit.createdAt ? new Date(businessPermit.createdAt).toLocaleDateString() : 'N/A'}</p>
            <p> Business Permit Status: {businessPermit.businesspermitstatus}</p>

            <h1>Personal Information Details</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'left'}}>
              <p><strong>Application ID:</strong> {businessPermit.id}</p>
              
              {businessPermit?.owner?.corporation ? (
              <>
              <p><strong>Company Name:</strong> {businessPermit.owner.companyname} </p>
              </>
              ) : (
              <>
              <p><strong>Fullname:</strong> {businessPermit.owner?.lastname}, {businessPermit.owner?.firstname} {businessPermit.owner?.middleinitial}</p>
              <p> <strong>Civi Status:</strong> {businessPermit.owner?.civilstatus} </p>
              <p> <strong>Gender:</strong> {businessPermit.owner?.gender} </p>
              </>
              )}
              
              <p><strong>Citizenship</strong> {businessPermit.owner?.citizenship}</p>
              <p><strong>Tin Number</strong> {businessPermit.owner?.tinnumber}</p>

              
              {businessPermit?.owner?.representative && businessPermit.owner.representativedetails ? (
              <>
              <p><strong>Representative Fullname:</strong> {businessPermit.owner.representativedetails?.repfullname}</p>
              <p><strong>Representative Designation:</strong> {businessPermit.owner.representativedetails?.repdesignation}</p>
              <p><strong>Representative Mobile Number:</strong> {businessPermit.owner.representativedetails?.repmobilenumber}</p>
              </>
              ) : null}
            </div>



<h1>Contact Information</h1>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'left'}}>
              <p><strong>House/Bldg No./Blk and Lot:</strong> {businessPermit.owner?.houseandlot}</p>
              <p><strong>Building Name / Street Name:</strong> {businessPermit.owner?.buildingstreetname}</p>
              <p><strong>Subdivision / Compound Name:</strong> {businessPermit.owner?.subdivision}</p>
              <p><strong>Region</strong> {businessPermit.owner?.region}</p>
              <p><strong>Province</strong> {businessPermit.owner?.province}</p>
              <p><strong>Municipality:</strong> {businessPermit.owner?.municipality}</p>
              <p><strong>Barangay:</strong> {businessPermit.owner?.barangay}</p>
              <p><strong>Telehpone Number:</strong> {businessPermit.owner?.telephonenumber}</p>
              <p><strong>Mobile Number:</strong> {businessPermit.owner?.mobilenumber}</p>
              <p><strong>Email Address:</strong> {businessPermit.owner?.email}</p>
</div>

              <h1>Business Information</h1>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'left'}}>
              <p><strong>Business Name:</strong> {businessPermit.business?.businessname}</p>
              <p><strong>Business Scale:</strong> {businessPermit.business?.businessscale}</p>
              <p><strong>Payment Mode:</strong> {businessPermit.business?.paymentmethod}</p>
              </div>
              
              <h1>Business Contact Information</h1>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'left'}}>
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
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'left'}}>
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
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'left'}}>
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

{businessPermit?.otherbusinessinfo?.occupancy === "Agree" && (
  <div style={{display: 'grid',gridTemplateColumns: 'repeat(5, 1fr)',gap: '16px',textAlign: 'left'}}
  >
    <p><strong>Lessor's Full Name:</strong> {businessPermit.otherbusinessinfo?.lessorfullname}</p>
    <p><strong>Lessor's Mobile Number:</strong> {businessPermit.otherbusinessinfo?.lessormobilenumber}</p>
    <p><strong>Monthly Rent:</strong> {businessPermit.otherbusinessinfo?.monthlyrent}</p>
    <p><strong>Lessor's Full Address:</strong> {businessPermit.otherbusinessinfo?.lessorfulladdress}</p>
    <p><strong>Lessor's Email Address:</strong> {businessPermit.otherbusinessinfo?.lessoremailaddress}</p>
  </div>
)}


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
{businessPermit && businessPermit.businesses && businessPermit.businesses.length > 0 ? (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Nature</th>
        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Type</th>
        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Capital Investment</th>
        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Las Year Gross</th>
      </tr>
    </thead>
    <tbody>
      {businessPermit.businesses.map((business) => (
        <tr key={business._id}>
          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
            {businessNatureMap[business.businessNature as keyof typeof businessNatureMap] || business.businessNature || 'N/A'}
          </td>
          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
            {business.businessType || 'N/A'}
          </td>
          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
          ₱{business.capitalInvestment?.toLocaleString() || 'N/A'}
          </td>
          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
          ₱{business.lastYearGross?.toLocaleString() || 'N/A'}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <div>No businesses to display.</div>
)}

    </div>
    

            

  <div style={{display: 'flex',justifyContent: 'center', gap: '16px',flexWrap: 'wrap' }}>
    <p>Document 1: {renderDocument(businessPermit.files?.document1, 'uploads')}</p>
    {businessPermit.files.remarksdoc1 && (
    <p>Remarks: {businessPermit.files.remarksdoc1}</p>
  )}
    <p>Document 2: {renderDocument(businessPermit.files?.document2, 'uploads')}</p>
    {businessPermit.files.remarksdoc2 && (
    <p>Remarks: {businessPermit.files.remarksdoc2}</p>
  )}
    <p>Document 3: {renderDocument(businessPermit.files?.document3, 'uploads')}</p>
    {businessPermit.files.remarksdoc3 && (
    <p>Remarks: {businessPermit.files.remarksdoc3}</p>
  )}
    <p>Document 4: {renderDocument(businessPermit.files?.document4, 'uploads')}</p>
    {businessPermit.files.remarksdoc4 && (
    <p>Remarks: {businessPermit.files.remarksdoc4}</p>
  )}
    <p>Document 5: {renderDocument(businessPermit.files?.document5, 'uploads')}</p>
    {businessPermit.files.remarksdoc5 && (
    <p>Remarks: {businessPermit.files.remarksdoc5}</p>
  )}
    <p>Document 6: {renderDocument(businessPermit.files?.document6, 'uploads')}</p>
    {businessPermit.files.remarksdoc6 && (
    <p>Remarks: {businessPermit.files.remarksdoc6}</p>
  )}
    <p>Document 7: {renderDocument(businessPermit.files?.document7, 'uploads')}</p>
    {businessPermit.files.remarksdoc7 && (
    <p>Remarks: {businessPermit.files.remarksdoc7}</p>
  )}
    <p>Document 8: {renderDocument(businessPermit.files?.document8, 'uploads')}</p>
    {businessPermit.files.remarksdoc8 && (
    <p>Remarks: {businessPermit.files.remarksdoc8}</p>
  )}
    <p>Document 9: {renderDocument(businessPermit.files?.document9, 'uploads')}</p>
    {businessPermit.files.remarksdoc9 && (
    <p>Remarks: {businessPermit.files.remarksdoc9}</p>
  )}
    <p>Document 10: {renderDocument(businessPermit.files?.document10, 'uploads')}</p>
    {businessPermit.files.remarksdoc10 && (
    <p>Remarks: {businessPermit.files.remarksdoc10}</p>
  )}
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
    {businessPermit.receipt?.receiptFile && (
    <p>Receipt: {renderDocument(businessPermit.receipt.receiptFile, 'receipts')}</p>
  )}
      {businessPermit.statementofaccount.statementofaccountfile && (
    <p>Statement of Account (Assessment): {renderDocument(businessPermit.statementofaccount.statementofaccountfile, 'receipts')}</p>
  )}
    {businessPermit.permitFile && (
    <p>Business Permit: {renderDocument(businessPermit.permitFile, 'permits')}</p>
  )}
  {businessPermit.applicationComments && (
    <p>Comments: {businessPermit.applicationComments}</p>
  )}
            
          </>
        ) : (
          <p>Business permit details available.</p>
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
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
        </div>
        
    
      </div>
      </div>
    </section>
  );
};

export default ViewApplicationDetailsBusiness;
