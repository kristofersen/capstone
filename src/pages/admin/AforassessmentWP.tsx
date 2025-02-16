import '../styles/AdminStyles.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import AdminSideBar from '../components/NavigationBars/AdminSideBar';

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

const AdminForAssessmentWP: React.FC = () => {
  const [isEditingAttach, setIsEditingAttach] = useState(false);
  const [workPermits, setWorkPermits] = useState<WorkPermit[]>([]);
  const [filteredItems, setFilteredItems] = useState<WorkPermit[]>([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState<WorkPermit | null>(null);
  const [isAttachmentsModalOpen, setIsAttachmentsModalOpen] = useState(false);

  const customModalStyles = {
    content: {
      width: '50%', // Adjust the width as needed
      margin: 'auto', // Center the modal horizontally
    },
  };

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
  }, [navigate]); // Only depend on navigate, which is necessary for the redirection



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
      if (a[key] === null || b[key] === null) {
        return 0;
      }
      if (a[key]! < b[key]!) {
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
      const response = await fetch('http://localhost:3000/datacontroller/getworkpermitforassessment', {
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
        console.log(`View permit ID: ${permit._id}`);
        navigate(`/Aviewapplicationdetails/${permit._id}`);
        break;
      case 'viewAttachments':
        console.log(`View attachments for permit ID: ${permit._id}`);
        setSelectedPermit(permit);
        setIsAttachmentsModalOpen(true);
        break;
      case 'editFormDetails':
        console.log(`Edit form details for permit ID: ${permit._id}`);
        setSelectedPermit(permit);
        setIsModalOpen(true);
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPermit(null);
  };

  const closeAttachmentsModal = () => {
    setIsAttachmentsModalOpen(false);
    setSelectedPermit(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPermit) {
      try {
        const response = await fetch(`http://localhost:3000/datacontroller/updateworkpermit/${selectedPermit._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formData: selectedPermit.formData }), // Ensure the entire formData is sent
        });
  
        if (response.ok) {
          const updatedPermit = await response.json();
          setWorkPermits((prevPermits) =>
            prevPermits.map((permit) =>
              permit._id === updatedPermit._id ? updatedPermit : permit
            )
          );
          closeModal();
        } else {
          console.error('Failed to update permit');
        }
      } catch (error) {
        console.error('Error updating permit:', error);
      }
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof PersonalInformation) => {
    const value = e.target.value;
    const date = value ? new Date(value) : null;
    const currentYear = new Date().getFullYear();
    const year = date ? date.getFullYear() : null;
  
    if (date && !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(value) && year && year >= 1900 && year <= currentYear) {
      setSelectedPermit((prevPermit) => {
        if (!prevPermit) return prevPermit;
        return {
          ...prevPermit,
          formData: {
            ...prevPermit.formData,
            personalInformation: {
              ...prevPermit.formData.personalInformation,
              [field]: date,
            },
          },
        };
      });
    } else {
      console.error('Invalid date value or format');
    }
  };

  // Removed duplicate handleFileChange function


  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: string | null }>({});

const fetchDocumentUrl = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts'): string | null => {
  if (!fileName) return null;
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
    const response = await fetch(`http://localhost:3000/datacontroller/updateworkpermitattachment/${selectedPermit._id}`, {
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


  return (
    <section className="Abody">
      <div className="Asidebar-container">
        <AdminSideBar />
      </div>

      <div className="Acontent">
        <header className='Aheader'>
          <h1>Online Business and Work Permit Licensing System</h1>
        </header>
        <div className='workpermittable'>
          <p>Work Permit Applications (For Assessments)</p>
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

          {/* Dropdown for Classification Filter */}
          Classification:
          <select value={classificationFilter} onChange={handleClassificationChange}>
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Renew">Renew</option>
          </select>

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
                <th onClick={() => handleSort('id')}>
                  ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('createdAt')}>
                  Name {sortConfig.key === 'createdAt' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('workpermitstatus')}>
                  Status {sortConfig.key === 'workpermitstatus' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('classification')}>
                  Classification {sortConfig.key === 'classification' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('createdAt')}>
                  Date Issued {sortConfig.key === 'createdAt' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((permit) => (
                <tr key={permit._id}>
                  <td>{permit.id}</td>
                  <td>{permit.formData.personalInformation.lastName}, {permit.formData.personalInformation.firstName} {permit.formData.personalInformation.middleInitial}</td>
                  <td>{permit.workpermitstatus}</td>
                  <td>{permit.classification}</td>
                  <td>{new Date(permit.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      defaultValue=""
                      onChange={(e) => {
                        handleAction(e.target.value, permit);
                        e.target.value = ""; // Reset dropdown to default
                      }}
                      className="dropdown-button"
                    >
                      <option value="" disabled>
                        Select Action
                      </option>
                      <option value="viewApplication">View Application</option>
                      <option value="viewAttachments">View Attachments</option>
                      <option value="editFormDetails">Edit Form Details</option>
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
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Work Permit"
        style={customModalStyles} // Apply custom styles
      >
                <h2>Edit Work Permit</h2>
        {selectedPermit && (
          <form onSubmit={handleFormSubmit}>
            <label>
              First Name:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.firstName}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        firstName: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.lastName}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        lastName: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Middle Initial:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.middleInitial || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        middleInitial: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Permanent Address:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.permanentAddress || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        permanentAddress: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Currently Residing:
              <input
                type="checkbox"
                checked={selectedPermit.formData.personalInformation.currentlyResiding}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        currentlyResiding: e.target.checked,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Temporary Address:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.temporaryAddress || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        temporaryAddress: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
  Date of Birth:
  <input
    type="date"
    value={selectedPermit.formData.personalInformation.dateOfBirth ? new Date(selectedPermit.formData.personalInformation.dateOfBirth).toISOString().split('T')[0] : ''}
    onChange={(e) => handleDateChange(e, 'dateOfBirth')}
    max={maxDate} // Set the maximum date to today
  />
</label>
            <label>
              Age:
              <input
                type="number"
              value={selectedPermit.formData.personalInformation.age?.toString() || ''}
              onChange={(e) =>
                setSelectedPermit({
                  ...selectedPermit,
                  formData: {
                    ...selectedPermit.formData,
                    personalInformation: {
                      ...selectedPermit.formData.personalInformation,
                      age: parseInt(e.target.value, 10) || undefined,
                    },
                  },
                })
              }
              />
            </label>
            <label>
              Place of Birth:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.placeOfBirth || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        placeOfBirth: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Citizenship:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.citizenship || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        citizenship: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Civil Status:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.civilStatus || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        civilStatus: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Gender:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.gender || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        gender: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Height:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.height || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        height: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Weight:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.weight || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        weight: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Mobile Tel:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.mobileTel || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        mobileTel: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={selectedPermit.formData.personalInformation.email || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        email: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Educational Attainment:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.educationalAttainment || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        educationalAttainment: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Nature of Work:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.natureOfWork || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        natureOfWork: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Place of Work:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.placeOfWork || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        placeOfWork: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <label>
              Company Name:
              <input
                type="text"
                value={selectedPermit.formData.personalInformation.companyName || ''}
                onChange={(e) =>
                  setSelectedPermit({
                    ...selectedPermit,
                    formData: {
                      ...selectedPermit.formData,
                      personalInformation: {
                        ...selectedPermit.formData.personalInformation,
                        companyName: e.target.value,
                      },
                    },
                  })
                }
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </form>
        )}
      </Modal>
      <Modal
        isOpen={isAttachmentsModalOpen}
        onRequestClose={closeAttachmentsModal}
        contentLabel="View Attachments"
        style={customModalStyles} // Apply custom styles
      > 
        <form onSubmit={updateAttachments}>
          <h2>View Attachments</h2>
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
            <button type="button" onClick={updateAttachments} style={{ marginLeft: '10px' }}>
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

export default AdminForAssessmentWP;
