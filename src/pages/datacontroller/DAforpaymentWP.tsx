import '../Styles/DataControllerStyles.css'; 
import DASidebar from '../components/DAsidebar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

interface WorkPermit {
  _id: string;
  id: string;
  workpermitstatus: string;
  classification: string;
  createdAt: string;
  permitExpiryDate: string;
  formData: FormDetails;
}
interface PersonalInformation {
  lastName: string;
  firstName: string;
  middleInitial?: string; // Optional
  permanentAddress?: string; // Optional
  currentlyResiding: boolean;
  temporaryAddress?: string; // Optional
  dateOfBirth?: Date; // Optional
  age?: number; // Optional
  placeOfBirth?: string; // Optional
  citizenship?: string; // Optional
  civilStatus?: string; // Optional
  gender?: string; // Optional
  height?: string; // Optional
  weight?: string; // Optional
  mobileTel?: string; // Optional
  email?: string; // Optional
  educationalAttainment?: string; // Optional
  natureOfWork?: string; // Optional
  placeOfWork?: string; // Optional
  companyName?: string; // Optional
  workpermitclassification?: string;
}

interface EmergencyContact {
  name2?: string; // Optional
  mobileTel2?: string; // Optional
  address?: string; // Optional
}

interface FormDetails {
  personalInformation: PersonalInformation;
  emergencyContact: EmergencyContact;
  files: Files;
}
interface Files {
  document1: string | null; // Optional
  document2: string | null; // Optional
  document3: string | null; // Optional
  document4: string | null; // Optional
  remarksdoc1?: string; // Optional
  remarksdoc2?: string; // Optional
  remarksdoc3?: string; // Optional
  remarksdoc4?: string; // Optional
  }

