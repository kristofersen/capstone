import React, {  useState } from 'react';
import { useNavigate } from "react-router-dom";
import {WorkPermit} from "../Interface(Front-end)/Types";
import axios from 'axios';

interface WorkPermitTableProps {
    workPermits: WorkPermit[];


}

const WorkPermitTable: React.FC<WorkPermitTableProps> = ({ workPermits}) => {
  const navigate = useNavigate();
  const [activePermitId, setActivePermitId] = useState<string | null>(null);

//Drop Down Button
  const handleAction = (action: string, permit: WorkPermit) => {
    switch (action) {
      case "viewApplication":

        navigate(`/viewapplicationdetails/${permit._id}`);
        break;
      case "delete":
        setDeleteConfirm(true);
        setActivePermitId(permit._id);

        break;
      case "pay":
  
        setActivePermitId(permit._id);
        setShowPaymentMethod(true);
        setModalStep(0);
        break;
      case "viewReceipt":
        if (permit.receipt?.receiptFile) {

          renderDocument(permit.receipt.receiptFile, "receipts");
        } else {
          console.log(`No receipt file found for permit: ${permit.id}`);
        }
        break;
      case "viewPermit":

        renderDocument(permit.permitFile || "", "permits");
        break;
      case "expirePermit":
        expireWorkPermit(permit._id);
        break;
      default:
        console.warn("Unknown action");
    }
  };

//Pageination Code
const [currentPage, setCurrentPage] = useState(0);
const itemsPerPage = 5;
const totalPages = Math.ceil(workPermits.length / itemsPerPage)
const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const sortedWorkPermits = workPermits
  .slice() // Make a copy of the array to avoid modifying the original
  .sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // Check if both dates are valid
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0; // If either date is invalid, keep their order (or handle as needed)
    }

    return dateB.getTime() - dateA.getTime(); // Sort in descending order
  });

// Now slice the sorted array to get the current items
const currentItems = sortedWorkPermits.slice(startIndex, endIndex);
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

  //Modal
  const [modalFile, setModalFile] = useState<string | null>(null);
  const [isModalOpenFile, setIsModalOpenFile] = useState(false);

//Payment Method
const [showPaymentMethod, setShowPaymentMethod] = useState(false);
 const [modalStep, setModalStep] = useState(0);
 const closePaymentMethod = () => {
    setShowPaymentMethod(false);
    setModalStep(0); // Reset when closing
  };

 // Close modal on overlay click
 const handleOverlayClick = () => {
   closePaymentMethod();
 };




//Payment Submission
 const [confirmpayment, setConfirmPayment] = useState(false);
  const confirmpaymentclose = () => {
    setConfirmPayment(false);
    setActivePermitId(null);
    setShowPaymentMethod(false);
    window.location.reload();
  };

  const closeviewpayment = () => {
    setShowPaymentMethod(false);
    setActivePermitId(null);
    setConfirmPayment(false);
    window.location.reload();

  };

  const logFormData = (formData: FormData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!files.document1) {
    alert('Please Upload a Receipt');
    return; // Prevent further execution
  }
