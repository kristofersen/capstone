
import '../Styles/DataControllerStyles.css'; 
import DASidebar from '../components/NavigationBars/DAsidebar';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  lastYearGross: string;
  tax: string;
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


const DataControllerForPaymentBP: React.FC = () => {

  const navigate = useNavigate();

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


  const [businessPermits, setBusinessPermits] = useState<BusinessPermit[]>([]);
  const [filteredItems, setFilteredItems] = useState<BusinessPermit[]>([]);
  const maxDate = new Date().toISOString().split("T")[0]; 
  const { type } = useParams<{ type: string }>();


  
//File
const [modalFile, setModalFile] = useState<string | null>(null);
const [isModalOpenFile, setIsModalOpenFile] = useState(false);
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
const [viewingType, setViewingType] = useState('');
const renderDocument = (fileName: string | null, folder: 'uploads' | 'permits' | 'receipts') => {
  const fileUrl = fetchDocumentUrl(fileName, folder);

  if (!fileUrl) return <span>Not uploaded</span>;

  const fileExtension = fileUrl.split('.').pop()?.toLowerCase();

  // Automatically open the modal if a valid file is found
 
      openModal(fileUrl); // Open the modal automatically
      setViewingType(folder);

  return (
    <span>
      {fileExtension === 'pdf' ? 'View PDF' : 'View Document'}
    </span>
  );
};
const openModal = (filePath: string) => {
  setModalFile(filePath);
  setIsModalOpenFile(true);
};

const closeModal = () => {
  setIsModalOpenFile(false);
  setModalFile(null);
};

// Statement of Account Print
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
    const response = await axios.put(`http://localhost:3000/client/businesspermithandlepayment/${activePermitId?._id}`, {
      paymentStatus: 'Paid',
      businesspermitstatus: 'Released'
    });

    if (response.status === 200) {
      console.log('Payment status updated successfully');
      setConfirmPayment(true);
    } else {
      console.error('Failed to update payment status');
    }
  } catch (error) {
    console.error('Error updating payment status:', error);
  }
};

const [confirmpayment, setConfirmPayment] = useState(false);

const confirmpaymentclose = () => {
  setConfirmPayment(false);
  setActivePermitId(null);
  window.location.reload();
};

const closeviewpayment = () => {
  setViewPayment(false);
  setActivePermitId(null);

};