const DataControllerForPaymentWP: React.FC = () => {
  const [workPermits, setWorkPermits] = useState<WorkPermit[]>([]);
  const [filteredItems, setFilteredItems] = useState<WorkPermit[]>([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [selectedPermit, setSelectedPermit] = useState<WorkPermit | null>(null);
  const [isAttachmentsModalOpen, setIsAttachmentsModalOpen] = useState(false);
  const [isEditingAttach, setIsEditingAttach] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: string | null }>({});
  const [remarksdoc1, setRemarksdoc1] = useState('');
  const [remarksdoc2, setRemarksdoc2] = useState('');
  const [remarksdoc3, setRemarksdoc3] = useState('');
  const [remarksdoc4, setRemarksdoc4] = useState('');
  const [files, setFiles] = useState<{
    document1: File | null;
    document2: File | null;
    document3: File | null;
    document4: File | null;
  }>({
    document1: null,
    document2: null,
    document3: null,
    document4: null,
  });

  const customModalStyles = {
    content: {
      width: '50%', // Adjust the width as needed
      margin: 'auto', // Center the modal horizontally
    },
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/client/check-auth-datacontroller', {
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

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/client/logout', {
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

  // CODE FOR TABLE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(workPermits.length / itemsPerPage)
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

 

  // END CODE FOR TABLE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  // Search QUERY @@@@@@@@@@@@@@@@@@@@@
  const [searchQuery, setSearchQuery] = useState<string>(''); // Track the search query
  const [inputValue, setInputValue] = useState<string>('');
  const [classificationFilter, setClassificationFilter] = useState<string>('');

  // New state to track sorting
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'ascending' | 'descending' | null }>({
    key: '', 
    direction: null
  });

  // Handle sorting when a table header is clicked
  const handleSort = (key: keyof WorkPermit) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    // Toggle sorting direction if the same column is clicked
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });

    // Sort the filteredItems based on the key and direction
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredItems(sortedItems);
  };

  // Get current items
  const currentItems = filteredItems.slice(startIndex, endIndex); 

  // Handle the search and classification filter together
  const applyFilters = (searchValue: string, classification: string) => {
    const results = workPermits.filter((permit) => {
      const matchesSearchQuery = permit.id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        permit.workpermitstatus.toLowerCase().includes(searchValue.toLowerCase()) ||
        permit.classification.toLowerCase().includes(searchValue.toLowerCase());

      const matchesClassification = classification ? permit.classification === classification : true;

      return matchesSearchQuery && matchesClassification;
    });

    setFilteredItems(results); // Update filtered items
    setCurrentPage(0); // Reset to the first page of results
    console.log('Filtered Results:', results); // Log the filtered results
  };

  // Handle the search when the button is clicked
  const handleSearch = () => {
    const searchValue = inputValue; // Use input value for search
    setSearchQuery(searchValue); // Update search query state
    applyFilters(searchValue, classificationFilter); // Apply both search and classification filters
  };

  // Handle dropdown selection change (classification filter)
  const handleClassificationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassification = event.target.value;
    setSearchQuery(inputValue); // Keep the current search query
    setInputValue(inputValue); // Keep the current input value
    setClassificationFilter(selectedClassification); // Set the classification filter
    applyFilters(inputValue, selectedClassification); // Apply both search and classification filters
    console.log('Selected Classification:', selectedClassification); // Log selected classification
    console.log('Search Query:', searchQuery);
    console.log('Input Value:', inputValue);
  };

  const fetchWorkPermits = async () => {
    try {
      const response = await fetch('http://localhost:3000/datacontroller/getworkpermitsforpayments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const WorkPermitData = await response.json();
      setWorkPermits(WorkPermitData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    const handleTokenCheck = () => {
      if (!token) {
          navigate('/'); // Redirect to login if no token
      } else {
          fetchWorkPermits(); // Fetch work permits if token is present
      }
    };

    handleTokenCheck(); // Call the function to check the token
  }, [navigate, token]);

  useEffect(() => {
    setFilteredItems(workPermits); // Display all work permits by default
  }, [workPermits]);

  // Date picker states
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Handle date search
  const handleDateSearch = () => {
    const filteredByDate = workPermits.filter((permit) => {
      const permitDate = new Date(permit.createdAt);
      const isAfterStartDate = startDate ? permitDate >= new Date(startDate) : true;
      const isBeforeEndDate = endDate ? permitDate <= new Date(endDate) : true;
      return isAfterStartDate && isBeforeEndDate;
    });

    setFilteredItems(filteredByDate);
    setCurrentPage(0); // Reset to the first page of results
  };

  const maxDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const handleAction = (action: string, permit: WorkPermit) => {
    switch (action) {
      case 'viewApplication':
    console.log(`Edit permit ID: ${permit._id}`);
      navigate(`/DAviewapplicationdetails/${permit._id}`);
        break;
      case 'viewAttachments':
        console.log(`View attachments for permit ID: ${permit._id}`);
        setSelectedPermit(permit);
        setIsAttachmentsModalOpen(true);
        break;
      default:
        console.warn('Unknown action');
    }
  };

  const handleViewDocument = (documentKey: 'document1' | 'document2' | 'document3' | 'document4') => {
    const documentUrl = fetchDocumentUrl(selectedPermit?.formData.files[documentKey] ?? null, 'uploads');
    setSelectedFiles((prev) => ({
      ...prev,
      [documentKey]: prev[documentKey] === documentUrl ? null : documentUrl, // Toggle visibility based on the URL
    }));
  };


  const closeAttachmentsModal = () => {
    setIsAttachmentsModalOpen(false);
    setSelectedPermit(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, doc: 'document1' | 'document2' | 'document3' | 'document4') => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles((prev) => ({
        ...prev,
        [doc]: selectedFiles[0],
      }));
    } else {
      setFiles((prev) => ({
        ...prev,
        [doc]: null, 
      }));
    }
  };

  const logFormData = (formData: FormData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };

  const updateAttachments = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!selectedPermit) return;

    const formData = new FormData();
    
    formData.append('remarksdoc1', remarksdoc1);
    formData.append('remarksdoc2', remarksdoc2);
    formData.append('remarksdoc3', remarksdoc3);
    formData.append('remarksdoc4', remarksdoc4);

    if (files.document1) formData.append('document1', files.document1);
    if (files.document2) formData.append('document2', files.document2);
    if (files.document3) formData.append('document3', files.document3);
    if (files.document4) formData.append('document4', files.document4);

    logFormData(formData);

    try {
      if (!selectedPermit) {
        console.error('No permit selected');
        return;
      }
      const response = await fetch(`http://localhost:3000/datacontroller/updateworkpermitattachments/${selectedPermit._id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const updatedPermit = await response.json();
        setWorkPermits((prevPermits) =>
          prevPermits.map((permit) =>
            permit._id === updatedPermit._id ? updatedPermit : permit
          )
        );
        console.log('Attachments updated successfully');
        setIsEditingAttach(false); 
        closeAttachmentsModal();
      } else {
        console.error('Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleCancelEditAttach = () => {
    setRemarksdoc1('');
    setRemarksdoc2('');
    setRemarksdoc3('');
    setRemarksdoc4('');
    setFiles({
      document1: null,
      document2: null,
      document3: null,
      document4: null,
    });
    setSelectedFiles({});
    setIsEditingAttach(false); // Add this line to exit edit mode
  };

  useEffect(() => {
    const urls: Record<string, string> = {}; // Define a typed object for URLs

    // Iterate through each file key in the `files` object
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        urls[key] = fileUrl; // Store the created URL
        setSelectedFiles((prev) => ({ ...prev, [key]: fileUrl }));
      }
    });

    // Cleanup function to revoke URLs
    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]); // Watch the `files` object for changes

  const fetchDocumentUrl = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts'): string | null => {
    if (!fileName) return null;
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

  return (
    <section className="DAbody">
      <div className="DAsidebar-container">
        <DASidebar handleLogout={handleLogout} /> {/* Pass handleLogout to DASidebar */}
      </div>

      <div className="DAcontent">
        <header className='DAheader'>
          <h1>Online Business and Work Permit Licensing System</h1>
        </header>
        <div className='workpermitcontainer'>
          <p>Work Permit Applications (For Payment)</p>
          {/* Search Bar */}
          <div className="search-bar-container">
            Search:
            <input
              type="text"
              placeholder="Search by ID, Status, or Classification"
              value={inputValue} // Use inputValue for the input field
              onChange={(e) => setInputValue(e.target.value)} // Update inputValue state
              className="search-input" // Add a class for styling
            />
            <button onClick={handleSearch} className="search-button">Search</button> {/* Button to trigger search */}
          </div>

          {/* Dropdown for Classification Filter */}
          Classification:
          <select value={classificationFilter} onChange={handleClassificationChange}>
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Renew">Renew</option>
          </select>

          {/* Date Pickers for Date Range Filter */}
          <div className="date-picker-container">
            Start Date:
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
                <th onClick={() => handleSort('id')}>
                  ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('createdAt')}>
                  Created At {sortConfig.key === 'createdAt' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('workpermitstatus')}>
                  Status {sortConfig.key === 'workpermitstatus' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('classification')}>
                  Classification {sortConfig.key === 'classification' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((permit) => (
                <tr key={permit._id}>
                  <td>{permit.id}</td>
                  <td>{new Date(permit.createdAt).toLocaleDateString()}</td>
                  <td>{permit.workpermitstatus}</td>
                  <td>{permit.classification}</td>
                  <td>
                    <select onChange={(e) => handleAction(e.target.value, permit)}>
                      <option value="">Select Action</option>
                      <option value="viewApplication">View Application</option>
                      <option value="viewAttachments">View Attachments</option>
                    </select>
                  </td>
                </tr>
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
      </div>
      <Modal
        isOpen={isAttachmentsModalOpen}
        onRequestClose={closeAttachmentsModal}
        contentLabel="View Attachments"
        style={customModalStyles} // Apply custom styles
      >
        <form onSubmit={updateAttachments}>
          <h2>View Attachments</h2>
          {selectedPermit && (
            <div>
              <label>Attachments:</label>
              <p>Permit ID: {selectedPermit?._id}</p>
              {/* Document 1 */}
              <p>
                Document 1: {selectedPermit.formData.files.document1 || 'Not uploaded'}
                {selectedPermit.formData.files.document1 && (
                  <button
                    type="button"
                    onClick={() => handleViewDocument('document1')}
                  >
                    {selectedFiles.document1 ? 'Close' : 'View'}
                  </button>
                )}
                {isEditingAttach && (
                  <input type="file" onChange={(e) => handleFileChange(e, 'document1')} />
                )}
                <label>Remarks:</label>
                <input 
                  type="text" 
                  value={isEditingAttach ? (remarksdoc1 || '') : (selectedPermit.formData.files.remarksdoc1 || '')} 
                  onChange={(e) => setRemarksdoc1(e.target.value)} 
                  disabled={!isEditingAttach} 
                />
              </p>
              {renderFile(selectedFiles.document1)}
              {/* Document 2 */}
              <p>
                Document 2: {selectedPermit.formData.files.document2 || 'Not uploaded'}
                {selectedPermit.formData.files.document2 && (
                  <button
                    type="button"
                    onClick={() => handleViewDocument('document2')}
                  >
                    {selectedFiles.document2 ? 'Close' : 'View'}
                  </button>
                )}
                {isEditingAttach && (
                  <input type="file" onChange={(e) => handleFileChange(e, 'document2')} />
                )}
                <label>Remarks:</label>
                <input 
                  type="text" 
                  value={isEditingAttach ? (remarksdoc2 || '') : (selectedPermit.formData.files.remarksdoc2 || '')} 
                  onChange={(e) => setRemarksdoc2(e.target.value)} 
                  disabled={!isEditingAttach} 
                />
              </p>
              {renderFile(selectedFiles.document2)}
              {/* Document 3 */}
              <p>
                Document 3: {selectedPermit.formData.files.document3 || 'Not uploaded'}
                {selectedPermit.formData.files.document3 && (
                  <button
                    type="button"
                    onClick={() => handleViewDocument('document3')}
                  >
                    {selectedFiles.document3 ? 'Close' : 'View'}
                  </button>
                )}
                {isEditingAttach && (
                  <input type="file" onChange={(e) => handleFileChange(e, 'document3')} />
                )}
                <label>Remarks:</label>
                <input 
                  type="text" 
                  value={isEditingAttach ? (remarksdoc3 || '') : (selectedPermit.formData.files.remarksdoc3 || '')} 
                  onChange={(e) => setRemarksdoc3(e.target.value)} 
                  disabled={!isEditingAttach} 
                />
              </p>
              {renderFile(selectedFiles.document3)}
              {/* Document 4 */}
              <p>
                Document 4: {selectedPermit.formData.files.document4 || 'Not uploaded'}
                {selectedPermit.formData.files.document4 && (
                  <button
                    type="button"
                    onClick={() => handleViewDocument('document4')}
                  >
                    {selectedFiles.document4 ? 'Close' : 'View'}
                  </button>
                )}
                {isEditingAttach && (
                  <input type="file" onChange={(e) => handleFileChange(e, 'document4')} />
                )}
                <label>Remarks:</label>
                <input 
                  type="text" 
                  value={isEditingAttach ? (remarksdoc4 || '') : (selectedPermit.formData.files.remarksdoc4 || '')} 
                  onChange={(e) => setRemarksdoc4(e.target.value)} 
                  disabled={!isEditingAttach} 
                />
              </p>
              {renderFile(selectedFiles.document4)}
              {isEditingAttach ? (
                <>
                  <button type="submit" style={{ marginLeft: '10px' }}>
                    Save
                  </button>
                  <button type="button" onClick={handleCancelEditAttach} style={{ marginLeft: '10px' }}>
                    Cancel
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => setIsEditingAttach(true)} style={{ marginLeft: '10px' }}>
                  Edit Attachments
                </button>
              )}
            </div>
          )}
        </form>
      </Modal>
    </section>
  );
};

export default DataControllerForPaymentWP;
