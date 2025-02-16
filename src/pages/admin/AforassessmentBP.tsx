
import '../Styles/AdminStyles.css'; 
import AdminSideBar from '../components/NavigationBars/AdminSideBar';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


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
  document6: string | null; // 
  document7: string | null; // Optional
  document8: string | null; // Optional
  document9: string | null; // Optional
  document10: string | null; // Optional
  remarksdoc1: string;
  remarksdoc2: string;
  remarksdoc3: string;
  remarksdoc4: string;
  remarksdoc5: string;
  remarksdoc6: string;
  remarksdoc7: string;
  remarksdoc8: string;
  remarksdoc9: string;
  remarksdoc10: string;
  }
const AdminForAssessmentBusinessPermit: React.FC = () => {
  const [businessPermits, setBusinessPermits] = useState<BusinessPermit[]>([]);
  const [filteredItems, setFilteredItems] = useState<BusinessPermit[]>([]);
  
  const navigate = useNavigate();

//Selected Permit Id
  const [selectedUserIdDep, setSelectedUserId] = useState<string | null>(null); //For Departments Display
  const [activePermitId, setActivePermitId] = useState<BusinessPermit | null>(null);

  //Modals Owner Edit
  const [editownermodal, setEditOwnerModal] = useState(false);


  //Modals Attachments Edit
  const [viewAttachmentsModal, setViewAttatchmentsModal] = useState(false);


  //Modals Business Edit
  const [viewbusinessdetails, setViewBusinessDetails] = useState(false);

//Modal For Checking
  const [checkpermit, setCheckPermit]=useState(false);


  //Step2

  const { type } = useParams<{ type: string }>();
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
          console.log(type);
          return;
        }

        // Handle unexpected response
        console.error('Unexpected response status:', response.status);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } 
    };

    checkAuth();
  }, [navigate, type]); // Only depend on navigate, which is necessary for the redirection



  //Table Code
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(businessPermits.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  //Table Code

// Date Search
  const [, setSearchQuery] = useState<string>(''); // Track the search query
  const [inputValue, setInputValue] = useState<string>('');

  // Get current items
  const currentItems = filteredItems.slice(startIndex, endIndex); 

  // Handle the search when the button is clicked
  const handleSearch = () => {
    const searchValue = inputValue; // Use input value for search
    setSearchQuery(searchValue); // Update search query state
  };

const [startDate, setStartDate] = useState<string>('');
const [endDate, setEndDate] = useState<string>('');

// Handle date search
const handleDateSearch = () => {
  const filteredByDate = businessPermits.filter((permit) => {
    const permitDate = new Date(permit?.applicationdateIssued || Date.now());
    const isAfterStartDate = startDate ? permitDate >= new Date(startDate) : true;
    const isBeforeEndDate = endDate ? permitDate <= new Date(endDate) : true;
    return isAfterStartDate && isBeforeEndDate;
  });
  setFilteredItems(filteredByDate);
  setCurrentPage(0); // Reset to the first page of results
};
// Date Search


//File
const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: string | null }>({});

      const fetchDocumentUrl = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts'): string | null => {
        if (!fileName) return null;
        
        // Return the file URL based on the folder specified
        return `http://localhost:3000/${folder}/${fileName}`;
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

//File



  //Attach
  const [files, setFiles] = useState<{
    document1: File | null;
    document2: File | null;
    document3: File | null;
    document4: File | null;
    document5: File | null;
    document6: File | null;
  }>({
    document1: null,
    document2: null,
    document3: null,
    document4: null,
    document5: null,
    document6: null,
  });






  const closeViewAttachmentsModal = () => {
    setViewAttatchmentsModal(false);
    setSelectedFiles({});
    setFiles({
      document1: null,
      document2: null,
      document3: null,
      document4: null,
      document5: null,
      document6: null,
    });
  };


  //Attach


  //Edit Business
  const closeViewBusinessDetails = () => {
    setViewBusinessDetails(false);
  };

 

 
  //Edit Business

  const handleActionBP = (action: string, permit: BusinessPermit) => {
    setSelectedUserId(null);
    setActivePermitId(null);
    switch (action) {


          case 'editowner':
            setActivePermitId(permit);
            setEditOwnerModal(true);
            break;

            case 'editbusiness':
              setViewBusinessDetails(true);
              setActivePermitId(permit);
              break;

            case 'viewApplication':
        navigate(`/DAviewbusinessapplicationdetails/${permit._id}`);
    console.log(`Edit permit ID: ${permit._id}`);
        break;

        case 'editnature':
          navigate(`/DAEditBusinessNature/${permit._id}`);
          break;

          case 'assessment':
            navigate(`/DABusinessAssessment/${permit._id}`);
            break;

          case 'viewattatchments':
            setViewAttatchmentsModal(true);
            setActivePermitId(permit);
        break;

        case'acceptReject':
        setActivePermitId(permit);
        setCheckPermit(true);

        break;

        case 'department':
          setSelectedUserId(permit._id);
          break;

      default:
        console.warn('Unknown action');
    }
  };


