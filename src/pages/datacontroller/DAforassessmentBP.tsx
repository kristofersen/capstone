
import '../Styles/DataControllerStyles.css'; 
import DASidebar from '../components/NavigationBars/DAsidebar';
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


const DataControllerForAssessmentBP: React.FC = () => {
  const [businessPermits, setBusinessPermits] = useState<BusinessPermit[]>([]);
  const [filteredItems, setFilteredItems] = useState<BusinessPermit[]>([]);
  
  const navigate = useNavigate();


  const [activePermitId, setActivePermitId] = useState<BusinessPermit | null>(null);

  //Modals Owner Edit
  const [editownermodal, setEditOwnerModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if fields are editable

  //Modals Attachments Edit
  const [viewAttachmentsModal, setViewAttatchmentsModal] = useState(false);
  const [isEditingAttach, setIsEditingAttach] = useState(false); // Track if fields are editable

  //Modals Business Edit
  const [viewbusinessdetails, setViewBusinessDetails] = useState(false);
  const [editbusiness, setEditBusiness] = useState(false);

  //Actionupdate
  const [updatesuccess, setUpdateSuccess] = useState(false);

  const closeupdateSuccess = () => {
    setUpdateSuccess(false);
  };

  //Step 1
  const [corporation, setCorporation] = useState(false);
  const [lastname, setLastName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [middleinitial, setMiddleInitial] = useState('');
  const [civilstatus, setCivilStatus] = useState('');
  const [companyname, setCompanyName] = useState('');
  const [gender, setGender] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [tinnumber, setTinNumber] = useState('');
  const [representative, setRepresentative] = useState(false);
  const [repfullname, setRepFullName] = useState('');
  const [repdesignation, setRepDesignation] = useState('');
  const [repmobilenumber, setRepMobileNumber] = useState('');
  const [houseandlot, setHouseandLot] = useState('');
  const [buildingstreetname, setBuildingStreetName] = useState('');
  const [subdivision, setSubdivision] = useState('');
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [telephonenumber, setTelephoneNumber] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  //Step2
  const [businessname, setBusinessName] = useState('');
  const [businessscale, setBusinessScale] = useState('');
  const [paymentmethod, setPaymentMethod] = useState('');
  const [businessbuildingblocklot, setBusinessBuildingBlockLot] = useState('');
  const [businessbuildingname, setBusinessBuildingName] = useState('');
  const [businesssubcompname, setBusinessSubCompName] = useState('');
  const [businessregion, setBusinessRegion] = useState('REGION IV-A (CALABARZON)');
  const [businessprovince, setBusinessProvince] = useState('CAVITE');
  const [businessmunicipality, setBusinessMunicipality] = useState('CITY OF DASMARIÑAS');
  const [businessbarangay, setbusinessBarangay] = useState('');
  const [businesszip, setBusinessZip] = useState('4114');
  const [businesscontactnumber, setBusinessContactNumber] = useState('');
  const [ownershiptype, setOwnershipType] = useState('');
  const [agencyregistered, setAgencyRegistered] = useState('');
  const [dtiregistrationnum, setDTIRegistrationNum] = useState('');
  const [dtiregistrationdate, setDTIRegistrationDate] = useState('');
  const [dtiregistrationexpdate, setDTIRegistrationExpDate] = useState('');
  const [secregistrationnum, setSECRegistrationNum] = useState('');
  const [birregistrationnum, setBIRRegistrationNum] = useState('');
  const [industrysector, setIndustrySector] = useState('');
  const [businessoperation, setBusinessOperation] = useState('');
  const [typeofbusiness, setTypeofBusiness] = useState('');

 // Get current month and quarter
 const currentMonth = new Date().getMonth() + 1; // Months are 0-based, so add 1
 const quarter = Math.ceil(currentMonth / 3);

 // Determine applicable payment methods dynamically
 const getPaymentOptions = () => {
   if (quarter === 2 || quarter === 4) {
     return ["Quarterly"];
   }
   return ["Annual", "Semi-Annual", "Quarterly"];
 };

  const paymentOptions = getPaymentOptions();

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


const [remarksdoc1, setRemarksdoc1] = useState('');
const [remarksdoc2, setRemarksdoc2] = useState('');
const [remarksdoc3, setRemarksdoc3] = useState('');
const [remarksdoc4, setRemarksdoc4] = useState('');
const [remarksdoc5, setRemarksdoc5] = useState('');
const [remarksdoc6, setRemarksdoc6] = useState('');
const [remarksdoc7, setRemarksdoc7] = useState('');
const [remarksdoc8, setRemarksdoc8] = useState('');
const [remarksdoc9, setRemarksdoc9] = useState('');
const [remarksdoc10, setRemarksdoc10] = useState('');

  
  //Attach
  const [files, setFiles] = useState<{
    document1: File | null;
    document2: File | null;
    document3: File | null;
    document4: File | null;
    document5: File | null;
    document6: File | null;
    document7: File | null;
    document8: File | null;
    document9: File | null;
    document10: File | null;
  }>({
    document1: null,
    document2: null,
    document3: null,
    document4: null,
    document5: null,
    document6: null,
    document7: null,
    document8: null,
    document9: null,
    document10: null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, doc: 'document1' | 'document2' | 'document3' | 'document4' | 'document5' | 'document6' | 'document7' | 'document8' | 'document9' | 'document10') => {
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

  const updateAttachments = async () => {
    if (!activePermitId) return;
  
    const formData = new FormData();
    
    formData.append('remarksdoc1', remarksdoc1);
    formData.append('remarksdoc2', remarksdoc2);
    formData.append('remarksdoc3', remarksdoc3);
    formData.append('remarksdoc4', remarksdoc4);
    formData.append('remarksdoc5', remarksdoc5);
    formData.append('remarksdoc6', remarksdoc6);


    if (files.document1) formData.append('document1', files.document1);
    if (files.document2) formData.append('document2', files.document2);
    if (files.document3) formData.append('document3', files.document3);
    if (files.document4) formData.append('document4', files.document4);
    if (files.document5) formData.append('document5', files.document5);
    if (files.document6) formData.append('document5', files.document6);


    logFormData(formData);

  
    try {
      const response = await axios.post(
        `http://localhost:3000/datacontroller/updatebusinessattachment/${activePermitId._id}`,
        formData,
        {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, 
      });
        console.log(response.data);
        if (response.status === 200) {
          fetchBusinessPermits(); // Fetch work permits if token is present
          setUpdateSuccess(true);
          closeViewAttachmentsModal();
        } else {
          const errorMessage = (response.data as { message: string }).message;
          console.error('Error submitting application:', errorMessage);
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  const closeViewAttachmentsModal = () => {
    if (selectedFiles.document1) {
      URL.revokeObjectURL(selectedFiles.document1);
    }
    if (selectedFiles.document2) {
      URL.revokeObjectURL(selectedFiles.document2);
    }
    if (selectedFiles.document3) {
      URL.revokeObjectURL(selectedFiles.document3);
    }
    if (selectedFiles.document4) {
      URL.revokeObjectURL(selectedFiles.document4);
    }
    if (selectedFiles.document5) {
      URL.revokeObjectURL(selectedFiles.document5);
    }
    if (selectedFiles.document6) {
      URL.revokeObjectURL(selectedFiles.document6);
    }
    setViewAttatchmentsModal(false);
    setSelectedFiles({});
    setIsEditingAttach(false);
    setFiles({
      document1: null,
      document2: null,
      document3: null,
      document4: null,
      document5: null,
      document6: null,
      document7: null,
      document8: null,
      document9: null,
      document10: null,
    });
  };

  const handleCancelEditAttach = () => {
    setIsEditingAttach(false);
    setRemarksdoc1('');
    setFiles({
     document1: null,
     document2: null,
     document3: null,
     document4: null,
     document5: null,
     document6: null,
     document7: null,
     document8: null,
     document9: null,
     document10: null,
   });
   setSelectedFiles({});
   if (selectedFiles.document1) {
     URL.revokeObjectURL(selectedFiles.document1);
   }
   if (selectedFiles.document2) {
     URL.revokeObjectURL(selectedFiles.document2);
   }
   if (selectedFiles.document3) {
     URL.revokeObjectURL(selectedFiles.document3);
   }
   if (selectedFiles.document4) {
     URL.revokeObjectURL(selectedFiles.document4);
   }
   if (selectedFiles.document5) {
    URL.revokeObjectURL(selectedFiles.document5);
  }
  if (selectedFiles.document6) {
    URL.revokeObjectURL(selectedFiles.document6);
  }
   
     };
  //Attach


  //Edit Business
  const closeViewBusinessDetails = () => {
    setViewBusinessDetails(false);
    setEditBusiness(false);
  };

  const handlecancelbusinessedit = () => {
    if (activePermitId) {
      setBusinessName(activePermitId.business.businessname || '');
      setBusinessScale(activePermitId.business.businessscale || '');
      setPaymentMethod(activePermitId.business.paymentmethod || '');
      setBusinessBuildingBlockLot(activePermitId.business.businessbuildingblocklot || '');
      setBusinessSubCompName(activePermitId.business.businesssubcompname || '');
      setBusinessRegion(activePermitId.business.businessregion || '');
      setBusinessProvince(activePermitId.business.businessprovince || '');
      setBusinessMunicipality(activePermitId.business.businessmunicipality || '');
      setbusinessBarangay(activePermitId.business.businessbarangay || '');
      setBusinessZip(activePermitId.business.businesszip || '');
      setBusinessContactNumber(activePermitId.business.businesscontactnumber || '');
      setOwnershipType(activePermitId.business.ownershiptype || '');
      setAgencyRegistered(activePermitId.business.agencyregistered || '');
      setDTIRegistrationNum(activePermitId.business.dtiregistrationnum || '');
      setDTIRegistrationDate(activePermitId.business.dtiregistrationdate || '');
      setDTIRegistrationExpDate(activePermitId.business.dtiregistrationexpdate || '');
      setSECRegistrationNum(activePermitId.business.secregistrationnum || '');
      setBIRRegistrationNum(activePermitId.business.birregistrationnum || '');
      setIndustrySector(activePermitId.business.industrysector || '');
      setBusinessOperation(activePermitId.business.businessoperation || '');
      setTypeofBusiness(activePermitId.business.typeofbusiness || '');
  
    }
    setEditBusiness(false);
  };

  const handlesavebusinessedit = async () => {
    if (!activePermitId) return;
  
    const updatedData = {
       business: {
        businessname,
        businessscale,
        paymentmethod,
        businessbuildingblocklot,
        businessbuildingname,
        businesssubcompname,
        businessregion,
        businessprovince,
        businessmunicipality,
        businessbarangay,
        businesszip,
        businesscontactnumber,
        ownershiptype,
        agencyregistered,
        dtiregistrationnum,
        dtiregistrationdate,
        dtiregistrationexpdate,
        secregistrationnum,
        birregistrationnum,
        industrysector,
        businessoperation,
        typeofbusiness,
        
        },
    };
  
    try {
      const response = await axios.put(`http://localhost:3000/datacontroller/updatebusinessinfopermit/${activePermitId._id}`, updatedData);
  
      fetchBusinessPermits(); // Fetch work permits if token is present
      console.log('Update successful:', response.data);
      closeViewBusinessDetails(); // Exit editing mode
      setUpdateSuccess(true);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
  //Edit Business

  const handleActionBP = (action: string, permit: BusinessPermit) => {
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

        case 'rejectpermit':
          setActivePermitId(permit);
          setRejectPermit(true);
        break;

      default:
        console.warn('Unknown action');
    }
  };


//Use Effect
  useEffect(() => {
    if (activePermitId) {
      setLastName(activePermitId.owner.lastname || '');
      setFirstName(activePermitId.owner.firstname || '');
      setMiddleInitial(activePermitId.owner.middleinitial || '');
      setCompanyName(activePermitId.owner.companyname || '');
      setCivilStatus(activePermitId.owner.civilstatus || '');
      setGender(activePermitId.owner.gender || '');
      setCitizenship(activePermitId.owner.citizenship || '');
      setTinNumber(activePermitId.owner.tinnumber || '');
      setRepFullName(activePermitId.owner.representativedetails?.repfullname || '');
      setRepDesignation(activePermitId.owner.representativedetails?.repdesignation || '');
      setRepMobileNumber(activePermitId.owner.representativedetails?.repmobilenumber || '');
      setHouseandLot(activePermitId.owner.houseandlot || '');
      setBuildingStreetName(activePermitId.owner.buildingstreetname || '');
      setSubdivision(activePermitId.owner.subdivision || '');
      setRegion(activePermitId.owner.region || '');
      setProvince(activePermitId.owner.province || '');
      setMunicipality(activePermitId.owner.municipality || '');
      setBarangay(activePermitId.owner.barangay || '');
      setTelephoneNumber(activePermitId.owner.telephonenumber || '');
      setMobileNumber(activePermitId.owner.mobilenumber || '');
      setEmail(activePermitId.owner.email || '');
      setCorporation(activePermitId.owner.corporation || false);
      setRepresentative(activePermitId.owner.representative || false);

      setBusinessName(activePermitId.business.businessname || '');
      setBusinessScale(activePermitId.business.businessscale || '');
      setPaymentMethod(activePermitId.business.paymentmethod || '');
      setBusinessBuildingBlockLot(activePermitId.business.businessbuildingblocklot || '');
      setBusinessSubCompName(activePermitId.business.businesssubcompname || '');
      setBusinessRegion(activePermitId.business.businessregion || '');
      setBusinessProvince(activePermitId.business.businessprovince || '');
      setBusinessMunicipality(activePermitId.business.businessmunicipality || '');
      setbusinessBarangay(activePermitId.business.businessbarangay || '');
      setBusinessZip(activePermitId.business.businesszip || '');
      setBusinessContactNumber(activePermitId.business.businesscontactnumber || '');
      setOwnershipType(activePermitId.business.ownershiptype || '');
      setAgencyRegistered(activePermitId.business.agencyregistered || '');
      setDTIRegistrationNum(activePermitId.business.dtiregistrationnum || '');
      setDTIRegistrationDate(activePermitId.business.dtiregistrationdate || '');
      setDTIRegistrationExpDate(activePermitId.business.dtiregistrationexpdate || '');
      setSECRegistrationNum(activePermitId.business.secregistrationnum || '');
      setBIRRegistrationNum(activePermitId.business.birregistrationnum || '');
      setIndustrySector(activePermitId.business.industrysector || '');
      setBusinessOperation(activePermitId.business.businessoperation || '');
      setTypeofBusiness(activePermitId.business.typeofbusiness || '');


      setRemarksdoc1(activePermitId.files.remarksdoc1 || '');
      setRemarksdoc2(activePermitId.files.remarksdoc2 || '');
      setRemarksdoc3(activePermitId.files.remarksdoc3 || '');
      setRemarksdoc4(activePermitId.files.remarksdoc4 || '');
      setRemarksdoc5(activePermitId.files.remarksdoc5 || '');
      setRemarksdoc6(activePermitId.files.remarksdoc6 || '');

    }
  }, [activePermitId]);

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


   const { type } = useParams<{ type: string }>();
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
const handleeditsave = async () => {
  if (!activePermitId) return;

  const updatedData = {
    owner: {
      lastname,
      firstname,
      middleinitial,
      companyname,
      civilstatus,
      gender,
      citizenship,
      tinnumber,
      representative,
      representativedetails: {
        repfullname,
        repdesignation,
        repmobilenumber,
      },
      houseandlot,
      buildingstreetname,
      subdivision,
      region,
      province,
      municipality,
      barangay,
      telephonenumber,
      mobilenumber,
      email,
    },
  };

  try {
    const response = await axios.put(`http://localhost:3000/datacontroller/updatebusinessownerpermit/${activePermitId._id}`, updatedData);

    fetchBusinessPermits(); // Fetch work permits if token is present
    editcloseModal();
    setUpdateSuccess(true);
    console.log('Update successful:', response.data);
    setIsEditing(false); // Exit editing mode
  } catch (error) {
    console.error('Update failed:', error);
  }
};

const handleCorpChange = () => {
  if (!corporation) {
    // If toggling to corporation, clear the first and last names
    setFirstName('');
    setLastName('');
    setMiddleInitial('');
    setCompanyName(activePermitId?.owner?.companyname || '');
  } else {
    // If switching back to individual, restore original names from activePermitId (or keep current state)
    setFirstName(activePermitId?.owner?.firstname || '');
    setLastName(activePermitId?.owner?.lastname || '');
    setMiddleInitial(activePermitId?.owner?.middleinitial || '');
    setCompanyName('');
  }

  // Toggle corporation state
  setCorporation(!corporation);
};

const handleRepChange = () => {
  if (!representative) {
    // If toggling to corporation, clear the first and last names
    setRepFullName(activePermitId?.owner?.representativedetails?.repfullname || '');
    setRepDesignation(activePermitId?.owner?.representativedetails?.repdesignation || '');
    setRepMobileNumber(activePermitId?.owner?.representativedetails?.repmobilenumber || '');
  } else {
    // If switching back to individual, restore original names from activePermitId (or keep current state)
    setRepFullName('');
    setRepDesignation('');
    setRepMobileNumber('');
  }

  // Toggle corporation state
  setRepresentative(!representative);
};

const handleCancelEdit = () => {
  if (activePermitId) {
    setLastName(activePermitId.owner.lastname || '');
    setFirstName(activePermitId.owner.firstname || '');
    setMiddleInitial(activePermitId.owner.middleinitial || '');
    setCompanyName(activePermitId.owner.companyname || '');
    setCivilStatus(activePermitId.owner.civilstatus || '');
    setGender(activePermitId.owner.gender || '');
    setCitizenship(activePermitId.owner.citizenship || '');
    setTinNumber(activePermitId.owner.tinnumber || '');
    setRepFullName(activePermitId.owner.representativedetails?.repfullname || '');
    setRepDesignation(activePermitId.owner.representativedetails?.repdesignation || '');
    setRepMobileNumber(activePermitId.owner.representativedetails?.repmobilenumber || '');
    setHouseandLot(activePermitId.owner.houseandlot || '');
    setBuildingStreetName(activePermitId.owner.buildingstreetname || '');
    setSubdivision(activePermitId.owner.subdivision || '');
    setRegion(activePermitId.owner.region || '');
    setProvince(activePermitId.owner.province || '');
    setMunicipality(activePermitId.owner.municipality || '');
    setBarangay(activePermitId.owner.barangay || '');
    setTelephoneNumber(activePermitId.owner.telephonenumber || '');
    setMobileNumber(activePermitId.owner.mobilenumber || '');
    setEmail(activePermitId.owner.email || '');

  }
  setIsEditing(false);
  setCorporation(false);
  setRepresentative(false);
};

  const editcloseModal = () => {
    setEditOwnerModal(false);
    setIsEditing(false);
  };
//ModalEditOwner

//Reject Part

  const [rejectpermit, setRejectPermit]=useState(false);
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
      `http://localhost:3000/datacontroller/rejectbusinesspermit/${activePermitId._id}`,
      { status: action, remarks }
    );

    // Assuming fetchBusinessPermits() is a function to refetch the list of permits
    fetchBusinessPermits();

    console.log('Update successful:', response.data);
    setRejectPermit(false); // Close the modal after the update
  } catch (error) {
    console.error('Update failed:', error);
    alert('Failed to update permit status. Please try again.');
  }
};

 const [remarks, setRemarks] = useState(''); // For storing remarks when the permit is rejected
  const [isRejecting, setIsRejecting] = useState(false);
  const closeRejectpermit = () => {
    setRejectPermit(false);
    setActivePermitId(null);
    setIsRejecting(false); // Reset rejection state
    setRemarks(''); // Clear remarks when modal closes
  };

  let displayTextTitle = 'All Business Permit Applications (For Assessments)';

  if (type === 'new') {
    displayTextTitle = 'New Business Permit Applications (For Assessments)';
  } else if (type === 'renew') {
    displayTextTitle = 'Renewal of Business Permit Applications (For Assessments)';
  } else if (type === 'all') {
    displayTextTitle = 'All Business Permit Applications (For Assessments)';
  } else {
    displayTextTitle = 'All Business Permit Applications (For Assessments)';
  }

  return (
    <section className="DAbody">
      <div className="DAsidebar-container">
        <DASidebar /> {/* Pass handleLogout to DASidebar */}
      </div>

      <div className="DAcontent">
        <header className='DAheader'>
          <h1>Online Business and Work Permit Licensing System</h1>
        </header>
        <div className='workpermittable'>
        <p>{displayTextTitle}</p>
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
                <option value="editowner">Edit Owner Details</option>
                <option value="editbusiness">Edit Business Details</option>
                <option value="viewApplication">View Full Application</option>
                <option value="editnature">Edit Business Nature</option>
                <option value="assessment">Assessment</option>
                <option value="viewattatchments">View Attatchments</option>
                {permit.businesspermitstatus === 'Pending' && (
              <>
                <option value="rejectpermit">Reject Application</option>
              </>
            )}
              </>
          </select>
        </td>
      </tr>
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
      <div className="modal-overlay" onClick={editcloseModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <p>Edit Owner Details {activePermitId._id}</p>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isEditing ? corporation : activePermitId?.owner?.corporation || false}
                onChange={() => {
                  handleCorpChange();
                                }}
                disabled={!isEditing} // Disable unless editing
              />
              Check if Corporation
            </label>
          </div>

        
          <div className="form-group">
  <label>LAST NAME:</label>
  <input
    type="text"
    value={isEditing ? lastname : activePermitId.owner.lastname} // Use `lastname` when editing
    onChange={(e) => setLastName(e.target.value)}
    required
    disabled={!isEditing || corporation} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>FIRST NAME:</label>
  <input
    type="text"
    value={isEditing ? firstname : activePermitId.owner.firstname} // Use `lastname` when editing
    onChange={(e) => setFirstName(e.target.value)}
    required
    disabled={!isEditing || corporation} // Disable if not editing or is corporation
  />

<div className="form-group">
  <label>MIDDLE INITIAL:</label>
  <input
    type="text"
    value={isEditing ? middleinitial : activePermitId.owner.middleinitial} // Use `lastname` when editing
    onChange={(e) => setMiddleInitial(e.target.value)}
    required
    disabled={!isEditing || corporation} // Disable if not editing or is corporation
  />
  </div>

</div>
<div className="form-group">
  <label>COMPANY NAME:</label>
  <input
    type="text"
    value={isEditing ? companyname : activePermitId.owner.companyname} // Use `lastname` when editing
    onChange={(e) => setCompanyName(e.target.value)}
    required
    disabled={!isEditing || !corporation} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Civil Status:</label>
   <select
                  value={isEditing ? civilstatus : activePermitId.owner.civilstatus} // Use `lastname` when editing
                  onChange={(e) => setCivilStatus(e.target.value)}
                  required
                  disabled={!isEditing}
                  className="form-control"
                >
                  <option value="" disabled>Select Civil Status</option>
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
                  value={isEditing ? gender : activePermitId.owner.gender} // Use `lastname` when editing
                  onChange={(e) => setGender(e.target.value)}
                  className="form-control"
                  disabled={!isEditing} // Disable if not editing or is corporation
                >
                  <option value="" disabled>Select Gender</option>
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
    value={isEditing ? citizenship : activePermitId.owner.citizenship} // Use `lastname` when editing
    onChange={(e) => setCitizenship(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Tin Number:</label>
  <input
    type="text"
    value={isEditing ? tinnumber : activePermitId.owner.tinnumber} // Use `lastname` when editing
    onChange={(e) => setTinNumber(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isEditing ? representative : activePermitId?.owner?.representative || false}
                onChange={() => {
                  handleRepChange();
                                }}
                disabled={!isEditing} // Disable unless editing
              />
              Check if thru Representative
            </label>
          </div>
          <div className="form-group">
  <label>Representative Full Name:</label>
  <input
    type="text"
    value={isEditing ? repfullname : activePermitId.owner.representativedetails?.repfullname} // Use `lastname` when editing
    onChange={(e) => setRepFullName(e.target.value)}
    required
    disabled={!isEditing || !representative} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Representative Designation:</label>
  <input
    type="text"
    value={isEditing ? repdesignation : activePermitId.owner.representativedetails?.repdesignation} // Use `lastname` when editing
    onChange={(e) => setRepDesignation(e.target.value)}
    required
    disabled={!isEditing || !representative} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Representative Mobile Number:</label>
  <input
    type="text"
    value={isEditing ? repmobilenumber : activePermitId.owner.representativedetails?.repmobilenumber} // Use `lastname` when editing
    onChange={(e) => setRepMobileNumber(e.target.value)}
    required
    disabled={!isEditing || !representative} // Disable if not editing or is corporation
  />
</div>
<h1>Contact Details</h1>
<div className="form-group">
  <label>House/Bldg No./Blk and Lot:</label>
  <input
    type="text"
    value={isEditing ? houseandlot : activePermitId.owner.houseandlot} // Use `lastname` when editing
    onChange={(e) => setHouseandLot(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Building Name / Street Name:</label>
  <input
    type="text"
    value={isEditing ? buildingstreetname : activePermitId.owner.buildingstreetname} // Use `lastname` when editing
    onChange={(e) => setBuildingStreetName(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Subdivision / Compound Name:</label>
  <input
    type="text"
    value={isEditing ? subdivision : activePermitId.owner.subdivision} // Use `lastname` when editing
    onChange={(e) => setSubdivision(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Region:</label>
  <input
    type="text"
    value={isEditing ? region : activePermitId.owner.region} // Use `lastname` when editing
    onChange={(e) => setRegion(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Province:</label>
  <input
    type="text"
    value={isEditing ? province : activePermitId.owner.province} // Use `lastname` when editing
    onChange={(e) => setProvince(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Municipality:</label>
  <input
    type="text"
    value={isEditing ? municipality : activePermitId.owner.municipality} // Use `lastname` when editing
    onChange={(e) => setMunicipality(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Barangay:</label>
  <input
    type="text"
    value={isEditing ? barangay : activePermitId.owner.barangay} // Use `lastname` when editing
    onChange={(e) => setBarangay(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Telephone Number:</label>
  <input
    type="text"
    value={isEditing ? telephonenumber : activePermitId.owner.telephonenumber} // Use `lastname` when editing
    onChange={(e) => setTelephoneNumber(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Mobile Number:</label>
  <input
    type="text"
    value={isEditing ? mobilenumber : activePermitId.owner.mobilenumber} // Use `lastname` when editing
    onChange={(e) => setMobileNumber(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
<div className="form-group">
  <label>Email:</label>
  <input
    type="text"
    value={isEditing ? email : activePermitId.owner.email} // Use `lastname` when editing
    onChange={(e) => setEmail(e.target.value)}
    required
    disabled={!isEditing} // Disable if not editing or is corporation
  />
</div>
          {/* Additional fields */}
          <div>
  <button className="btn btn-success "onClick={isEditing ? handleeditsave : () => setIsEditing(true)}>
    {isEditing ? 'Save' : 'Edit'}
  </button>
  {isEditing && (
    <button className="btn btn-secondary" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
      Cancel
    </button>
  )}
            <button className="btn btn-danger" onClick={editcloseModal}>Close</button>
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

  {isEditingAttach && (
    <input type="file" onChange={(e) => handleFileChange(e, 'document1')} />
  )}

  <label>Remarks:</label>
  <input 
  type="text" 
  value={isEditingAttach ? (remarksdoc1 || '') : (activePermitId.files.remarksdoc1 || '')} 
  onChange={(e) => setRemarksdoc1(e.target.value)} 
  disabled={!isEditingAttach} 
/>
</p>

{renderFile(
  selectedFiles.document1 || (files.document1 && URL.createObjectURL(files.document1))
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

  {isEditingAttach && (
    <input type="file" onChange={(e) => handleFileChange(e, 'document2')} />
  )}

  <label>Remarks:</label>
  <input 
  type="text" 
  value={isEditingAttach ? (remarksdoc2 || '') : (activePermitId.files.remarksdoc2 || '')} 
  onChange={(e) => setRemarksdoc2(e.target.value)} 
  disabled={!isEditingAttach} 
/>
</p>

{renderFile(
  selectedFiles.document2 || (files.document2 && URL.createObjectURL(files.document2))
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

  {isEditingAttach && (
    <input type="file" onChange={(e) => handleFileChange(e, 'document3')} />
  )}

  <label>Remarks:</label>
  <input 
  type="text" 
  value={isEditingAttach ? (remarksdoc3 || '') : (activePermitId.files.remarksdoc3 || '')} 
  onChange={(e) => setRemarksdoc3(e.target.value)} 
  disabled={!isEditingAttach} 
/>
</p>

{renderFile(
  selectedFiles.document3 || (files.document3 && URL.createObjectURL(files.document3))
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

  {isEditingAttach && (
    <input type="file" onChange={(e) => handleFileChange(e, 'document4')} />
  )}

  <label>Remarks:</label>
  <input 
  type="text" 
  value={isEditingAttach ? (remarksdoc4 || '') : (activePermitId.files.remarksdoc4 || '')} 
  onChange={(e) => setRemarksdoc4(e.target.value)} 
  disabled={!isEditingAttach} 
/>
</p>

{renderFile(
  selectedFiles.document4 || (files.document4 && URL.createObjectURL(files.document4))
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

  {isEditingAttach && (
    <input type="file" onChange={(e) => handleFileChange(e, 'document5')} />
  )}

  <label>Remarks:</label>
  <input 
  type="text" 
  value={isEditingAttach ? (remarksdoc5 || '') : (activePermitId.files.remarksdoc5 || '')} 
  onChange={(e) => setRemarksdoc5(e.target.value)} 
  disabled={!isEditingAttach} 
/>
</p>

{renderFile(
  selectedFiles.document5 || (files.document5 && URL.createObjectURL(files.document5))
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

  {isEditingAttach && (
    <input type="file" onChange={(e) => handleFileChange(e, 'document6')} />
  )}

  <label>Remarks:</label>
  <input 
  type="text" 
  value={isEditingAttach ? (remarksdoc6 || '') : (activePermitId.files.remarksdoc6 || '')} 
  onChange={(e) => setRemarksdoc6(e.target.value)} 
  disabled={!isEditingAttach} 
/>
</p>

{renderFile(
  selectedFiles.document6 || (files.document6 && URL.createObjectURL(files.document6))
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

  {isEditingAttach && (
    <input type="file" onChange={(e) => handleFileChange(e, 'document7')} />
  )}

  <label>Remarks:</label>
  <input 
  type="text" 
  value={isEditingAttach ? (remarksdoc7 || '') : (activePermitId.files.remarksdoc7 || '')} 
  onChange={(e) => setRemarksdoc7(e.target.value)} 
  disabled={!isEditingAttach} 
/>
</p>

{renderFile(
  selectedFiles.document7 || (files.document7 && URL.createObjectURL(files.document7))
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

    {isEditingAttach && (
      <input type="file" onChange={(e) => handleFileChange(e, 'document8')} />
    )}

    <label>Remarks:</label>
    <input 
      type="text" 
      value={isEditingAttach ? (remarksdoc8 || '') : (activePermitId.files.remarksdoc8 || '')} 
      onChange={(e) => setRemarksdoc8(e.target.value)} 
      disabled={!isEditingAttach} 
    />
    
    {renderFile(
      selectedFiles.document8 || (files.document8 && URL.createObjectURL(files.document8))
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

    {isEditingAttach && (
      <input type="file" onChange={(e) => handleFileChange(e, 'document9')} />
    )}

    <label>Remarks:</label>
    <input 
      type="text" 
      value={isEditingAttach ? (remarksdoc9 || '') : (activePermitId.files.remarksdoc9 || '')} 
      onChange={(e) => setRemarksdoc9(e.target.value)} 
      disabled={!isEditingAttach} 
    />
    
    {renderFile(
      selectedFiles.document9 || (files.document9 && URL.createObjectURL(files.document9))
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

    {isEditingAttach && (
      <input type="file" onChange={(e) => handleFileChange(e, 'document10')} />
    )}

    <label>Remarks:</label>
    <input 
      type="text" 
      value={isEditingAttach ? (remarksdoc10 || '') : (activePermitId.files.remarksdoc10 || '')} 
      onChange={(e) => setRemarksdoc10(e.target.value)} 
      disabled={!isEditingAttach} 
    />

    {renderFile(
      selectedFiles.document10 || (files.document10 && URL.createObjectURL(files.document10))
    )}
  </p>
)}

        <button className="modal-button"onClick={isEditingAttach ? updateAttachments : () => setIsEditingAttach(true)}>
    {isEditingAttach ? 'Save' : 'Edit'}
  </button>
  {isEditingAttach && (
    <button className="btn btn-secondary" onClick={handleCancelEditAttach} style={{ marginLeft: '10px' }}>
      Cancel
    </button>
  )}
        {/* Close Modal Button */}
        <button className="btn btn-danger" onClick={closeViewAttachmentsModal}>
          Close
        </button>
      </div>
    </div>
      )}

{viewbusinessdetails && activePermitId && (
  <div className="modal-overlay" onClick={closeViewBusinessDetails}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
  <p>Edit Owner Details {activePermitId._id}</p>


<div className="form-group">
                  <label>Business Name:</label>
                  <input type="text" value={editbusiness ? businessname : activePermitId.business.businessname} onChange={(e) => setBusinessName(e.target.value)} disabled={!editbusiness}/>
                </div>
                <div className="form-group">
                  <label>Business Scale:</label>
                  <select
                    value={editbusiness ? businessscale : activePermitId.business.businessscale}
                    onChange={(e) => setBusinessScale(e.target.value)}
                    className="form-control"
                    disabled={!editbusiness}
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
        value={paymentmethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="form-control"
        disabled={!editbusiness}
      >
        <option value="" disabled>
          Select Payment Method
        </option>
        {paymentOptions.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
    </div>
                <h2>Buisness Contact Information</h2>
                <div className="form-group">
                  <label>House/Bldg No./Blk and Lot:</label>
                  <input type="text" disabled={!editbusiness} value={editbusiness ? businessbuildingblocklot : activePermitId.business.businessbuildingblocklot} onChange={(e) => setBusinessBuildingBlockLot(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Building Name/Street Name:</label>
                  <input type="text" disabled={!editbusiness} value={editbusiness ? businessbuildingname : activePermitId.business.businessbuildingname} onChange={(e) => setBusinessBuildingName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Subdivision/Compound Name:</label>
                  <input type="text" disabled={!editbusiness} value={editbusiness ? businesssubcompname : activePermitId.business.businesssubcompname} onChange={(e) => setBusinessSubCompName(e.target.value)}  />
                </div>
                <div className="form-group">
                  <label>Region:</label>
                  <input type="text"  value={editbusiness ? businessregion : activePermitId.business.businessregion} onChange={(e) => setBusinessRegion(e.target.value)} disabled />
                </div>
                <div className="form-group">
                  <label>Province:</label>
                  <input type="text"  value={editbusiness ? businessprovince : activePermitId.business.businessprovince} onChange={(e) => setBusinessProvince(e.target.value)} disabled />
                </div>
                <div className="form-group">
                  <label>City/Municipality:</label>
                  <input type="text"  value={editbusiness ? businessmunicipality : activePermitId.business.businessmunicipality} onChange={(e) => setBusinessMunicipality(e.target.value)} disabled />
                </div>
                <div className="form-group">
                  <label>Barangay:</label>
                  <input type="text" disabled={!editbusiness} value={editbusiness ? businessbarangay : activePermitId.business.businessbarangay} onChange={(e) => setbusinessBarangay(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Zip:</label>
                  <input type="text" disabled={!editbusiness} value={editbusiness ? businesszip : activePermitId.business.businesszip} onChange={(e) => setBusinessZip(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Contact Number:</label>
                  <input type="text" disabled={!editbusiness} value={editbusiness ? businesscontactnumber : activePermitId.business.businesscontactnumber} onChange={(e) => setBusinessContactNumber(e.target.value)} />


                </div>
                <h2>Necessities Information</h2>
                <div className="form-group">
                  <label>Ownership Type:</label>
                  <select
                    value={editbusiness ? ownershiptype : activePermitId.business.ownershiptype}
                    onChange={(e) => {
                      setOwnershipType(e.target.value);
                      if (e.target.value === "COOP") {
                        setDTIRegistrationNum(''); // Clear DTI Registration No for specific types
                        setDTIRegistrationDate('');
                        setDTIRegistrationExpDate('');
                        setSECRegistrationNum('');
                      }
                      if (e.target.value === "CORP" || e.target.value === "INST" || e.target.value === "PART") {
                        setDTIRegistrationNum(''); // Clear DTI Registration No for specific types
                        setDTIRegistrationDate('');
                        setDTIRegistrationExpDate('');
                        setBIRRegistrationNum('');
                      }
                      if (e.target.value === "SOLE") {
                        setSECRegistrationNum('');
                        setBIRRegistrationNum('');

                      }
                    }}
                    className="form-control"
                    disabled={!editbusiness}
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
                  <input type="text" disabled={!editbusiness} value={editbusiness ? agencyregistered : activePermitId.business.agencyregistered} onChange={(e) => setAgencyRegistered(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>DTI Registration No:</label>
                  <input
                    type="text"
                    value={editbusiness ? dtiregistrationnum : activePermitId.business.dtiregistrationnum}
                    onChange={(e) => setDTIRegistrationNum(e.target.value)}
                    placeholder="Enter DTI Registration No"
                    disabled={ownershiptype === "COOP" || ownershiptype === "CORP" || ownershiptype === "INST" || ownershiptype === "PART" || !editbusiness}
                  />
                </div>
                <div className="form-group">
                  <label>DTI Registration Date:</label>
                  <input type="date"  value={editbusiness ? dtiregistrationdate : activePermitId.business.dtiregistrationdate} onChange={(e) => setDTIRegistrationDate(e.target.value)} disabled={ownershiptype === "COOP" || ownershiptype === "CORP" || ownershiptype === "INST" || ownershiptype === "PART" || !editbusiness} />
                </div>
                <div className="form-group">
                  <label>DTI Expiration Date:</label>
                  <input type="date"  value={editbusiness ? dtiregistrationexpdate : activePermitId.business.dtiregistrationexpdate} onChange={(e) => setDTIRegistrationExpDate(e.target.value)} disabled={ownershiptype === "COOP" || ownershiptype === "CORP" || ownershiptype === "INST" || ownershiptype === "PART" || !editbusiness} />
                </div>
                <div className="form-group">
                  <label>SEC Registration No:</label>
                  <input type="text"  value={editbusiness ? secregistrationnum : activePermitId.business.secregistrationnum} onChange={(e) => setSECRegistrationNum(e.target.value)} disabled={ownershiptype === "COOP" || ownershiptype === "SOLE" || !editbusiness} />
                </div>
                <div className="form-group">
                  <label>BIR Registration No:</label>
                  <input type="text" value={editbusiness ? birregistrationnum : activePermitId.business.birregistrationnum} onChange={(e) => setBIRRegistrationNum(e.target.value)} disabled={ownershiptype === "CORP" || ownershiptype === "INST" || ownershiptype === "PART" || ownershiptype === "SOLE" || !editbusiness} />
                </div>
                <div className="form-group">
                  <label>Industry Sector:</label>
                  <select
                    value={editbusiness ? industrysector : activePermitId.business.industrysector}
                    onChange={(e) => setIndustrySector(e.target.value)}
                    className="form-control"
                    disabled={!editbusiness}
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
                    value={editbusiness ? businessoperation : activePermitId.business.businessoperation}
                    onChange={(e) => setBusinessOperation(e.target.value)}
                    className="form-control"
                    disabled={!editbusiness}
                  >
                    <option value="Daytime">DAYTIME</option>
                    <option value="Nightshift">NIGHTSHIFT</option>
                    <option value="Day&Night">BOTH DAY AND NIGHT</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Business Type:</label>
                  <select
                    value={editbusiness ? typeofbusiness : activePermitId.business.typeofbusiness}
                    onChange={(e) => setTypeofBusiness(e.target.value)}
                    className="form-control"
                    disabled={!editbusiness}
                  >
                    <option value="Main">MAIN</option>
                    <option value="Franchise">FRANCHISE</option>
                    <option value="Branch">BRANCH</option>
                  </select>
                </div>


  <div>
  <button onClick={editbusiness ? handlesavebusinessedit : () => setEditBusiness(true)}>
    {editbusiness ? 'Save' : 'Edit'}
  </button>
  {editbusiness && (
    <button className="btn btn-secondary"onClick={handlecancelbusinessedit} style={{ marginLeft: '10px' }}>
      Cancel
    </button>
  )}
          {/* Close Modal Button */}
          <button className="btn btn-danger"onClick={closeViewBusinessDetails}>
          Close
        </button>
    </div>
</div>
</div>
      )}

{updatesuccess && activePermitId && (
  <div className="modal-overlay" onClick={closeupdateSuccess}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <p>Updated Business Permit ID:{activePermitId.id}</p>
    <button className="btn btn-danger" onClick={closeupdateSuccess}>
          Close
        </button>
  </div>
  </div>
      )}

{rejectpermit && activePermitId && (
        <div className="modal-overlay" onClick={closeRejectpermit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Reject Permit {activePermitId.id}?</h2>
            <p>Are you sure you want to approve or reject this permit? Please confirm your decision.</p>

            <div className="button-group">
              <button className="btn btn-success" onClick={() => {
                closeRejectpermit(); // Show remarks input when rejecting
              }}>No</button>
              <button className="btn btn-danger" onClick={() => {
                setIsRejecting(true); // Show remarks input when rejecting
              }}>
                Yes
              </button>
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
            <button className="btn btn-danger" onClick={closeRejectpermit}>
              Close
            </button>
          </div>
        </div>
      )}

      
      </div>
    </section>
  );
};

export default DataControllerForAssessmentBP;