//File
  useEffect(() => {
    const fetchBusinessPermits = async () => {
      try {
        const response = await fetch(`http://localhost:3000/datacontroller/getbusinesspermitforpayment/${type}`, {
          method: 'GET',
          credentials: 'include', // Ensure cookies (containing the token) are sent
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const businessPermitData = await response.json();
        setBusinessPermits(businessPermitData);
        console.log(businessPermitData);
      } catch (error) {
        console.error('Error fetching work permits:', error);
      }
    };
    fetchBusinessPermits();
         
  }, [type]);

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


//Selected Permit Id

const [activePermitId, setActivePermitId] = useState<BusinessPermit | null>(null);

//Modals Owner Edit
const [editownermodal, setEditOwnerModal] = useState(false);

//Modals Attachments Edit
const [viewAttachmentsModal, setViewAttatchmentsModal] = useState(false);


//Modals Business Edit
const [viewbusinessdetails, setViewBusinessDetails] = useState(false);

//Modals View Business Nature
const [viewBusinessNature, setViewbusinessNature] = useState(false);

    //Payment Modal
const [viewpayment, setViewPayment] = useState(false);


const handleActionBP = (action: string, permit: BusinessPermit) => {
  setActivePermitId(null);
  switch (action) {


        case 'viewOwner':
          setActivePermitId(permit);
          setEditOwnerModal(true);
          break;

          case 'viewBusiness':
            setViewBusinessDetails(true);
            setActivePermitId(permit);
            break;

          case 'viewApplication':
      navigate(`/DAviewbusinessapplicationdetails/${permit._id}`);
  console.log(`Edit permit ID: ${permit._id}`);
      break;

        case 'viewAssessment':
          renderDocument(permit.statementofaccount.statementofaccountfile, 'receipts'); // Automatically open modal
          setActivePermitId(permit);
          break;

        case 'viewAttatchment':
          setViewAttatchmentsModal(true);
          setActivePermitId(permit);
      break;
      
      case 'viewBusinessNature':
        setViewbusinessNature(true);
        setActivePermitId(permit);
        break;

        case 'payment':
          setViewPayment(true);
          setActivePermitId(permit);
          break;


    default:
      console.warn('Unknown action');
  }
};


//Modals
const CloseOwnerModal = () => {
  setEditOwnerModal(false);
  setActivePermitId(null);
};

const closeViewBusinessDetails = () => {
  setViewBusinessDetails(false);
  setActivePermitId(null);
};


const closeViewAttachmentsModal = () => {
  setViewAttatchmentsModal(false);
  setSelectedFiles({});
  setActivePermitId(null);
};

const closeViewBusinessNature = () => {
  setViewbusinessNature(false);
  setActivePermitId(null);
};

useEffect(() => {
  setFilteredItems(businessPermits); // Display all work permits by default
}, [businessPermits]);

const businessNatureMap = {
  "BNK_IC": "Bank - Other Financial Institutions - Investment Company",
  "BNK_HIC": "Bank - Holding Investment Company",
  "BNK_BNK": "Bank - Financial Institution - Bank",
  "BNK_NBI": "Bank - Other Financial Institution - Non-Bank Intermediary",
  "BNK_LI": "Bank - Other Financial Institution - Lending Investor",
  "BNK_FIC": "Bank - Other Financial Institution - Finance and Investments Company",
  "BNK_MS": "Bank - Other Financial Institution - Money Shop",
  "BNK_ICO": "Bank - Other Financial Institution - Insurance Company",
  "BNK_SM": "Bank - Other Financial Institution - Stock Market",
  "BNK_SB": "Bank - Other Financial Institution - Stock Broker",
  "BNK_DSFE": "Bank - Other Financial Institution - Dealer in Securities and Foreign Exchange",
  "BNK_DAEP": "Bank - Other Financial Institution - Dealer in Educational Plan Agencies, Health Plan Agencies, and Memoria",
  "BNK_EPP": "Bank - Other Financial Institution - Educational/Pension Plans",
  "BNK_REM": "Bank - Other Financial Institution - Remittance",
  "BNK_CA": "Bank - Other - Collection Agent",
  "BNK_PSR": "Bank - Other - Pawnshop / Remittance",
  "BNK_FED": "Bank - Other Financial Institution - Foreign Exchange Dealer",
  "BNK_FE": "Bank - Other - Remittance / Moneyshop / MC Foreign Exchange",
  "BNK_ATM": "Bank - Financial - ATM Machine",
  "BNK_MC": "Bank - Other - Money Transfer / Remittance / Money Changer",
  "BNK_PSMC": "Bank - Other - Pawnshop / Money Changer",
  "BNK_IA": "Bank - Other - Insurance Agency",
  "CNT_DC": "Contractor - Contractor - Dry-cleaning or dyeing establishment, steam laundries, and laundries using washing machines",
  "CNT_BCS": "Contractor - Contractor - Battery Charging Shop",
  "CNT_BP": "Contractor - Contractor - Beauty Parlor",
  "CNT_BA": "Contractor - Contractor - Business Agent",
  "CNT_CFO": "Contractor - Contractor - Cinematographic Film Owners, Lessors, and Distributors",
  "CNT_IB": "Contractor - Contractor - Immigration Brokers",
  "CNT_CB": "Contractor - Contractor - Commercial Brokers",
  "CNT_EPL": "Contractor - Contractor - Engraving, Plating, and Plastic Lamination Establishment",
  "CNT_FDSW": "Contractor - Contractor - Filling, Demolition, and Salvage Works Contractors",
  "CNT_FP": "Contractor - Contractor - Funeral Parlors",
  "CNT_FS": "Contractor - Contractor - Furniture Shops",
  "CNT_GE": "Contractor - Contractor - General Engineering, General Building, and Specialty Contractors",
  "CNT_HSP": "Contractor - Contractor - House and/or Sign Painters",
  "CNT_MCS": "Contractor - Contractor - Massage Clinics / Sauna, Turkish and Swedish Baths / SPA",
  "CNT_MH": "Contractor - Contractor - Milliners and Hatters",
  "CNT_PL": "Contractor - Contractor - Parking Lots or Establishments for Parking Purposes",
  "CNT_WSP": "Contractor - Contractor - Persons Engaged in the Installation of Water System and Gas or Electric Light, Heat or Power",
  "CNT_PS": "Contractor - Contractor - Photographic Studios",
  "CNT_PBL": "Contractor - Contractor - Printers, Bookbinders, Lithographers",
  "CNT_PDWA": "Contractor - Contractor - Private Detective or Watchman Agencies",
  "CNT_DOCK": "Contractor - Contractor - Proprietors or Operators of Dockyards",
  "CNT_POH": "Contractor - Contractor - Proprietors or Operators of Hotels, Motels, and Lodging Houses",
  "CNT_MDA": "Contractor - Contractor - Proprietors or Operators of Mine Drilling Apparatus",
  "CNT_SMP": "Contractor - Contractor - Proprietors or Operators of Smelting Plants",
  "CNT_PUB": "Contractor - Contractor - Publishers Except Those Engaged in the Publication of Any Newspaper, Magazines, Reviews",
  "CNT_RCS": "Contractor - Contractor - Recapping Shops",
  "CNT_RMVHE": "Contractor - Contractor - Repainting Shops of Motor Vehicles and Heavy Equipment",
  "CNT_RPMH": "Contractor - Contractor - Repair Shops of Motor Vehicle and Heavy Equipment",
  "CNT_RPMED": "Contractor - Contractor - Repair Shops for Any Kind of Mechanical and Electric Devices, Instruments, Apparatus or Equipment",
  "CNT_SAW": "Contractor - Contractor - Sawmills under Contract to Saw or Cut Logs Belonging to Others",
  "CNT_SRS": "Contractor - Contractor - Shoe Repair Shops",
  "CNT_LPL": "Contractor - Contractor - Shops for Planning or Surfacing and Recutting Lumber",
  "CNT_SBCS": "Contractor - Contractor - Slenderizing and Bodybuilding Saloons",
  "CNT_SMH": "Contractor - Contractor - Smiths (Blacksmith, Goldsmith, Keysmith, Locksmith, or Tinsmith)",
  "CNT_TL": "Contractor - Contractor - Tailor or Dress Shops, Modiste Shops, Haberdashery Shops",
  "CNT_US": "Contractor - Contractor - Upholstery Shop",
  "CNT_VS": "Contractor - Contractor - Vulcanizing Shop",
  "CNT_WS": "Contractor - Contractor - Warehousing or Forwarding Services",
  "CNT_WGS": "Contractor - Contractor - Washing or Greasing Shop / Change Oil",
  "CNT_OSE": "Contractor - Contractor - Other Similar Establishment",
  "CNT_IRS": "Contractor - Contractor - Ink Refilling Station",
  "CNT_DIC": "Contractor - Contractor - Diesel Calibration",
  "CNT_TS": "Contractor - Contractor - Transport Services",
  "CNT_TTA": "Contractor - Contractor - Travel and Tour Agency",
  "CNT_EXH": "Contractor - Contractor - Exhibitor",
  "CNT_WLS": "Contractor - Contractor - Waterwaste Laboratory Service",
  "CNT_RHC": "Contractor - Contractor - Rehabilitation Center",
  "CNT_RF": "Contractor - Contractor - Religious Foundations and Non-Government Organizations",
  "CNT_CRG": "Contractor - Contractor - Computer Rentals (With Games)",
  "CNT_CRNG": "Contractor - Contractor - Computer Rentals (No Games)",
  "CNT_LS": "Contractor - Contractor - Laundry Services",
  "CNT_RSV": "Contractor - Contractor - Repair Services",
  "CNT_RSH": "Contractor - Contractor - Repair Shop",
  "CNT_DS": "Contractor - Contractor - Dress Shop",
  "CNT_TDS": "Contractor - Contractor - Tailoring / Dress Shop",
  "CNT_SGEN": "Contractor - Contractor - Subcontractor / Gen. Engineering",
  "CNT_GSS": "Contractor - Contractor - Goldsmith / Silversmith",
  "CNT_TCS": "Contractor - Contractor - Telecommunication Services",
  "CNT_BS": "Contractor - Contractor - Barber Shop / Beauty Parlor",
  "CNT_VR": "Contractor - Contractor - Video Rental",
  "CNT_EO": "Contractor - Contractor - Exhibit Organizer",
  "CNT_RAS": "Contractor - Contractor - Ref Aircon Services",
  "CNT_FPO": "Contractor - Contractor - Funeral Parlors (Office Only)",
  "CNT_CDP": "Contractor - Contractor - Computer Desktop Publishing",
  "CNT_SS": "Contractor - Contractor - Sign Services",
  "CNT_CBR": "Contractor - Contractor - Custom Broker",
  "CNT_PB": "Contractor - Contractor - Publishers (Books)",
  "CNT_RC": "Contractor - Contractor - Review Center",
  "CNT_ETC": "Contractor - Contractor - Emission Testing Center",
  "CNT_CCS": "Contractor - Contractor - Child Care Services",
  "CNT_DAS": "Contractor - Contractor - Design and Ads Services",
  "CNT_CDPG": "Contractor - Contractor - Computer Design Programs",
  "CNT_IC": "Contractor - Contractor - Internet Connection",
  "CNT_BB": "Contractor - Contractor - Billboards",
  "CNT_PRT": "Contractor - Contractor - Printing Services",
  "CNT_CC": "Contractor - Contractor - Call Center",
  "CNT_RP": "Contractor - Contractor - Radio Production (Sponsorship)",
  "CNT_WH": "Contractor - Contractor - Warehouse",
  "CNT_CS": "Contractor - Contractor - Customer Services",
  "CNT_REM": "Contractor - Contractor - Remittance",
  "CNT_MCPO": "Contractor - Contractor - Medical Clinic (Office Only)",
  "CNT_GBS": "Contractor - Contractor - General Building and Specialty Contractor (Office Only)",
  "CNT_RS": "Contractor - Contractor - Recording Studio",
  "CNT_SRO": "Contractor - Contractor - Show Room Only",
  "CNT_LRED": "Contractor - Lessor - Real Estate Dealer",
  "CNT_RED": "Contractor - Contractor - Real Estate Dealer",
  "CNT_PC": "Contractor - Contractor - Powder Coating",
  "CNT_GSP": "Contractor - Contractor - Gen. Eng'g, Gen. Bldg, and Specialty Contractor",
  "CNT_TRC": "Contractor - Contractor - Therapy and Rehabilitation Center",
  "CNT_TSO": "Contractor - Contractor - Transport Services / Office Only",
  "CNT_GEI": "Contractor - Contractor - General Engineering, General Building, and Specialty Contractor / Importer",
  "CNT_MC": "Contractor - Contractor - Massage Clinics / Sauna, Turkish and Swedish Baths / Gym",
  "CNT_SA": "Contractor - Contractor - Security Agency",
  "CNT_WI": "Contractor - Contractor - Warehouse / Importer",
  "CNT_AS": "Contractor - Contractor - Design and Artwork Services",
  "CNT_CTS": "Contractor - Contractor - Catering Services",
  "CNT_REPS": "Contractor - Contractor - Repainting Automotive Shop",
  "CNT_CR": "Contractor - Contractor - Crematory",
  "CNT_WWTF": "Contractor - Contractor - Water Waste Treatment Facility (Office Only)",
  "CNT_TSW": "Contractor - Contractor - Tailoring / Sportswear",
  "CNT_EDAS": "Contractor - Contractor - Engineering Designs / Autocad Services",
  "CNT_ADS": "Contractor - Contractor - Architectural Design Services",
  "CNT_PTS": "Contractor - Contractor - Painting Services",
  "CNT_PHB": "Contractor - Contractor - Photo Booth",
  "CNT_WC": "Contractor - Contractor - Wellness Clinic",
  "CNT_ESS": "Contractor - Contractor - Event Security Services",
  "CNT_EC": "Contractor - Contractor - Electrical Contractor",
  "CNT_GBC": "Contractor - Contractor - General Building and Specialty Contractor / LESSOR",
  "CNT_MW": "Contractor - Contractor - Mechanical Works",
  "CNT_SWC": "Contractor - Contractor - Subcontractor - Woodcraft",
  "CNT_ARS": "Contractor - Contractor - Aircon Services",
  "CNT_REB": "Contractor - Contractor - Real Estate Broker",
  "CNT_MS": "Contractor - Contractor - Massage Services",
  "CNT_TTS": "Contractor - Contractor - Tattoo Shop",
  "CNT_TLS": "Contractor - Contractor - Tailoring Shop",
  "CNT_PH": "Contractor - Contractor - Photography",
  "CNT_TNS": "Contractor - Contractor - Transport Services / Operator",
  "CNT_GESC": "Contractor - Contractor - Gen. Eng'g, Gen. Bldg and Specialty Contractor / Importer",
  "CNT_ARPS": "Contractor - Other - Auto Repair / Body Paint Shop",
  "CNT_RARS": "Contractor - Contractor - Repainting Auto Repair Shop",
  "CNT_C": "Contractor - Other - Curtains",
  "CNT_CBUP": "Contractor - Contractor - Curtains, Beddings, Upholstery",
  "CNT_CUS": "Contractor - Other - Counseling Services",
  "CNT_CCUS": "Contractor - Contractor - Counseling Services",
  "CNT_DPS": "Contractor - Contractor - Digital Printing Services",
  "CNT_VPC": "Contractor - Contractor - Video Photo Coverage Services",
  "CNT_GD": "Contractor - Contractor - Graphic Design",
  "CNT_GS": "Contractor - Contractor - Gasoline Station (Office Only)",
  "CNT_MHS": "Contractor - Contractor - Machine Shop",
  "CNT_MRI": "Contractor - Contractor - MRI / Ultrasound",
  "CNT_CPR": "Contractor - Contractor - Cellphone Repair",
  "CNT_CW": "Contractor - Contractor - Carwash",
  "CNT_TOBF": "Contractor - Other Contractor - Ticketing Office / Bill Payment / Forwarding Services",
  "CNT_CSW": "Contractor - Contractor - Cold Storage Warehouse",
  "CNT_GEMS": "Contractor - Contractor - General Engineering and Specialty Contractor / Machine Shop",
  "CNT_SCG": "Contractor - Contractor - Subcontractor - Gloves",
  "CNT_VSRA": "Contractor - Contractor - Vulcanizing Shop / Repainting Automotive Shop",
  "CNT_ES": "Contractor - Contractor - Electronic Services",
  "CNT_PNO": "Contractor - Contractor - Publisher of Newspaper (Office Only)",
  "CNT_CAD": "Contractor - Contractor - Carwash Auto Detailing",
  "CNT_LR": "Contractor - Contractor - Lounge Rental",
  "CNT_UPTS": "Contractor - Contractor - Upholstery Shop / Tailoring Shop",
  "CNT_STCR": "Contractor - Contractor - Service Tables and Chairs Rental",
  "CNT_REF": "Contractor - Contractor - Referee",
  "CNT_ES2": "Contractor - Other - Electrical Services",
  "CNT_PPUB": "Contractor - Contractor - Printing Publishing",
  "CNT_USDS": "Contractor - Contractor - Upholstery Shop / Dress Shop",
  "CNT_LSS": "Contractor - Other - Land Surveying Services",
  "CNT_PPS": "Contractor - Contractor - Photography and Printing Services",
  "CNT_FNS": "Contractor - Contractor - Funeral Services",
  "CNT_HF": "Contractor - Contractor - Hauling / Forwarding",
  "CNT_SHS": "Contractor - Contractor - School Service",
  "CNT_LO": "Contractor - Contractor - Liaison Office",
  "CNT_APO": "Contractor - Contractor - Agricultural Products (Office Only)",
  "CNT_WDS": "Contractor - Contractor - Well-Drilling Services",
  "CNT_FCF": "Contractor - Contractor - Franchisor (Foodcart)",
  "CNT_FPNE": "Contractor - Contractor - Funeral Parlors (No Embalming)",
  "CNT_CS2": "Contractor - Contractor - Calibration Services",
  "CNT_ID": "Contractor - Contractor - Interior Design",
  "CNT_CWH": "Contractor - Contractor - Carwash (Home Service)",
  "CNT_MKS": "Contractor - Contractor - Marketing Services",
  "CNT_ITR": "Contractor - Contractor - IT Related Services",
  "CNT_SD": "Contractor - Contractor - Software Developer",
  "CNT_AES": "Contractor - Contractor - Aeronautical Engineering Services",
  "CNT_CWCP": "Contractor - Contractor - Carwash / Car Painting",
  "CNT_RH": "Contractor - Contractor - Retreat House",
  "CNT_PO": "Contractor - Contractor - Promotion Offices or Agencies, Promoters of Shows, Games or Performances",
  "CNT_STF": "Contractor - Contractor - Swab Testing Facility",
  "CNT_BIP": "Contractor - Contractor - Bills Payment",
  "CNT_OS": "Contractor - Contractor - Online Services",
  "CNT_GLS": "Contractor - Contractor - Galvanizing Services",
  "CNT_ARP": "Contractor - Contractor - Auto Repair Shop",
  "CNT_RTS": "Contractor - Contractor - Rental Services",
  "CNT_AC": "Contractor - Contractor - Aesthetic Center",
  "CNT_RLS": "Contractor - Contractor - Rental of Lights and Sounds",
  "CNT_PRDC": "Contractor - Contractor - Production Company",
  "CNT_BPV": "Contractor - Contractor - Bills Payment (Vendo Machine)",
  "CNT_PC2": "Contractor - Contractor - Pediatric Clinic",
  "CNT_EPIS": "Contractor - Contractor - Electrical Plumbing Installation Services",
  "CNT_CT": "Contractor - Contractor Tax",
  "CNT_CT2": "Contractor - Contractor - Contractor Tax",
  "CNT_GAS": "Contractor - Gasoline Station - Contractor - Gasoline Station",
  "CNT_GSRS": "Contractor - Gasoline Station - Contractor - Gasoline Station / Repair Services",
  "EXM_PEZA": "Exempted - Exempted - Manufacturer of Plastic Product (PEZA)",
  "EXM_RO": "Exempted - Exempted - Religious Organization",
  "EXM_CS": "Exempted - Exempted - Clinic Services",
  "EXM_LIC": "Exempted - Exempted - Lying In Clinic (M.C. No. 2016-0170)",
  "EXM_DOC": "Exempted - Exempted - Dental and Optical Clinic",
  "EXM_LPG": "Exempted - Exempted - LPG",
  "EXM_MC": "Exempted - Exempted - Medical Clinic",
  "EXM_MLC": "Exempted - Exempted - Medical Clinic / Lying-In Clinic",
  "EXM_DT": "Exempted - Exempted - Drug Testing",
  "EXM_SOC": "Exempted - Exempted - Skin and Optical Clinic",
  "EXM_MHC": "Exempted - Exempted - Mental Health Clinic",
  "EXM_ETR": "Exempted - Exempted - Energy Transmission (R.A. 9511)",
  "EXM_TC": "Exempted - Exempted - Therapy Clinic",
  "EXM_TCS": "Exempted - Exempted - Telecommunication Services (Cell Site)",
  "EXM_CT": "Exempted - Exempted - Cooperative (Transport Services)",
  "EXM_GS": "Exempted - Exempted - Gasoline Station",
  "EXM_DC": "Exempted - Exempted - Dental Clinic",
  "EXM_TS": "Exempted - Exempted - Telecommunication Services",
  "EXM_EA": "Exempted - Exempted - Employment Agency (Cooperative)",
  "EXM_BS": "Exempted - Exempted - Bank Services",
  "EXM_DIS": "Exempted - Exempted - Digital Imaging Services (R.A. 7459)",
  "EXM_EU": "Exempted - Exempted - Electric Utility",
  "EXM_EU71": "Exempted - Exempted - Electric Utility (R.A. 7160 L.G.C. 1991)",
  "EXM_RS": "Exempted - Exempted - Repair Services",
  "EXM_AS": "Exempted - Exempted - Accounting Services",
  "EXM_C": "Exempted - Exempted - Cooperative",
  "EXM_LO": "Exempted - Exempted - Law Offices",
  "EXM_MC2": "Exempted - Exempted - Massage Clinic",
  "EXM_RM": "Exempted - Retailer - Reinforced Materials",
  "EXM_RA74": "Exempted - Exempted - R.A. 7459",
  "EXM_OC": "Exempted - Operator - Optical Clinic",
  "EXM_OC2": "Exempted - Exempted - Optical Clinic",
  "EXM_WS": "Exempted - Wholesaler - Surveying Office",
  "EXM_SO": "Exempted - Exempted - Surveying Office",
  "EXM_SPEZ": "Exempted - Exempted - Manufacture of Semi-Conductor Device (PEZA)",
  "EXM_VC": "Exempted - Exempted - Veterinary Clinic",
  "EXM_COOP": "Exempted - Cooperative - Exempted - Cooperative",
  "LSS_SC": "Lessor - Lessor - Shopping Center",
  "LSS_FC": "Lessor - Lessor - Food Court",
  "LSS_CBW": "Lessor - Lessor - Customs Bonded Warehouse",
  "LSS_OOPM": "Lessor - Lessor - Office Only / Private Owned Market",
  "LSS_REA": "Lessor - Lessor - Real Estate Including Apartments",
  "LSS_O": "Lessor - Lessor - Others",
  "LSS_POM": "Lessor - Lessor - Publicly Owned Market",
  "LSS_PROM": "Lessor - Lessor - Private Owned Market",
  "LSS_OPRM": "Lessor - Lessor - Others / Private Owned Market",
  "LSS_L": "Lessor - Lessor - Land Only",
  "LSS_REB": "Lessor - Lessor - Real Estate Including Building",
  "LSS_BO": "Lessor - Lessor - Building Only",
  "LSS_DM": "Lessor - Lessor - Dormitory",
  "LSS_BH": "Lessor - Lessor - Boarding House",
  "LSS_SFR": "Lessor - Lessor - Space for Rent",
  "LSS_A": "Lessor - Lessor - Apartment",
  "LSS_STFR": "Lessor - Lessor - Stall for Rent",
  "MFR_BEDS": "Manufacturer - Manufacturer - BEDS",
  "MFR_SH": "Manufacturer - Manufacturer - Shoes",
  "MFR_DS": "Manufacturer - Manufacturer - Distilled Spirits",
  "MFR_AS": "Manufacturer - Assembler - Sample",
  "MFR_ACOM": "Manufacturer - Assembler - Computer",
  "MFR_ABED": "Manufacturer - Assembler - Beds",
  "MFR_MFRX": "Manufacturer - Manufacturer - X",
  "MFR_AWNE": "Manufacturer - Assembler - Wine",
  "MFR_MFRP": "Manufacturer - Manufacturer - Repackers",
  "MFR_RPKR": "Manufacturer - Repacker",
  "MFR_PDS": "Manufacturer - Processor - Distilled Spirits",
  "MFR_DDS": "Manufacturer - Distiller - Distilled Spirit",
  "MFR_RCDS": "Manufacturer - Rectifier and/or Compounder - Distilled Spirits",
  "MFR_RLIQ": "Manufacturer - Rectifier and/or Compounder - Liquors",
  "MFR_RWNE": "Manufacturer - Rectifier and/or Compounder - Wine",
  "MFR_RCCC": "Manufacturer - Rectifier and/or Compounder - CC",
  "MFR_RPX": "Manufacturer - Repacker - X",
  "MFR_R": "Manufacturer - R",
  "MFR_RCA": "Manufacturer - Rectifier and/or Compounder - A",
  "MFR_MNEC": "Manufacturer - Manufacturer - Non-Essential Commodities",
  "MFR_MWNE": "Manufacturer - Manufacturer - Wine",
  "MFR_DLIQ": "Manufacturer - Distiller - Liquors",
  "MFR_DWNE": "Manufacturer - Distiller - Wine",
  "MFR_PLIQ": "Manufacturer - Processor - Liquors",
  "MFR_PWNE": "Manufacturer - Processor - Wine",
  "MFR_BLIQ": "Manufacturer - Brewer - Liquors",
  "MFR_ASDS": "Manufacturer - Assembler - Distilled Spirit",
  "MFR_ALIQ": "Manufacturer - Assembler - Liquors",
  "MFR_AASS": "Manufacturer - Assembler - Assembler",
  "MFR_PNEC": "Manufacturer - Processor - Non-Essential Commodities",
  "MFR_PEC": "Manufacturer - Processor - Essential Commodities",
  "MFR_AFAB": "Manufacturer - Assembler - Fabricator/Importer",
  "MFR_PWRS": "Manufacturer - Processor - Water Refilling Station",
  "MFR_MPC": "Manufacturer - Manufacturer - Plastic Container",
  "MFR_MFR": "Manufacturer - Manufacturer - Manufacturer",
  "MFR_MHB": "Manufacturer - Manufacturer - Hollow Blocks",
  "MFR_MFT": "Manufacturer - Manufacturer - Furniture",
  "MFR_MSH": "Manufacturer - Manufacturer - Sash",
  "MFR_MOF": "Manufacturer - Manufacturer - Manufacturer (Office Only)",
  "MFR_MSC": "Manufacturer - Manufacturer - Shell Craft",
  "MFR_MHD": "Manufacturer - Manufacturer - Handicrafts",
  "MFR_MMC": "Manufacturer - Manufacturer - Molding of Plastic Products",
  "MFR_MMP": "Manufacturer - Manufacturer - (Moldings) of Plastic Products",
  "MFR_MIM": "Manufacturer - Manufacturer - Manufacturer/Importer",
  "MFR_MMIM": "Manufacturer - Manufacturer - Manufacturer / Importer",
  "MFR_AFB": "Manufacturer - Assembler - Fabricator",
  "MFR_PL": "Manufacturer - Manufacturer - Plastic and Metal",
  "MFR_MEXI": "Manufacturer - Manufacturer - Manufacturer/Exporter/Importer",
  "MFR_MI": "Manufacturer - Manufacturer - Manufacturer - Ice",
  "MFR_PKM": "Manufacturer - Manufacturer - Packaging Materials",
  "MFR_INSP": "Manufacturer - Manufacturer - Insulating Panel",
  "MFR_MPP": "Manufacturer - Manufacturer - (Moldings) of Plastic Products / Importer",
  "MFR_IP": "Manufacturer - Manufacturer - Ice Plant",
  "MFR_CHIC": "Manufacturer - Manufacturer - Chicharon",
  "MFR_MRUG": "Manufacturer - Manufacturer - Rug",
  "MFR_MPB": "Manufacturer - Manufacturer - Peanut Butter",
  "MFR_MEP": "Manufacturer - Manufacturer - Electronic Parts",
  "MFR_APFC": "Manufacturer - Assembler - Pre-Fabricated Housing Components",
  "MFR_MASP": "Manufacturer - Manufacturer - Asphalt",
  "MFR_MPLP": "Manufacturer - Manufacturer - Polypropylene Plastic",
  "MFR_MFLG": "Manufacturer - Manufacturer - Flags",
  "MFR_MPCB": "Manufacturer - Manufacturer - Precast Wall Concrete Blocks",
  "MFR_MSF": "Manufacturer - Manufacturer - Sash and Furniture",
  "MFR_AFO": "Manufacturer - Assembler - Fabricator (Office Only)",
  "MFR_COS": "Manufacturer - Manufacturer - Cosmetics Products",
  "MFR_IMP": "Manufacturer - Manufacturer - Importer",
  "MFR_PVC": "Manufacturer - Manufacturer - PVC Pipes",
  "MFR_FT": "Manufacturer - Manufacturer - Footwear",
  "MFR_SMK": "Manufacturer - Processor - Smoke Fish",
  "MFR_SMKD": "Manufacturer - Processor - Smoked Fish",
  "MFR_EMP": "Manufacturer - Manufacturer - Empanada",
  "MFR_CASK": "Manufacturer - Manufacturer - Casket",
  "MFR_PALL": "Manufacturer - Pallets",
  "MFR_COND": "Manufacturer - Manufacturer - Condiments",
  "MFR_NUTS": "Manufacturer - Manufacturer - Nuts",
  "MFR_MCRT": "Manufacturer - Manufacturer - Curtains",
  "MFR_MEGR": "Manufacturer - Manufacturer - Manufacturer / Exporter / Garments",
  "MFR_MGR": "Manufacturer - Manufacturer - Garments",
  "MFR_AIMP": "Manufacturer - Assembler / Manufacturer - Importer",
  "MFR_CASC": "Manufacturer - Manufacturer - Cassava Cake",
  "MFR_OPP": "Manufacturer - Other Contractor – Printer & Publishing",
  "MFR_RAG": "Manufacturer - Manufacturer - Rags",
  "MFR_PROP": "Manufacturer - Manufacturer - Propeller",
  "MFR_BPL": "Manufacturer - Manufacturer - Batching Plant",
  "MFR_GRV": "Manufacturer - Manufacturer - Gravestone/Lapida",
  "MFR_SIO": "Manufacturer - Manufacturer - Siomai Siopao",
  "MFR_MDC": "Manufacturer - Manufacturer - Disposable Plastic Cup",
  "MFR_MBP": "Manufacturer - Manufacturer - Beauty Products",
  "MFR_FC": "Manufacturer - Manufacturer - Foodcart",
  "MFR_CAND": "Manufacturer - Manufacturer - Candle",
  "MFR_ETR": "Manufacturer - Manufacturer - E-Trike",
  "MFR_DPI": "Manufacturer - Manufacturer - Door Panel Importer/Exporter",
  "MFR_POLV": "Manufacturer - Manufacturer - Polvoron",
  "MFR_CNP": "Manufacturer - Manufacturer - Concrete Pipe",
  "MFR_SOAP": "Manufacturer - Manufacturer - Soap (Office Only)",
  "MFR_MODU": "Manufacturer - Manufacturer - Modular Cabinet",
  "MFR_INSU": "Manufacturer - Insulation Products",
  "MFR_FIRE": "Manufacturer - Manufacturer - Fire Extinguisher",
  "MFR_LEAT": "Manufacturer - Manufacturer - Leather Bags",
  "MFR_DOGT": "Manufacturer - Manufacturer - Dog Treats",
  "MFR_LANT": "Manufacturer - Manufacturer - Lantern",
  "MFR_VETD": "Manufacturer - Manufacturer - Veterinary Drugs and Products, Feed Additives, and Supplements",
  "MFR_PROS": "Manufacturer - Manufacturer - Prosthetic Body Parts",
  "MFR_SCRU": "Manufacturer - Assembler - Scrubbing Pad",
  "MFR_NONC": "Manufacturer - Manufacturer - Non-Essential Commodities / Importer",
  "MFR_OFFI": "Manufacturer - Manufacturer - Manufacturer (Office Only) / Importer",
  "MFR_CDM": "Manufacturer - Repacker - Condiments",
  "MFR_PINO": "Manufacturer - Manufacturer - Pinoy Delicacies",
  "MFRP_HERB": "Manufacturer / Producer - Manufacturer - Herbal Products",
  "MFRP_CHAR": "Manufacturer / Producer - Manufacturer - Charcoal",
  "MFRP_TOKW": "Manufacturer / Producer - Manufacturer - Tokwa",
  "MFRP_ESSE": "Manufacturer / Producer - Producer - Essential Commodities (Office Only)",
  "MFRPP_GASI": "Manufacturer / Producer - Manufacturer - Import / Export Industrial Gas",
  "MFRPP_RM": "Manufacturer / Producer - Rice Mill - Office Only",
  "MFRP_SUGA": "Manufacturer / Producer - Producer - Sugarcane Farm",
  "MFRP_ICEC": "Manufacturer / Producer - Manufacturer - Ice Cream",
  "MFRP_LAUN": "Manufacturer / Producer - Manufacturer - Laundry Soap",
  "MFRP_DETE": "Manufacturer / Producer - Manufacturer - Detergents",
  "MFRP_MEDI": "Manufacturer / Producer - Manufacturer / Repacker - Medicines",
  "MFRP_ERC": "Manufacturer / Producer - Exporter - Rice and Corn",
  "MFRP_EWH": "Manufacturer / Producer - Exporter - Wheat or Cassava Flour",
  "MFRP_COOK": "Manufacturer / Producer - Manufacturer - Cooking Oil",
  "MFRP_RWH": "Manufacturer / Producer - Repacker - Wheat or Cassava Flour",
  "MFRP_WHET": "Manufacturer / Producer - Miller - Wheat",
  "MFRP_RICE": "Manufacturer / Producer - Repacker - Rice and Corn",
  "MFRP_MEAT": "Manufacturer / Producer - Exporter - Meat",
  "MFRP_PF": "Manufacturer / Producer - Manufacturer - Poultry Feeds and Other Animal Feeds",
  "MFRP_SCHL": "Manufacturer / Producer - Manufacturer - School Supplies",
  "MFRP_CEMT": "Manufacturer / Producer - Manufacturer - Cement",
  "MFRP_LPG": "Manufacturer / Producer - Manufacturer - LPG",
  "MFRP_PROF": "Manufacturer / Producer - Repacker - Processed or Preserved Food",
  "MFRP_MILL": "Manufacturer / Producer - Miller - Rice and Corn",
  "MFRP_PROC": "Manufacturer / Producer - Manufacturer - Processed or Preserved Foods",
  "MFRP_SALT": "Manufacturer / Producer - Manufacturer - Salt",
  "MFRP_SUGR": "Manufacturer / Producer - Manufacturer - Sugar",
  "MFRP_EXSG": "Manufacturer / Producer - Exporter - Sugar",
  "MFRP_AGRI": "Manufacturer / Producer - Exporter - Agricultural, Marine, and Freshwater Products",
  "MFRP_ELS": "Manufacturer / Producer - Exporter - Laundry Soap",
  "MFRP_DETR": "Manufacturer / Producer - Exporter - Detergents",
  "MFRP_MEDC": "Manufacturer / Producer - Exporter - Medicine",
  "MFRP_EXCT": "Manufacturer / Producer - Exporter - Cement",
  "MFRP_DAIR": "Manufacturer / Producer - Exporter - Dairy Products",
  "MFRP_EMET": "Manufacturer / Producer - Exporter - Meat",
  "MFRP_FEED": "Manufacturer / Producer - Exporter - Poultry Feeds and Other Animal Feeds",
  "MFRP_COKO": "Manufacturer / Producer - Exporter - Cooking Oil",
  "MFRP_AGIM": "Manufacturer / Producer - Manufacturer - Agricultural Implements, Equipment, and Post-Harvest Facilities",
  "MFRP_FERT": "Manufacturer / Producer - Manufacturer - Fertilizers",
  "MFRP_PEST": "Manufacturer / Producer - Manufacturer - Pesticides, Insecticides",
  "MFRP_RCRN": "Manufacturer / Producer - Repackers - Rice and Corn",
  "MFRP_WFLO": "Manufacturer / Producer - Repackers - Wheat or Cassava Flour",
  "MFRP_RSUG": "Manufacturer / Producer - Repacker - Sugar",
  "MFRP_RSAL": "Manufacturer / Producer - Repacker - Salt",
  "MFRP_RCOK": "Manufacturer / Producer - Repacker - Cooking Oil",
  "MFRP_RDET": "Manufacturer / Producer - Repacker - Detergents",
  "MFRP_RPST": "Manufacturer / Producer - Repacker - Pesticides",
  "MFRP_RFRT": "Manufacturer / Producer - Repacker - Fertilizers",
  "MFRP_RINS": "Manufacturer / Producer - Repacker - Insecticides",
  "MFRP_RFED": "Manufacturer / Producer - Repacker - Poultry Feeds and Other Animal Feeds",
  "MFRP_EXES": "Manufacturer / Producer - Exporter - Other Essential Commodities",
  "MFRP_ECMP": "Manufacturer / Producer - Producer - Essential Commodities",
  "MFRP_MXES": "Manufacturer / Producer - Manufacturer / Exporter - Essential Commodities",
  "MFRP_ESEN": "Manufacturer / Producer - Manufacturer - Essential Commodities",
  "MFRP_MRCE": "Manufacturer / Producer - Miller - Rice Mill",
  "MFRP_EXNS": "Manufacturer / Producer - Exporter - Non-Essential Commodities",
  "MFRP_RJMC": "Manufacturer / Producer - Repacker - Janitorial Maintenance Chemicals",
  "MFRP_PSP": "Manufacturer / Producer - Manufacturer - Soap",
  "MFRP_RNES": "Manufacturer / Producer - Repacker - Non-Essential Commodities",
  "MFRP_TAHO": "Manufacturer / Producer - Manufacturer - TAHO",
  "MFRP_DONT": "Manufacturer / Producer - Manufacturer - Donut",
  "MFRP_SIOP": "Manufacturer / Producer - Manufacturer - Siopao",
  "MFRP_JUCS": "Manufacturer / Producer - Manufacturer - Juices",
  "MFRP_PUTO": "Manufacturer / Producer - Manufacturer - Puto",
  "MFRP_LWRP": "Manufacturer / Producer - Manufacturer - Lumpia Wrapper",
  "MFRP_FPWD": "Manufacturer / Producer - Manufacturer - Foot Powder",
  "MILL_OMRC": "Millers - Other Than Rice and Corn - Miller - Other Commodities Other Than Rice and Corn",
  "MILL_CFGR": "Millers - Other Than Rice and Corn - Operator - Coffee Grinder",
  "MILL_COGR": "Millers - Other Than Rice and Corn - Operator - Coconut Grinder",
  "MILL_MTGR": "Millers - Other Than Rice and Corn - Operator - Meat Grinder",
  "NSNP_PVSC": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private School",
  "NSNP_FNDN": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Foundation",
  "NSNP_PVHS": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Hospital",
  "NSNP_FIVT": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Filipino Inventor",
  "NSNP_FRAN": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Franchise Holder",
  "NSNP_NGO": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Non-Government Organization (NGO)",
  "NSNP_RELG": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Religious Organization",
  "NSNP_RENO": "Non-Stock/Non-Profit - No - Religious Organization",
  "NSNP_MSCL": "Non-Stock/Non-Profit - No - Massage Clinic",
  "NSNP_NSP": "Non-Stock/Non-Profit - Non-Stock/Non-Profit",
  "NSNP_MSCA": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Music Composition/Musical Arrangement",
  "NSNP_PRHS": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Hospital and Private School",
  "NSNP_TRSC": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Training School",
  "NSNP_PHIM": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Hospital / Importer",
  "NSNP_FDIM": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Foundation / Importer",
  "NSNP_PVMT": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Market",
  "NSNP_HOA": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Home Owners Association",
  "NSNP_PHAR": "Non-Stock/Non-Profit - Pharmacy",
  "NSNP_TSVS": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Transport Services",
  "NSNP_ASSOC": "Non-Stock/Non-Profit - Non-Stock/Non-Profit - Association",
  "OPR_OBNG": "Operator - Amusement Places - Operator - Bingo / Office Only",
  "OPR_OTBS": "Operator - Amusement Places - Operator - Off Track Betting Station",
  "OPR_STL": "Operator - Amusement Places - Operator - Small Town Lottery (STL)",
  "OPR_CRST": "Operator - Amusement Places - Operator - Cafe and Restobar",
  "OPR_EVT": "Operator - Amusement Places - Operator - Events Place",
  "OPR_ECAS": "Operator - Amusement Places - Operator - E-Casino Games",
  "OPR_BARS": "Operator - Amusement Places - Operator - Bar or Cocktail Lounge including 'beer gardens', 'beerhouses', 'disco pub', 'pub house'",
  "OPR_SPRT": "Operator - Amusement Places - Operator - Boxing Stadium, Sports Arena or Similar Establishments; Sports Contest Promoters",
  "OPR_BILL": "Operator - Amusement Places - Operator - Billiard or Pool Hall",
  "OPR_BOWL": "Operator - Amusement Places - Operator - Bowling Center",
  "OPR_DNHL": "Operator - Amusement Places - Operator - Cabaret or Dance Hall, Dance Studio/Dancing Schools",
  "OPR_CIRC": "Operator - Amusement Places - Operator - Circuses, Carnival, Merry-Go-Round, Roller Coaster, Ferris Wheel, Swings, Shooting Gallery",
  "OPR_DCLB": "Operator - Amusement Places - Operator - Day Club and Night Club",
  // Operator Amusement Places Options (continued)
  "OPR_GOLF": "Operator - Amusement Places - Operator - Golf Links",
  "OPR_PELT": "Operator - Amusement Places - Operator - Pelota Court for-a-fee",
  "OPR_RACE": "Operator - Amusement Places - Operator - Race Track for-a-fee",
  "OPR_RSRT": "Operator - Amusement Places - Operator - Resorts (Inland Resorts)",
  "OPR_SKAT": "Operator - Amusement Places - Operator - Skating Rink for-a-fee",
  "OPR_SWIM": "Operator - Amusement Places - Operator - Swimming Pool or Bathhouses for-a-fee",
  "OPR_TENN": "Operator - Amusement Places - Operator - Tennis Court for-a-fee",
  "OPR_OTHR": "Operator - Amusement Places - Operator - Other Similar Establishment or Amusement Places",
  "OPR_BNG": "Operator - Amusement Places - Operator - Bingo",
  "OPR_LOTO": "Operator - Amusement Places - Operator - Lotto Outlet",
  "OPR_KTV": "Operator - Amusement Places - Operator - KTV Bar",
  "OPR_VIDE": "Operator - Amusement Places - Proprietor - Videoke Bar",
  "OPR_VKB": "Operator - Amusement Places - Operator - Videoke Bar",
  "OPR_MSTU": "Operator - Amusement Places - Operator - Music Studio",
  "OPR_KTVB": "Operator - Amusement Places - Operator - KTV Bar/Billiard Hall",
  "OPR_EBGO": "Operator - Amusement Places - Operator - Bingo / Electronic Bingo",
  "OPR_BARR": "Operator - Amusement Places - Operator - Bar and Restaurant",
  "OPR_TBLT": "Operator - Amusement Places - Operator - Table Tennis for-a-fee",
  "OPR_EVID": "Operator - Amusement Places - Operator - Eatery with Videoke",
  "OPR_FIRE": "Operator - Amusement Places - Operator - Firing Range",
  "OPR_BHOU": "Operator - Boarding House - Operator - Boarding Houses",
  "OPR_DORM": "Operator - Boarding House - Lessor - Operator - Dormitories",
  "OPRC_CKPT": "Operator - Cockpit - Operator - Cockpit",
  "OPRCPO_PRMT": "Operator - Cockpit - Promoter - Ordinary Operator",
  "OPRCP_PNTS": "Operator - Cockpit - Promoter - Pintakasi / Concierto",
  "OPRC_TSLB": "Operator - Cockpit - Operator - Telesabong",
  "OPR_GLNK": "Operator - Golf Links - Operator - Golf Links",
  "OPRPC_CEME": "Operator - Private Cemeteries - Private Cemeteries / Memorial Parks",
  "OPRM_MKET": "Operator - Privately Owned Market - Privately Owned Public Market",
  "OPRR_CAFE": "Operator - Restaurant - Cafe - Cafe",
  "OPRR_CFTR": "Operator - Restaurant - Cafeteria - Cafeteria",
  "OPRR_ICRM": "Operator - Restaurant - Ice Cream - Ice Cream and Other Refreshment Operator",
  "OPRR_REST": "Operator - Restaurant - Restaurant - Restaurant Operator",
  "OPRR_CARN": "Operator - Restaurant - Carinderia - Carinderia",
  "OPRR_PNCT": "Operator - Restaurant - Panciteria - Panciteria",
  "OPRR_SODA": "Operator - Restaurant - Soda Fountain Bar - Soda Fountain Bar",
  "OPRR_CATR": "Operator - Restaurant - Food Caterer - Food Caterer",
  "OPRR_SEST": "Operator - Restaurant - Similar Establishment",
  "OPRR_CNTN": "Operator - Restaurant - Similar Establishment - Canteen",
  "OPRR_EATR": "Operator - Restaurant - Similar Establishment - Eatery",
  "OPRR_FFOD": "Operator - Restaurant - Similar Establishment - Fastfood",
  "OPRR_FSTD": "Operator - Restaurant - Similar Establishment - Foodstand",
  "OPRR_CFSH": "Operator - Restaurant - Cafeteria - Coffee Shop",
  "OPRR_FCTO": "Operator - Restaurant - Food - Food Caterer (Office Only)",
  "OPRR_RTOF": "Operator - Restaurant - Restaurant - Office Only",
  "OPRR_FBVO": "Operator - Restaurant - Similar - Food Beverage (Office Only)",
  "OPRR_GRIL": "Operator - Restaurant - Restaurant - Grille",
  "OPRR_GRLL": "Operator - Restaurant - Restaurant - Grill",
  "OPRR_TEAH": "Operator - Restaurant - Similar - Tea House",
  "OPRR_RFRT": "Operator - Restaurant - Restaurant - Refreshment",
  "OPRR_CFTS": "Operator - Restaurant - Cafeteria - Coffee and Tea Shop",
  "OPRR_FBVG": "Operator - Restaurant - Restaurant - Food Beverage",
  "OPRS_SUBD": "Operator - Subdivision - Subdivision Operator - Subdivision Operator",
  "OPRS_RESD": "Operator - Subdivision - Real Estate Developer - Real Estate Developer",
  "OPRS_ROFF": "Operator - Subdivision - Real Estate Developer (Office Only)",
  "OPRT_THTR": "Operator - Theaters - Operator - Theater Operator",
  "OPRT_CINE": "Operator - Theaters - Operator - Cinemahouse",
  "OPRT_VMHS": "Operator - Theaters - Operator - Video-Movie House Utilizing BETA, VHS, JVC, Laser Disc Player, or Similar Apparatus",
  "OPRT_SHWH": "Operator - Theaters - Operator - Showhouse Open to the Public for-a-fee",
  "OPRT_TLSB": "Operator - Theaters - Operator - Telesabong",
  "OPRT_OLBS": "Operator - Theaters - Operator - On-Line Betting Station",
  "CNT_ACCT": "Other Contractor - Other Contractor - Accounting Firms or Offices Rendering Accounting or Bookkeeping Services",
  "CNT_ACTR": "Other Contractor - Other Contractor - Actuarial or Appraisal Offices",
  "CNT_ADAG": "Other Contractor – Other Contractor - Advertising Agencies",
  "CNT_BBKS": "Other Contractor - Other Contractor - Belt and Buckle Shops",
  "CNT_BROK": "Other Contractor - Other Contractor - Brokering Offices (Real Brokers, Custom Brokers, and Similar Ones)",
  "CNT_BSMN": "Other Contractor - Other Contractor - Business Management Firms/Offices",
  "CNT_CRPN": "Other Contractor - Other Contractor - Carpentry Shops",
  "CNT_COMM": "Other Contractor - Other Contractor - Communications or Wire Services (Radio, Telegraph, Telefax, etc.)",
  "CNT_REPR": "Other Contractor - Other Contractor - Computer or Electronic Repair Centers or Shops",
  "CNT_CNST": "Other Contractor - Other Contractor - Consultancy Firms/Offices",
  "CNT_DFAS": "Other Contractor - Other Contractor - Drafting or Fine Arts Shops, Painting or Sign Shops",
  "CNT_EMPL": "Other Contractor - Other Contractor - Employment Agencies",
  "CNT_ENGR": "Other Contractor - Other Contractor - Engineering Offices Rendering Services on Architectural, Civic, Chemical, Electric",
  "CNT_FLOW": "Other Contractor - Other Contractor - Flower Shops Not Engaged in Wholesale or Retail but Rendering Services Upon Order",
  "CNT_FRGT": "Other Contractor - Other Contractor - Freight Services, Trucking Services",
  "CNT_PAWS": "Other Contractor - Other Contractor - House Painting Shops/House Wiring Shops",
  "CNT_ICEC": "Other Contractor - Other Contractor - Ice and Cold Storage for-a-fee",
  "CNT_INDR": "Other Contractor - Other Contractor - Interior Decoration Offices or Shops",
  "CNT_JKGY": "Other Contractor - Other Contractor - Judo-Karate Gyms for-a-fee",
  "CNT_LDSP": "Other Contractor - Other Contractor - Landscaping Contracting Offices or Shops",
  "CNT_LTHM": "Other Contractor - Other Contractor - Lathe Machine Shops",
  "CNT_LAWF": "Other Contractor - Other Contractor - Law Offices Rendering Legal or Notarial Services",
  "CNT_CLNC": "Other Contractor - Other Contractor - Medical Clinics, Dental Clinics, Optical Clinics, and Similar Clinics",
  "CNT_SCHL": "Other Contractor - Other Contractor - Operators of Dancing, Driving, Judo-Karate Schools",
  "CNT_PPRS": "Other Contractor - Other Contractor - Perma-Press Shops",
  "CNT_HOSP": "Other Contractor - Other Contractor - Private Hospitals and Private Educational Institutions",
  "CNT_PROM": "Other Contractor - Other Contractor - Promotion Offices or Agencies, Promoters of Shows, Games, or Performances",
  "CNT_DUPL": "Other Contractor - Other Contractor - Recopying or Duplicating, Xerox Copying or Mimeographing Services",
  "CNT_RENT": "Other Contractor - Other Contractor - Rental Agencies/Offices/Shops Renting Out for-a-fee Machines, Apparatuses, Equipment",
  "CNT_RPHA": "Other Contractor - Other Contractor - Repair Centers/Shops for Home Appliances",
  "CNT_RTAG": "Other Contractor - Other Contractor - Rental Agencies/Offices/Shops",
  "CNT_RPME": "Other Contractor - Other Contractor - Repair Center/Shops for Medical Equipment",
  "CNT_RPCO": "Other Contractor - Other Contractor - Repair Shops for Computers and Other Electronic Equipment",
  "CNT_SCUL": "Other Contractor - Other Contractor - Sculpture Shops",
  "CNT_SRVM": "Other Contractor - Other Contractor - Service Stations for Motor Vehicles",
  "CNT_SRVO": "Other Contractor - Other Contractor - Surveying Offices (Private Land Surveying or Geodetic)",
  "CNT_TTRM": "Other Contractor - Other Contractor - Transportation Terminals for-a-fee",
  "CNT_VACI": "Other Contractor - Other Contractor - Vaciador Shops",
  "CNT_VCSR": "Other Contractor - Other Contractor - Video Coverage Services",
  "CNT_WTCH": "Other Contractor - Other Contractor - Watch Repair Center or Shop",
  "CNT_SIML": "Other Contractor - Other Contractor - Other Similar Establishment Rendering or Offering to Render Services for-a-fee",
  "CNT_BLLP": "Other Contractor - Other Contractor - Bill Payment",
  "CNT_MNPS": "Other Contractor - Other Contractor - Manpower Service",
  "CNT_JNTS": "Other Contractor - Other Contractor - Janitorial Service",
  "CNT_PEST": "Other Contractor - Other Contractor - Pest Control",
  "CNT_JWLR": "Other Contractor - Other Contractor - Jewelry Repair Shop",
  "CNT_NPPR": "Other Contractor - Other Contractor - Newspaper Publication",
  "CNT_HAUL": "Other Contractor - Other Contractor - Hauling Services",
  "CNT_PRTG": "Other Contractor - Other Contractor - Printing",
  "CNT_PRTS": "Other Contractor - Other Contractor - Printing Services",
  "CNT_WRTY": "Other Contractor - Other Contractor - Warranty Services",
  "CNT_KDCT": "Other Contractor - Other Contractor - Rental Kiddie Carts",
  "CNT_RAMD": "Other Contractor - Other Contractor - Rental of Amusement Devices",
  "CNT_MCLN": "Other Contractor - Other Contractor - Medical Clinic",
  "CNT_RNTS": "Other Contractor - Other Contractor - Rentals of Chairs, Tables, Utensils",
  "CNT_RPRC": "Other Contractor - Other Contractor - Repair Shop",
  "CNT_RMUS": "Other Contractor - Other Contractor - Rental of Musical Instruments/Apparatuses",
  "CNT_VETC": "Other Contractor - Other Contractor - Veterinary Clinic",
  "CNT_PRPR": "Other Contractor - Other Contractor - Printing Press",
  "CNT_FRMS": "Other Contractor - Other Contractor - Frame Shop",
  "CNT_DRVS": "Other Contractor - Other Contractor - Driving School",
  "CNT_GWRS": "Other Contractor - Other Contractor - Gift Wrapping Services",
  "CNT_RVCL": "Other Contractor - Other Contractor - Rental of Vehicles",
  "CNT_PVTS": "Other Contractor - Other Contractor - Private School",
  "CNT_OPTC": "Other Contractor - Other Contractor - Optical Clinic",
  "CNT_TRTC": "Other Contractor - Other Contractor - Training Center",
  "CNT_DNTC": "Other Contractor - Other Contractor - Dental Clinic",
  "CNT_CMWS": "Other Contractor - Other Contractor - Communications or Wire Services",
  "CNT_TPHC": "Other Contractor - Other Contractor - Therapy Clinic",
  "CNT_INST": "Other Contractor - Other Contractor - Installation Services",
  "CNT_PRMA": "Other Contractor - Other Contractor - Promotional Agency",
  "CNT_BKPB": "Other Contractor - Other Contractor - Books Publication",
  "CNT_FWDS": "Other Contractor - Other Contractor - Forwarding Services",
  "CNT_FWOF": "Other Contractor - Other Contractor - Forwarding Services (Office Only)",
  "CNT_NPOF": "Other Contractor - Other Contractor - Newspaper Publication (Office Only)",
  "CNT_SKNC": "Other Contractor - Other Contractor - Skin Clinic",
  "CNT_GRMS": "Other Contractor - Other Contractor - Garments Subcontractor",
  "CNT_FRGO": "Other Contractor - Other Contractor - Freight Services/Trucking Services (Office Only)",
  "CNT_VEDS": "Other Contractor - Other Contractor - Video Editing Services",
  "CNT_TTGO": "Other Contractor - Other Contractor - Transportation Terminals (Garage Only)",
  "CNT_TUTS": "Other Contractor - Other Contractor - Tutorial Services",
  "CNT_RNOS": "Other Contractor - Other Contractor - Rendering Other Services",
  "CNT_RNLB": "Other Contractor - Other Contractor - Rental of Books",
  "CNT_INKR": "Other Contractor - Other Contractor - Ink Refilling Services",
  "CNT_CDPO": "Other Contractor - Other - Collection Dispatching Office",
  "CNT_DNTL": "Other Contractor - Other - Dental Laboratories",
  "CNT_DRTL": "Other Contractor - Other - Drug Testing Laboratory",
  "CNT_GRTO": "Other Contractor - Other - Garage and Terminal Office (Without Service Facilities)",
  "CNT_RNDG": "Other Contractor - Other - Rental of Dresses and Gowns",
  "CNT_ANBC": "Other Contractor - Other - Animal Bite Clinic",
  "CNT_MCMS": "Other Contractor - Other - Music Composition/Musical Arrangement",
  "CNT_OPVH": "Other Contractor - Other Contractor - Private Hospital",
  "CNT_PVTH": "Other Contractor - Private Hospital",
  "CNT_PHO": "Other Contractor - Other - Private Hospital",
  "CNT_OPH": "Other Contractor - Other Contractor - Private Hospital",
  "CNT_RVWC": "Other Contractor - Other - Review Center",
  "CNT_ACCO": "Other Contractor - Other - Accounting Consultancy Office",
  "CNT_EVOR": "Other Contractor - Other - Events Organizer/Coordinator",
  "CNT_JTHS": "Other Contractor - Other - Janitorial Service/Helmet Depository",
  "CNT_ML": "Other Contractor - Other - Medical Laboratory",
  "CNT_MDAG": "Other Contractor - Other - Modeling Agency",
  "CNT_BBDS": "Other Contractor - Other - Brake Bonding Services",
  "CNT_CIAD": "Other Contractor - Other - Cinema Advertisement",
  "CNT_PRTN": "Other Contractor - Other - Party Needs",
  "CNT_FRNO": "Other Contractor - Other - Franchising Office",
  "CNT_MKTO": "Other Contractor - Other - Marketing Office",
  "CNT_INPS": "Other Contractor - Other - Installation Ports and Networking Services",
  "CNT_MDL": "Other Contractor - Other - Medical/Diagnostic Laboratories",
  "CNT_FASH": "Other Contractor - Other - Fashion Boutique",
  "CNT_PSVS": "Other Contractor - Other - Private School/Vocational School",
  "CNT_ARCD": "Other Contractor - Contractor - Architectural Design Services",
  "CNT_SCHC": "Other Contractor - Other - Special Child Center",
  "CNT_SHUT": "Other Contractor - Other - Shuttle Services",
  "CNT_TKTS": "Other Contractor - Other - Ticketing/Bills Payment/Courier Services/Loading",
  "CNT_MDCL": "Other Contractor - Other - Medical Clinic w/ Laboratory",
  "CNT_MUSC": "Other Contractor - Other - Music Studio",
  "CNT_PNCN": "Other Contractor - Other - Party Needs Catering Services",
  "CNT_ANCL": "Other Contractor - Other - Animal Clinic",
  "CNT_TWSV": "Other Contractor - Other - Towing Services",
  "CNT_RPTE": "Other Contractor - Other - Rental of Printing Equipment",
  "CNT_HDSC": "Other Contractor - Other - Hemodialysis Center",
  "CNT_WLDS": "Other Contractor - Other - Welding Shop",
  "CNT_BKOF": "Other Contractor - Other - Basketball Officiating",
  "CNT_WXSL": "Other Contractor - Other - Waxing Salon",
  "CNT_ANGL": "Other Contractor - Other - Animal Grooming Salon",
  "CNT_BLRS": "Other Contractor - Other - Boiler Repair",
  "CNT_SBCT": "Other Contractor - Other - Subcontractor-Rendering Other Services",
  "CNT_TRSC": "Other Contractor - Other - Training Center-Security",
  "CNT_TKOF": "Other Contractor - Other - Ticketing Office",
  "CNT_TFSV": "Other Contractor - Other - Tours Services for Field Trip",
  "CNT_REHE": "Other Contractor - Other - Rental of Heavy Equipment",
  "CNT_CICS": "Other Contractor - Other - Car Interior and Custom Services",
  "CNT_RAGC": "Other Contractor - Other - Recruitment Agency",
  "CNT_FLMS": "Other Contractor - Contractor - Film Studio",
  "CNT_HLSV": "Other Contractor - Other - Health Services",
  "CNT_MFSV": "Other Contractor - Other - Messenger and Forwarding Services",
  "CNT_GTSF": "Other Contractor - Other - Garage and Terminal Office (With Service Facilities)",
  "CNT_TSIT": "Other Contractor - Other - Tiles and Stone Installation",
  "CNT_GMNT": "Other Contractor - Contractor - Garments Contractor",
  "CNT_CBW": "Other Contractor - Other - Custom Bonded Warehouse",
  "CNT_SEBT": "Other Contractor - Other - Soil Exploration/Boring Test",
  "CNT_INFB": "Other Contractor - Other - Information Booth",
  "CNT_AELC": "Other Contractor - Other - Auto Electrical Shop",
  "CNT_EMBS": "Other Contractor - Other - Embroidery Shop",
  "CNT_CSBR": "Other Contractor - Other - Casket Broker",
  "CNT_PLBG": "Other Contractor - Other - Plumbing Services",
  "CNT_ACPC": "Other Contractor - Other - Acupuncture Clinic",
  "CNT_SALP": "Other Contractor - Other - Salon and SPA",
  "CNT_ADVS": "Other Contractor - Other - Advertising Services",
  "CNT_ELIS": "Other Contractor - Other - Electrical and Industrial Services",
  "CNT_SKMD": "Other Contractor - Other - Skin and Medical Clinic",
  "CNT_CWVS": "Other Contractor - Contractor - Carwash Vulcanizing Shop",
  "CNT_MRPS": "Other Contractor - Other - Motorcycle Repair Shop",
  "CNT_HFAG": "Other Contractor - Other - Home for the Aged",
  "CNT_WGMK": "Other Contractor - Other - Wig Making",
  "CNT_DNCS": "Other Contractor - Other - Dance Studio",
  "CNT_OHCS": "Other Contractor - Other - Home Care Services (Office Only)",
  "CNT_PKGS": "Other Contractor - Other - Packaging Services",
  "CNT_RCTU": "Other Contractor - Rentals of Chairs, Tables, Utensils/Catering Services",
  "CNT_FRSV": "Other Contractor - Other Contractor - Forwarding Services, Freight Services, Trucking Services",
  "CNT_TOBP": "Other Contractor - Other Contractor - Ticketing Office / Bill Payment / Forwarding Services",
  "CNT_MFCS": "Other Contractor - Other Contractor - Messenger, Forwarding Services, and Courier",
  "CNT_BPTK": "Other Contractor - Other Contractor - Bill Payment / Ticketing Office",
  "CNT_RMDE": "Other Contractor - Other - Rental of Medical Equipment",
  "CNT_MSKS": "Other Contractor - Music School",
  "CNT_PRTP": "Other Contractor - Other Contractor - Printing Publishing",
  "CNT_PSCS": "Other Contractor - Other - Psychological Services",
  "CNT_RCT": "Other Contractor - Other Contractor - Rental of Chairs, Tables",
  "CNT_ONDR": "Other Contractor - Online Data Researcher",
  "CNT_TRKS": "Other Contractor - Other Contractor - Trucking Services",
  "CNT_TTUR": "Other Contractor - Other Contractor - Training Center - Tutorial",
  "CNT_BPLS": "Other Contractor - Other - Bills Payment/Loading Station",
  "CNT_FNCP": "Other Contractor - Contractor - Funeral Chapel",
  "CNT_HMCS": "Other Contractor - Other Contractor - Home Care Services",
  "CNT_OPTL": "Other Contractor - Other Contractor - Optical Laboratory",
  "CNT_DIAL": "Other Contractor - Other Contractor - Dialysis Service",
  "CNT_BKGS": "Other Contractor - Other Contractor - Bookkeeping Services",
  "CNT_IMNS": "Other Contractor - Other Contractor - Installation/Maintenance Services",
    "CNT_DLVS": "Other Contractor - Other Contractor - Delivery Services",
    "CNT_DTEN": "Other Contractor - Other Contractor - Data Encoding Services",
    "CNT_VTAS": "Other Contractor - Other Contractor - Virtual Assistance Services",
    "CNT_CORS": "Other Contractor - Other Contractor - Courier Services",
    "CNT_CABS": "Other Contractor - Cabling Services",
    "CNT_ACO": "Other Contractor - Accounting Consultancy Office / Computer Design Programs",
    "CNT_PNCS": "Other Contractor - Other Contractor - Personal Care Services",
    "CNT_CMSR": "Other Contractor - Other Contractor - Common Space Rental Services",
    "CNT_DVHB": "Other Contractor - Other Contractor - Delivery Hub Services",
    "CNT_DCMT": "Other Contractor - Other Contractor - Documentation Services",
    "CNT_CLSV": "Other Contractor - Other Contractor - Courier/Logistics Services",
    "CNT_MTGY": "Other Contractor - Martial Arts Gym",
    "CNT_ARCN": "Other Contractor - Animal Rescue Center",
    "CNT_RPRS": "Other Contractor - Contractor - Repair Shop",
    "CNT_WCDP": "Other Contractor - Other Contractor - Waste Collection Disposal",
    "CNT_ARTS": "Other Contractor - Other Contractor - Art Studio",
    "CNT_BDPS": "Other Contractor - Other Contractor - Body Piercing Services",
    "CNT_RMNS": "Other Contractor - Other Contractor - Repair & Maintenance Services",
    "CNT_CWSP": "Other Contractor - Other Contractor - Coworking Space for a Fee",
    "OLB_IMPR": "Other LOB – Other LOB - Importer",
    "PRA_VDOK": "Proprietor-Amusement Devices - Proprietor - Videoke Machine",
    "PRA_FHPC": "Proprietor-Amusement Devices - Proprietor - Family Home Computers",
    "PRA_GMWD": "Proprietor-Amusement Devices - Proprietor - Game and Watch Devices",
    "PRA_SLTM": "Proprietor-Amusement Devices - Proprietor - Slot Machines not Classified as Gambling Devices",
    "PRA_OTAD": "Proprietor-Amusement Devices - Proprietor - Other Amusement Devices",
    "PRA_CMTR": "Proprietor-Amusement Devices - Proprietor - Computer Rentals",
    "PRA_PLST": "Proprietor-Amusement Devices - Proprietor - Playstation",
    "PRA_VDRL": "Proprietor-Amusement Devices - Proprietor - Video Rental",
  "PRA_VGMS": "Proprietor-Amusement Devices - Proprietor - Video Games",
  "PRA_KDRD": "Proprietor-Amusement Devices - Proprietor - Kiddie Rides",
  "PRA_TLSB": "Proprietor-Amusement Devices - Proprietor - Telesabong",
  "PRA_VDKB": "Proprietor-Amusement Devices - Proprietor - Videoke Bar",
  "PRA_OLGS": "Proprietor-Amusement Devices - Proprietor - On-line Gaming Station",
  "PRA_OLBS": "Proprietor-Amusement Devices - Proprietor - On-line Betting Station",
  "RTLT_SAMP": "Retailer (Sample) - Sample",
  "RTLT_GUNS": "Retailer – Gun - Gun",
  "RTLT_ECIG": "Retailer-Cigarettes - E-Cigarette",
  "RTLT_TBRC": "Retailer-Cigarettes - Retail Dealer - Tobacco",
  "RTLT_TOBR": "Retailer-Cigarettes - Retailer - Tobacco",
  "RTLT_SNCI": "Retailer-Cigarettes - Retail Dealer - Snuff including Cigars and Cigarettes",
  "RTLT_SNCR": "Retailer-Cigarettes - Retailer - Snuff including Cigars and Cigarettes",
  "RTLE_STR": "Retailer-Essential - Retailer - Store",
  "RTLE_ESCM": "Retailer-Essential - Retailer - Essential Commodities",
  "RTLE_BKRY": "Retailer-Essential - Retailer - Bakery",
  "RTLE_SCHS": "Retailer-Essential - Retailer - School Supplies",
  "RTLE_MDIC": "Retailer-Essential - Retailer - Medicine",
  "RTLE_PFAN": "Retailer-Essential - Retailer - Poultry Feeds and Other Animal Feeds",
  "RTLE_RICE": "Retailer-Essential - Retailer - Rice",
  "RTLE_MEAT": "Retailer-Essential - Retailer - Meat",
  "RTLE_CHKN": "Retailer-Essential - Retailer - Chicken",
  "RTLE_FISH": "Retailer-Essential - Retailer - Fish",
  "RTLE_CMNT": "Retailer-Essential - Retailer - Chicken/Meat",
  "RTLE_SCOS": "Retailer-Essential - Retailer - School Office Supplies",
  "RTLE_OFSU": "Retailer-Essential - Retailer - Office Supplies",
  "RTLE_VEGE": "Retailer-Essential - Retailer - Vegetable",
  "RTLE_FRVG": "Retailer-Essential - Retailer - Fruits and Vegetables",
  "RTLE_DFRS": "Retailer-Essential - Retailer - Dried Fish",
  "RTLE_COCO": "Retailer-Essential - Retailer - Coconut",
  "RTLE_BANA": "Retailer-Essential - Retailer - Banana",
  "RTLE_SGLM": "Retailer-Essential - Retailer - Sago Gulaman",
  "RTLE_FRUT": "Retailer-Essential - Retailer - Fruits",
  "RTLE_EGG": "Retailer-Essential - Retailer - Egg",
  "RTLE_LPG": "Retailer-Essential - Retailer - LPG",
  "RTLE_CRBP": "Retailer-Essential - Retailer - Crabs and Prawns",
  "RTLE_LUMP": "Retailer-Essential - Retailer - Lumpia Wrapper",
  "RTLE_FRZS": "Retailer-Essential - Retailer - Frozen Seafoods Products",
  "RTLE_SUPL": "Retailer-Essential - Retailer - Food Supplement",
  "RTLE_RIGM": "Retailer-Essential - Retailer - Rice and General Merchandise",
  "RTLE_BEEF": "Retailer-Essential - Retailer - Beef",
  "RTLE_SEAF": "Retailer-Essential - Retailer - Seafoods",
  "RTLE_CLDC": "Retailer-Essential - Retailer - Cold Cuts",
  "RTLE_NUTS": "Retailer-Essential - Retailer - Nuts",
  "RTLE_BAGN": "Retailer-Essential - Retailer - Bagoong",
  "RTLE_RIPF": "Retailer-Essential - Retailer - Rice and Poultry Feeds",
  "RTLE_MEVE": "Retailer-Essential - Retailer - Meat/Vegetable",
  "RTLE_MESP": "Retailer-Essential - Retailer - Meat Seafoods Products",
  "RTLE_FMSP": "Retailer-Essential - Retailer - Frozen Meat Seafoods Products",
  "RTLE_FRMT": "Retailer-Essential - Retailer - Frozen Meat",
  "RTLE_MEFS": "Retailer-Essential - Retailer - Meat and Fish",
  "RTLE_FVGE": "Retailer-Essential - Retailer - Fish/Vegetables",
  "RTLL_LIQ": "Retailer-Liquors - Retailer - Liquor or Wine",
  "RTLL_FLQB": "Retailer-Liquors - Retailer - Fermented Liquor (Beer)",
  "RTLL_VINO": "Retailer-Liquors - Retailer - Vino Liquor",
  "RTLL_TUBA": "Retailer-Liquors - Retailer - Tuba",
  "RTLL_BASI": "Retailer-Liquors - Retailer - Basi",
  "RTLL_OTDS": "Retailer-Liquors - Retailer - Other Distilled Spirits not Classified as Denatured Alcohol",
  "RTLL_LQWN": "Retailer-Liquors - Retailer - Liquor or Wine",
    "RTLL_ILWN": "Retailer-Liquors - Retail - Liquor or Wine / Importer",
    "RTLN_MED": "Retailer-Medicine - Retailer-Medicine",
    "RTLN_APPL": "Retailer-Non Essential - Retailer - Appliances and Furniture",
    "RTLN_CCTV": "Retailer-Non Essential - Retailer - CCTV",
    "RTLN_PCLA": "Retailer-Non Essential - Retailer - Paper Clay Arts",
    "RTLN_OFFC": "Retailer-Non Essential - Retailer - Office Only",
    "RTLN_JSUR": "Retailer-Non Essential - Retailer - Japan Surplus",
    "RTLN_OEQP": "Retailer-Non Essential - Retailer - Office Machines, Equipment, and Computers",
    "RTLN_ESUP": "Retailer-Non Essential - Retailer - Electrical Supply",
    "RTLN_EMAC": "Retailer-Non Essential - Retailer - Electronic Machines",
    "RTLN_RFIS": "Retailer-Non Essential - Retailer - Roasted Fish",
    "RTLN_RCHK": "Retailer-Non Essential - Retailer - Roasted Chicken",
    "RTLN_TXTF": "Retailer-Non Essential - Retailer - Textile Paints and Fabrics",
    "RTLN_LITE": "Retailer-Non Essential - Retailer - Lighting",
    "RTLN_GRVS": "Retailer-Non Essential - Retailer - Gravel and Sand",
    "RTLN_AUTO": "Retailer-Non Essential - Retailer - Auto Supply",
    "RTLN_GIVE": "Retailer-Non Essential - Retailer - Corporate Giveaways",
    "RTLN_ECG": "Retailer-Non Essential - Retailer - Electronic Cigarette",
    "RTLN_CHAR": "Retailer-Non Essential - Retailer - Charcoal",
    "RTLN_SUPA": "Retailer-Non Essential - Other - Surplus (Auto Spare Parts)",
    "RTLN_SUPP": "Retailer-Non Essential - Retailer - Surplus (Auto Spare Parts)",
    "RTLN_PROC": "Retailer-Non Essential - Retailer - Processed Meat",
    "RTLN_CURT": "Retailer-Non Essential - Retailer - Curtain",
    "RTLN_FURN": "Retailer-Non Essential - Retailer - Surplus Furniture",
    "RTLN_HHPR": "Retailer-Non Essential - Retailer - Household Products",
    "RTLN_FACC": "Retailer-Non Essential - Retailer - Fashion Accessories",
    "RTLN_BAKE": "Retailer-Non Essential - Retailer - Bakery Equipment",
    "RTLN_MVSP": "Retailer-Non Essential - Retailer - Surplus Motor Vehicle",
    "RTLN_HAND": "Retailer-Non Essential - Retailer - Handicraft Products",
  "RTLN_SGUL": "Retailer-Non Essential - Retailer - Sago Gulaman",
  "RTLN_STON": "Retailer-Non Essential - Retailer - Stonecraft",
  "RTLN_WPRF": "Retailer-Non Essential - Retailer - Waterproofing (Office Only)",
  "RTLN_PNTG": "Retailer-Non Essential - Retailer - Painting",
  "RTLN_CACC": "Retailer-Non Essential - Retailer - Cellphone Accessories",
  "RTLN_CARC": "Retailer-Non Essential - Retailer - Car Accessories",
  "RTLN_BATT": "Retailer-Non Essential - Retailer - Battery",
  "RTLN_WATC": "Retailer-Non Essential - Retailer - Watches",
  "RTLN_WACC": "Retailer-Non Essential - Retailer - Watch Accessories",
  "RTLN_BRED": "Retailer-Non Essential - Retailer - Bread",
  "RTLN_SGLS": "Retailer-Non Essential - Retailer - Sunglasses",
  "RTLN_PLAS": "Retailer-Non Essential - Retailer - Non-Essential Commodities/Importer - Plastic Ware",
  "RTLN_BKSP": "Retailer-Non Essential - Retailer - Bakery Supplies",
  "RTLN_HOSE": "Retailer-Non Essential - Retailer - Hose Regulator",
  "RTLN_SRPL": "Retailer-Non Essential - Retailer - Surplus",
  "RTLN_GENS": "Retailer-Non Essential - Retailer - Genset Units and Parts",
  "RTLN_TXTL": "Retailer-Non Essential - Retailer - Textile",
  "RTLN_PETC": "Retailer-Non Essential - Retailer - Pet Care Products",
  "RTLN_AUTM": "Retailer-Non Essential - Retailer - Automotive",
  "RTLN_HLTH": "Retailer-Non Essential - Retailer - Health Products",
  "RTLN_TSI": "Retailer-Non Essential - Retailer - Toasted Siopao",
  "RTLN_ZIPP": "Retailer-Non Essential - Retailer - Zipper",
  "RTLN_SPRT": "Retailer-Non Essential - Retailer - Sports Equipment",
  "RTLN_EBKE": "Retailer-Non Essential - Other - Electric Bike",
  "RTLN_ONBA": "Retailer-Non Essential - Retailer - Online Business Bags and Accessories",
  "RTLN_BIBK": "Retailer-Non Essential - Retailer - Bibingka",
  "RTLN_CSFT": "Retailer-Non Essential - Retailer - Computer Software Application",
  "RTLN_CHMP": "Retailer-Non Essential - Retailer - Chemical Products",
  "RTLN_HRBL": "Retailer-Non Essential - Retailer - Herbal Products",
  "RTLN_POPC": "Retailer-Non Essential - Retailer - Popcorn",
  "RTLN_CELL": "Retailer-Non Essential - Retailer - Cellphone",
  "RTLN_SLRP": "Retailer-Non Essential - Retailer - Solar Panel",
  "RTLN_HYDH": "Retailer-Non Essential - Retailer - Hydraulic Hose",
  "RTLN_SSLS": "Retailer-Non Essential - Retailer - Sari-Sari Store/Loading Station",
  "RTLN_RFNG": "Retailer-Non Essential - Roofing",
  "RTLN_PNDS": "Retailer-Non Essential - Retailer - Party Needs",
  "RTLN_ONLB": "Retailer-Non Essential - Retailer - Online Business",
  "RTLN_TBIC": "Retailer-Non Essential - Retailer - Tube Ice",
  "RTLN_RCCH": "Retailer-Non Essential - Retailer - Non-Essential Commodities / Roasted Chicken",
  "RTLN_ACCS": "Retailer-Non Essential – Non Essential - Accessories Sales",
  "RTLN_MSLE": "Retailer-Non Essential - Retailer - Medical Supplies / Equipment / Loading Station",
  "RTLN_ACPT": "Retailer-Non Essential - Retailer - Airconditioning Parts / Airconditioning Unit",
  "RTLN_SIOM": "Retailer-Non Essential - Retailer - Siomai",
  "RTLN_CPCA": "Retailer-Non Essential - Retailer - Cellphone Accessories / Computer Parts Accessories",
  "RTLN_CSSI": "Retailer-Non Essential - Retailer - Construction Supply / Importer / Exporter / Non-Essential Commodities",
  "RTLN_SHJW": "Retailer-Non Essential - Retailer - Shoes/Jewelry",
  "RTLN_EYWR": "Retailer-Non Essential - Retailer - Eyewear",
  "RTLN_STEL": "Retailer-Non Essential – Non Essential - Steel",
  "RTLN_RTSB": "Retailer-Non Essential - Retailer - RTW / Bags / Shoes",
  "RTLN_ICE": "Retailer-Non Essential - Ice",
  "RTLN_PNML": "Retailer-Non Essential - Retailer - Pancit Malabon",
  "RTLN_WTRT": "Retailer-Non Essential – Non Essential - Water Treatment Supplies",
  "RTLN_RTWA": "Retailer-Non Essential - Retailer - RTW Accessories",
  "RTLN_MTLP": "Retailer-Non Essential - Retailer - Metal Products",
  "RTLN_PSTC": "Retailer-Non Essential - Retailer - Pest Control Products",
  "RTLN_TOYS": "Retailer-Non Essential - Retailer - Toys",
  "RTLN_RCKP": "Retailer-Non Essential - Retailer - Rocks and Pebbles",
  "RTLN_RCMT": "Retailer-Non Essential - Retailer - Roasted Chicken Meat",
  "RTLN_OPTO": "Retailer-Non Essential - Retailer - Ornamental Plants / Orchids",
  "RTLN_IDST": "Retailer-Non Essential - Retailer - Independent Distributor",
  "RTLN_OBEA": "Retailer-Non Essential - Retailer - Organic Beauty Products",
  "RTLN_UPHS": "Retailer-Non Essential - Retailer - Upholstery Supply",
  "RTLN_DTRG": "Retailer-Non Essential - Retailer - Detergent",
  "RTLN_LQDT": "Retailer-Non Essential - Retailer - Liquid Detergent",
  "RTLN_EPRT": "Retailer-Non Essential - Retailer - Electronic Parts",
  "RTLN_SS2M": "Retailer-Non Essential - Retailer - Sari Sari Store 2nd Hand Motorcycle",
  "RTLN_PLTT": "Retailer-Non Essential - Retailer - Pallet",
  "RTLN_MVHE": "Retailer-Non Essential - Retailer - Motor Vehicle and Heavy Equipment",
  "RTLN_VAPE": "Retailer-Non Essential - Retailer - Vape",
  "RTLN_CHOC": "Retailer-Non Essential - Retailer - Chocolates",
  "RTLN_SPWR": "Retailer-Non Essential - Retailer - Sportswear",
  "RTLN_ROOF": "Retailer-Non Essential - Retailer - Roof",
  "RTLN_BOUT": "Retailer-Non Essential - Retailer - Fashion Boutique",
  "RTLN_PLWR": "Retailer-Non Essential - Retailer - Plastic Ware",
  "RTLN_CTNY": "Retailer-Non Essential - Retailer - Cotton Candy",
  "RTLN_FSDV": "Retailer-Non Essential - Retailer - Fuel Saving Devices",
  "RTLN_SSCL": "Retailer-Non Essential - Sari-Sari / Cigarette / Liquor",
  "RTLN_SSCT": "Retailer-Non Essential - Retailer - Sari-Sari / Cigarette",
  "RTLN_SSLQ": "Retailer-Non Essential - Retailer - Sari-Sari / Liquor",
  "RTLN_BTFX": "Retailer-Non Essential - Retailer - Bathroom Fixtures",
  "RTLN_NLLC": "Retailer-Non Essential - Retailer-Non Essential / Liquor / Cigarette",
  "RTLN_NTBC": "Retailer-Non Essential - Retailer - Non-Essential Commodities / Tobacco",
  "RTLN_PLNT": "Retailer-Non Essential - Retailer - Plants",
  "RTLN_ASUP": "Retailer-Non Essential - Retailer - Airsoft Supply Accessories",
  "RTLN_NBOL": "Retailer-Non Essential - Retailer - Nuts and Bolts",
  "RTLN_PLYD": "Retailer-Non Essential - Retailer - Plywood",
  "RTLN_CLQ": "Retailer-Non Essential - Retailer - Cigarette / Liquor",
  "RTLN_INSM": "Retailer-Non Essential - Retailer - Insulation Materials",
  "RTLN_MGCL": "Retailer-Non Essential - Retailer - Mini-Grocery / Liquor / Cigarettes",
  "RTLN_BNSL": "Retailer-Non Essential - Retailer - Buy and Sell",
  "RTLN_ECTO": "Retailer-Non Essential - Retailer (E-Cigarette / Tobacco Online Selling)",
  "RTLN_RECG": "Retailer-Non Essential - Retailer - E-Cigarette",
  "RTLN_MDDS": "Retailer - Medical and Dental Supplies",
  "RTLN_KFDS": "Retailer-Non Essential - Retailer - Korean Foods",
  "RTLN_BALL": "Retailer-Non Essential - Balloons",
  "RTLN_MCSP": "Retailer-Non Essential - Retailer - Motorcycle Spare Parts Accessories",
  "RTLN_MCAC": "Retailer-Non Essential - Retailer - Motorcycle Accessories",
  "RTLN_PKMT": "Retailer-Non Essential - Retailer - Packaging Materials",
  "RTLN_2LBR": "Retailer-Non Essential - Retailer - 2nd Hand Lumber",
  "RTLN_LUBR": "Retailer-Non Essential - Retailer - Lubricants",
  "RTLN_SCDE": "Retailer-Non Essential - Retailer - Security Devices",
  "RTLN_LCHN": "Retailer-Non Essential - Retailer - Lechon",
  "RTLN_ACPR": "Retailer-Non Essential - Retailer - Airconditioning Parts",
  "RTLN_FRFP": "Retailer-Non Essential - Frozen Food Products",
  "RTLN_ASPT": "Retailer-Non Essential - Retailer - Auto Spare Parts",
  "RTLN_POSM": "Retailer-Non Essential - Retailer - POS Machine",
  "RTLN_HLMT": "Retailer-Non Essential - Retailer - Helmet",
  "RTLN_CCPR": "Retailer-Non Essential - Retailer - CCTV/POS Machine/Repair Services",
  "RTLN_GFSP": "Retailer-Non Essential - Retailer - Gift Shop",
  "RTLN_NCGN": "Retailer-Non Essential - Retailer - Non Essential Commodities/Gun",
  "RTLN_SLQW": "Retailer-Non Essential - Retailer - Softdrinks / Liquor or Wine",
  "RTLN_MDSP": "Retailer-Non Essential - Medical Supplies",
  "RTLN_SKTB": "Retailer-Non Essential - Retailer - Skateboard",
  "RTLN_GRCL": "Retailer-Non Essential - Retailer - Grocery / Liquor / Cigarettes",
  "RTLN_HMDC": "Retailer-Non Essential - Retailer - Home Decoration",
  "RTLN_BWLP": "Retailer-Non Essential - Retailer - Beauty and Wellness Products",
  "RTLN_USOL": "Retailer-Non Essential - Retailer - Used Oil",
  "RTLN_SHUC": "Retailer-Non Essential - Retailer - Second Hand Used Car",
  "RTLN_BGPR": "Retailer-Non Essential - Retailer - Bags Perfumes",
  "RTLN_INSP": "Retailer-Non Essential - Retailer - Industrial Machines Spare Parts",
  "RTLN_WHMC": "Retailer-Non Essential - Retailer - Water Heater Machine",
  "RTLN_KTWR": "Retailer-Non Essential - Retailer - Kitchenware",
  "RTLN_WTVD": "Retailer-Non Essential - Retailer - Water (Vending Machine)",
  "RTLN_FRCH": "Retailer-Non Essential - Retailer - Fried Chicken",
  "RTLN_MTPT": "Retailer-Non Essential - Retailer - Meat Products",
  "RTLN_CSMP": "Retailer-Non Essential - Retailer - Cosmetic Products",
  "RTLN_BGFW": "Retailer-Non Essential - Retailer - Bags Footwear",
  "RTLN_BPEW": "Retailer-Non Essential - Retailer - Beauty Products Eyewear",
  "RTLN_BDST": "Retailer-Non Essential - Retailer - Bedsheets",
  "RTLN_KIMC": "Retailer-Non Essential - Retailer - Kimchi",
  "RTLN_ELSP": "Retailer-Non Essential - Retailer - Electrical Electronic Supplies",
  "RTLN_VETP": "Retailer-Non Essential - Retailer - Veterinary Drugs and Products, Feed Additives and Supplements",
  "RTLN_BXES": "Retailer-Non Essential - Retailer - Boxes",
  "RTLN_FARM": "Retailer-Non Essential - Retailer - Fire Alarm",
  "RTLN_FPEQ": "Retailer-Non Essential - Retailer - Fire Protection Equipment",
  "RTLN_JUDY": "Retailer-Non Essential - Retailer - Judy",
  "RTLN_NCMT": "Retailer-Non Essential - Retailer - Non Essential Commodities",
  "RTLN_SRST": "Retailer-Non Essential - Retailer - Sari-sari Store",
  "RTLN_RTWE": "Retailer-Non Essential - Retailer - RTW",
  "RTLN_SCRP": "Retailer-Non Essential - Retailer - Scrap",
  "RTLN_LPGN": "Retailer-Non Essential - Retailer – LPG",
  "RTLN_FLWR": "Retailer-Non Essential - Retailer - Flower Shop",
  "RTLN_MSP": "Retailer-Non Essential - Retailer - Motor Vehicle Spare Parts",
  "RTLN_BKMZ": "Retailer-Non Essential - Retailer - Books Magazines",
  "RTLN_BTYD": "Retailer-Non Essential - Retailer - Beauty Products",
  "RTLN_CNSS": "Retailer-Non Essential - Retailer - Construction Supply",
  "RTLN_RFNT": "Retailer-Non Essential - Retailer - Furniture",
  "RTLN_CSFA": "Retailer-Non Essential - Retailer - Crosstitch Accessories and Frames",
  "RTLN_FTWG": "Retailer-Non Essential - Retailer - Footwear",
  "RTLN_CNDY": "Retailer-Non Essential - Retailer - Candies",
  "RTLN_CPAC": "Retailer-Non Essential - Retailer - Cellphone Accessories",
  "RTLN_DNTS": "Retailer-Non Essential - Retailer - Donuts",
  "RTLN_OPST": "Retailer-Non Essential - Retailer - Optical Supplies",
  "RTLN_CPAK": "Retailer-Non Essential - Retailer - Computer Parts Accessories",
  "RTLN_CPTR": "Retailer-Non Essential - Retailer - Computers Parts",
  "RTLN_BRGR": "Retailer-Non Essential - Retailer - Burger",
  "RTLN_DRGS": "Retailer-Non Essential - Retailer - Drug Store",
  "RTLN_MNUS": "Retailer-Non Essential - Retailer - Musical Instrument",
  "RTLN_APL": "Retailer-Non Essential - Retailer - Appliances",
  "RTLN_INDS": "Retailer-Non Essential - Retailer - Industrial Sales",
  "RTLN_INDP": "Retailer-Non Essential - Retailer - Industrial Products",
  "RTLN_PTSH": "Retailer-Non Essential - Retailer - Pet Shop",
  "RTLN_BSHP": "Retailer-Non Essential - Retailer - Bicycle Spare Parts",
  "RTLN_MSUE": "Retailer-Non Essential - Retailer - Medical Supplies Equipment",
  "RTLN_SHES": "Retailer-Non Essential - Retailer - Shoes",
  "RTLN_NCOM": "Retailer-Non Essential - Retailer - Non Essential Commodities (Office Only)",
  "RTLN_PRFD": "Retailer-Non Essential - Retailer - Processed Food",
  "RTLN_PRFM": "Retailer-Non Essential - Retailer - Perfumes",
  "RTLN_CLCD": "Retailer-Non Essential - Retailer - Cellcard",
  "RTLN_SHRM": "Retailer-Non Essential - Retailer - Shawarma",
  "RTLN_TLCS": "Retailer-Non Essential - Retailer - Tiles Ceramics",
  "RTLN_JWLR": "Retailer-Non Essential - Retailer - Jewelry",
  "RTLN_MDMS": "Retailer-Non Essential - Retailer - Modem",
  "RTLN_SSBA": "Retailer-Non Essential - Retailer - Sari-Sari Store Bakery",
  "RTLN_NCI": "Retailer-Non Essential - Retailer - Non Essential Commodities/Importer",
  "RTLN_INDC": "Retailer-Non Essential - Retailer - Industrial/Chemical and All Types of Equipment",
  "RTLN_GRRY": "Retailer-Non Essential - Retailer - Grocery",
  "RTLN_FLFO": "Retailer-Non Essential - Retailer - Fuel (Office Only)",
  "RTLN_RTNR": "Retailer-Non Essential - Retailer - Router Non Essential",
  "RTLN_RTRT": "Retailer-Non Essential - Retailer - Router",
  "RTLN_FLUL": "Retailer-Non Essential - Retailer - Fuel",
  "RTLN_MVCL": "Retailer-Non Essential - Retailer - Motor Vehicle",
  "RTLN_MSPT": "Retailer-Non Essential - Retailer - Motorcycle Spare Parts",
  "RTLN_LDST": "Retailer-Non Essential - Retailer - Loading Station",
  "RTLN_PZZA": "Retailer-Non Essential - Retailer - Pizza",
  "RTLN_CSIH": "Retailer-Non Essential - Retailer - Construction Supply / Importer",
  "RTLN_DNSP": "Retailer-Non Essential - Retailer - Dental Supplies",
  "RTLN_FEXT": "Retailer-Non Essential - Retailer - Fire Extinguisher",
  "RTLN_FSUP": "Retailer-Non Essential - Retailer - Food Supplements",
  "RTLN_MSSP": "Retailer-Non Essential - Retailer - Motorcycle Spare Parts",
  "RTLN_ICRM": "Retailer-Non Essential - Retailer - Ice Cream",
  "RTLN_ORGF": "Retailer-Non Essential - Retailer - Organic Fertilizer",
  "RTLN_MGRC": "Retailer-Non Essential - Retailer - Mini-Grocery",
  "RTLN_CMSC": "Retailer-Non Essential - Retailer - Cosmetics",
  "RTLN_ECSU": "Retailer-Non Essential - Retailer - Electronics Supply",
  "RTLN_GLAS": "Retailer-Non Essential - Retailer - Glassware",
  "RTLN_PLST": "Retailer-Non Essential - Retailer - Plastic Ware",
  "RTLN_FAAU": "Retailer-Non Essential - Retailer - Firearms and Ammunition",
  "RTLN_ECGD": "Retailer-Non Essential - Retailer - Electronics Gadget",
  "RTLN_PNTS": "Retailer-Non Essential - Retailer - Paints",
  "RTLN_CAPS": "Retailer-Non Essential - Retailer - Caps",
  "RTLN_BGS": "Retailer-Non Essential - Retailer - Bags Shoes",
  "RTLN_SLVX": "Retailer-Non Essential - Retailer - Silver Accessories",
  "RTLN_RLGI": "Retailer-Non Essential - Retailer - Religious Item",
  "RTLN_SAPX": "Retailer-Non Essential - Retailer - Soap",
  "RTLN_APRL": "Retailer-Non Essential - Retailer - Apparels",
  "RTLN_TSHR": "Retailer-Non Essential - Retailer - T-Shirts",
  "RTLN_CAKE": "Retailer-Non Essential - Retailer - Cake",
  "RTLN_KAKN": "Retailer-Non Essential - Retailer - Kakanin",
  "RTLN_UKAY": "Retailer-Non Essential - Retailer - Ukay Ukay",
  "RTLN_SODK": "Retailer-Non Essential - Retailer - Softdrinks",
  "RTLN_GLAL": "Retailer-Non Essential - Retailer - Glass and Aluminum",
  "RTLN_HBPT": "Retailer-Non Essential - Retailer - Herbal Beauty Products",
  "RTLN_CPNS": "Retailer-Non Essential - Retailer - Computer Printer Services",
  "RTLN_FOOT": "Retailer-Non Essential - Retailer - Footwear (Office Only)",
  "RTLN_CHEM": "Retailer-Non Essential - Retailer - Cleaning Chemicals",
  "RTLN_MOTO": "Retailer-Non Essential - Retailer - Motorcycle",
  "RTLN_MVBT": "Retailer-Non Essential - Retailer - Motor Vehicle Battery",
  "RTLN_BUJU": "Retailer-Non Essential - Retailer - Buko Juice",
  "RTLN_DUPM": "Retailer-Non Essential - Retailer - Duplicator Machine",
  "RTLN_TIRE": "Retailer-Non Essential - Retailer - Tire Supply",
  "RTLN_PINY": "Retailer-Non Essential - Retailer - Pinoy Delicacies/Pasalubong",
  "RTLN_DVCA": "Retailer-Non Essential - Retailer - Digital Video Camera Accessories",
  "RTLN_SURP": "Retailer-Non Essential - Retailer - Surplus TV",
  "RTLN_DUMI": "Retailer-Non Essential - Retailer - Duplicator Machine / Importer",
  "RTLN_HOFS": "Retailer-Non Essential - Retailer - Hose Fittings",
  "RTLN_BOOK": "Retailer-Non Essential - Retailer - Book",
  "RTLN_SKBP": "Retailer-Non Essential - Retailer - Skateboard Parts Apparel",
  "RTLN_TISS": "Retailer-Non Essential - Retailer - Tissue",
  "RTLN_TVMV": "Retailer-Non Essential - Retailer - Tissue (Vending Machine)",
  "RTLN_BGA": "Retailer-Non Essential - Retailer - Bags Accessories",
  "RTLN_RAGX": "Retailer-Non Essential - Retailer - Rag",
  "RTLN_BSCT": "Retailer-Non Essential - Retailer - Biscuit",
  "RTLN_IDSP": "Retailer-Non Essential - Retailer - Industrial Spare Parts",
    "RTLN_DIAP": "Retailer-Non Essential - Retailer - Diaper",
    "RTLN_STKR": "Retailer-Non Essential - Retailer - Sticker",
    "RTLN_CCLM": "Retailer-Non Essential - Retailer - Coco Lumber",
    "WHN_NEC": "Wholesaler / Exporter - Wholesaler - Non Essential Commodities",
    "WHN_DIS": "Wholesaler / Exporter - Distributor - Non Essential Commodities",
    "WHN_EXP": "Wholesaler / Exporter - Exporter - Non Essential Commodities",
    "WHN_PRO": "Wholesaler / Exporter - Producer - Non Essential Commodities",
    "WHN_DEA": "Wholesaler / Exporter - Dealer - Non Essential Commodities",
    "WHN_SOF": "Wholesaler / Exporter - Dealer - Softdrinks",
    "WHN_BER": "Wholesaler / Exporter - Dealer - Beer",
    "WHN_APP": "Wholesaler / Exporter - Dealer - Appliance",
    "WHN_NECW": "Wholesaler / Exporter - Wholesaler - Non Essential Commodities",
    "WHN_MEX": "Wholesaler / Exporter - Manufacturer / Exporter - Non Essential Commodities",
    "WHN_LPG": "Wholesaler / Exporter - Dealer - LPG",
    "WHN_JNK": "Wholesaler / Exporter - Wholesaler - Junkshop",
    "WHN_AUT": "Wholesaler / Exporter - Dealer - Automotive",
    "WHN_LPGW": "Wholesaler / Exporter - Wholesaler - LPG",
    "WHN_CON": "Wholesaler / Exporter - Wholesaler - Construction Materials",
    "WHN_FUR": "Wholesaler / Exporter - Wholesaler - Furniture",
    "WHN_CNS": "Wholesaler / Exporter - Wholesaler - Construction Supply",
    "WHN_RICC": "Wholesaler / Exporter - Dealer - Rice Corn",
    "WHN_PFG": "Wholesaler / Exporter - Wholesaler - Piggery Farm",
    "WHN_WEX": "Wholesaler / Exporter - Wholesaler - Exporter",
    "WHN_WEO": "Wholesaler / Exporter - Wholesaler - Exporter (Office Only)",
    "WHN_DEI": "Wholesaler / Exporter - Dealer - Importer - Non Essential Commodities",
    "WHN_ECO": "Wholesaler / Exporter - Dealer - Essential Commodities",
    "WHN_WIL": "Wholesaler / Exporter - Wholesaler - Wine Liquor",
    "WHN_LGL": "Wholesaler / Exporter - Dealer - Non Essential Commodities (Lights)",
    "WHN_MTC": "Wholesaler / Exporter - Dealer - Motorcycle",
    "WHN_PTF": "Wholesaler / Exporter - Wholesaler - Poultry Farm",
    "WHN_OJNK": "Wholesaler / Exporter - Wholesaler - Junkshop (Office Only)",
  "WHN_RIC": "Wholesaler / Exporter - Wholesaler - Rice",
  "WHN_HEA": "Wholesaler / Exporter - Wholesaler - Health Products",
  "WHN_MTP": "Wholesaler / Exporter - Dealer - Motorcycle Parts",
  "WHN_NECI": "Wholesaler / Exporter - Exporter / Importer - Non Essential Commodities",
  "WHN_WHI": "Wholesaler / Exporter - Wholesaler - Wholesaler / Importer",
  "WHN_WNEC": "Wholesaler / Exporter - Wholesaler - Importer - Non Essential Commodities",
  "WHN_SOE": "Wholesaler / Exporter - Dealer - School, Office Supplies Equipment",
  "WHN_WAT": "Wholesaler / Exporter - Distributor - Water Supply",
  "WHN_SFTD": "Wholesaler / Exporter - Distributor - Softdrinks",
  "WHN_DSS": "Wholesaler / Exporter - Wholesaler - Dental Supplies",
  "WHN_RID": "Wholesaler / Exporter - Dealer - Rice",
  "WHN_BEA": "Wholesaler / Exporter - Wholesaler - Beauty Products",
  "WHN_SEC": "Wholesaler / Exporter - Dealer - Security Equipment",
  "WHN_BED": "Wholesaler / Exporter - Distributor - Beauty Products",
  "WHN_MED": "Wholesaler / Exporter - Distributor - Medical Equipment",
  "WHN_IMM": "Wholesaler / Exporter - Importer - Medical Equipment",
  "WHN_IEC": "Wholesaler / Exporter - Wholesaler - Importer - Essential Commodities",
  "WHN_PLS": "Wholesaler / Exporter - Wholesaler - Importer - Poultry Livestock Supply",
  "WHN_CBX": "Wholesaler / Exporter - Wholesaler - Carton Box",
  "WHN_WL": "Wholesaler / Exporter - Dealer - Wine Liquor",
  "WHN_HCL": "Wholesaler / Exporter - Distributor - Household Cleaner",
  "WHN_FDF": "Wholesaler / Exporter - Dealer - Frozen Food",
  "WHN_DNEC": "Wholesaler / Exporter - Distributor - Non Essential Commodities / Importer",
  "WHN_TSD": "Wholesaler / Exporter - Wholesaler - Importer - Traffic Safety Device",
  "WHN_BKS": "Wholesaler / Exporter - Distributor - Books",
  "WHN_STE": "Wholesaler / Exporter - Wholesaler - Steel",
  "WHN_FPD": "Wholesaler / Exporter - Wholesaler - Food Products",
  "WHN_PCT": "Wholesaler / Exporter - Wholesaler - Packaging Tape",
  "WHN_DCON": "Wholesaler / Exporter - Dealer - Construction Materials",
  "WHN_LED": "Wholesaler / Exporter - Distributor - LED Light",
  "WHN_HAN": "Wholesaler / Exporter - Exporter - Handicraft Products",
  "WHN_SSO": "Wholesaler / Exporter - Wholesaler - School Supply Office Supply",
  "WHN_SCRM": "Wholesaler / Exporter - Wholesaler - Scrap Metal",
  "WHN_DPMP": "Wholesaler / Exporter - Distributor - Packaging Materials (Meat Processing Products)",
  "WHN_FVR": "Wholesaler / Exporter - Dealer - Fruits and Vegetables",
  "WHN_HRP": "Wholesaler / Exporter - Wholesaler - Herbal Product",
  "WHN_BSC": "Wholesaler / Exporter - Wholesaler - Biscuits",
  "WHN_GOL": "Wholesaler / Exporter - Wholesaler - Golf Products",
  "WHN_MES": "Wholesaler / Exporter - Wholesaler - Machinery, Equipment, and Supplies",
  "WHN_BAN": "Wholesaler / Exporter - Dealer - Banana",
  "WHN_PHP": "Wholesaler / Exporter - Distributor - Pharmaceutical Product",
  "WHN_BEAS": "Wholesaler / Exporter - Exporter - Beauty Soap",
  "WHN_SVI": "Wholesaler / Exporter - Distributor - Spices/Vanilla Product - Raw",
  "WHN_IMP": "Wholesaler / Exporter - Wholesaler - Importer",
  "WHN_MSP": "Wholesaler / Exporter - Wholesaler - Motorcycle Spare Parts",
  "WHN_CAP": "Wholesaler / Exporter - Wholesaler - Cap",
  "WHN_PMP": "Wholesaler / Exporter - Wholesaler - Importer - Packaging Materials for Meat Processing",
  "WHN_LAB": "Wholesaler / Exporter - Importer - Laboratory Equipment",
  "WHN_MCP": "Wholesaler / Exporter - Dealer - Machineries Parts (Office Only)",
  "WHN_FSU": "Wholesaler / Exporter - Distributor - Food Supplement",
  "WHN_MVS": "Wholesaler / Exporter - Dealer - Motor Vehicle Spare Parts / Importer",
  "WHN_JWL": "Wholesaler / Exporter - Exporter - Jewelries",
  "WHN_PWA": "Wholesaler / Exporter - Importer - Plastic Ware",
  "WHN_MIW": "Wholesaler / Exporter - Distributor - Mineral Water",
  "WHN_CIT": "Wholesaler / Exporter - Wholesaler - Cigarettes and Other Tobacco Products",
  "WHN_SCRP": "Wholesaler / Exporter - Wholesaler - Scrap",
  "WHN_INEC": "Wholesaler / Exporter - Importer - Non Essential Commodities",
  "WHN_AFE": "Wholesaler / Exporter - Dealer - Appliance Furniture",
  "WHN_FDR": "Wholesaler / Exporter - Dealer - Fruit Drinks",
  "WHN_MVSP": "Wholesaler / Exporter - Importer - Motor Vehicle Spare Parts",
  "WHN_INP": "Wholesaler / Exporter - Wholesaler - Industrial Products",
  "WHN_CCL": "Wholesaler / Exporter - Distributor - Cleaning Chemical",
  "WHN_IECE": "Wholesaler / Exporter - Exporter - Import/Export of Construction Equipment",
  "WHN_APS": "Wholesaler / Exporter - Wholesaler - Appliances",
  "WHN_SOD": "Wholesaler / Exporter - Wholesaler - Softdrinks",
  "WHN_ONEC": "Wholesaler / Exporter - Wholesaler - Importer - Non Essential Commodities (Office Only)",
  "WHN_MSE": "Wholesaler / Exporter - Wholesaler - Medical Supplies Equipment",
  "WHN_LPGN": "Wholesaler / Exporter - Wholesaler - LPG / Non Essential Commodities",
  "WHN_BSD": "Wholesaler / Exporter - Wholesaler - Beer / Softdrinks",
  "WHN_ICE": "Wholesaler / Exporter - Distributor - Ice",
  "WHN_EGG": "Wholesaler / Exporter - Dealer - Egg",
  "WHN_BPS": "Wholesaler / Exporter - Wholesaler - Beauty Products and Supplements",
  "WHN_GLS": "Wholesaler / Exporter - Wholesaler - Gloves/Shoes",
  "WHN_TSS": "Wholesaler / Exporter - Wholesaler - Tissue and Soap",
  "WHN_KFD": "Wholesaler / Exporter - Wholesaler - Korean Foods",
  "WHN_AUS": "Wholesaler / Exporter - Wholesaler - Auto Supply",
  "WHN_CLM": "Wholesaler / Exporter - Dealer - Coco Lumber",
  "WHN_PLT": "Wholesaler / Exporter - Wholesaler - Pallet",
  "WHN_LBR": "Wholesaler / Exporter - Wholesaler - Lumber",
  "WHN_BST": "Wholesaler / Exporter - Distributor - Biscuit",
  "WHN_DMP": "Wholesaler / Exporter - Distributor - Del Monte Products",
  "WHN_RTW": "Wholesaler / Exporter - Wholesaler - RTW",
  "WHN_PLY": "Wholesaler / Exporter - Wholesaler - Plywood",
  "WHN_EVS": "Wholesaler / Exporter - Event Supplier",
  "WHN_YAK": "Wholesaler / Exporter - Wholesale - Yakult",
  "WHN_DCT": "Wholesaler / Exporter - Wholesaler - Drum and Container",
  "WHN_PET": "Wholesaler / Exporter - Importer - Petroleum Products / Office Only",
  "WHN_IECS": "Wholesaler / Exporter - Import/Export Construction Materials / Wholesaler - Construction Supply",
  "WHN_EBT": "Wholesaler / Exporter - Wholesaler - Empty Bottle",
  "WHN_WLSD": "Wholesaler / Exporter - Dealer - Wine Liquor / Softdrinks",
  "WHN_CAR": "Wholesaler / Exporter - Wholesaler - Car Accessories",
  "WHN_WSP": "Wholesaler / Exporter - Distributor - Water Service Provider",
  "WHN_RMI": "Wholesaler / Exporter - Distributor - Raw Materials Import/Export",
  "WHN_ELE": "Wholesaler / Exporter - Importer - Electronics",
  "WHN_INDP": "Wholesaler / Exporter - Importer - Industrial Products",
  "WHN_FDS": "Wholesaler / Exporter - Wholesaler - Food Supplement",
  "WHN_HYS": "Wholesaler / Exporter - Wholesaler - Hydraulic Hose",
  "WHN_HYI": "Wholesaler / Exporter - Importer - Hydraulic Hose",
  "WHN_DSD": "Wholesaler / Exporter - Importer / Exporter - Dental Supplies/Devices",
  "WHN_RTX": "Wholesaler / Exporter - Wholesaler - Rugs / Textile",
  "WHN_NECO": "Wholesaler / Exporter - Wholesaler - Non Essential Commodities (Office Only)",
  "WHN_IME": "Wholesaler / Exporter - Wholesaler - Industrial Machinery Equipment (Office Only)",
  "WHN_ALC": "Wholesaler / Exporter - Distributor - Alcohol",
  "WHN_OPL": "Wholesaler / Exporter - Wholesaler - Ornamental Plants",
  "WHN_SMC": "Wholesaler / Exporter - Wholesaler - Surplus Machineries",
  "WHN_GRM": "Wholesaler / Exporter - Exporter - Garments",
  "WHN_DMSE": "Wholesaler / Exporter - Distributor - Medical Supplies Equipment",
  "WHN_FFD": "Wholesaler / Exporter - Frozen Food Products",
  "WHN_SPS": "Wholesaler / Exporter - Distributor/Importer - Spices",
  "WHN_PBG": "Wholesaler / Exporter - Wholesaler - Plastic Bag",
  "WHN_PNT": "Wholesaler / Exporter - Wholesaler / Importer of Paint",
  "WHN_SCM": "Wholesaler / Exporter - Importer - Scrap Metal",
  "WHN_CPA": "Wholesaler / Exporter - Wholesaler - Computer Parts and Accessories",
  "WHN_SWD": "Wholesaler / Exporter - Wholesaler - Scrap Wood",
  "WHN_CTM": "Wholesaler / Exporter - Importer - Construction Materials",
  "WHN_TLB": "Wholesaler / Exporter - Distributor/Importer - Tire, Lubricant, Battery",
  "WHN_CSO": "Wholesaler / Exporter - Distributor - Computer Software",
  "WHE_RCE": "Wholesaler-Essential - Dealer - Rice",
  "WHE_MPP": "Wholesaler-Essential - Wholesaler - Medicinal and Pharmaceutical Products",
  "WHE_OSE": "Wholesaler-Essential - Wholesaler - Oil and Sugar",
  "WHE_MPR": "Wholesaler-Essential - Wholesaler - Importer - Marine Products",
  "WHE_DPHP": "Wholesaler-Essential - Distributor - Pharmaceutical Product",
  "WHE_WEGG": "Wholesaler-Essential - Wholesaler - Egg",
  "WHE_CHK": "Wholesaler-Essential - Dealer - Chicken",
  "WHE_OSF": "Wholesaler-Essential - Wholesaler - Office Supplies and Printed Form",
  "WHE_OSP": "Wholesaler-Essential - Wholesaler - Office Supply",
  "WHE_WRCE": "Wholesaler-Essential - Wholesaler - Rice",
  "WHE_IGS": "Wholesaler-Essential - Distributor - Industrial Gas",
  "WHE_AGP": "Wholesaler-Essential - Distributor - Agricultural Products",
  "WHE_FMS": "Wholesaler-Essential - Retailer - Frozen Meat and Seafood Products",
  "WHE_ECE": "Wholesaler-Essential - Importer / Exporter - Essential Commodities",
  "WHE_WPHP": "Wholesaler-Essential - Wholesaler - Importer - Pharmaceutical Products",
  "WHE_FMP": "Wholesaler-Essential - Wholesaler - Frozen Meat Products",
  "WHE_PST": "Wholesaler-Essential - Wholesaler - Pesticides",
  "WHE_ECM": "Wholesaler-Essential - Wholesaler - Essential Commodities",
  "WHE_DEC": "Wholesaler-Essential - Distributors - Essential Commodities",
  "WHE_RCO": "Wholesaler-Essential - Distributor - Rice and Corn",
  "WHE_RCN": "Wholesaler-Essential - Dealer - Rice and Corn",
  "WHE_WCF": "Wholesaler-Essential - Dealer - Wheat or Cassava Flour",
  "WHE_MET": "Wholesaler-Essential - Dealer - Meat",
  "WHE_DDP": "Wholesaler-Essential - Dealer - Dairy Products",
  "WHE_PPF": "Wholesaler-Essential - Dealer - Processed or Preserved Food",
  "WHE_SGR": "Wholesaler-Essential - Dealers - Sugar",
  "WHE_DLPG": "Wholesaler-Essential - Dealer - LPG",
  "WHE_CEM": "Wholesaler-Essential - Dealer - Cement",
  "WHE_SGRD": "Wholesaler-Essential - Distributor - Sugar",
  "WHE_DMED": "Wholesaler-Essential - Distributor - Medicine",
  "WHE_COI": "Wholesaler-Essential - Distributor - Cooking Oil",
  "WHE_LNS": "Wholesaler-Essential - Distributor - Laundry Soap",
  "WHE_DDET": "Wholesaler-Essential - Distributor - Detergents",
  "WHE_DSLT": "Wholesaler-Essential - Distributor - Salt",
  "WHE_FRT": "Wholesaler-Essential - Distributor - Fertilizers",
  "WHE_PSTC": "Wholesaler-Essential - Distributor - Pesticides",
  "WHE_INST": "Wholesaler-Essential - Distributor - Insecticides",
  "WHE_PFDS": "Wholesaler-Essential - Distributor - Poultry Feeds and Other Animal Feeds",
  "WHE_DSHS": "Wholesaler-Essential - Distributor - School Supplies",
  "WHE_LPGD": "Wholesaler-Essential - Distributor - LPG",
  "WHE_RCNC": "Wholesaler-Essential - Wholesaler - Rice and Corn",
  "WHE_LNSO": "Wholesaler-Essential - Wholesaler - Laundry Soap",
  "WHE_DETO": "Wholesaler-Essential - Wholesaler - Detergent",
  "WHE_WWCF": "Wholesaler-Essential - Wholesaler - Wheat or Cassava Flour",
  "WHE_WDDP": "Wholesaler-Essential - Wholesaler - Dairy Products",
  "WHE_WMET": "Wholesaler-Essential - Wholesaler - Meat",
  "WHE_WSGR": "Wholesaler-Essential - Wholesaler - Sugar",
  "WHE_SLT": "Wholesaler-Essential - Wholesaler - Salt",
  "WHE_WMED": "Wholesaler-Essential - Wholesaler - Medicine",
  "WHE_WPFS": "Wholesaler-Essential - Wholesaler - Poultry Feeds and Other Animal Feeds",
  "WHE_WCEM": "Wholesaler-Essential - Wholesaler - Cement",
  "WHE_DAGP": "Wholesaler-Essential - Dealer - Agricultural Products",
  "WHE_DESC": "Wholesaler-Essential - Dealer - Essential Commodities",
  "WHE_MFP": "Wholesaler-Essential - Dealer - Marine and Freshwater Products",
  "WHE_DMDC": "Wholesaler-Essential - Dealer - Medicine",
  "WHE_DSSP": "Wholesaler-Essential - Dealer - School Supplies",
  "WHE_LSD": "Wholesaler-Essential - Dealer - Laundry Soap and/or Detergent",
  "WHE_DSEC": "Wholesaler-Essential - Distributor - Essential Commodities",
  "WHE_DECD": "Wholesaler-Essential - Dealer - Essential Commodities",
  "WHE_NM": "Wholesaler-Essential - Distributor - Newspaper and Magazines",
  "WHE_PFAE": "Wholesaler-Essential - Distributor - Poultry, Agricultural, and Food Equipment",
  "WHE_WHL": "Wholesaler-Essential - Distributor - Wholesaler",
  "WHE_CHC": "Wholesaler-Essential - Distributor - Chicken",
  "WHE_CHCK": "Wholesaler-Essential - Distributor Chicken",
  "WHE_PFFD": "Wholesaler-Essential - Distributor - Poultry Feeds and Food Equipment / Importer",
  "WHE_DSFD": "Wholesaler-Essential - Distributor - Soft Drinks",
  "WHE_VEG": "Wholesaler-Essential - Dealer - Vegetables",
  "WHE_SSOF": "Wholesaler-Essential - Wholesaler - School Supply Office Supply",
  "WHE_SFD": "Wholesaler-Essential - Dealer - Seafoods",
  "WHE_FLR": "Wholesaler-Essential - Distributor - Flour",
};

let displayTextTitle = 'All Business Permit Applications (For Payments)';

if (type === 'new') {
  displayTextTitle = 'New Business Permit Applications (For Payments)';
} else if (type === 'renew') {
  displayTextTitle = 'Renewal of Business Permit Applications (For Payments)';
} else if (type === 'all') {
  displayTextTitle = 'All Business Permit Applications (For Payments)';
} else {
  displayTextTitle = 'All Business Permit Applications (For Payments)';
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
            Address:{permit.business.businessbuildingblocklot}</td>
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
                <option value="viewOwner">View Owner Details</option>
                <option value="viewBusiness">View Business Details</option>
                <option value="viewApplication">View Full Application</option>
                <option value="viewBusinessNature">View Business Nature</option>
                <option value="viewAssessment">View Assessment</option>
                <option value="viewAttatchment">View Attatchments</option>
                <option value="payment">Handle Application Payment</option>
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
  <div className="modal-overlay" onClick={CloseOwnerModal}>
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

{viewBusinessNature && activePermitId && (
  <div className="modal-overlay" onClick={closeViewBusinessNature} aria-label="View Business Nature Modal">
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <p>Permit ID: {activePermitId.id}</p>
      <p>Owner's Name: {activePermitId.owner.lastname}, {activePermitId.owner.firstname}</p>
      <p>Business Name: {activePermitId.business.businessname}</p>
      <p>Business Address: {activePermitId.business.businessbuildingblocklot}</p>
      <h1>List of Businesses</h1>
      {activePermitId.businesses?.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Nature</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Type</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Capital Investment</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Last Year Gross</th>
            </tr>
          </thead>
          <tbody>
            {activePermitId.businesses.map((business) => (
              <tr key={business._id}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {businessNatureMap?.[business.businessNature as keyof typeof businessNatureMap] || business.businessNature || 'Not Specified'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {business.businessType || 'Not Specified'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  ₱{business.capitalInvestment?.toLocaleString() || '0'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  ₱{business.lastYearGross?.toLocaleString() || '0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No businesses to display.</div>
      )}

<button className="cancel-button" onClick={closeViewBusinessNature}>Close</button>
    </div>
  </div>
)}

{viewpayment && activePermitId &&(
              <div className="modal-overlay" onClick={closeviewpayment}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <label>{activePermitId._id}</label>
                  <label>Are you sure you want to handle the payment of permit {activePermitId.id}?</label>
                  <label>{activePermitId.statementofaccount.statementofaccountfile}</label>

                        {/* Render the PDF or image file */}
      {renderFile(fetchDocumentUrl(activePermitId.statementofaccount?.statementofaccountfile, 'receipts'))}

      <button onClick={handlePrint}>Print</button>
      <button onClick={handlePayment}>Update Payment</button> {/* Add the handler for Pay button */}
          </div>
        </div>
)}

{confirmpayment && activePermitId &&(
  <div className="modal-overlay" onClick={confirmpaymentclose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          Payment Completed for Business Permit Application {activePermitId.id}
          <button onClick={confirmpaymentclose}>Okay</button>
            </div>
            </div>
)}

{isModalOpenFile && activePermitId && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      {modalFile && (
        <div>
          {viewingType === 'receipts' && (
            <label>Viewing Receipt for {activePermitId.id}</label>
          )}
          {viewingType === 'permits' && (
            <label>Viewing Business Permit for {activePermitId.id}</label>
          )}
          {modalFile.endsWith('.pdf') ? (
            <iframe
              src={modalFile}
              style={{ width: '500px', height: '600px' }}
              title="PDF Viewer"
            />
          ) : (
            <img
              src={modalFile}
              alt="Document"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
        </div>
      )}
      <button className="back-button" onClick={closeModal}>Close</button>
    </div>
  </div>
)}

      </div>
    </section>
  );
};

export default DataControllerForPaymentBP;