else{
  const formData = new FormData();
  formData.append('document1', files.document1); // Append validated file


  logFormData(formData);


  try {
    const response = await axios.post(`http://localhost:3000/client/workpermithandlepayment/${activePermitId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, 
    });
      console.log(response.data);
      if (response.status === 200) {
        setConfirmPayment(true);
        setFiles({ document1: null }); // Clear uploaded file (if applicable)

        // Optionally update state/UI instead of reloading
      } else {
        const errorMessage = (response.data as { message: string }).message;
        console.error('Error submitting application:', errorMessage);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
        alert('Failed to submit work permit payment. Please try again.');
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please contact support.');
      }
    }
  }
  };


//File Codes
  const [files, setFiles] = useState<{
    document1: File | null;
  }>({
    document1: null,
  });
  
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, doc: 'document1') => {
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

  const fetchDocumentUrl = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts'): string | null => {
    if (!fileName) return null;
    
    // Return the file URL based on the folder specified
    return `http://localhost:3000/${folder}/${fileName}`;
  };
  
  const renderDocument = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts') => {
    const fileUrl = fetchDocumentUrl(fileName, folder);
  
    if (!fileUrl) return <span>Not uploaded</span>;
  
    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
  
    // Automatically open the modal if a valid file is found
   
        openModal(fileUrl); // Open the modal automatically
  
  
    return (
      <span>
        {fileExtension === 'pdf' ? 'View PDF' : 'View Document'}
      </span>
    );
  };

  // File Viewing
const openModal = (filePath: string) => {
    setModalFile(filePath);
    setIsModalOpenFile(true);
  };
  
  const closeModal = () => {
    setIsModalOpenFile(false);
    setModalFile(null);
  };
  
  // File Deleting
     //Delete Function
    const [deleteconfirm, setDeleteConfirm] = useState(false);
    const closedeleteconfirm = () => {
      setDeleteConfirm(false);
      setActivePermitId(null);
  
    };
  const handleDelete = async (permitId: string) => {
    console.log(`Delete permit ID: ${permitId}`);
    try {
      const response = await fetch(`http://localhost:3000/client/deleteworkpermit/${permitId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert("Permit deleted successfully");
        window.location.reload(); // Reload the page to refresh the data
      } else {
        alert("Failed to delete permit");
      }
    } catch (error) {
      console.error("Error deleting permit:", error);
    }
  };

  const expireWorkPermit = async (permitId: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/client/expireworkpermit/${permitId}`, {
        status: 'Expired', // Update the status to "Expired"
      });
  
      if (response.status === 200) {
        console.log('Work permit expired successfully');
        alert('Work permit expired successfully');
        window.location.reload();
        // Optionally refresh permits list or UI state
      } else {
        console.error('Failed to expire business permit');
      }
    } catch (error) {
      console.error('Error expiring business permit:', error);
    }
  };


  return (
    <div className="workpermittable">
      <p>Work Permit Applications</p>
      {/* Error Trap: Check if workPermits is empty */}
    {workPermits.length === 0 ? (
      <p style={{ color: "green", textAlign: "center", fontSize: "16px" }}>
        No Work Permits found.
      </p>
    ) : (
      <>
      <table className="permit-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Transaction</th>
            <th>Date Issued</th>
            <th>Date Expired</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((permit) => (
            <tr key={permit._id}>
              <td>{permit.id}</td>
              <td>{permit.workpermitstatus}</td>
              <td>{permit.classification}</td>
              <td>{new Date(permit.applicationdateIssued).toLocaleDateString()}</td>
              <td>
                {permit.permitExpiryDate
                  ? new Date(permit.permitExpiryDate).toLocaleDateString()
                  : "---"}
              </td>
              <td>
                <select
                  defaultValue=""
                  onChange={(e) => {
                    handleAction(e.target.value, permit);
                    e.target.value = "";
                  }}
                  className="dropdown-button"
                >
                  <option value="" disabled>
                    Select Action
                  </option>
                  {permit.workpermitstatus === "Pending" && (
                    <>
                      <option value="viewApplication">View Application</option>
                      <option value="delete">Delete</option>
                    </>
                  )}
                  {permit.workpermitstatus === "Waiting for Payment" && (
                    <>
                      <option value="viewApplication">View Application</option>
                      <option value="pay">Pay</option>
                    </>
                  )}
                  {permit.workpermitstatus === "Released" && (
                    <>
                      <option value="viewApplication">View Application</option>
                      {permit.classification === "Renew" && (
                        <option value="viewReceipt">View Receipt</option>
                      )}
                      <option value="viewPermit">View Permit</option>
                      <option value="expirePermit">Expire Work Permit(Developer Option)</option>
                    </>
                  )}
                  {permit.workpermitstatus === "Expired" && (
                    <>
                      <option value="viewApplication">View Application</option>
                      {permit.classification === "Renew" && (
                        <option value="viewReceipt">View Receipt</option>
                      )}
                      <option value="viewPermit">View Permit</option>
                    </>
                  )}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      

      <div className="pagination-buttons">
        {currentPage > 0 && <button onClick={handlePreviousPage}>Back</button>}
        {currentPage < totalPages - 1 && <button onClick={handleNextPage}>Next</button>}
      </div>
</>)}
      {/* Modal Dumps */}
{showPaymentMethod && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.45)", zIndex: 1050 }}
    onClick={handleOverlayClick}
  >
    <div
      className="modal-content p-4"
      style={{
        maxWidth: "400px",
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        borderRadius: "10px",
        backdropFilter: "blur(5px)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="modal-title mb-0">
          Choose an Action for Permit ID: {activePermitId}
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={closePaymentMethod}
        ></button>
      </div>

      {modalStep === 0 && (
        <div>
          <h6>Upload Receipt</h6>
          <div className="mb-3">
            <label className="form-label">Select File</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, "document1")}
            />
          </div>
        </div>
      )}

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
          disabled={!files}
        >
          Upload
        </button>
      </div>
    </div>
  </div>
)}

{isModalOpenFile && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.45)", zIndex: 1050 }}
    onClick={closeModal}
  >
    <div
      className="modal-content p-4"
      style={{
        maxWidth: "600px",
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "10px",
        backdropFilter: "blur(5px)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-3">
        {modalFile && (
          <div>
            {modalFile.endsWith(".pdf") ? (
              <iframe
                src={modalFile}
                style={{ width: "100%", height: "600px", border: "none" }}
                title="PDF Viewer"
              />
            ) : (
              <img
                src={modalFile}
                alt="Document"
                style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }}
              />
            )}
          </div>
        )}
      </div>
      
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-danger"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

{deleteconfirm && activePermitId && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.45)", zIndex: 1050 }}
    onClick={closedeleteconfirm}
  >
    <div
      className="modal-content p-4"
      style={{
        maxWidth: "400px",
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "10px",
        backdropFilter: "blur(5px)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h5 className="text-center mb-4">
        Are you sure you want to delete this application?
      </h5>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleDelete(activePermitId)}
        >
          Accept
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={closedeleteconfirm}
        >
          Decline
        </button>
      </div>
    </div>
  </div>
)}

{confirmpayment && activePermitId && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.45)", zIndex: 1050 }}
    onClick={closeviewpayment}
  >
    <div
      className="modal-content p-4"
      style={{
        maxWidth: "400px",
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "10px",
        backdropFilter: "blur(5px)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h5 className="text-center mb-4">
        Payment Completed for Working Permit Application {activePermitId}
      </h5>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary"
          onClick={confirmpaymentclose}
        >
          Okay
        </button>
      </div>  
    </div>
  </div>
)}
    </div>
  );
};

export default WorkPermitTable;