//Use Effect
  

  const fetchBusinessPermits = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/datacontroller/getbusinesspermitforassessment/${type}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch business permits');
      }

      const data = await response.json();
      setBusinessPermits(data);
    } catch (error) {
      console.error('Error fetching business permits:', error);
    }
  };

  useEffect(() => {
    const fetchBusinessPermits = async () => {
      try {
        console.log(type);
        const response = await fetch(
          `http://localhost:3000/datacontroller/getbusinesspermitforassessment/${type}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to fetch business permits');
        }
  
        const data = await response.json();
        setBusinessPermits(data);
      } catch (error) {
        console.error('Error fetching business permits:', error);
      }
    };
          fetchBusinessPermits(); // Fetch work permits if token is present

         
            const fileUrls: { [key: string]: string } = {};
          
            Object.entries(files).forEach(([key, file]) => {
              if (file) {
                const fileUrl = URL.createObjectURL(file);
                fileUrls[key] = fileUrl;
          
                // Cleanup for this specific file
                return () => URL.revokeObjectURL(fileUrl);
              }
            });
          
            setSelectedFiles((prev) => ({ ...prev, ...fileUrls }));
         
  }, [files, type]);

  useEffect(() => {
    setFilteredItems(businessPermits); // Display all work permits by default
  }, [businessPermits]);
//Use Effect




  const maxDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format


//ModalEditOwner

const CloseOwnerModal = () => {
    setEditOwnerModal(false);
  };


//ModalEditOwner


//Modal Approve Permit

const closePermitChecker = () => {
    setCheckPermit(false);
    setActivePermitId(null);
    setIsRejecting(false); // Reset rejection state
    setRemarks(''); // Clear remarks when modal closes
  };

// Update permit status (approve or reject)
const updatebusinesspermitstatus = async (action: string, remarks: string) => {
    if (!activePermitId) return;
  
    // Validate remarks only if the action is 'reject'
    if (action === 'rejected' && !remarks) {
      alert('Please provide remarks for rejection');
      return;
    }
  
    try {
      // Send the action as part of the request payload
      const response = await axios.put(
        `http://localhost:3000/admin/updatebusinesspermitstatus/${activePermitId._id}`,
        { status: action, remarks }
      );
  
      // Assuming fetchBusinessPermits() is a function to refetch the list of permits
      fetchBusinessPermits();
  
      console.log('Update successful:', response.data);
      closePermitChecker(); // Close the modal after the update
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update permit status. Please try again.');
    }
  };
  
  
  const [remarks, setRemarks] = useState(''); // For storing remarks when the permit is rejected
  const [isRejecting, setIsRejecting] = useState(false)

  return (
    <section className="Abody">
      <div className="Asidebar-container">
        <AdminSideBar />{/* Pass handleLogout to ASidebar */}
      </div>

      <div className="Acontent">
        <header className='Aheader'>
          <h1>Online Business and Work Permit Licensing System</h1>
        </header>
        <div className='workpermittable'>
          <p>Business Permit Applications New Business(For Assessments)</p>
          {/* Search Bar */}
          Search:
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search by ID, Status, or Classification"
              value={inputValue} // Use inputValue for the input field
              onChange={(e) => setInputValue(e.target.value)} // Update inputValue state
              className="search-input" // Add a class for styling
            />
            <button onClick={handleSearch} className="search-button">Search</button> {/* Button to trigger search */}
          </div>


          {/* Date Pickers for Date Range Filter */}
          Start Date:
          <div className="date-picker-container">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={maxDate} // Set the maximum date to today
              placeholder="Start Date"
            />
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              max={maxDate} // Set the maximum date to today
              placeholder="End Date"
            />
            <button onClick={handleDateSearch} className="search-button">Search by Date</button>
          </div>

          <table className="permit-table">
            <thead>
              <tr>
                <th>
                 Business Information 
                </th>
                <th>
                  ID
                </th>
                <th>
                  Classification
                </th>
                <th>
                 Application Status
                </th>
                <th>
                 Business Status 
                </th>
                <th>
                  Date Issued 
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

    {currentItems.map((permit) => (
      <React.Fragment key={permit._id}>
      <tr key={permit._id}>
        <td>Business Name:{permit.business.businessname}<br />
            Owner:{permit.owner.lastname}, {permit.owner.firstname} {permit.owner.middleinitial}<br />
            Address:</td>
        <td>{permit.id}</td>
        <td>{permit.classification}</td>
        <td>{permit.businesspermitstatus}</td>
        <td>{permit.businessstatus}</td>
        <td>{new Date(permit.applicationdateIssued).toLocaleDateString()}</td>
        <td>
          <select
            defaultValue=""
            onChange={(e) => {
              handleActionBP(e.target.value, permit);
              e.target.value = ""; // Reset dropdown to default
            }}
            className="dropdown-button"
          >
            <option value="" disabled>
              Select Action
            </option>
              <>
                <option value="editowner">View Owner Details</option>
                <option value="editbusiness">View Business Details</option>
                <option value="viewApplication">View Application</option>
                <option value="editnature">View Business Nature</option>
                <option value="assessment">View Assessment</option>
  {/* Conditionally show the 'Approve/Reject Application' option */}
  {permit?.businesspermitstatus === 'Assessed' && (
    <option value="acceptReject">Approve/Reject Application</option>
  )}
  
                <option value="viewattatchments">View Attatchments</option>
                <option value="department">Department</option>
                <option>Cancel Application</option>
              </>
          </select>
        </td>
      </tr>
      {selectedUserIdDep === permit._id && (
  <tr>
    <td colSpan={6}>
      <table>
        <thead>
          <tr>
            <th>Departments</th>
            <th>Status</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(permit.department).map(([, departmentValue], index) => (
            <tr key={index}>
              <td>{departmentValue}</td>
              <td>Approved</td>
              <td>This is a test statement remarks for other departments</td>
            </tr>
          ))}
        </tbody>
      </table>
    </td>
  </tr>
)}
      </React.Fragment>
    ))}
  </tbody>
          </table>
          <div className="pagination-buttons">
            {currentPage > 0 && (
              <button onClick={handlePreviousPage}>Back</button>
            )}
            {currentPage < totalPages - 1 && (
              <button onClick={handleNextPage}>Next</button>
            )}
          </div>
        </div>
        
{editownermodal && activePermitId && (
  <div className="modal-overlay">
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <p>Viewing Owner Details of {activePermitId.id}</p>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={activePermitId?.owner?.corporation || false}
            disabled={true} // Disabled for view-only mode
          />
          Check if Corporation
        </label>
      </div>

      <div className="form-group">
        <label>LAST NAME:</label>
        <input
          type="text"
          value={activePermitId.owner.lastname}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>FIRST NAME:</label>
        <input
          type="text"
          value={activePermitId.owner.firstname}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>MIDDLE INITIAL:</label>
        <input
          type="text"
          value={activePermitId.owner.middleinitial}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>COMPANY NAME:</label>
        <input
          type="text"
          value={activePermitId.owner.companyname}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Civil Status:</label>
        <select
          value={activePermitId.owner.civilstatus}
          disabled={true} // Disabled for view-only mode
          className="form-control"
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Widowed">Widowed / Widower</option>
          <option value="Seperated">Seperated</option>
          <option value="Undefined">Undefined</option>
        </select>
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <select
          value={activePermitId.owner.gender}
          disabled={true} // Disabled for view-only mode
          className="form-control"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Corp">Corporation</option>
        </select>
      </div>
      <div className="form-group">
        <label>Citizenship:</label>
        <input
          type="text"
          value={activePermitId.owner.citizenship}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Tin Number:</label>
        <input
          type="text"
          value={activePermitId.owner.tinnumber}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={activePermitId?.owner?.representative || false}
            disabled={true} // Disabled for view-only mode
          />
          Check if thru Representative
        </label>
      </div>
      <div className="form-group">
        <label>Representative Full Name:</label>
        <input
          type="text"
          value={activePermitId.owner.representativedetails?.repfullname}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Representative Designation:</label>
        <input
          type="text"
          value={activePermitId.owner.representativedetails?.repdesignation}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Representative Mobile Number:</label>
        <input
          type="text"
          value={activePermitId.owner.representativedetails?.repmobilenumber}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <h1>Contact Details</h1>
      <div className="form-group">
        <label>House/Bldg No./Blk and Lot:</label>
        <input
          type="text"
          value={activePermitId.owner.houseandlot}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Building Name / Street Name:</label>
        <input
          type="text"
          value={activePermitId.owner.buildingstreetname}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Subdivision / Compound Name:</label>
        <input
          type="text"
          value={activePermitId.owner.subdivision}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Region:</label>
        <input
          type="text"
          value={activePermitId.owner.region}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Province:</label>
        <input
          type="text"
          value={activePermitId.owner.province}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Municipality:</label>
        <input
          type="text"
          value={activePermitId.owner.municipality}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Barangay:</label>
        <input
          type="text"
          value={activePermitId.owner.barangay}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Telephone Number:</label>
        <input
          type="text"
          value={activePermitId.owner.telephonenumber}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Mobile Number:</label>
        <input
          type="text"
          value={activePermitId.owner.mobilenumber}
          disabled={true} // Disabled for view-only mode
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="text"
          value={activePermitId.owner.email}
          disabled={true} // Disabled for view-only mode
        />
      </div>

      <div>
        <button className="cancel-button" onClick={CloseOwnerModal}>Close</button>
      </div>
    </div>
  </div>
      )}

{viewAttachmentsModal && activePermitId && (
  <div className="modal-overlay" onClick={closeViewAttachmentsModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>Permit ID: {activePermitId._id}</p>

{/* Document 1 */}
<p>
 {/* Conditional text based on classification */}
 {activePermitId.classification === 'RenewBusiness' ? (
    <span>BIR: {activePermitId.files.document1 || 'Not uploaded'}</span>
  ) : (
    <span>DTI / SEC / CDA: {activePermitId.files.document1 || 'Not uploaded'}</span>
  )}


  {activePermitId.files.document1 && (
    <button
      onClick={() => {
        const newFileUrl = fetchDocumentUrl(activePermitId.files.document1, 'uploads');
        setSelectedFiles((prev) => {
          const isFileSelected = prev.document1 === newFileUrl;
          return {
            ...prev,
            document1: isFileSelected ? null : newFileUrl, // Toggle visibility based on the URL
          };
        });
      }}
    >
      {selectedFiles.document1 ? 'Close' : 'View'}
    </button>
  )}

  {/* Remarks Section - Disabled for view only */}
  <label>Remarks:</label>
  <input 
    type="text" 
    value={activePermitId.files.remarksdoc1 || ''} 
    disabled 
  />
</p>

{/* Render Document */}
{renderFile(
  selectedFiles.document1 || (activePermitId.files.document1)
)}

{/* Document 2 */}
<p>
    {/* Conditional text based on classification */}
    {activePermitId.classification === 'RenewBusiness' ? (
    <span>Past Business Permit Copy: {activePermitId.files.document2 || 'Not uploaded'}</span>
  ) : (
    <span>Occupancy Permit (Optional): {activePermitId.files.document2 || 'Not uploaded'}</span>
  )}

  {activePermitId.files.document2 && (
    <button
      onClick={() => {
        const newFileUrl = fetchDocumentUrl(activePermitId.files.document2, 'uploads');
        setSelectedFiles((prev) => {
          const isFileSelected = prev.document2 === newFileUrl;
          return {
            ...prev,
            document2: isFileSelected ? null : newFileUrl, // Toggle visibility based on the URL
          };
        });
      }}
    >
      {selectedFiles.document2 ? 'Close' : 'View'}
    </button>
  )}

  {/* Remarks Section - Disabled for view only */}
  <label>Remarks:</label>
  <input 
    type="text" 
    value={activePermitId.files.remarksdoc2 || ''} 
    disabled 
  />
</p>

{/* Render Document */}
{renderFile(
  selectedFiles.document2 || (activePermitId.files.document2)
)}


{/* Document 3 */}
<p>
     {/* Conditional text based on classification */}
     {activePermitId.classification === 'RenewBusiness' ? (
    <span>Certification of Gross Sales: {activePermitId.files.document3 || 'Not uploaded'}</span>
  ) : (
    <span>Lease Contract (if rented) / Tax Declaration (If Owned): {activePermitId.files.document3 || 'Not uploaded'}</span>
  )}
  {activePermitId.files.document3 && (
    <button
      onClick={() => {
        const newFileUrl = fetchDocumentUrl(activePermitId.files.document3, 'uploads');
        setSelectedFiles((prev) => {
          const isFileSelected = prev.document3 === newFileUrl;
          return {
            ...prev,
            document3: isFileSelected ? null : newFileUrl, // Toggle visibility based on the URL
          };
        });
      }}
    >
      {selectedFiles.document3 ? 'Close' : 'View'}
    </button>
  )}

  {/* Remarks Section - Disabled for view only */}
  <label>Remarks:</label>
  <input 
    type="text" 
    value={activePermitId.files.remarksdoc3 || ''} 
    disabled 
  />
</p>

{/* Render Document */}
{renderFile(
  selectedFiles.document3 || (activePermitId.files.document3)
)}

{/* Document 4 */}
<p>
      {/* Conditional text based on classification */}
      {activePermitId.classification === 'RenewBusiness' ? (
    <span>Zoning: {activePermitId.files.document4 || 'Not uploaded'}</span>
  ) : (
    <span>Authorization Letter / S.P.A. / Board Resolution / Secretary's Certificate (if thru representative): {activePermitId.files.document4 || 'Not uploaded'}</span>
  )}

  {activePermitId.files.document4 && (
    <button
      onClick={() => {
        const newFileUrl = fetchDocumentUrl(activePermitId.files.document4, 'uploads');
        setSelectedFiles((prev) => {
          const isFileSelected = prev.document4 === newFileUrl;
          return {
            ...prev,
            document4: isFileSelected ? null : newFileUrl, // Toggle visibility based on the URL
          };
        });
      }}
    >
      {selectedFiles.document4 ? 'Close' : 'View'}
    </button>
  )}

  {/* Remarks Section - Disabled for view only */}
  <label>Remarks:</label>
  <input 
    type="text" 
    value={activePermitId.files.remarksdoc4 || ''} 
    disabled 
  />
</p>

{/* Render Document */}
{renderFile(
  selectedFiles.document4 || (activePermitId.files.document4)
)}

{/* Document 5 */}
<p>
        {/* Conditional text based on classification */}
        {activePermitId.classification === 'RenewBusiness' ? (
    <span>Office of the Building Official: {activePermitId.files.document5 || 'Not uploaded'}</span>
  ) : (
    <span>Owner's ID: {activePermitId.files.document5 || 'Not uploaded'}</span>
  )}


  {activePermitId.files.document5 && (
    <button
      onClick={() => {
        const newFileUrl = fetchDocumentUrl(activePermitId.files.document5, 'uploads');
        setSelectedFiles((prev) => {
          const isFileSelected = prev.document5 === newFileUrl;
          return {
            ...prev,
            document5: isFileSelected ? null : newFileUrl, // Toggle visibility based on the URL
          };
        });
      }}
    >
      {selectedFiles.document5 ? 'Close' : 'View'}
    </button>
  )}

  {/* Remarks Section - Disabled for view only */}
  <label>Remarks:</label>
  <input 
    type="text" 
    value={activePermitId.files.remarksdoc5 || ''} 
    disabled 
  />
</p>

{/* Render Document */}
{renderFile(
  selectedFiles.document5 || (activePermitId.files.document5)
)}

{/* Document 6 */}
<p>
            {/* Conditional text based on classification */}
            {activePermitId.classification === 'RenewBusiness' ? (
    <span>Ctiy Health Office: {activePermitId.files.document6 || 'Not uploaded'}</span>
  ) : (
    <span>Picture of Establishment (Perspective View): {activePermitId.files.document6 || 'Not uploaded'}</span>
  )}


  {activePermitId.files.document6 && (
    <button
      onClick={() => {
        const newFileUrl = fetchDocumentUrl(activePermitId.files.document6, 'uploads');
        setSelectedFiles((prev) => {
          const isFileSelected = prev.document6 === newFileUrl;
          return {
            ...prev,
            document6: isFileSelected ? null : newFileUrl, // Toggle visibility based on the URL
          };
        });
      }}
    >
      {selectedFiles.document6 ? 'Close' : 'View'}
    </button>
  )}

  {/* Remarks Section - Disabled for view only */}
  <label>Remarks:</label>
  <input 
    type="text" 
    value={activePermitId.files.remarksdoc6 || ''} 
    disabled 
  />
</p>

{/* Render Document */}
{renderFile(
  selectedFiles.document6 || (activePermitId.files.document6)
)}

{/* Document 7 */}
<p>
            {/* Conditional text based on classification */}
            {activePermitId.classification === 'RenewBusiness' ? (
    <span>Bureau of Fire Protection: {activePermitId.files.document7 || 'Not uploaded'}</span>
  ) : (
    <span>Zoning: {activePermitId.files.document7 || 'Not uploaded'}</span>
  )}


  {activePermitId.files.document7 && (
    <button
      onClick={() => {
        const newFileUrl = fetchDocumentUrl(activePermitId.files.document7, 'uploads');
        setSelectedFiles((prev) => {
          const isFileSelected = prev.document7 === newFileUrl;
          return {
            ...prev,
            document7: isFileSelected ? null : newFileUrl, // Toggle visibility based on the URL
          };
        });
      }}
    >
      {selectedFiles.document7 ? 'Close' : 'View'}
    </button>
  )}

  {/* Remarks Section - Disabled for view only */}
  <label>Remarks:</label>
  <input 
    type="text" 
    value={activePermitId.files.remarksdoc7 || ''} 
    disabled 
  />
</p>

{/* Render Document */}
{renderFile(
  selectedFiles.document7 || (activePermitId.files.document7)
)}

{/* Conditionally render Document 8 and file rendering based on classification */}
{activePermitId.classification !== 'RenewBusiness' && (
  <p>
    Office of the Building Official: {activePermitId.files.document8 || 'Not uploaded'}

    {activePermitId.files.document8 && (
      <button
        onClick={() => {
          const newFileUrl = fetchDocumentUrl(activePermitId.files.document8, 'uploads');
          setSelectedFiles((prev) => {
            const isFileSelected = prev.document8 === newFileUrl;
            return {
              ...prev,
              document8: isFileSelected ? null : newFileUrl, // Toggle visibility based on the URL
            };
          });
        }}
      >
        {selectedFiles.document8 ? 'Close' : 'View'}
      </button>
    )}

    {/* Remarks Section - Disabled for view only */}
    <label>Remarks:</label>
    <input 
      type="text" 
      value={activePermitId.files.remarksdoc8 || ''} 
      disabled 
    />

    {/* Render Document */}
    {renderFile(
      selectedFiles.document8 || (activePermitId.files.document8)
    )}
  </p>
)}

{/* Conditionally render Document 9 and file rendering based on classification */}
{activePermitId.classification !== 'RenewBusiness' && (
  <p>
    City Health Office: {activePermitId.files.document9 || 'Not uploaded'}

    {activePermitId.files.document9 && (
      <button
        onClick={() => {
          const newFileUrl = fetchDocumentUrl(activePermitId.files.document9, 'uploads');
          setSelectedFiles((prev) => {
            const isFileSelected = prev.document9 === newFileUrl;
            return {
              ...prev,
              document9: isFileSelected ? null : newFileUrl, // Toggle visibility based on the URL
            };
          });
        }}
      >
        {selectedFiles.document9 ? 'Close' : 'View'}
      </button>
    )}

    {/* Remarks Section - Disabled for view only */}
    <label>Remarks:</label>
    <input 
      type="text" 
      value={activePermitId.files.remarksdoc9 || ''} 
      disabled 
    />

    {/* Render Document */}
    {renderFile(
      selectedFiles.document9 || (activePermitId.files.document9)
    )}
  </p>
)}

{/* Conditionally render Document 10 and file rendering based on classification */}
{activePermitId.classification !== 'RenewBusiness' && (
  <p>
    Bureau of Fire Protection: {activePermitId.files.document10 || 'Not uploaded'}

    {activePermitId.files.document10 && (
      <button
        onClick={() => {
          const newFileUrl = fetchDocumentUrl(activePermitId.files.document10, 'uploads');
          setSelectedFiles((prev) => {
            const isFileSelected = prev.document10 === newFileUrl;
            return {
              ...prev,
              document10: isFileSelected ? null : newFileUrl, // Toggle visibility based on the URL
            };
          });
        }}
      >
        {selectedFiles.document10 ? 'Close' : 'View'}
      </button>
    )}

    {/* Remarks Section - Disabled for view only */}
    <label>Remarks:</label>
    <input 
      type="text" 
      value={activePermitId.files.remarksdoc10 || ''} 
      disabled 
    />

    {/* Render Document */}
    {renderFile(
      selectedFiles.document10 || (activePermitId.files.document10)
    )}
  </p>
)}
        {/* Close Modal Button */}
        <button className="close-modal" onClick={closeViewAttachmentsModal}>
          Close
        </button>
      </div>
    </div>
)}

{viewbusinessdetails && activePermitId && (
  <div className="modal-overlay" onClick={closeViewBusinessDetails}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
  <p>View Business Details {activePermitId._id}</p>


<div className="form-group">
                  <label>Business Name:</label>
                  <input type="text" value={activePermitId.business.businessname} disabled/>
                </div>
                <div className="form-group">
                  <label>Business Scale:</label>
                  <select
                    value={activePermitId.business.businessscale}
                    className="form-control"
                    disabled
                  >
                    <option value="" disabled>Select Business Scale</option>
                    <option value="Micro">Micro (Not more than 3M or Having 1-9 Employees)</option>
                    <option value="Small">Small (3M - 15M or Having 10-99 Employees)</option>
                    <option value="Medium">Medium (15M - 100M or Having 100-199 Employees)</option>
                    <option value="Large">Large (more than 100M or Asset size of more than 100M)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Mode:</label>
                  <select
                    value={activePermitId.business.paymentmethod}
                    className="form-control"
                    disabled
                  >
                    <option value="" disabled>Select Payment Method</option>
                    <option value="Annual">Annual</option>
                    <option value="Semi-Annual">Semi-Annual</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
                <h2>Buisness Contact Information</h2>
                <div className="form-group">
                  <label>House/Bldg No./Blk and Lot:</label>
                  <input type="text" disabled value={activePermitId.business.businessbuildingblocklot} />
                </div>
                <div className="form-group">
                  <label>Building Name/Street Name:</label>
                  <input type="text" disabled value={activePermitId.business.businessbuildingname} />
                </div>
                <div className="form-group">
                  <label>Subdivision/Compound Name:</label>
                  <input type="text" disabled value={activePermitId.business.businesssubcompname} />
                </div>
                <div className="form-group">
                  <label>Region:</label>
                  <input type="text"  value={activePermitId.business.businessregion} disabled />
                </div>
                <div className="form-group">
                  <label>Province:</label>
                  <input type="text"  value={activePermitId.business.businessprovince} disabled />
                </div>
                <div className="form-group">
                  <label>City/Municipality:</label>
                  <input type="text"  value={activePermitId.business.businessmunicipality} disabled />
                </div>
                <div className="form-group">
                  <label>Barangay:</label>
                  <input type="text" disabled value={activePermitId.business.businessbarangay} />
                </div>

                <div className="form-group">
                  <label>Zip:</label>
                  <input type="text" disabled value={activePermitId.business.businesszip} />
                </div>
                <div className="form-group">
                  <label>Contact Number:</label>
                  <input type="text" disabled value={activePermitId.business.businesscontactnumber} />


                </div>
                <h2>Necessities Information</h2>
                <div className="form-group">
                  <label>Ownership Type:</label>
                  <select
                    value={activePermitId.business.ownershiptype}
                    
           
                    className="form-control"
                    disabled
                  >
                    <option value="" disabled>Select Ownership Type</option>
                    <option value="COOP">Cooperative</option>
                    <option value="CORP">Corporation</option>
                    <option value="INST">Institutional</option>
                    <option value="PART">Partnership</option>
                    <option value="SOLE">Sole Person</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Agency Registered No:</label>
                  <input type="text" disabled value={activePermitId.business.agencyregistered} />
                </div>
                <div className="form-group">
                  <label>DTI Registration No:</label>
                  <input
                    type="text"
                    value={activePermitId.business.dtiregistrationnum}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>DTI Registration Date:</label>
                  <input type="date"  value={activePermitId.business.dtiregistrationdate} disabled />
                </div>
                <div className="form-group">
                  <label>DTI Expiration Date:</label>
                  <input type="date"  value={activePermitId.business.dtiregistrationexpdate} disabled />
                </div>
                <div className="form-group">
                  <label>SEC Registration No:</label>
                  <input type="text"  value={activePermitId.business.secregistrationnum} disabled />
                </div>
                <div className="form-group">
                  <label>BIR Registration No:</label>
                  <input type="text" value={activePermitId.business.birregistrationnum} disabled />
                </div>
                <div className="form-group">
                  <label>Industry Sector:</label>
                  <select
                    value={activePermitId.business.industrysector}
                    className="form-control"
                    disabled
                  >
                    <option value="EL">Electronic</option>
                    <option value="CN">Construction</option>
                    <option value="GM">Garments</option>
                    <option value="CH">Chemical</option>
                    <option value="MT">Metal</option>
                    <option value="PL">Plastic</option>
                    <option value="AL">Aluminum</option>
                    <option value="BLB">Bulb</option>
                    <option value="FP">Food Processing</option>
                    <option value="LPG">LPG</option>
                    <option value="CR">Ceramics</option>
                    <option value="HT">Hatchery</option>
                    <option value="BC">Batching</option>
                    <option value="RF">Refinery</option>
                    <option value="PR">Printing</option>
                    <option value="P">Paper</option>
                    <option value="CT">Concrete</option>
                    <option value="FRN">Furniture</option>
                    <option value="RL">Realty</option>
                    <option value="TRD">Trading</option>
                    <option value="SVC">Services</option>
                    <option value="INS">Institutional</option>
                    <option value="AMU">Amusement</option>
                    <option value="RS">Repair Shop</option>
                    <option value="BNK">Bank</option>
                    <option value="FL">Financing/Lending</option>
                    <option value="LS">Lease</option>
                    <option value="DEV">Developer</option>
                    <option value="MC">Medical Clinic</option>
                    <option value="LC">Laboratory Clinic</option>
                    <option value="MPS">Manpower Supply</option>
                    <option value="GRY">Grocery</option>
                    <option value="SSS">Sari-Sari Store</option>
                    <option value="LSR">Lessor</option>
                    <option value="PP">Power Plants</option>
                    <option value="RFN">Refineries</option>
                    <option value="PTC">Petrochemicals</option>
                    <option value="EPD">Electric Power Distributor</option>
                    <option value="TC">Telecommunication Company</option>
                    <option value="MLR">Millers</option>
                    <option value="MFR">Manufacturer</option>
                    <option value="EXP">Exporters</option>
                    <option value="IMP">Importers</option>
                    <option value="RTL">Retailer</option>
                    <option value="CTR">Contractor</option>
                    <option value="FDS">Food Services</option>
                    <option value="PF">Poultry Farm</option>
                    <option value="PGY">Piggery</option>
                    <option value="CMT">Cemetery</option>
                    <option value="COP">Cooperative</option>
                    <option value="JS">Junkshop</option>
                    <option value="CTN">Canteen</option>
                    <option value="BSL">Beauty Salon</option>
                    <option value="FF">Frozen Foods</option>
                    <option value="DG">Dry Goods</option>
                    <option value="PN">Party Needs</option>
                    <option value="WS">Water Station</option>
                    <option value="GFS">Gift Shop</option>
                    <option value="VLS">Vulcanizing Shop</option>
                    <option value="BKY">Bakery</option>
                    <option value="TLR">Tailoring</option>
                    <option value="IA">Insurance Agency</option>
                    <option value="ENT">Enterprises</option>
                    <option value="HCS">Hardware Construction Supply</option>
                    <option value="CP">Coconut Processor</option>
                    <option value="CS">Computer Shop</option>
                    <option value="LO">Lotto Outlet</option>
                    <option value="GBR">Gowns and Barong Rentals</option>
                    <option value="BR">Beach Resort</option>
                    <option value="RST">Restaurant</option>
                    <option value="GSW">Glassware</option>
                    <option value="FDC">Firework Display Center</option>
                    <option value="FST">Food Stand</option>
                    <option value="RP">Refreshment Parlor</option>
                    <option value="FC">Food Cart</option>
                    <option value="AF">Agricultural Farm</option>
                    <option value="SFO">Steel Fabrication and Oxygen/Acetylene Plant</option>
                    <option value="TRKS">Trucking Services</option>
                    <option value="ES">Electrical Supplies</option>
                    <option value="RSV">Roofing Services</option>
                    <option value="HSP">Hospital</option>
                    <option value="CNS">Cable Network System</option>
                    <option value="CRS">Cellphone Repair Shop</option>
                    <option value="MPA">Motorcycle Parts and Accessories</option>
                    <option value="TT">Travel and Tours</option>
                    <option value="LDH">Lodging House</option>
                    <option value="SA">Security Agency</option>
                    <option value="RWS">Repair and Welding Shop</option>
                    <option value="SRS">Shoe Repair Shop</option>
                    <option value="PHS">Photographic Studio</option>
                    <option value="RCP">Recapping Shop</option>
                    <option value="BSP">Barber Shop</option>
                    <option value="BPR">Beauty Parlor</option>
                    <option value="FPS">Funeral Parlor and Services</option>
                    <option value="FSH">Furniture Shop</option>
                    <option value="MASC">Massage Clinic</option>
                    <option value="RFDS">Rice and Feeds Supply</option>
                    <option value="MST">Meat Stand</option>
                    <option value="EMS">Events Management Services</option>
                    <option value="DC">Dental Clinic</option>
                    <option value="RR">Rice Retailer</option>
                    <option value="SS">School Supplies</option>
                    <option value="DFR">Dried Fish Retailer</option>
                    <option value="ER">Egg Retailer</option>
                    <option value="EAT">Eatery</option>
                    <option value="GMC">General Merchandise</option>
                    <option value="FW">Footwear</option>
                    <option value="FV">Fruits and Vegetables Stand</option>
                    <option value="CTS">Catering Services</option>
                    <option value="CMS">Consultancy Marketing Services</option>
                    <option value="FS">Feeds Supply</option>
                    <option value="FRW">Fireworks Retailer</option>
                    <option value="MP">Motorcycle Parts</option>
                    <option value="BS">Bike Shop</option>
                    <option value="VSP">Veterinary Supply</option>
                    <option value="FSTN">Food Stand (Night Market)</option>
                    <option value="TNEC">Trading of Non-Essential Commodities</option>
                    <option value="HR">Hotel and Rental</option>
                    <option value="CRD">Carinderia</option>
                    <option value="ARS">Auto Repair Shop</option>
                    <option value="STF">Storage Tank Facility</option>
                    <option value="AS">Auto Supply</option>
                    <option value="OE">Office Equipment</option>
                    <option value="SOS">School and Office Supplies</option>
                    <option value="PGF">Piggery Farm</option>
                    <option value="HBM">Hollow Block Making</option>
                    <option value="CHBM">CHB Manufacturing</option>
                    <option value="CSUP">Construction and Supply</option>
                    <option value="FSUP">Fishing Supply</option>
                    <option value="BDC">Bridal Collection</option>
                    <option value="MSC">Massage and Spa Center</option>
                    <option value="IR">In-Land Resort</option>
                    <option value="COD">Cooking Oil Dealer</option>
                    <option value="NP">Native Products</option>
                    <option value="MD">Motorcycle Dealer</option>
                    <option value="FV2">Fruits and Vegetables</option>
                    <option value="EPS">Electronic Parts and Supply</option>
                    <option value="WRS">Water Refilling Station</option>
                    <option value="CA">Cellphone and Accessories</option>
                    <option value="PH">Pharmacy</option>
                    <option value="SHF">Sash Factory</option>
                    <option value="FS2">Funeral Services</option>
                    <option value="CPG">Cockpit Personnel - Gaffer</option>
                    <option value="MM">Minimart</option>
                    <option value="NSNP">Non-Stock/Non-Profit</option>
                    <option value="BH">Burger House</option>
                    <option value="DGS">Drugstore</option>
                    <option value="OS">Office Supply</option>
                    <option value="JRS">Jewelry and Repair Shop</option>
                    <option value="GS">Gas Station</option>
                    <option value="PS">Port Services</option>
                    <option value="EI">Educational Institution</option>
                    <option value="ELTS">Electronic Services</option>
                    <option value="BT">Bet Taker</option>
                    <option value="PDT">Petroleum Depot and Terminal</option>
                    <option value="SSIE">Seaport Services and Industrial Estate Developer</option>
                    <option value="ETC">Emission Testing Center</option>
                    <option value="CRR">Car Rental</option>
                    <option value="PD">Petroleum Depot</option>
                    <option value="BAS">Bakery Supply</option>
                    <option value="GAF">Gaffer</option>
                    <option value="BKS">Banking Services</option>
                    <option value="BTM">Bet Manager</option>
                    <option value="FS3">Flower Shop</option>
                    <option value="CSP">Catering Services and Party Needs </option>
                    <option value="PS2">Pawnshop</option>
                    <option value="M">Medicator</option>
                    <option value="GAS">Glass and Aluminum Supply</option>
                    <option value="CKA">Cockpit Arena</option>
                    <option value="FCL">Furniture and Coco Lumber</option>
                    <option value="LWO">Law Office</option>
                    <option value="RFS">Rice and Fertilizer Supply</option>
                    <option value="MANS">Manpower Services</option>
                    <option value="IC">Internet Cafe</option>
                    <option value="TS">Trading and Services</option>
                    <option value="LH">Lomi House</option>
                    <option value="BK">Banking</option>
                    <option value="RTW2">RTW</option>
                    <option value="A">Appliances</option>
                    <option value="TGBS">Tugboat Services</option>
                    <option value="FNI">Financial Institution</option>
                    <option value="MLA">Med. Lab./Scientific Apparatus/Microscope/Anatomical Models, Equipment Supplies</option>
                    <option value="MSH">Meat Shop</option>
                    <option value="CGS">Construction and General Services</option>
                    <option value="SH">Slaughter House</option>
                    <option value="R">Resort</option>
                    <option value="TRS">Tire and Retreading Services</option>
                    <option value="L">Lending</option>
                    <option value="LIC">Lying-in Clinic</option>
                    <option value="AM">Alcohol Manufacturing</option>
                    <option value="RW">Retailer/Wholesaler</option>
                    <option value="DPS">Digital Printing Services</option>
                    <option value="RDI">Retailer of Disposable Items</option>
                    <option value="PSMR">Pawnshop, Money Remittance, E-Loading, Money Changer</option>
                    <option value="ICM">Ice Cream Maker</option>
                    <option value="CC">Cold Cuts</option>
                    <option value="DS">Department Store</option>
                    <option value="PBB">Photocopying and Book Binding</option>
                    <option value="CG">Cereal and Grains</option>
                    <option value="PSGM">Pawnshop/Kwarta Padala/General Merchandise/Money Changer</option>
                    <option value="GLM">Gloves Manufacturing</option>
                    <option value="BRDS">Bread Store</option>
                    <option value="GWGS">Glassware and Gift Shop</option>
                    <option value="WR">Wholesaler/Retailer</option>
                    <option value="RE">Real Estate</option>
                    <option value="PPO">Power Plant Operator</option>
                    <option value="MRCB">Money Remittance/Courier Cargo/Bills Payment and Ticketing Services</option>
                    <option value="AAS">Auto Aircon Services</option>
                    <option value="FI2">Financing Institution</option>
                    <option value="TSP">T-Shirt Printing</option>
                    <option value="MPKS">Memorial Park Services</option>
                    <option value="PG">Power Generation</option>
                    <option value="PSMSA">Pawnshop, Money Transfer, and Other Service Activities</option>
                    <option value="CVS">Convenience Store</option>
                    <option value="DPC">Digital Printing Clothing</option>
                    <option value="ASS">Association</option>
                    <option value="JWRS">Jewelry Repair Shop</option>
                    <option value="AGS">Agricultural Supply</option>
                    <option value="AWS">Autoworks and Vulcanizing Shop</option>
                    <option value="TRC">Training Center</option>
                    <option value="FR">Feeds Retailer</option>
                    <option value="CPA">Cellphone Accessories</option>
                    <option value="VAC">Visa Assistance/Consultancy</option>
                    <option value="IGM">Industrial Gas Manufacturing</option>
                    <option value="GFF">Game Fowl Farm</option>
                    <option value="LNDS">Laundry Shop</option>
                    <option value="CAP">Candies and Pasalubong</option>
                    <option value="LR">Lechon Retailer</option>
                    <option value="IRT">Ice Retailer</option>
                    <option value="SPOS">Sports Officiating Services</option>
                    <option value="CF">Cooked Food</option>
                    <option value="TCN">Tiles Center</option>
                    <option value="DGW">Dry Goods and Glassware</option>
                    <option value="RPH">Retailer of Pharmaceutical, Medical, Cosmetics, and Toilet Articles</option>
                    <option value="BP">Beauty Products</option>
                    <option value="HS">Hauling Services</option>
                    <option value="PC">Paint Center</option>
                    <option value="ERS">Electronics Repair Shop</option>
                    <option value="PPF">Piggery and Poultry Farm</option>
                    <option value="VFS">Veterinary and Feeds Supply</option>
                    <option value="FA">Footwear and Accessories</option>
                    <option value="CGH">Cargo Handling</option>
                    <option value="MSSS">Meat Shop and Sari-Sari Store</option>
                    <option value="CPSS">Coconut Processor and Sari-Sari Store</option>
                    <option value="CARS">Cellphone Accessories and Repair Shop</option>
                    <option value="SSE">Sari-Sari Store and Eatery</option>
                    <option value="OC">Optical Clinic</option>
                    <option value="FG">Food Store/Grocery</option>
                    <option value="BPMRS">Bills Payment and Money Remittance Services</option>
                    <option value="PLS">Poultry Supply</option>
                    <option value="BATM">Banking/ATM Machine</option>
                    <option value="EC">Electric Cooperative</option>
                    <option value="N">Nursery</option>
                    <option value="STS">Stevedoring Services</option>
                    <option value="CSC">Contractor (Supplier of Coal)</option>
                    <option value="RH">Retreat House</option>
                    <option value="CW">Car Wash</option>
                    <option value="LD">LPG Depot</option>
                    <option value="MRBC">Money Remittance/Bayad Center/Ticketing/E-Load/PA Insurance/Money Changer/Foreign Exchange Dealer</option>
                    <option value="CCS">CCTV and Computer Supplies</option>
                    <option value="LA">Legal Activities</option>
                    <option value="DIIS">Distributor of Industrial Iodized Salt</option>
                    <option value="W">Warehouse</option>
                    <option value="DF">Dragon Fruit Farm</option>
                    <option value="FRFW">Freight Forwarder</option>
                    <option value="FCNM">Food Cart (Night Market)</option>
                    <option value="ESI">Electrical Supply and Installation</option>
                    <option value="PCS">Pest Control Services</option>
                    <option value="MTS">Management and Technical Services</option>
                    <option value="CD">Chemical Depot</option>
                    <option value="SRM">Storage of Raw Materials for Surfactants (Linear Alkyl Benzene)</option>
                    <option value="PED">Peddler (Selling Dry Goods)</option>
                    <option value="BGS">Burger Stand</option>
                    <option value="SP">Sugarcane Planters</option>
                    <option value="TRNS">Transport Services</option>
                    <option value="VCGC">Veterinary Clinic and Grooming Center</option>
                    <option value="HAA">Hawker (Accessories)</option>
                    <option value="HA8">Hawker (Dry Goods) 8 sq. m.</option>
                    <option value="HAF88">Hawker (Footwear) 8.8 sq. m.</option>
                    <option value="HA85">Hawker (Dry Goods) 8.5 sq. m.</option>
                    <option value="HA575">Hawker (Dry Goods) 5.75 sq. m.</option>
                    <option value="HA4">Hawker (Dry Goods) 4 sq. m.</option>
                    <option value="HA3">Hawker (Dry Goods) 3 sq. m.</option>
                    <option value="HA7">Hawker (Dry Goods) 7 sq. m.</option>
                    <option value="HAF2">Hawker (Dried Fish) 2 sq. m.</option>
                    <option value="RED">Real Estate Developer</option>
                    <option value="HAG525">Hawker (Glassware) 5.25 sq. m.</option>
                    <option value="HA6S">Hawker (Dry Goods) 6 sq. m.</option>
                    <option value="HAA5">Hawker (Accessories) 5 sq. m.</option>
                    <option value="SWO">Social Work Without Accommodation</option>
                    <option value="HPR">Health Product Retailer</option>
                    <option value="WSF">Warehousing/Storage Facility</option>
                    <option value="MS">Medical Supply</option>
                    <option value="CFMT">Construction and Fabrication of Mild Steel Vertical Storage Tank</option>
                    <option value="SSA">Storage of Sulfuric Acid</option>
                    <option value="PLBS">Plumbing Services</option>
                    <option value="PBL">Publishing</option>
                    <option value="HAAF4">Hawker (Aquatic Fish) 4 sq. m.</option>
                    <option value="HAA2">Hawker (Accessories) 2 sq. m.</option>
                    <option value="HAF13">Hawker (Footwear) 13 sq. m.</option>
                    <option value="HAA6">Hawker (Accessories) 6 sq. m.</option>
                    <option value="HA125">Hawker (Dry Goods) 12.5 sq. m.</option>
                    <option value="CEWS">Civil Engineering Works Services</option>
                    <option value="ACRS">Aircon Repair Shop</option>
                    <option value="HA42">Hawker (Dry Goods) 4.2 sq. m.</option>
                    <option value="TRPS">Transportation Services</option>
                    <option value="HA245">Hawker (Dry Goods) 24.5 sq. m.</option>
                    <option value="PZP">Pizza Parlor</option>
                    <option value="HA9">Hawker (Dry Goods) 9 sq. m.</option>
                    <option value="GASAW">Glass and Aluminum Supply and Steel Works</option>
                    <option value="FVSNM">Fruits and Vegetables Stand (Night Market)</option>
                    <option value="MTBP">Money Transfer/Bills Payment</option>
                    <option value="PSTC">Pest Control</option>
                    <option value="CWT">Construction of Water Tank</option>
                    <option value="RRC">Sale/Retail/Oven Roasted Chicken</option>
                    <option value="MRMC">Money Remittance/Money Changer</option>
                    <option value="RENES">Retailer of Essential, Non-Essential, Cigarette, Liquor, Drugstore, Refreshment</option>
                    <option value="BCTM">Bayad Center/Ticketing/Money Changer/Money Remittance</option>
                    <option value="CSPN">Computer Shop (Piso Net)</option>
                    <option value="TPS">Trading and Pest Control Services</option>
                    <option value="MTLS">Money Transfer/Loading Station</option>
                    <option value="PNDT">Plant Non-Destructive Testing</option>
                    <option value="SBPR">Sante Barley Product Retailer</option>
                    <option value="T2CS">Tower for Two Cell Sites</option>
                    <option value="PMSCPP">PMS Contractor for Power Plants</option>
                    <option value="CTST">Contractor (Sharpening Tools)</option>
                    <option value="HER">Heavy Equipment Rentals</option>
                    <option value="CFNM">Cooked Food (Night Market)</option>
                    <option value="PSMTFE">Pawnshop/Money Transfer/Foreign Exchange Dealing/Other Service Activities</option>
                    <option value="CPC">Cockpit Personnel/Cashier</option>
                    <option value="FXD">Foreign Exchange Dealer/Money Remittance/Money Changer/Ticketing/Bayad Center/E-Load/PA Insurance/DepED/Pension Loan</option>
                    <option value="CSH">Cashier</option>
                    <option value="APC">Atchara Processing Center</option>
                    <option value="PM">Pit Manager</option>
                    <option value="PRT">Promoter</option>
                    <option value="CPR">Cockpit Personnel - Referee</option>
                    <option value="TF">Temporary Facility</option>
                    <option value="DGCP">Dry Goods and Cosmetic Products</option>
                    <option value="DT">Depot (Terminaling)</option>
                    <option value="APIS">All Types of Paint, Industrial Services</option>
                    <option value="PRWC">Prawn Culture</option>
                    <option value="BKKS">Bookkeeping Services</option>
                    <option value="CSER">Construction Services</option>
                    <option value="INKR">Ink Retailer</option>
                    <option value="FER">Fire Extinguisher Retailer</option>
                    <option value="LPGP">LPG Refilling Plant</option>
                    <option value="LPR">LPG Retailer</option>
                    <option value="EWS">Engineering Works Services</option>
                    <option value="DMC">Dealer - Motorcycle</option>
                    <option value="D">Distributor</option>
                    <option value="EXEMPT">EXEMPTED</option>
                    <option value="PRVS">Private School</option>
                    <option value="PRVM">Private Market</option>
                    <option value="PUBM">Public Market</option>
                    <option value="ML">Mall</option>
                    <option value="SPM">Supermarket</option>

                  </select>
                </div>
                <div className="form-group">
                  <label>Business Operation:</label>
                  <select
                    value={activePermitId.business.businessoperation}
                    className="form-control"
                    disabled
                  >
                    <option value="Daytime">DAYTIME</option>
                    <option value="Nightshift">NIGHTSHIFT</option>
                    <option value="Day&Night">BOTH DAY AND NIGHT</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Business Type:</label>
                  <select
                    value={activePermitId.business.typeofbusiness}
                    className="form-control"
                    disabled
                  >
                    <option value="Main">MAIN</option>
                    <option value="Franchise">FRANCHISE</option>
                    <option value="Branch">BRANCH</option>
                  </select>
                </div>


  <div>

          {/* Close Modal Button */}
          <button className="close-modal" onClick={closeViewBusinessDetails}>
          Close
        </button>
    </div>
</div>
</div>
      )}

{checkpermit && activePermitId && (
        <div className="modal-overlay" onClick={closePermitChecker}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Approve Permit {activePermitId.id}?</h2>
            <p>Aapprove or Reject this permit? Please confirm your decision.</p>

            <div className="button-group">
              
              <button  className="btn btn-danger" onClick={() => {
                setIsRejecting(true); // Show remarks input when rejecting
              }}>
                Reject
              </button>
              <button className="btn btn-success"onClick={() => updatebusinesspermitstatus('approved', 'N/A')}>Approve</button>
            </div>

            {/* Show remarks input if rejecting */}
            {isRejecting && (
              <div>
                <label>Remarks:</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter remarks for rejection"
                />
              <button onClick={() => updatebusinesspermitstatus('rejected', remarks)}>Save</button>
              </div>
            )}
            <button className="btn btn-danger" onClick={closePermitChecker}>
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default AdminForAssessmentBusinessPermit;