import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ClientStyles.css';
import ClientSideBar from '../components/ClientSideBar';
import MapLocation from '../components/MapLocation';
import axios from 'axios';
import Select from 'react-select';


interface BusinessNatureOption {
  value: string;
  label: string;
}

const BusinessPermit: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isFormValid, setIsFormValid] = useState(true);
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
  //Step 2
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
  //Step 3
  const [dateestablished, setDateEstablished] = useState('');
  const [startdate, setStartDate] = useState('');
  const [occupancy, setOccupancy] = useState('');
  const [otherbusinesstype, setOtherBusinessType] = useState('');
  const [businessemail, setBusinessEmail] = useState('');
  const [businessarea, setBusinessArea] = useState('');
  const [businesslotarea, setBusinessLotArea] = useState('');
  const [numofworkermale, setNumofWorkerMale] = useState('');
  const [numofworkerfemale, setNumofWorkerFemale] = useState('');
  const [numofworkertotal, setNumofWorkerTotal] = useState(0);
  const [numofworkerlgu, setNumofWorkerLGU] = useState('');
  const [lessorfullname, setLessorFullName] = useState('');
  const [lessormobilenumber, setLessorMobileNumber] = useState('');
  const [monthlyrent, setMonthlyRent] = useState('');
  const [lessorfulladdress, setLessorFullAddress] = useState('');
  const [lessoremailaddress, setLessorEmailAddress] = useState('');
  //Step 4
  const [lat, setLat] = useState<number>(14.326248);
  const [lng, setLng] = useState<number>(120.935973);
  //Step 5

  //Step 6
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

  const logFormData = (formData: FormData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, doc: 'document1' | 'document2' | 'document3' | 'document4' | 'document5' | 'document6') => {
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



  const handleLocationChange = (latitude: number, longitude: number) => {
    setLat(latitude);
    setLng(longitude);
  };


 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    //Step 1
    formData.append('corporation', String(corporation));
    formData.append('lastname', lastname);
    formData.append('firstname', firstname);
    formData.append('middleinitial', middleinitial);
    formData.append('civilstatus', civilstatus);
    formData.append('companyname', companyname);
    formData.append('gender', gender);
    formData.append('citizenship', citizenship);
    formData.append('tinnumber', tinnumber);
    formData.append('representative', String(representative));
    formData.append('repfullname', repfullname);
    formData.append('repdesignation', repdesignation);
    formData.append('repmobilenumber', repmobilenumber);
    formData.append('houseandlot', houseandlot);
    formData.append('buildingstreetname', buildingstreetname);
    formData.append('subdivision', subdivision);
    formData.append('region', region);
    formData.append('province', province);
    formData.append('municipality', municipality);
    formData.append('barangay', barangay);
    formData.append('telephonenumber', telephonenumber);
    formData.append('mobilenumber', mobilenumber);
    formData.append('email', email);

    //Step 2
    formData.append('businessname', businessname);
    formData.append('businessscale', businessscale);
    formData.append('paymentmethod', paymentmethod);
    formData.append('businessbuildingblocklot', businessbuildingblocklot);
    formData.append('businessbuildingname', businessbuildingname);
    formData.append('businesssubcompname', businesssubcompname);
    formData.append('businessregion', businessregion);
    formData.append('businessprovince', businessprovince);
    formData.append('businessmunicipality', businessmunicipality);
    formData.append('businessbarangay', businessbarangay);
    formData.append('businesszip', businesszip);
    formData.append('businesscontactnumber', businesscontactnumber);
    formData.append('ownershiptype', ownershiptype);
    formData.append('agencyregistered', agencyregistered);
    formData.append('dtiregistrationnum', dtiregistrationnum);
    formData.append('dtiregistrationdate', dtiregistrationdate);
    formData.append('dtiregistrationexpdate', dtiregistrationexpdate);
    formData.append('secregistrationnum', secregistrationnum);
    formData.append('birregistrationnum', birregistrationnum);
    formData.append('industrysector', industrysector);
    formData.append('businessoperation', businessoperation);
    formData.append('typeofbusiness', typeofbusiness);
   
    //Step 3
    formData.append('dateestablished', dateestablished);
    formData.append('startdate', startdate);
    formData.append('occupancy', occupancy);
    formData.append('otherbusinesstype', otherbusinesstype);
    formData.append('businessemail', businessemail);
    formData.append('businessarea', businessarea);
    formData.append('businesslotarea', businesslotarea);
    formData.append('numofworkermale', numofworkermale);
    formData.append('numofworkerfemale', numofworkerfemale);
    formData.append('numofworkertotal', String(numofworkertotal));
    formData.append('numofworkerlgu', numofworkerlgu);
    formData.append('lessorfullname', lessorfullname);
    formData.append('lessormobilenumber', lessormobilenumber);
    formData.append('monthlyrent', monthlyrent);
    formData.append('lessorfulladdress', lessorfulladdress);
    formData.append('lessoremailaddress', lessoremailaddress);

    //Step 4
    formData.append('lat', String(lat));
    formData.append('lng', String(lng));
   
    //Step 5
    formData.append('newBusiness', JSON.stringify(newBusiness));
    formData.append('businesses', JSON.stringify(businesses));

    if (files.document1) formData.append('document1', files.document1);
    if (files.document2) formData.append('document2', files.document2);
    if (files.document3) formData.append('document3', files.document3);
    if (files.document4) formData.append('document4', files.document4);
    if (files.document5) formData.append('document5', files.document5);
    if (files.document6) formData.append('document6', files.document6);
    logFormData(formData);


    try {
      const response = await axios.post('http://localhost:3000/businesspermitpage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log(response.data);
      if (response.status === 200) {
        alert('Work Permit Application submitted successfully!');
        navigate('/dashboard');
      } else {
        const errorMessage = (response.data as { message: string }).message;
        console.error('Error submitting application:', errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const male = parseInt(e.target.value) || 0; // Convert to number or default to 0
    setNumofWorkerMale(e.target.value); // Update male workers
    setNumofWorkerTotal(male + (parseInt(numofworkerfemale) || 0)); // Update total
  };

  const handleFemaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const female = parseInt(e.target.value) || 0; // Convert to number or default to 0
    setNumofWorkerFemale(e.target.value); // Update female workers
    setNumofWorkerTotal((parseInt(numofworkermale) || 0) + female); // Update total
  };

  //Form Pages
  const goToNextStep = () => {
    // Perform validation based on the current step

    if (step === 1) {
      // Check if required fields are filled for step 1
      if (!firstname || !lastname) {
        setIsFormValid(false); // Set form as invalid
        return; // Prevent moving to the next step
      }
    }

    // Reset validity state if validation passes
    setIsFormValid(true);
    setStep(prevStep => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Example: clear session storage
    alert('You have been logged out.');
    navigate('/'); // Redirect to home or login page
  };
  //Form Pages End

  //Business Nature
  // Define type for newBusiness and businesses state
 const [newBusiness, setNewBusiness] = useState<{
  businessNature: string;
  businessType: string;
  capitalInvestment: string;
}>({
  businessNature: '',
  businessType: '',
  capitalInvestment: '',
});

// Define businesses state as an array of objects
const [businesses, setBusinesses] = useState<
  { businessNature: string; businessType: string; capitalInvestment: string }[]
>([]);

// Dropdown options (business nature)
const businessNatureOptions: BusinessNatureOption[] = [
  { value: 'BNK_IC', label: 'Bank - Other Financial Institutions - Investment Company' },
  { value: 'BNK_HIC', label: 'Bank - Holding Investment Company' },
  { value: 'BNK_BNK', label: 'Bank - Financial Institution - Bank' },
  { value: 'BNK_NBI', label: 'Bank - Other Financial Institution - Non-Bank Intermediary' },
  { value: 'BNK_LI', label: 'Bank - Other Financial Institution - Lending Investor' },
  { value: 'BNK_FIC', label: 'Bank - Other Financial Institution - Finance and Investments Company' },
  { value: 'BNK_MS', label: 'Bank - Other Financial Institution - Money Shop' },
  { value: 'BNK_ICO', label: 'Bank - Other Financial Institution - Insurance Company' },
  { value: 'BNK_SM', label: 'Bank - Other Financial Institution - Stock Market' },
  { value: 'BNK_SB', label: 'Bank - Other Financial Institution - Stock Broker' },
  { value: 'BNK_DSFE', label: 'Bank - Other Financial Institution - Dealer in Securities and Foreign Exchange' },
  { value: 'BNK_DAEP', label: 'Bank - Other Financial Institution - Dealer in Educational Plan Agencies, Health Plan Agencies, and Memoria' },
  { value: 'BNK_EPP', label: 'Bank - Other Financial Institution - Educational/Pension Plans' },
  { value: 'BNK_REM', label: 'Bank - Other Financial Institution - Remittance' },
  { value: 'BNK_CA', label: 'Bank - Other - Collection Agent' },
  { value: 'BNK_PSR', label: 'Bank - Other - Pawnshop / Remittance' },
  { value: 'BNK_FED', label: 'Bank - Other Financial Institution - Foreign Exchange Dealer' },
  { value: 'BNK_FE', label: 'Bank - Other - Remittance / Moneyshop / MC Foreign Exchange' },
  { value: 'BNK_ATM', label: 'Bank - Financial - ATM Machine' },
  { value: 'BNK_MC', label: 'Bank - Other - Money Transfer / Remittance / Money Changer' },
  { value: 'BNK_PSMC', label: 'Bank - Other - Pawnshop / Money Changer' },
  { value: 'BNK_IA', label: 'Bank - Other - Insurance Agency' },
  { value: 'CNT_DC', label: 'Contractor - Contractor - Dry-cleaning or dyeing establishment, steam laundries, and laundries using washing machines' },
  { value: 'CNT_BCS', label: 'Contractor - Contractor - Battery Charging Shop' },
  { value: 'CNT_BP', label: 'Contractor - Contractor - Beauty Parlor' },
  { value: 'CNT_BA', label: 'Contractor - Contractor - Business Agent' },
  { value: 'CNT_CFO', label: 'Contractor - Contractor - Cinematographic Film Owners, Lessors, and Distributors' },
  { value: 'CNT_IB', label: 'Contractor - Contractor - Immigration Brokers' },
  { value: 'CNT_CB', label: 'Contractor - Contractor - Commercial Brokers' },
  { value: 'CNT_EPL', label: 'Contractor - Contractor - Engraving, Plating, and Plastic Lamination Establishment' },
  { value: 'CNT_FDSW', label: 'Contractor - Contractor - Filling, Demolition, and Salvage Works Contractors' },
  { value: 'CNT_FP', label: 'Contractor - Contractor - Funeral Parlors' },
  { value: 'CNT_FS', label: 'Contractor - Contractor - Furniture Shops' },
  { value: 'CNT_GE', label: 'Contractor - Contractor - General Engineering, General Building, and Specialty Contractors' },
  { value: 'CNT_HSP', label: 'Contractor - Contractor - House and/or Sign Painters' },
  { value: 'CNT_MCS', label: 'Contractor - Contractor - Massage Clinics / Sauna, Turkish and Swedish Baths / SPA' },
  { value: 'CNT_MH', label: 'Contractor - Contractor - Milliners and Hatters' },
  { value: 'CNT_PL', label: 'Contractor - Contractor - Parking Lots or Establishments for Parking Purposes' },
  { value: 'CNT_WSP', label: 'Contractor - Contractor - Persons Engaged in the Installation of Water System and Gas or Electric Light, Heat or Power' },
  { value: 'CNT_PS', label: 'Contractor - Contractor - Photographic Studios' },
  { value: 'CNT_PBL', label: 'Contractor - Contractor - Printers, Bookbinders, Lithographers' },
  { value: 'CNT_PDWA', label: 'Contractor - Contractor - Private Detective or Watchman Agencies' },
  { value: 'CNT_DOCK', label: 'Contractor - Contractor - Proprietors or Operators of Dockyards' },
  { value: 'CNT_POH', label: 'Contractor - Contractor - Proprietors or Operators of Hotels, Motels, and Lodging Houses' },
  { value: 'CNT_MDA', label: 'Contractor - Contractor - Proprietors or Operators of Mine Drilling Apparatus' },
  { value: 'CNT_SMP', label: 'Contractor - Contractor - Proprietors or Operators of Smelting Plants' },
  { value: 'CNT_PUB', label: 'Contractor - Contractor - Publishers Except Those Engaged in the Publication of Any Newspaper, Magazines, Reviews' },
  { value: 'CNT_RCS', label: 'Contractor - Contractor - Recapping Shops' },
  { value: 'CNT_RMVHE', label: 'Contractor - Contractor - Repainting Shops of Motor Vehicles and Heavy Equipment' },
  { value: 'CNT_RPMH', label: 'Contractor - Contractor - Repair Shops of Motor Vehicle and Heavy Equipment' },
  { value: 'CNT_RPMED', label: 'Contractor - Contractor - Repair Shops for Any Kind of Mechanical and Electric Devices, Instruments, Apparatus or Equipment' },
  { value: 'CNT_SAW', label: 'Contractor - Contractor - Sawmills under Contract to Saw or Cut Logs Belonging to Others' },
  { value: 'CNT_SRS', label: 'Contractor - Contractor - Shoe Repair Shops' },
  { value: 'CNT_LPL', label: 'Contractor - Contractor - Shops for Planning or Surfacing and Recutting Lumber' },
  { value: 'CNT_SBCS', label: 'Contractor - Contractor - Slenderizing and Bodybuilding Saloons' },
  { value: 'CNT_SMH', label: 'Contractor - Contractor - Smiths (Blacksmith, Goldsmith, Keysmith, Locksmith, or Tinsmith)' },
  { value: 'CNT_TL', label: 'Contractor - Contractor - Tailor or Dress Shops, Modiste Shops, Haberdashery Shops' },
  { value: 'CNT_US', label: 'Contractor - Contractor - Upholstery Shop' },
  { value: 'CNT_VS', label: 'Contractor - Contractor - Vulcanizing Shop' },
  { value: 'CNT_WS', label: 'Contractor - Contractor - Warehousing or Forwarding Services' },
  { value: 'CNT_WGS', label: 'Contractor - Contractor - Washing or Greasing Shop / Change Oil' },
  { value: 'CNT_OSE', label: 'Contractor - Contractor - Other Similar Establishment' },
  { value: 'CNT_IRS', label: 'Contractor - Contractor - Ink Refilling Station' },
  { value: 'CNT_DIC', label: 'Contractor - Contractor - Diesel Calibration' },
  { value: 'CNT_TS', label: 'Contractor - Contractor - Transport Services' },
  { value: 'CNT_TTA', label: 'Contractor - Contractor - Travel and Tour Agency' },
  { value: 'CNT_EXH', label: 'Contractor - Contractor - Exhibitor' },
  { value: 'CNT_WLS', label: 'Contractor - Contractor - Waterwaste Laboratory Service' },
  { value: 'CNT_RHC', label: 'Contractor - Contractor - Rehabilitation Center' },
  { value: 'CNT_RF', label: 'Contractor - Contractor - Religious Foundations and Non-Government Organizations' },
  { value: 'CNT_CRG', label: 'Contractor - Contractor - Computer Rentals (With Games)' },
  { value: 'CNT_CRNG', label: 'Contractor - Contractor - Computer Rentals (No Games)' },
  { value: 'CNT_LS', label: 'Contractor - Contractor - Laundry Services' },
  { value: 'CNT_RSV', label: 'Contractor - Contractor - Repair Services' },
  { value: 'CNT_RSH', label: 'Contractor - Contractor - Repair Shop' },
  { value: 'CNT_DS', label: 'Contractor - Contractor - Dress Shop' },
  { value: 'CNT_TDS', label: 'Contractor - Contractor - Tailoring / Dress Shop' },
  { value: 'CNT_SGEN', label: 'Contractor - Contractor - Subcontractor / Gen. Engineering' },
  { value: 'CNT_GSS', label: 'Contractor - Contractor - Goldsmith / Silversmith' },
  { value: 'CNT_TCS', label: 'Contractor - Contractor - Telecommunication Services' },
  { value: 'CNT_BS', label: 'Contractor - Contractor - Barber Shop / Beauty Parlor' },
  { value: 'CNT_VR', label: 'Contractor - Contractor - Video Rental' },
  { value: 'CNT_EO', label: 'Contractor - Contractor - Exhibit Organizer' },
  { value: 'CNT_RAS', label: 'Contractor - Contractor - Ref Aircon Services' },
  { value: 'CNT_FPO', label: 'Contractor - Contractor - Funeral Parlors (Office Only)' },
  { value: 'CNT_CDP', label: 'Contractor - Contractor - Computer Desktop Publishing' },
  { value: 'CNT_SS', label: 'Contractor - Contractor - Sign Services' },
  { value: 'CNT_CBR', label: 'Contractor - Contractor - Custom Broker' },
  { value: 'CNT_PB', label: 'Contractor - Contractor - Publishers (Books)' },
  { value: 'CNT_RC', label: 'Contractor - Contractor - Review Center' },
  { value: 'CNT_ETC', label: 'Contractor - Contractor - Emission Testing Center' },
  { value: 'CNT_CCS', label: 'Contractor - Contractor - Child Care Services' },
  { value: 'CNT_DAS', label: 'Contractor - Contractor - Design and Ads Services' },
  { value: 'CNT_CDPG', label: 'Contractor - Contractor - Computer Design Programs' },
  { value: 'CNT_IC', label: 'Contractor - Contractor - Internet Connection' },
  { value: 'CNT_BB', label: 'Contractor - Contractor - Billboards' },
  { value: 'CNT_PRT', label: 'Contractor - Contractor - Printing Services' },
  { value: 'CNT_CC', label: 'Contractor - Contractor - Call Center' },
  { value: 'CNT_RP', label: 'Contractor - Contractor - Radio Production (Sponsorship)' },
  { value: 'CNT_WH', label: 'Contractor - Contractor - Warehouse' },
  { value: 'CNT_CS', label: 'Contractor - Contractor - Customer Services' },
  { value: 'CNT_REM', label: 'Contractor - Contractor - Remittance' },
  { value: 'CNT_MCPO', label: 'Contractor - Contractor - Medical Clinic (Office Only)' },
  { value: 'CNT_GBS', label: 'Contractor - Contractor - General Building and Specialty Contractor (Office Only)' },
  { value: 'CNT_RS', label: 'Contractor - Contractor - Recording Studio' },
  { value: 'CNT_SRO', label: 'Contractor - Contractor - Show Room Only' },
  { value: 'CNT_LRED', label: 'Contractor - Lessor - Real Estate Dealer' },
  { value: 'CNT_RED', label: 'Contractor - Contractor - Real Estate Dealer' },
  { value: 'CNT_PC', label: 'Contractor - Contractor - Powder Coating' },
  { value: 'CNT_GSP', label: 'Contractor - Contractor - Gen. Eng\'g, Gen. Bldg, and Specialty Contractor' },
  { value: 'CNT_TRC', label: 'Contractor - Contractor - Therapy and Rehabilitation Center' },
  { value: 'CNT_TSO', label: 'Contractor - Contractor - Transport Services / Office Only' },
  { value: 'CNT_GEI', label: 'Contractor - Contractor - General Engineering, General Building, and Specialty Contractor / Importer' },
  { value: 'CNT_MC', label: 'Contractor - Contractor - Massage Clinics / Sauna, Turkish and Swedish Baths / Gym' },
  { value: 'CNT_SA', label: 'Contractor - Contractor - Security Agency' },
  { value: 'CNT_WI', label: 'Contractor - Contractor - Warehouse / Importer' },
  { value: 'CNT_AS', label: 'Contractor - Contractor - Design and Artwork Services' },
  { value: 'CNT_CTS', label: 'Contractor - Contractor - Catering Services' },
  { value: 'CNT_REPS', label: 'Contractor - Contractor - Repainting Automotive Shop' },
  { value: 'CNT_CR', label: 'Contractor - Contractor - Crematory' },
  { value: 'CNT_WWTF', label: 'Contractor - Contractor - Water Waste Treatment Facility (Office Only)' },
  { value: 'CNT_TSW', label: 'Contractor - Contractor - Tailoring / Sportswear' },
  { value: 'CNT_EDAS', label: 'Contractor - Contractor - Engineering Designs / Autocad Services' },
  { value: 'CNT_ADS', label: 'Contractor - Contractor - Architectural Design Services' },
  { value: 'CNT_PTS', label: 'Contractor - Contractor - Painting Services' },
  { value: 'CNT_PHB', label: 'Contractor - Contractor - Photo Booth' },
  { value: 'CNT_WC', label: 'Contractor - Contractor - Wellness Clinic' },
  { value: 'CNT_ESS', label: 'Contractor - Contractor - Event Security Services' },
  { value: 'CNT_EC', label: 'Contractor - Contractor - Electrical Contractor' },
  { value: 'CNT_GBC', label: 'Contractor - Contractor - General Building and Specialty Contractor / LESSOR' },
  { value: 'CNT_MW', label: 'Contractor - Contractor - Mechanical Works' },
  { value: 'CNT_SWC', label: 'Contractor - Contractor - Subcontractor - Woodcraft' },
  { value: 'CNT_ARS', label: 'Contractor - Contractor - Aircon Services' },
  { value: 'CNT_REB', label: 'Contractor - Contractor - Real Estate Broker' },
  { value: 'CNT_MS', label: 'Contractor - Contractor - Massage Services' },
  { value: 'CNT_TTS', label: 'Contractor - Contractor - Tattoo Shop' },
  { value: 'CNT_TLS', label: 'Contractor - Contractor - Tailoring Shop' },
  { value: 'CNT_PH', label: 'Contractor - Contractor - Photography' },
  { value: 'CNT_TNS', label: 'Contractor - Contractor - Transport Services / Operator' },
  { value: 'CNT_GESC', label: 'Contractor - Contractor - Gen. Eng\'g, Gen. Bldg and Specialty Contractor / Importer' },
  { value: 'CNT_ARPS', label: 'Contractor - Other - Auto Repair / Body Paint Shop' },
  { value: 'CNT_RARS', label: 'Contractor - Contractor - Repainting Auto Repair Shop' },
  { value: 'CNT_C', label: 'Contractor - Other - Curtains' },
  { value: 'CNT_CBUP', label: 'Contractor - Contractor - Curtains, Beddings, Upholstery' },
  { value: 'CNT_CUS', label: 'Contractor - Other - Counseling Services' },
  { value: 'CNT_CCUS', label: 'Contractor - Contractor - Counseling Services' },
  { value: 'CNT_DPS', label: 'Contractor - Contractor - Digital Printing Services' },
  { value: 'CNT_VPC', label: 'Contractor - Contractor - Video Photo Coverage Services' },
  { value: 'CNT_GD', label: 'Contractor - Contractor - Graphic Design' },
  { value: 'CNT_GS', label: 'Contractor - Contractor - Gasoline Station (Office Only)' },
  { value: 'CNT_MHS', label: 'Contractor - Contractor - Machine Shop' },
  { value: 'CNT_MRI', label: 'Contractor - Contractor - MRI / Ultrasound' },
  { value: 'CNT_CPR', label: 'Contractor - Contractor - Cellphone Repair' },
  { value: 'CNT_CW', label: 'Contractor - Contractor - Carwash' },
  { value: 'CNT_TOBF', label: 'Contractor - Other Contractor - Ticketing Office / Bill Payment / Forwarding Services' },
  { value: 'CNT_CSW', label: 'Contractor - Contractor - Cold Storage Warehouse' },
  { value: 'CNT_GEMS', label: 'Contractor - Contractor - General Engineering and Specialty Contractor / Machine Shop' },
  { value: 'CNT_SCG', label: 'Contractor - Contractor - Subcontractor - Gloves' },
  { value: 'CNT_VSRA', label: 'Contractor - Contractor - Vulcanizing Shop / Repainting Automotive Shop' },
  { value: 'CNT_ES', label: 'Contractor - Contractor - Electronic Services' },
  { value: 'CNT_PNO', label: 'Contractor - Contractor - Publisher of Newspaper (Office Only)' },
  { value: 'CNT_CAD', label: 'Contractor - Contractor - Carwash Auto Detailing' },
  { value: 'CNT_LR', label: 'Contractor - Contractor - Lounge Rental' },
  { value: 'CNT_UPTS', label: 'Contractor - Contractor - Upholstery Shop / Tailoring Shop' },
  { value: 'CNT_STCR', label: 'Contractor - Contractor - Service Tables and Chairs Rental' },
  { value: 'CNT_REF', label: 'Contractor - Contractor - Referee' },
  { value: 'CNT_ES2', label: 'Contractor - Other - Electrical Services' },
  { value: 'CNT_PPUB', label: 'Contractor - Contractor - Printing Publishing' },
  { value: 'CNT_USDS', label: 'Contractor - Contractor - Upholstery Shop / Dress Shop' },
  { value: 'CNT_LSS', label: 'Contractor - Other - Land Surveying Services' },
  { value: 'CNT_PPS', label: 'Contractor - Contractor - Photography and Printing Services' },
  { value: 'CNT_FNS', label: 'Contractor - Contractor - Funeral Services' },
  { value: 'CNT_HF', label: 'Contractor - Contractor - Hauling / Forwarding' },
  { value: 'CNT_SHS', label: 'Contractor - Contractor - School Service' },
  { value: 'CNT_LO', label: 'Contractor - Contractor - Liaison Office' },
  { value: 'CNT_APO', label: 'Contractor - Contractor - Agricultural Products (Office Only)' },
  { value: 'CNT_WDS', label: 'Contractor - Contractor - Well-Drilling Services' },
  { value: 'CNT_FCF', label: 'Contractor - Contractor - Franchisor (Foodcart)' },
  { value: 'CNT_FPNE', label: 'Contractor - Contractor - Funeral Parlors (No Embalming)' },
  { value: 'CNT_CS2', label: 'Contractor - Contractor - Calibration Services' },
  { value: 'CNT_ID', label: 'Contractor - Contractor - Interior Design' },
  { value: 'CNT_CWH', label: 'Contractor - Contractor - Carwash (Home Service)' },
  { value: 'CNT_MKS', label: 'Contractor - Contractor - Marketing Services' },
  { value: 'CNT_ITR', label: 'Contractor - Contractor - IT Related Services' },
  { value: 'CNT_SD', label: 'Contractor - Contractor - Software Developer' },
  { value: 'CNT_AES', label: 'Contractor - Contractor - Aeronautical Engineering Services' },
  { value: 'CNT_CWCP', label: 'Contractor - Contractor - Carwash / Car Painting' },
  { value: 'CNT_RH', label: 'Contractor - Contractor - Retreat House' },
  { value: 'CNT_PO', label: 'Contractor - Contractor - Promotion Offices or Agencies, Promoters of Shows, Games or Performances' },
  { value: 'CNT_STF', label: 'Contractor - Contractor - Swab Testing Facility' },
  { value: 'CNT_BIP', label: 'Contractor - Contractor - Bills Payment' },
  { value: 'CNT_OS', label: 'Contractor - Contractor - Online Services' },
  { value: 'CNT_GLS', label: 'Contractor - Contractor - Galvanizing Services' },
  { value: 'CNT_ARP', label: 'Contractor - Contractor - Auto Repair Shop' },
  { value: 'CNT_RNTS', label: 'Contractor - Contractor - Rental Services' },
  { value: 'CNT_AC', label: 'Contractor - Contractor - Aesthetic Center' },
  { value: 'CNT_RLS', label: 'Contractor - Contractor - Rental of Lights and Sounds' },
  { value: 'CNT_PRDC', label: 'Contractor - Contractor - Production Company' },
  { value: 'CNT_BPV', label: 'Contractor - Contractor - Bills Payment (Vendo Machine)' },
  { value: 'CNT_PC2', label: 'Contractor - Contractor - Pediatric Clinic' },
  { value: 'CNT_EPIS', label: 'Contractor - Contractor - Electrical Plumbing Installation Services' },
  { value: 'CNT_CT', label: 'Contractor - Contractor Tax' },
  { value: 'CNT_CT2', label: 'Contractor - Contractor - Contractor Tax' },
  { value: 'CNT_GAS', label: 'Contractor - Gasoline Station - Contractor - Gasoline Station' },
  { value: 'CNT_GSRS', label: 'Contractor - Gasoline Station - Contractor - Gasoline Station / Repair Services' },
  { value: 'EXM_PEZA', label: 'Exempted - Exempted - Manufacturer of Plastic Product (PEZA)' },
  { value: 'EXM_RO', label: 'Exempted - Exempted - Religious Organization' },
  { value: 'EXM_CS', label: 'Exempted - Exempted - Clinic Services' },
  { value: 'EXM_LIC', label: 'Exempted - Exempted - Lying In Clinic (M.C. No. 2016-0170)' },
  { value: 'EXM_DOC', label: 'Exempted - Exempted - Dental and Optical Clinic' },
  { value: 'EXM_LPG', label: 'Exempted - Exempted - LPG' },
  { value: 'EXM_MC', label: 'Exempted - Exempted - Medical Clinic' },
  { value: 'EXM_MLC', label: 'Exempted - Exempted - Medical Clinic / Lying-In Clinic' },
  { value: 'EXM_DT', label: 'Exempted - Exempted - Drug Testing' },
  { value: 'EXM_SOC', label: 'Exempted - Exempted - Skin and Optical Clinic' },
  { value: 'EXM_MHC', label: 'Exempted - Exempted - Mental Health Clinic' },
  { value: 'EXM_ETR', label: 'Exempted - Exempted - Energy Transmission (R.A. 9511)' },
  { value: 'EXM_TC', label: 'Exempted - Exempted - Therapy Clinic' },
  { value: 'EXM_TCS', label: 'Exempted - Exempted - Telecommunication Services (Cell Site)' },
  { value: 'EXM_CT', label: 'Exempted - Exempted - Cooperative (Transport Services)' },
  { value: 'EXM_GS', label: 'Exempted - Exempted - Gasoline Station' },
  { value: 'EXM_DC', label: 'Exempted - Exempted - Dental Clinic' },
  { value: 'EXM_TS', label: 'Exempted - Exempted - Telecommunication Services' },
  { value: 'EXM_EA', label: 'Exempted - Exempted - Employment Agency (Cooperative)' },
  { value: 'EXM_BS', label: 'Exempted - Exempted - Bank Services' },
  { value: 'EXM_DIS', label: 'Exempted - Exempted - Digital Imaging Services (R.A. 7459)' },
  { value: 'EXM_EU', label: 'Exempted - Exempted - Electric Utility' },
  { value: 'EXM_EU71', label: 'Exempted - Exempted - Electric Utility (R.A. 7160 L.G.C. 1991)' },
  { value: 'EXM_RS', label: 'Exempted - Exempted - Repair Services' },
  { value: 'EXM_AS', label: 'Exempted - Exempted - Accounting Services' },
  { value: 'EXM_C', label: 'Exempted - Exempted - Cooperative' },
  { value: 'EXM_LO', label: 'Exempted - Exempted - Law Offices' },
  { value: 'EXM_MC2', label: 'Exempted - Exempted - Massage Clinic' },
  { value: 'EXM_RM', label: 'Exempted - Retailer - Reinforced Materials' },
  { value: 'EXM_RA74', label: 'Exempted - Exempted - R.A. 7459' },
  { value: 'EXM_OC', label: 'Exempted - Operator - Optical Clinic' },
  { value: 'EXM_OC2', label: 'Exempted - Exempted - Optical Clinic' },
  { value: 'EXM_WS', label: 'Exempted - Wholesaler - Surveying Office' },
  { value: 'EXM_SO', label: 'Exempted - Exempted - Surveying Office' },
  { value: 'EXM_SPEZ', label: 'Exempted - Exempted - Manufacture of Semi-Conductor Device (PEZA)' },
  { value: 'EXM_VC', label: 'Exempted - Exempted - Veterinary Clinic' },
  { value: 'EXM_COOP', label: 'Exempted - Cooperative - Exempted - Cooperative' },
  { value: 'LSS_SC', label: 'Lessor - Lessor - Shopping Center' },
  { value: 'LSS_FC', label: 'Lessor - Lessor - Food Court' },
  { value: 'LSS_CBW', label: 'Lessor - Lessor - Customs Bonded Warehouse' },
  { value: 'LSS_OOPM', label: 'Lessor - Lessor - Office Only / Private Owned Market' },
  { value: 'LSS_REA', label: 'Lessor - Lessor - Real Estate Including Apartments' },
  { value: 'LSS_O', label: 'Lessor - Lessor - Others' },
  { value: 'LSS_POM', label: 'Lessor - Lessor - Publicly Owned Market' },
  { value: 'LSS_PROM', label: 'Lessor - Lessor - Private Owned Market' },
  { value: 'LSS_OPRM', label: 'Lessor - Lessor - Others / Private Owned Market' },
  { value: 'LSS_L', label: 'Lessor - Lessor - Land Only' },
  { value: 'LSS_REB', label: 'Lessor - Lessor - Real Estate Including Building' },
  { value: 'LSS_BO', label: 'Lessor - Lessor - Building Only' },
  { value: 'LSS_DM', label: 'Lessor - Lessor - Dormitory' },
  { value: 'LSS_BH', label: 'Lessor - Lessor - Boarding House' },
  { value: 'LSS_SFR', label: 'Lessor - Lessor - Space for Rent' },
  { value: 'LSS_A', label: 'Lessor - Lessor - Apartment' },
  { value: 'LSS_STFR', label: 'Lessor - Lessor - Stall for Rent' },
  { value: 'MFR_BEDS', label: 'Manufacturer - Manufacturer - BEDS' },
  { value: 'MFR_SH', label: 'Manufacturer - Manufacturer - Shoes' },
  { value: 'MFR_DS', label: 'Manufacturer - Manufacturer - Distilled Spirits' },
  { value: 'MFR_AS', label: 'Manufacturer - Assembler - Sample' },
  { value: 'MFR_ACOM', label: 'Manufacturer - Assembler - Computer' },
  { value: 'MFR_ABED', label: 'Manufacturer - Assembler - Beds' },
  { value: 'MFR_MFRX', label: 'Manufacturer - Manufacturer - X' },
  { value: 'MFR_AWNE', label: 'Manufacturer - Assembler - Wine' },
  { value: 'MFR_MFRP', label: 'Manufacturer - Manufacturer - Repackers' },
  { value: 'MFR_RPKR', label: 'Manufacturer - Repacker' },
  { value: 'MFR_PDS', label: 'Manufacturer - Processor - Distilled Spirits' },
  { value: 'MFR_DDS', label: 'Manufacturer - Distiller - Distilled Spirit' },
  { value: 'MFR_RCDS', label: 'Manufacturer - Rectifier and/or Compounder - Distilled Spirits' },
  { value: 'MFR_RLIQ', label: 'Manufacturer - Rectifier and/or Compounder - Liquors' },
  { value: 'MFR_RWNE', label: 'Manufacturer - Rectifier and/or Compounder - Wine' },
  { value: 'MFR_RCCC', label: 'Manufacturer - Rectifier and/or Compounder - CC' },
  { value: 'MFR_RPX', label: 'Manufacturer - Repacker - X' },
  { value: 'MFR_R', label: 'Manufacturer - R' },
  { value: 'MFR_RCA', label: 'Manufacturer - Rectifier and/or Compounder - A' },
  { value: 'MFR_MNEC', label: 'Manufacturer - Manufacturer - Non-Essential Commodities' },
  { value: 'MFR_MWNE', label: 'Manufacturer - Manufacturer - Wine' },
  { value: 'MFR_DLIQ', label: 'Manufacturer - Distiller - Liquors' },
  { value: 'MFR_DWNE', label: 'Manufacturer - Distiller - Wine' },
  { value: 'MFR_PLIQ', label: 'Manufacturer - Processor - Liquors' },
  { value: 'MFR_PWNE', label: 'Manufacturer - Processor - Wine' },
  { value: 'MFR_BLIQ', label: 'Manufacturer - Brewer - Liquors' },
  { value: 'MFR_ASDS', label: 'Manufacturer - Assembler - Distilled Spirit' },
  { value: 'MFR_ALIQ', label: 'Manufacturer - Assembler - Liquors' },
  { value: 'MFR_AASS', label: 'Manufacturer - Assembler - Assembler' },
  { value: 'MFR_PNEC', label: 'Manufacturer - Processor - Non-Essential Commodities' },
  { value: 'MFR_PEC', label: 'Manufacturer - Processor - Essential Commodities' },
  { value: 'MFR_AFAB', label: 'Manufacturer - Assembler - Fabricator/Importer' },
  { value: 'MFR_PWRS', label: 'Manufacturer - Processor - Water Refilling Station' },
  { value: 'MFR_MPC', label: 'Manufacturer - Manufacturer - Plastic Container' },
  { value: 'MFR_MFR', label: 'Manufacturer - Manufacturer - Manufacturer' },
  { value: 'MFR_MHB', label: 'Manufacturer - Manufacturer - Hollow Blocks' },
  { value: 'MFR_MFT', label: 'Manufacturer - Manufacturer - Furniture' },
  { value: 'MFR_MSH', label: 'Manufacturer - Manufacturer - Sash' },
  { value: 'MFR_MOF', label: 'Manufacturer - Manufacturer - Manufacturer (Office Only)' },
  { value: 'MFR_MSC', label: 'Manufacturer - Manufacturer - Shell Craft' },
  { value: 'MFR_MHD', label: 'Manufacturer - Manufacturer - Handicrafts' },
  { value: 'MFR_MMC', label: 'Manufacturer - Manufacturer - Molding of Plastic Products' },
  { value: 'MFR_MMP', label: 'Manufacturer - Manufacturer - (Moldings) of Plastic Products' },
  { value: 'MFR_MIM', label: 'Manufacturer - Manufacturer - Manufacturer/Importer' },
  { value: 'MFR_MMIM', label: 'Manufacturer - Manufacturer - Manufacturer / Importer' },
  { value: 'MFR_AFB', label: 'Manufacturer - Assembler - Fabricator' },
  { value: 'MFR_PL', label: 'Manufacturer - Manufacturer - Plastic and Metal' },
  { value: 'MFR_MEXI', label: 'Manufacturer - Manufacturer - Manufacturer/Exporter/Importer' },
  { value: 'MFR_MI', label: 'Manufacturer - Manufacturer - Manufacturer - Ice' },
  { value: 'MFR_PKM', label: 'Manufacturer - Manufacturer - Packaging Materials' },
  { value: 'MFR_INSP', label: 'Manufacturer - Manufacturer - Insulating Panel' },
  { value: 'MFR_MPP', label: 'Manufacturer - Manufacturer - (Moldings) of Plastic Products / Importer' },
  { value: 'MFR_IP', label: 'Manufacturer - Manufacturer - Ice Plant' },
  { value: 'MFR_CHIC', label: 'Manufacturer - Manufacturer - Chicharon' },
  { value: 'MFR_MRUG', label: 'Manufacturer - Manufacturer - Rug' },
  { value: 'MFR_MPB', label: 'Manufacturer - Manufacturer - Peanut Butter' },
  { value: 'MFR_MEP', label: 'Manufacturer - Manufacturer - Electronic Parts' },
  { value: 'MFR_APFC', label: 'Manufacturer - Assembler - Pre-Fabricated Housing Components' },
  { value: 'MFR_MASP', label: 'Manufacturer - Manufacturer - Asphalt' },
  { value: 'MFR_MPLP', label: 'Manufacturer - Manufacturer - Polypropylene Plastic' },
  { value: 'MFR_MFLG', label: 'Manufacturer - Manufacturer - Flags' },
  { value: 'MFR_MPCB', label: 'Manufacturer - Manufacturer - Precast Wall Concrete Blocks' },
  { value: 'MFR_MSF', label: 'Manufacturer - Manufacturer - Sash and Furniture' },
  { value: 'MFR_AFO', label: 'Manufacturer - Assembler - Fabricator (Office Only)' },
  { value: 'MFR_COS', label: 'Manufacturer - Manufacturer - Cosmetics Products' },
  { value: 'MFR_IMP', label: 'Manufacturer - Manufacturer - Importer' },
  { value: 'MFR_PVC', label: 'Manufacturer - Manufacturer - PVC Pipes' },
  { value: 'MFR_FT', label: 'Manufacturer - Manufacturer - Footwear' },
  { value: 'MFR_SMK', label: 'Manufacturer - Processor - Smoke Fish' },
  { value: 'MFR_SMKD', label: 'Manufacturer - Processor - Smoked Fish' },
  { value: 'MFR_EMP', label: 'Manufacturer - Manufacturer - Empanada' },
  { value: 'MFR_CASK', label: 'Manufacturer - Manufacturer - Casket' },
  { value: 'MFR_PALL', label: 'Manufacturer - Pallets' },
  { value: 'MFR_COND', label: 'Manufacturer - Manufacturer - Condiments' },
  { value: 'MFR_NUTS', label: 'Manufacturer - Manufacturer - Nuts' },
  { value: 'MFR_MCRT', label: 'Manufacturer - Manufacturer - Curtains' },
  { value: 'MFR_MEGR', label: 'Manufacturer - Manufacturer - Manufacturer / Exporter / Garments' },
  { value: 'MFR_MGR', label: 'Manufacturer - Manufacturer - Garments' },
  { value: 'MFR_AIMP', label: 'Manufacturer - Assembler / Manufacturer - Importer' },
  { value: 'MFR_CASC', label: 'Manufacturer - Manufacturer - Cassava Cake' },
  { value: 'MFR_OPP', label: 'Manufacturer - Other Contractor – Printer & Publishing' },
  { value: 'MFR_RAG', label: 'Manufacturer - Manufacturer - Rags' },
  { value: 'MFR_PROP', label: 'Manufacturer - Manufacturer - Propeller' },
  { value: 'MFR_BPL', label: 'Manufacturer - Manufacturer - Batching Plant' },
  { value: 'MFR_GRV', label: 'Manufacturer - Manufacturer - Gravestone/Lapida' },
  { value: 'MFR_SIO', label: 'Manufacturer - Manufacturer - Siomai Siopao' },
  { value: 'MFR_MDC', label: 'Manufacturer - Manufacturer - Disposable Plastic Cup' },
  { value: 'MFR_MBP', label: 'Manufacturer - Manufacturer - Beauty Products' },
  { value: 'MFR_FC', label: 'Manufacturer - Manufacturer - Foodcart' },
  { value: 'MFR_CAND', label: 'Manufacturer - Manufacturer - Candle' },
  { value: 'MFR_ETR', label: 'Manufacturer - Manufacturer - E-Trike' },
  { value: 'MFR_DPI', label: 'Manufacturer - Manufacturer - Door Panel Importer/Exporter' },
  { value: 'MFR_POLV', label: 'Manufacturer - Manufacturer - Polvoron' },
  { value: 'MFR_CNP', label: 'Manufacturer - Manufacturer - Concrete Pipe' },
  { value: 'MFR_SOAP', label: 'Manufacturer - Manufacturer - Soap (Office Only)' },
  { value: 'MFR_MODU', label: 'Manufacturer - Manufacturer - Modular Cabinet' },
  { value: 'MFR_INSU', label: 'Manufacturer - Insulation Products' },
  { value: 'MFR_FIRE', label: 'Manufacturer - Manufacturer - Fire Extinguisher' },
  { value: 'MFR_LEAT', label: 'Manufacturer - Manufacturer - Leather Bags' },
  { value: 'MFR_DOGT', label: 'Manufacturer - Manufacturer - Dog Treats' },
  { value: 'MFR_LANT', label: 'Manufacturer - Manufacturer - Lantern' },
  { value: 'MFR_VETD', label: 'Manufacturer - Manufacturer - Veterinary Drugs and Products, Feed Additives, and Supplements' },
  { value: 'MFR_PROS', label: 'Manufacturer - Manufacturer - Prosthetic Body Parts' },
  { value: 'MFR_SCRU', label: 'Manufacturer - Assembler - Scrubbing Pad' },
  { value: 'MFR_NONC', label: 'Manufacturer - Manufacturer - Non-Essential Commodities / Importer' },
  { value: 'MFR_OFFI', label: 'Manufacturer - Manufacturer - Manufacturer (Office Only) / Importer' },
  { value: 'MFR_CDM', label: 'Manufacturer - Repacker - Condiments' },
  { value: 'MFR_PINO', label: 'Manufacturer - Manufacturer - Pinoy Delicacies' },
  { value: 'MFR_HERB', label: 'Manufacturer / Producer - Manufacturer - Herbal Products' },
  { value: 'MFR_CHAR', label: 'Manufacturer / Producer - Manufacturer - Charcoal' },
  { value: 'MFR_TOKW', label: 'Manufacturer / Producer - Manufacturer - Tokwa' },
  { value: 'MFR_ESSE', label: 'Manufacturer / Producer - Producer - Essential Commodities (Office Only)' },
  { value: 'MFR_GASI', label: 'Manufacturer / Producer - Manufacturer - Import / Export Industrial Gas' },
  { value: 'MFR_RM', label: 'Manufacturer / Producer - Rice Mill - Office Only' },
  { value: 'MFR_SUGA', label: 'Manufacturer / Producer - Producer - Sugarcane Farm' },
  { value: 'MFR_ICEC', label: 'Manufacturer / Producer - Manufacturer - Ice Cream' },
  { value: 'MFR_LAUN', label: 'Manufacturer / Producer - Manufacturer - Laundry Soap' },
  { value: 'MFR_DETE', label: 'Manufacturer / Producer - Manufacturer - Detergents' },
  { value: 'MFR_MEDI', label: 'Manufacturer / Producer - Manufacturer / Repacker - Medicines' },
  { value: 'MFR_ERC', label: 'Manufacturer / Producer - Exporter - Rice and Corn' },
  { value: 'MFR_EWH', label: 'Manufacturer / Producer - Exporter - Wheat or Cassava Flour' },
  { value: 'MFR_COOK', label: 'Manufacturer / Producer - Manufacturer - Cooking Oil' },
  { value: 'MFR_RWH', label: 'Manufacturer / Producer - Repacker - Wheat or Cassava Flour' },
  { value: 'MFR_WHET', label: 'Manufacturer / Producer - Miller - Wheat' },
  { value: 'MFR_RICE', label: 'Manufacturer / Producer - Repacker - Rice and Corn' },
  { value: 'MFR_MEAT', label: 'Manufacturer / Producer - Exporter - Meat' },
  { value: 'MFR_PF', label: 'Manufacturer / Producer - Manufacturer - Poultry Feeds and Other Animal Feeds' },
  { value: 'MFR_SCHL', label: 'Manufacturer / Producer - Manufacturer - School Supplies' },
  { value: 'MFR_CEMT', label: 'Manufacturer / Producer - Manufacturer - Cement' },
  { value: 'MFR_LPG', label: 'Manufacturer / Producer - Manufacturer - LPG' },
  { value: 'MFR_PROF', label: 'Manufacturer / Producer - Repacker - Processed or Preserved Food' },
  { value: 'MFR_MILL', label: 'Manufacturer / Producer - Miller - Rice and Corn' },
  { value: 'MFR_PROC', label: 'Manufacturer / Producer - Manufacturer - Processed or Preserved Foods' },
  { value: 'MFR_SALT', label: 'Manufacturer / Producer - Manufacturer - Salt' },
  { value: 'MFR_SUGR', label: 'Manufacturer / Producer - Manufacturer - Sugar' },
  { value: 'MFR_EXSG', label: 'Manufacturer / Producer - Exporter - Sugar' },
  { value: 'MFR_AGRI', label: 'Manufacturer / Producer - Exporter - Agricultural, Marine, and Freshwater Products' },
  { value: 'MFR_ELS', label: 'Manufacturer / Producer - Exporter - Laundry Soap' },
  { value: 'MFR_DETR', label: 'Manufacturer / Producer - Exporter - Detergents' },
  { value: 'MFR_MEDC', label: 'Manufacturer / Producer - Exporter - Medicine' },
  { value: 'MFR_EXCT', label: 'Manufacturer / Producer - Exporter - Cement' },
  { value: 'MFR_DAIR', label: 'Manufacturer / Producer - Exporter - Dairy Products' },
  { value: 'MFR_EMET', label: 'Manufacturer / Producer - Exporter - Meat' },
  { value: 'MFR_FEED', label: 'Manufacturer / Producer - Exporter - Poultry Feeds and Other Animal Feeds' },
  { value: 'MFR_COKO', label: 'Manufacturer / Producer - Exporter - Cooking Oil' },
  { value: 'MFR_AGIM', label: 'Manufacturer / Producer - Manufacturer - Agricultural Implements, Equipment, and Post-Harvest Facilities' },
  { value: 'MFR_FERT', label: 'Manufacturer / Producer - Manufacturer - Fertilizers' },
  { value: 'MFR_PEST', label: 'Manufacturer / Producer - Manufacturer - Pesticides, Insecticides' },
  { value: 'MFR_RCRN', label: 'Manufacturer / Producer - Repackers - Rice and Corn' },
  { value: 'MFR_WFLO', label: 'Manufacturer / Producer - Repackers - Wheat or Cassava Flour' },
  { value: 'MFR_RSUG', label: 'Manufacturer / Producer - Repacker - Sugar' },
  { value: 'MFR_RSAL', label: 'Manufacturer / Producer - Repacker - Salt' },
  { value: 'MFR_RCOK', label: 'Manufacturer / Producer - Repacker - Cooking Oil' },
  { value: 'MFR_RDET', label: 'Manufacturer / Producer - Repacker - Detergents' },
  { value: 'MFR_RPST', label: 'Manufacturer / Producer - Repacker - Pesticides' },
  { value: 'MFR_RFRT', label: 'Manufacturer / Producer - Repacker - Fertilizers' },
  { value: 'MFR_RINS', label: 'Manufacturer / Producer - Repacker - Insecticides' },
  { value: 'MFR_RFED', label: 'Manufacturer / Producer - Repacker - Poultry Feeds and Other Animal Feeds' },
  { value: 'MFR_EXES', label: 'Manufacturer / Producer - Exporter - Other Essential Commodities' },
  { value: 'MFR_ECMP', label: 'Manufacturer / Producer - Producer - Essential Commodities' },
  { value: 'MFR_MXES', label: 'Manufacturer / Producer - Manufacturer / Exporter - Essential Commodities' },
  { value: 'MFR_ESEN', label: 'Manufacturer / Producer - Manufacturer - Essential Commodities' },
  { value: 'MFR_MRCE', label: 'Manufacturer / Producer - Miller - Rice Mill' },
  { value: 'MFR_EXNS', label: 'Manufacturer / Producer - Exporter - Non-Essential Commodities' },
  { value: 'MFR_RJMC', label: 'Manufacturer / Producer - Repacker - Janitorial Maintenance Chemicals' },
  { value: 'MFR_PSP', label: 'Manufacturer / Producer - Manufacturer - Soap' },
  { value: 'MFR_RNES', label: 'Manufacturer / Producer - Repacker - Non-Essential Commodities' },
  { value: 'MFR_TAHO', label: 'Manufacturer / Producer - Manufacturer - TAHO' },
  { value: 'MFR_DONT', label: 'Manufacturer / Producer - Manufacturer - Donut' },
  { value: 'MFR_SIOP', label: 'Manufacturer / Producer - Manufacturer - Siopao' },
  { value: 'MFR_JUCS', label: 'Manufacturer / Producer - Manufacturer - Juices' },
  { value: 'MFR_PUTO', label: 'Manufacturer / Producer - Manufacturer - Puto' },
  { value: 'MFR_LWRP', label: 'Manufacturer / Producer - Manufacturer - Lumpia Wrapper' },
  { value: 'MFR_FPWD', label: 'Manufacturer / Producer - Manufacturer - Foot Powder' },
  { value: 'MILL_OMRC', label: 'Millers - Other Than Rice and Corn - Miller - Other Commodities Other Than Rice and Corn' },
  { value: 'MILL_CFGR', label: 'Millers - Other Than Rice and Corn - Operator - Coffee Grinder' },
  { value: 'MILL_COGR', label: 'Millers - Other Than Rice and Corn - Operator - Coconut Grinder' },
  { value: 'MILL_MTGR', label: 'Millers - Other Than Rice and Corn - Operator - Meat Grinder' },
  { value: 'NSNP_PVSC', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private School' },
  { value: 'NSNP_FNDN', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Foundation' },
  { value: 'NSNP_PVHS', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Hospital' },
  { value: 'NSNP_FIVT', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Filipino Inventor' },
  { value: 'NSNP_FRAN', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Franchise Holder' },
  { value: 'NSNP_NGO', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Non-Government Organization (NGO)' },
  { value: 'NSNP_RELG', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Religious Organization' },
  { value: 'NSNP_RENO', label: 'Non-Stock/Non-Profit - No - Religious Organization' },
  { value: 'NSNP_MSCL', label: 'Non-Stock/Non-Profit - No - Massage Clinic' },
  { value: 'NSNP_NSP', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit' },
  { value: 'NSNP_MSCA', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Music Composition/Musical Arrangement' },
  { value: 'NSNP_PRHS', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Hospital and Private School' },
  { value: 'NSNP_TRSC', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Training School' },
  { value: 'NSNP_PHIM', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Hospital / Importer' },
  { value: 'NSNP_FDIM', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Foundation / Importer' },
  { value: 'NSNP_PVMT', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Market' },
  { value: 'NSNP_HOA', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Home Owners Association' },
  { value: 'NSNP_PHAR', label: 'Non-Stock/Non-Profit - Pharmacy' },
  { value: 'NSNP_TSVS', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Transport Services' },
  { value: 'NSNP_ASSOC', label: 'Non-Stock/Non-Profit - Non-Stock/Non-Profit - Association' },
  { value: 'OPR_OBNG', label: 'Operator - Amusement Places - Operator - Bingo / Office Only' },
  { value: 'OPR_OTBS', label: 'Operator - Amusement Places - Operator - Off Track Betting Station' },
  { value: 'OPR_STL', label: 'Operator - Amusement Places - Operator - Small Town Lottery (STL)' },
  { value: 'OPR_CRST', label: 'Operator - Amusement Places - Operator - Cafe and Restobar' },
  { value: 'OPR_EVT', label: 'Operator - Amusement Places - Operator - Events Place' },
  { value: 'OPR_ECAS', label: 'Operator - Amusement Places - Operator - E-Casino Games' },
  { value: 'OPR_BARS', label: 'Operator - Amusement Places - Operator - Bar or Cocktail Lounge including "beer gardens", "beerhouses", "disco pub", "pub house"' },
  { value: 'OPR_SPRT', label: 'Operator - Amusement Places - Operator - Boxing Stadium, Sports Arena or Similar Establishments; Sports Contest Promoters' },
  { value: 'OPR_BILL', label: 'Operator - Amusement Places - Operator - Billiard or Pool Hall' },
  { value: 'OPR_BOWL', label: 'Operator - Amusement Places - Operator - Bowling Center' },
  { value: 'OPR_DNHL', label: 'Operator - Amusement Places - Operator - Cabaret or Dance Hall, Dance Studio/Dancing Schools' },
  { value: 'OPR_CIRC', label: 'Operator - Amusement Places - Operator - Circuses, Carnival, Merry-Go-Round, Roller Coaster, Ferris Wheel, Swings, Shooting Gallery' },
  { value: 'OPR_DCLB', label: 'Operator - Amusement Places - Operator - Day Club and Night Club' },
  { value: 'OPR_GOLF', label: 'Operator - Amusement Places - Operator - Golf Links' },
  { value: 'OPR_PELT', label: 'Operator - Amusement Places - Operator - Pelota Court for-a-fee' },
  { value: 'OPR_RACE', label: 'Operator - Amusement Places - Operator - Race Track for-a-fee' },
  { value: 'OPR_RSRT', label: 'Operator - Amusement Places - Operator - Resorts (Inland Resorts)' },
  { value: 'OPR_SKAT', label: 'Operator - Amusement Places - Operator - Skating Rink for-a-fee' },
  { value: 'OPR_SWIM', label: 'Operator - Amusement Places - Operator - Swimming Pool or Bathhouses for-a-fee' },
  { value: 'OPR_TENN', label: 'Operator - Amusement Places - Operator - Tennis Court for-a-fee' },
  { value: 'OPR_OTHR', label: 'Operator - Amusement Places - Operator - Other Similar Establishment or Amusement Places' },
  { value: 'OPR_BNG', label: 'Operator - Amusement Places - Operator - Bingo' },
  { value: 'OPR_LOTO', label: 'Operator - Amusement Places - Operator - Lotto Outlet' },
  { value: 'OPR_KTV', label: 'Operator - Amusement Places - Operator - KTV Bar' },
  { value: 'OPR_VIDE', label: 'Operator - Amusement Places - Proprietor - Videoke Bar' },
  { value: 'OPR_VKB', label: 'Operator - Amusement Places - Operator - Videoke Bar' },
  { value: 'OPR_MSTU', label: 'Operator - Amusement Places - Operator - Music Studio' },
  { value: 'OPR_KTVB', label: 'Operator - Amusement Places - Operator - KTV Bar/Billiard Hall' },
  { value: 'OPR_EBGO', label: 'Operator - Amusement Places - Operator - Bingo / Electronic Bingo' },
  { value: 'OPR_BARR', label: 'Operator - Amusement Places - Operator - Bar and Restaurant' },
  { value: 'OPR_TBLT', label: 'Operator - Amusement Places - Operator - Table Tennis for-a-fee' },
  { value: 'OPR_EVID', label: 'Operator - Amusement Places - Operator - Eatery with Videoke' },
  { value: 'OPR_FIRE', label: 'Operator - Amusement Places - Operator - Firing Range' },
  { value: 'OPR_BHOU', label: 'Operator - Boarding House - Operator - Boarding Houses' },
  { value: 'OPR_DORM', label: 'Operator - Boarding House - Lessor - Operator - Dormitories' },
  { value: 'OPR_CKPT', label: 'Operator - Cockpit - Operator - Cockpit' },
  { value: 'OPR_PRMT', label: 'Operator - Cockpit - Promoter - Ordinary Operator' },
  { value: 'OPR_PNTS', label: 'Operator - Cockpit - Promoter - Pintakasi / Concierto' },
  { value: 'OPR_TSLB', label: 'Operator - Cockpit - Operator - Telesabong' },
  { value: 'OPR_GLNK', label: 'Operator - Golf Links - Operator - Golf Links' },
  { value: 'OPR_CEME', label: 'Operator - Private Cemeteries - Private Cemeteries / Memorial Parks' },
  { value: 'OPR_MKET', label: 'Operator - Privately Owned Market - Privately Owned Public Market' },
  { value: 'OPR_CAFE', label: 'Operator - Restaurant - Cafe - Cafe' },
  { value: 'OPR_CFTR', label: 'Operator - Restaurant - Cafeteria - Cafeteria' },
  { value: 'OPR_ICRM', label: 'Operator - Restaurant - Ice Cream - Ice Cream and Other Refreshment Operator' },
  { value: 'OPR_REST', label: 'Operator - Restaurant - Restaurant - Restaurant Operator' },
  { value: 'OPR_CARN', label: 'Operator - Restaurant - Carinderia - Carinderia' },
  { value: 'OPR_PNCT', label: 'Operator - Restaurant - Panciteria - Panciteria' },
  { value: 'OPR_SODA', label: 'Operator - Restaurant - Soda Fountain Bar - Soda Fountain Bar' },
  { value: 'OPR_CATR', label: 'Operator - Restaurant - Food Caterer - Food Caterer' },
  { value: 'OPR_SEST', label: 'Operator - Restaurant - Similar Establishment' },
  { value: 'OPR_CNTN', label: 'Operator - Restaurant - Similar Establishment - Canteen' },
  { value: 'OPR_EATR', label: 'Operator - Restaurant - Similar Establishment - Eatery' },
  { value: 'OPR_FFOD', label: 'Operator - Restaurant - Similar Establishment - Fastfood' },
  { value: 'OPR_FSTD', label: 'Operator - Restaurant - Similar Establishment - Foodstand' },
  { value: 'OPR_CFSH', label: 'Operator - Restaurant - Cafeteria - Coffee Shop' },
  { value: 'OPR_FCTO', label: 'Operator - Restaurant - Food - Food Caterer (Office Only)' },
  { value: 'OPR_RTOF', label: 'Operator - Restaurant - Restaurant - Office Only' },
  { value: 'OPR_FBVO', label: 'Operator - Restaurant - Similar - Food Beverage (Office Only)' },
  { value: 'OPR_GRIL', label: 'Operator - Restaurant - Restaurant - Grille' },
  { value: 'OPR_GRLL', label: 'Operator - Restaurant - Restaurant - Grill' },
  { value: 'OPR_TEAH', label: 'Operator - Restaurant - Similar - Tea House' },
  { value: 'OPR_RFRT', label: 'Operator - Restaurant - Restaurant - Refreshment' },
  { value: 'OPR_CFTS', label: 'Operator - Restaurant - Cafeteria - Coffee and Tea Shop' },
  { value: 'OPR_FBVG', label: 'Operator - Restaurant - Restaurant - Food Beverage' },
  { value: 'OPR_SUBD', label: 'Operator - Subdivision - Subdivision Operator - Subdivision Operator' },
  { value: 'OPR_RESD', label: 'Operator - Subdivision - Real Estate Developer - Real Estate Developer' },
  { value: 'OPR_ROFF', label: 'Operator - Subdivision - Real Estate Developer (Office Only)' },
  { value: 'OPR_THTR', label: 'Operator - Theaters - Operator - Theater Operator' },
  { value: 'OPR_CINE', label: 'Operator - Theaters - Operator - Cinemahouse' },
  { value: 'OPR_VMHS', label: 'Operator - Theaters - Operator - Video-Movie House Utilizing BETA, VHS, JVC, Laser Disc Player, or Similar Apparatus' },
  { value: 'OPR_SHWH', label: 'Operator - Theaters - Operator - Showhouse Open to the Public for-a-fee' },
  { value: 'OPR_TLSB', label: 'Operator - Theaters - Operator - Telesabong' },
  { value: 'OPR_OLBS', label: 'Operator - Theaters - Operator - On-Line Betting Station' },
  { value: 'OTC_ACCT', label: 'Other Contractor - Other Contractor - Accounting Firms or Offices Rendering Accounting or Bookkeeping Services' },
  { value: 'OTC_ACTR', label: 'Other Contractor - Other Contractor - Actuarial or Appraisal Offices' },
  { value: 'OTC_ADAG', label: 'Other Contractor – Other Contractor - Advertising Agencies' },
  { value: 'OTC_BBKS', label: 'Other Contractor - Other Contractor - Belt and Buckle Shops' },
  { value: 'OTC_BROK', label: 'Other Contractor - Other Contractor - Brokering Offices (Real Brokers, Custom Brokers, and Similar Ones)' },
  { value: 'OTC_BSMN', label: 'Other Contractor - Other Contractor - Business Management Firms/Offices' },
  { value: 'OTC_CRPN', label: 'Other Contractor - Other Contractor - Carpentry Shops' },
  { value: 'OTC_COMM', label: 'Other Contractor - Other Contractor - Communications or Wire Services (Radio, Telegraph, Telefax, etc.)' },
  { value: 'OTC_REPR', label: 'Other Contractor - Other Contractor - Computer or Electronic Repair Centers or Shops' },
  { value: 'OTC_CNST', label: 'Other Contractor - Other Contractor - Consultancy Firms/Offices' },
  { value: 'OTC_DFAS', label: 'Other Contractor - Other Contractor - Drafting or Fine Arts Shops, Painting or Sign Shops' },
  { value: 'OTC_EMPL', label: 'Other Contractor - Other Contractor - Employment Agencies' },
  { value: 'OTC_ENGR', label: 'Other Contractor - Other Contractor - Engineering Offices Rendering Services on Architectural, Civic, Chemical, Electric' },
  { value: 'OTC_FLOW', label: 'Other Contractor - Other Contractor - Flower Shops Not Engaged in Wholesale or Retail but Rendering Services Upon Order' },
  { value: 'OTC_FRGT', label: 'Other Contractor - Other Contractor - Freight Services, Trucking Services' },
  { value: 'OTC_PAWS', label: 'Other Contractor - Other Contractor - House Painting Shops/House Wiring Shops' },
  { value: 'OTC_ICEC', label: 'Other Contractor - Other Contractor - Ice and Cold Storage for-a-fee' },
  { value: 'OTC_INDR', label: 'Other Contractor - Other Contractor - Interior Decoration Offices or Shops' },
  { value: 'OTC_JKGY', label: 'Other Contractor - Other Contractor - Judo-Karate Gyms for-a-fee' },
  { value: 'OTC_LDSP', label: 'Other Contractor - Other Contractor - Landscaping Contracting Offices or Shops' },
  { value: 'OTC_LTHM', label: 'Other Contractor - Other Contractor - Lathe Machine Shops' },
  { value: 'OTC_LAWF', label: 'Other Contractor - Other Contractor - Law Offices Rendering Legal or Notarial Services' },
  { value: 'OTC_CLNC', label: 'Other Contractor - Other Contractor - Medical Clinics, Dental Clinics, Optical Clinics, and Similar Clinics' },
  { value: 'OTC_SCHL', label: 'Other Contractor - Other Contractor - Operators of Dancing, Driving, Judo-Karate Schools' },
  { value: 'OTC_PPRS', label: 'Other Contractor - Other Contractor - Perma-Press Shops' },
  { value: 'OTC_HOSP', label: 'Other Contractor - Other Contractor - Private Hospitals and Private Educational Institutions' },
  { value: 'OTC_PROM', label: 'Other Contractor - Other Contractor - Promotion Offices or Agencies, Promoters of Shows, Games, or Performances' },
  { value: 'OTC_DUPL', label: 'Other Contractor - Other Contractor - Recopying or Duplicating, Xerox Copying or Mimeographing Services' },
  { value: 'OTC_RENT', label: 'Other Contractor - Other Contractor - Rental Agencies/Offices/Shops Renting Out for-a-fee Machines, Apparatuses, Equipment' },
  { value: 'OTC_RPHA', label: 'Other Contractor - Other Contractor - Repair Centers/Shops for Home Appliances' },
  { value: 'OTC_RTAG', label: 'Other Contractor - Other Contractor - Rental Agencies/Offices/Shops' },
  { value: 'OTC_RPME', label: 'Other Contractor - Other Contractor - Repair Center/Shops for Medical Equipment' },
  { value: 'OTC_RPCO', label: 'Other Contractor - Other Contractor - Repair Shops for Computers and Other Electronic Equipment' },
  { value: 'OTC_SCUL', label: 'Other Contractor - Other Contractor - Sculpture Shops' },
  { value: 'OTC_SRVM', label: 'Other Contractor - Other Contractor - Service Stations for Motor Vehicles' },
  { value: 'OTC_SRVO', label: 'Other Contractor - Other Contractor - Surveying Offices (Private Land Surveying or Geodetic)' },
  { value: 'OTC_TTRM', label: 'Other Contractor - Other Contractor - Transportation Terminals for-a-fee' },
  { value: 'OTC_VACI', label: 'Other Contractor - Other Contractor - Vaciador Shops' },
  { value: 'OTC_VCSR', label: 'Other Contractor - Other Contractor - Video Coverage Services' },
  { value: 'OTC_WTCH', label: 'Other Contractor - Other Contractor - Watch Repair Center or Shop' },
  { value: 'OTC_SIML', label: 'Other Contractor - Other Contractor - Other Similar Establishment Rendering or Offering to Render Services for-a-fee' },
  { value: 'OTC_BLLP', label: 'Other Contractor - Other Contractor - Bill Payment' },
  { value: 'OTC_MNPS', label: 'Other Contractor - Other Contractor - Manpower Service' },
  { value: 'OTC_JNTS', label: 'Other Contractor - Other Contractor - Janitorial Service' },
  { value: 'OTC_PEST', label: 'Other Contractor - Other Contractor - Pest Control' },
  { value: 'OTC_JWLR', label: 'Other Contractor - Other Contractor - Jewelry Repair Shop' },
  { value: 'OTC_NPPR', label: 'Other Contractor - Other Contractor - Newspaper Publication' },
  { value: 'OTC_HAUL', label: 'Other Contractor - Other Contractor - Hauling Services' },
  { value: 'OTC_PRTG', label: 'Other Contractor - Other Contractor - Printing' },
  { value: 'OTC_PRTS', label: 'Other Contractor - Other Contractor - Printing Services' },
  { value: 'OTC_WRTY', label: 'Other Contractor - Other Contractor - Warranty Services' },
  { value: 'OTC_KDCT', label: 'Other Contractor - Other Contractor - Rental Kiddie Carts' },
  { value: 'OTC_RAMD', label: 'Other Contractor - Other Contractor - Rental of Amusement Devices' },
  { value: 'OTC_MCLN', label: 'Other Contractor - Other Contractor - Medical Clinic' },
  { value: 'OTC_RNTS', label: 'Other Contractor - Other Contractor - Rentals of Chairs, Tables, Utensils' },
  { value: 'OTC_RPRC', label: 'Other Contractor - Other Contractor - Repair Shop' },
  { value: 'OTC_RMUS', label: 'Other Contractor - Other Contractor - Rental of Musical Instruments/Apparatuses' },
  { value: 'OTC_VETC', label: 'Other Contractor - Other Contractor - Veterinary Clinic' },
  { value: 'OTC_PRPR', label: 'Other Contractor - Other Contractor - Printing Press' },
  { value: 'OTC_FRMS', label: 'Other Contractor - Other Contractor - Frame Shop' },
  { value: 'OTC_DRVS', label: 'Other Contractor - Other Contractor - Driving School' },
  { value: 'OTC_GWRS', label: 'Other Contractor - Other Contractor - Gift Wrapping Services' },
  { value: 'OTC_RVCL', label: 'Other Contractor - Other Contractor - Rental of Vehicles' },
  { value: 'OTC_PVTS', label: 'Other Contractor - Other Contractor - Private School' },
  { value: 'OTC_OPTC', label: 'Other Contractor - Other Contractor - Optical Clinic' },
  { value: 'OTC_TRTC', label: 'Other Contractor - Other Contractor - Training Center' },
  { value: 'OTC_DNTC', label: 'Other Contractor - Other Contractor - Dental Clinic' },
  { value: 'OTC_CMWS', label: 'Other Contractor - Other Contractor - Communications or Wire Services' },
  { value: 'OTC_TPHC', label: 'Other Contractor - Other Contractor - Therapy Clinic' },
  { value: 'OTC_INST', label: 'Other Contractor - Other Contractor - Installation Services' },
  { value: 'OTC_PRMA', label: 'Other Contractor - Other Contractor - Promotional Agency' },
  { value: 'OTC_BKPB', label: 'Other Contractor - Other Contractor - Books Publication' },
  { value: 'OTC_FWDS', label: 'Other Contractor - Other Contractor - Forwarding Services' },
  { value: 'OTC_FWOF', label: 'Other Contractor - Other Contractor - Forwarding Services (Office Only)' },
  { value: 'OTC_NPOF', label: 'Other Contractor - Other Contractor - Newspaper Publication (Office Only)' },
  { value: 'OTC_SKNC', label: 'Other Contractor - Other Contractor - Skin Clinic' },
  { value: 'OTC_GRMS', label: 'Other Contractor - Other Contractor - Garments Subcontractor' },
  { value: 'OTC_FRGO', label: 'Other Contractor - Other Contractor - Freight Services/Trucking Services (Office Only)' },
  { value: 'OTC_VEDS', label: 'Other Contractor - Other Contractor - Video Editing Services' },
  { value: 'OTC_TTGO', label: 'Other Contractor - Other Contractor - Transportation Terminals (Garage Only)' },
  { value: 'OTC_TUTS', label: 'Other Contractor - Other Contractor - Tutorial Services' },
  { value: 'OTC_RNOS', label: 'Other Contractor - Other Contractor - Rendering Other Services' },
  { value: 'OTC_RNLB', label: 'Other Contractor - Other Contractor - Rental of Books' },
  { value: 'OTC_INKR', label: 'Other Contractor - Other Contractor - Ink Refilling Services' },
  { value: 'OTC_CDPO', label: 'Other Contractor - Other - Collection Dispatching Office' },
  { value: 'OTC_DNTL', label: 'Other Contractor - Other - Dental Laboratories' },
  { value: 'OTC_DRTL', label: 'Other Contractor - Other - Drug Testing Laboratory' },
  { value: 'OTC_GRTO', label: 'Other Contractor - Other - Garage and Terminal Office (Without Service Facilities)' },
  { value: 'OTC_RNDG', label: 'Other Contractor - Other - Rental of Dresses and Gowns' },
  { value: 'OTC_ANBC', label: 'Other Contractor - Other - Animal Bite Clinic' },
  { value: 'OTC_MCMS', label: 'Other Contractor - Other - Music Composition/Musical Arrangement' },
  { value: 'OTC_OPVH', label: 'Other Contractor - Other Contractor - Private Hospital' },
  { value: 'OTC_PVTH', label: 'Other Contractor - Private Hospital' },
  { value: 'OTC_PHO', label: 'Other Contractor - Other - Private Hospital' },
  { value: 'OTC_OPH', label: 'Other Contractor - Other Contractor - Private Hospital' },
  { value: 'OTC_RVWC', label: 'Other Contractor - Other - Review Center' },
  { value: 'OTC_ACCO', label: 'Other Contractor - Other - Accounting Consultancy Office' },
  { value: 'OTC_EVOR', label: 'Other Contractor - Other - Events Organizer/Coordinator' },
  { value: 'OTC_JTHS', label: 'Other Contractor - Other - Janitorial Service/Helmet Depository' },
  { value: 'OTC_ML', label: 'Other Contractor - Other - Medical Laboratory' },
  { value: 'OTC_MDAG', label: 'Other Contractor - Other - Modeling Agency' },
  { value: 'OTC_BBDS', label: 'Other Contractor - Other - Brake Bonding Services' },
  { value: 'OTC_CIAD', label: 'Other Contractor - Other - Cinema Advertisement' },
  { value: 'OTC_PRTN', label: 'Other Contractor - Other - Party Needs' },
  { value: 'OTC_FRNO', label: 'Other Contractor - Other - Franchising Office' },
  { value: 'OTC_MKTO', label: 'Other Contractor - Other - Marketing Office' },
  { value: 'OTC_INPS', label: 'Other Contractor - Other - Installation Ports and Networking Services' },
  { value: 'OTC_MDL', label: 'Other Contractor - Other - Medical/Diagnostic Laboratories' },
  { value: 'OTC_FASH', label: 'Other Contractor - Other - Fashion Boutique' },
  { value: 'OTC_PSVS', label: 'Other Contractor - Other - Private School/Vocational School' },
  { value: 'OTC_ARCD', label: 'Other Contractor - Contractor - Architectural Design Services' },
  { value: 'OTC_SCHC', label: 'Other Contractor - Other - Special Child Center' },
  { value: 'OTC_SHUT', label: 'Other Contractor - Other - Shuttle Services' },
  { value: 'OTC_TKTS', label: 'Other Contractor - Other - Ticketing/Bills Payment/Courier Services/Loading' },
  { value: 'OTC_MDCL', label: 'Other Contractor - Other - Medical Clinic w/ Laboratory' },
  { value: 'OTC_MUSC', label: 'Other Contractor - Other - Music Studio' },
  { value: 'OTC_PNCN', label: 'Other Contractor - Other - Party Needs Catering Services' },
  { value: 'OTC_ANCL', label: 'Other Contractor - Other - Animal Clinic' },
  { value: 'OTC_TWSV', label: 'Other Contractor - Other - Towing Services' },
  { value: 'OTC_RPTE', label: 'Other Contractor - Other - Rental of Printing Equipment' },
  { value: 'OTC_HDSC', label: 'Other Contractor - Other - Hemodialysis Center' },
  { value: 'OTC_WLDS', label: 'Other Contractor - Other - Welding Shop' },
  { value: 'OTC_BKOF', label: 'Other Contractor - Other - Basketball Officiating' },
  { value: 'OTC_WXSL', label: 'Other Contractor - Other - Waxing Salon' },
  { value: 'OTC_ANGL', label: 'Other Contractor - Other - Animal Grooming Salon' },
  { value: 'OTC_BLRS', label: 'Other Contractor - Other - Boiler Repair' },
  { value: 'OTC_SBCT', label: 'Other Contractor - Other - Subcontractor-Rendering Other Services' },
  { value: 'OTC_TRSC', label: 'Other Contractor - Other - Training Center-Security' },
  { value: 'OTC_TKOF', label: 'Other Contractor - Other - Ticketing Office' },
  { value: 'OTC_TFSV', label: 'Other Contractor - Other - Tours Services for Field Trip' },
  { value: 'OTC_REHE', label: 'Other Contractor - Other - Rental of Heavy Equipment' },
  { value: 'OTC_CICS', label: 'Other Contractor - Other - Car Interior and Custom Services' },
  { value: 'OTC_RAGC', label: 'Other Contractor - Other - Recruitment Agency' },
  { value: 'OTC_FLMS', label: 'Other Contractor - Contractor - Film Studio' },
  { value: 'OTC_HLSV', label: 'Other Contractor - Other - Health Services' },
  { value: 'OTC_MFSV', label: 'Other Contractor - Other - Messenger and Forwarding Services' },
  { value: 'OTC_GTSF', label: 'Other Contractor - Other - Garage and Terminal Office (With Service Facilities)' },
  { value: 'OTC_TSIT', label: 'Other Contractor - Other - Tiles and Stone Installation' },
  { value: 'OTC_GMNT', label: 'Other Contractor - Contractor - Garments Contractor' },
  { value: 'OTC_CBW', label: 'Other Contractor - Other - Custom Bonded Warehouse' },
  { value: 'OTC_SEBT', label: 'Other Contractor - Other - Soil Exploration/Boring Test' },
  { value: 'OTC_INFB', label: 'Other Contractor - Other - Information Booth' },
  { value: 'OTC_AELC', label: 'Other Contractor - Other - Auto Electrical Shop' },
  { value: 'OTC_EMBS', label: 'Other Contractor - Other - Embroidery Shop' },
  { value: 'OTC_CSBR', label: 'Other Contractor - Other - Casket Broker' },
  { value: 'OTC_PLBG', label: 'Other Contractor - Other - Plumbing Services' },
  { value: 'OTC_ACPC', label: 'Other Contractor - Other - Acupuncture Clinic' },
  { value: 'OTC_SALP', label: 'Other Contractor - Other - Salon and SPA' },
  { value: 'OTC_ADVS', label: 'Other Contractor - Other - Advertising Services' },
  { value: 'OTC_ELIS', label: 'Other Contractor - Other - Electrical and Industrial Services' },
  { value: 'OTC_SKMD', label: 'Other Contractor - Other - Skin and Medical Clinic' },
  { value: 'OTC_CWVS', label: 'Other Contractor - Contractor - Carwash Vulcanizing Shop' },
  { value: 'OTC_MRPS', label: 'Other Contractor - Other - Motorcycle Repair Shop' },
  { value: 'OTC_HFAG', label: 'Other Contractor - Other - Home for the Aged' },
  { value: 'OTC_WGMK', label: 'Other Contractor - Other - Wig Making' },
  { value: 'OTC_DNCS', label: 'Other Contractor - Other - Dance Studio' },
  { value: 'OTC_OHCS', label: 'Other Contractor - Other - Home Care Services (Office Only)' },
  { value: 'OTC_PKGS', label: 'Other Contractor - Other - Packaging Services' },
  { value: 'OTC_RCTU', label: 'Other Contractor - Rentals of Chairs, Tables, Utensils/Catering Services' },
  { value: 'OTC_FRSV', label: 'Other Contractor - Other Contractor - Forwarding Services, Freight Services, Trucking Services' },
  { value: 'OTC_TOBP', label: 'Other Contractor - Other Contractor - Ticketing Office / Bill Payment / Forwarding Services' },
  { value: 'OTC_MFCS', label: 'Other Contractor - Other Contractor - Messenger, Forwarding Services, and Courier' },
  { value: 'OTC_BPTK', label: 'Other Contractor - Other Contractor - Bill Payment / Ticketing Office' },
  { value: 'OTC_RMDE', label: 'Other Contractor - Other - Rental of Medical Equipment' },
  { value: 'OTC_MSKS', label: 'Other Contractor - Music School' },
  { value: 'OTC_PRTP', label: 'Other Contractor - Other Contractor - Printing Publishing' },
  { value: 'OTC_PSCS', label: 'Other Contractor - Other - Psychological Services' },
  { value: 'OTC_RCT', label: 'Other Contractor - Other Contractor - Rental of Chairs, Tables' },
  { value: 'OTC_ONDR', label: 'Other Contractor - Online Data Researcher' },
  { value: 'OTC_TRKS', label: 'Other Contractor - Other Contractor - Trucking Services' },
  { value: 'OTC_TTUR', label: 'Other Contractor - Other Contractor - Training Center - Tutorial' },
  { value: 'OTC_BPLS', label: 'Other Contractor - Other - Bills Payment/Loading Station' },
  { value: 'OTC_FNCP', label: 'Other Contractor - Contractor - Funeral Chapel' },
  { value: 'OTC_HMCS', label: 'Other Contractor - Other Contractor - Home Care Services' },
  { value: 'OTC_OPTL', label: 'Other Contractor - Other Contractor - Optical Laboratory' },
  { value: 'OTC_DIAL', label: 'Other Contractor - Other Contractor - Dialysis Service' },
  { value: 'OTC_BKGS', label: 'Other Contractor - Other Contractor - Bookkeeping Services' },
  { value: 'OTC_IMNS', label: 'Other Contractor - Other Contractor - Installation/Maintenance Services' },
  { value: 'OTC_DLVS', label: 'Other Contractor - Other Contractor - Delivery Services' },
  { value: 'OTC_DTEN', label: 'Other Contractor - Other Contractor - Data Encoding Services' },
  { value: 'OTC_VTAS', label: 'Other Contractor - Other Contractor - Virtual Assistance Services' },
  { value: 'OTC_CORS', label: 'Other Contractor - Other Contractor - Courier Services' },
  { value: 'OTC_CABS', label: 'Other Contractor - Cabling Services' },
  { value: 'OTC_ACO', label: 'Other Contractor - Accounting Consultancy Office / Computer Design Programs' },
  { value: 'OTC_PNCS', label: 'Other Contractor - Other Contractor - Personal Care Services' },
  { value: 'OTC_CMSR', label: 'Other Contractor - Other Contractor - Common Space Rental Services' },
  { value: 'OTC_DVHB', label: 'Other Contractor - Other Contractor - Delivery Hub Services' },
  { value: 'OTC_DCMT', label: 'Other Contractor - Other Contractor - Documentation Services' },
  { value: 'OTC_CLSV', label: 'Other Contractor - Other Contractor - Courier/Logistics Services' },
  { value: 'OTC_MTGY', label: 'Other Contractor - Martial Arts Gym' },
  { value: 'OTC_ARCN', label: 'Other Contractor - Animal Rescue Center' },
  { value: 'OTC_RPRS', label: 'Other Contractor - Contractor - Repair Shop' },
  { value: 'OTC_WCDP', label: 'Other Contractor - Other Contractor - Waste Collection Disposal' },
  { value: 'OTC_ARTS', label: 'Other Contractor - Other Contractor - Art Studio' },
  { value: 'OTC_BDPS', label: 'Other Contractor - Other Contractor - Body Piercing Services' },
  { value: 'OTC_RMNS', label: 'Other Contractor - Other Contractor - Repair & Maintenance Services' },
  { value: 'OTC_CWSP', label: 'Other Contractor - Other Contractor - Coworking Space for a Fee' },
  { value: 'OLB_IMPR', label: 'Other LOB - Other LOB - Importer' },
  { value: 'PDD_DLTR', label: 'Peddler - Peddler - Delivery Truck' },
  { value: 'PDD_VANS', label: 'Peddler - Peddler - Van' },
  { value: 'PDD_AMDV', label: 'Peddler - Peddler Proprietor - Amusement Devices' },
  { value: 'PRP_VDOK', label: 'Proprietor-Amusement Devices - Proprietor - Videoke Machine' },
  { value: 'PRP_FHPC', label: 'Proprietor-Amusement Devices - Proprietor - Family Home Computers' },
  { value: 'PRP_GMWD', label: 'Proprietor-Amusement Devices - Proprietor - Game and Watch Devices' },
  { value: 'PRP_SLTM', label: 'Proprietor-Amusement Devices - Proprietor - Slot Machines not Classified as Gambling Devices' },
  { value: 'PRP_OTAD', label: 'Proprietor-Amusement Devices - Proprietor - Other Amusement Devices' },
  { value: 'PRP_CMTR', label: 'Proprietor-Amusement Devices - Proprietor - Computer Rentals' },
  { value: 'PRP_PLST', label: 'Proprietor-Amusement Devices - Proprietor - Playstation' },
  { value: 'PRP_VDRL', label: 'Proprietor-Amusement Devices - Proprietor - Video Rental' },
  { value: 'PRP_VGMS', label: 'Proprietor-Amusement Devices - Proprietor - Video Games' },
  { value: 'PRP_KDRD', label: 'Proprietor-Amusement Devices - Proprietor - Kiddie Rides' },
  { value: 'PRP_TLSB', label: 'Proprietor-Amusement Devices - Proprietor - Telesabong' },
  { value: 'PRP_VDKB', label: 'Proprietor-Amusement Devices - Proprietor - Videoke Bar' },
  { value: 'PRP_OLGS', label: 'Proprietor-Amusement Devices - Proprietor - On-line Gaming Station' },
  { value: 'PRP_OLBS', label: 'Proprietor-Amusement Devices - Proprietor - On-line Betting Station' },
  { value: 'RTL_SAMP', label: 'Retailer (Sample) - Sample' },
  { value: 'RTL_GUNS', label: 'Retailer – Gun - Gun' },
  { value: 'RTL_ECIG', label: 'Retailer-Cigarettes - E-Cigarette' },
  { value: 'RTL_TBRC', label: 'Retailer-Cigarettes - Retail Dealer - Tobacco' },
  { value: 'RTL_TOBR', label: 'Retailer-Cigarettes - Retailer - Tobacco' },
  { value: 'RTL_SNCI', label: 'Retailer-Cigarettes - Retail Dealer - Snuff including Cigars and Cigarettes' },
  { value: 'RTL_SNCR', label: 'Retailer-Cigarettes - Retailer - Snuff including Cigars and Cigarettes' },
  { value: 'RTL_STR', label: 'Retailer-Essential - Retailer - Store' },
  { value: 'RTL_ESCM', label: 'Retailer-Essential - Retailer - Essential Commodities' },
  { value: 'RTL_BKRY', label: 'Retailer-Essential - Retailer - Bakery' },
  { value: 'RTL_SCHS', label: 'Retailer-Essential - Retailer - School Supplies' },
  { value: 'RTL_MDIC', label: 'Retailer-Essential - Retailer - Medicine' },
  { value: 'RTL_PFAN', label: 'Retailer-Essential - Retailer - Poultry Feeds and Other Animal Feeds' },
  { value: 'RTL_RICE', label: 'Retailer-Essential - Retailer - Rice' },
  { value: 'RTL_MEAT', label: 'Retailer-Essential - Retailer - Meat' },
  { value: 'RTL_CHKN', label: 'Retailer-Essential - Retailer - Chicken' },
  { value: 'RTL_FISH', label: 'Retailer-Essential - Retailer - Fish' },
  { value: 'RTL_CMNT', label: 'Retailer-Essential - Retailer - Chicken/Meat' },
  { value: 'RTL_SCOS', label: 'Retailer-Essential - Retailer - School Office Supplies' },
  { value: 'RTL_OFSU', label: 'Retailer-Essential - Retailer - Office Supplies' },
  { value: 'RTL_VEGE', label: 'Retailer-Essential - Retailer - Vegetable' },
  { value: 'RTL_FRVG', label: 'Retailer-Essential - Retailer - Fruits and Vegetables' },
  { value: 'RTL_DFRS', label: 'Retailer-Essential - Retailer - Dried Fish' },
  { value: 'RTL_COCO', label: 'Retailer-Essential - Retailer - Coconut' },
  { value: 'RTL_BANA', label: 'Retailer-Essential - Retailer - Banana' },
  { value: 'RTL_SGLM', label: 'Retailer-Essential - Retailer - Sago Gulaman' },
  { value: 'RTL_FRUT', label: 'Retailer-Essential - Retailer - Fruits' },
  { value: 'RTL_EGG', label: 'Retailer-Essential - Retailer - Egg' },
  { value: 'RTL_LPG', label: 'Retailer-Essential - Retailer - LPG' },
  { value: 'RTL_CRBP', label: 'Retailer-Essential - Retailer - Crabs and Prawns' },
  { value: 'RTL_LUMP', label: 'Retailer-Essential - Retailer - Lumpia Wrapper' },
  { value: 'RTL_FRZS', label: 'Retailer-Essential - Retailer - Frozen Seafoods Products' },
  { value: 'RTL_SUPL', label: 'Retailer-Essential - Retailer - Food Supplement' },
  { value: 'RTL_RIGM', label: 'Retailer-Essential - Retailer - Rice and General Merchandise' },
  { value: 'RTL_BEEF', label: 'Retailer-Essential - Retailer - Beef' },
  { value: 'RTL_SEAF', label: 'Retailer-Essential - Retailer - Seafoods' },
  { value: 'RTL_CLDC', label: 'Retailer-Essential - Retailer - Cold Cuts' },
  { value: 'RTL_NUTS', label: 'Retailer-Essential - Retailer - Nuts' },
  { value: 'RTL_BAGN', label: 'Retailer-Essential - Retailer - Bagoong' },
  { value: 'RTL_RIPF', label: 'Retailer-Essential - Retailer - Rice and Poultry Feeds' },
  { value: 'RTL_MEVE', label: 'Retailer-Essential - Retailer - Meat/Vegetable' },
  { value: 'RTL_MESP', label: 'Retailer-Essential - Retailer - Meat Seafoods Products' },
  { value: 'RTL_FMSP', label: 'Retailer-Essential - Retailer - Frozen Meat Seafoods Products' },
  { value: 'RTL_FRMT', label: 'Retailer-Essential - Retailer - Frozen Meat' },
  { value: 'RTL_MEFS', label: 'Retailer-Essential - Retailer - Meat and Fish' },
  { value: 'RTL_FVGE', label: 'Retailer-Essential - Retailer - Fish/Vegetables' },
  { value: 'RTL_LIQ', label: 'Retailer-Liquors - Retailer - Liquor or Wine' },
  { value: 'RTL_FLQB', label: 'Retailer-Liquors - Retailer - Fermented Liquor (Beer)' },
  { value: 'RTL_VINO', label: 'Retailer-Liquors - Retailer - Vino Liquor' },
  { value: 'RTL_TUBA', label: 'Retailer-Liquors - Retailer - Tuba' },
  { value: 'RTL_BASI', label: 'Retailer-Liquors - Retailer - Basi' },
  { value: 'RTL_OTDS', label: 'Retailer-Liquors - Retailer - Other Distilled Spirits not Classified as Denatured Alcohol' },
  { value: 'RTL_LQWN', label: 'Retailer-Liquors - Retailer - Liquor or Wine' },
  { value: 'RTL_ILWN', label: 'Retailer-Liquors - Retail - Liquor or Wine / Importer' },
  { value: 'RTL_MED', label: 'Retailer-Medicine - Retailer-Medicine' },
  { value: 'RTL_APPL', label: 'Retailer-Non Essential - Retailer - Appliances and Furniture' },
  { value: 'RTL_CCTV', label: 'Retailer-Non Essential - Retailer - CCTV' },
  { value: 'RTL_PCLA', label: 'Retailer-Non Essential - Retailer - Paper Clay Arts' },
  { value: 'RTL_OFFC', label: 'Retailer-Non Essential - Retailer - Office Only' },
  { value: 'RTL_JSUR', label: 'Retailer-Non Essential - Retailer - Japan Surplus' },
  { value: 'RTL_OEQP', label: 'Retailer-Non Essential - Retailer - Office Machines, Equipment, and Computers' },
  { value: 'RTL_ESUP', label: 'Retailer-Non Essential - Retailer - Electrical Supply' },
  { value: 'RTL_EMAC', label: 'Retailer-Non Essential - Retailer - Electronic Machines' },
  { value: 'RTL_RFIS', label: 'Retailer-Non Essential - Retailer - Roasted Fish' },
  { value: 'RTL_RCHK', label: 'Retailer-Non Essential - Retailer - Roasted Chicken' },
  { value: 'RTL_TXTF', label: 'Retailer-Non Essential - Retailer - Textile Paints and Fabrics' },
  { value: 'RTL_LITE', label: 'Retailer-Non Essential - Retailer - Lighting' },
  { value: 'RTL_GRVS', label: 'Retailer-Non Essential - Retailer - Gravel and Sand' },
  { value: 'RTL_AUTO', label: 'Retailer-Non Essential - Retailer - Auto Supply' },
  { value: 'RTL_GIVE', label: 'Retailer-Non Essential - Retailer - Corporate Giveaways' },
  { value: 'RTL_ECG', label: 'Retailer-Non Essential - Retailer - Electronic Cigarette' },
  { value: 'RTL_CHAR', label: 'Retailer-Non Essential - Retailer - Charcoal' },
  { value: 'RTL_SUPA', label: 'Retailer-Non Essential - Other - Surplus (Auto Spare Parts)' },
  { value: 'RTL_SUPP', label: 'Retailer-Non Essential - Retailer - Surplus (Auto Spare Parts)' },
  { value: 'RTL_PROC', label: 'Retailer-Non Essential - Retailer - Processed Meat' },
  { value: 'RTL_CURT', label: 'Retailer-Non Essential - Retailer - Curtain' },
  { value: 'RTL_FURN', label: 'Retailer-Non Essential - Retailer - Surplus Furniture' },
  { value: 'RTL_HHPR', label: 'Retailer-Non Essential - Retailer - Household Products' },
  { value: 'RTL_FACC', label: 'Retailer-Non Essential - Retailer - Fashion Accessories' },
  { value: 'RTL_BAKE', label: 'Retailer-Non Essential - Retailer - Bakery Equipment' },
  { value: 'RTL_MVSP', label: 'Retailer-Non Essential - Retailer - Surplus Motor Vehicle' },
  { value: 'RTL_HAND', label: 'Retailer-Non Essential - Retailer - Handicraft Products' },
  { value: 'RTL_SGUL', label: 'Retailer-Non Essential - Retailer - Sago Gulaman' },
  { value: 'RTL_STON', label: 'Retailer-Non Essential - Retailer - Stonecraft' },
  { value: 'RTL_WPRF', label: 'Retailer-Non Essential - Retailer - Waterproofing (Office Only)' },
  { value: 'RTL_PNTG', label: 'Retailer-Non Essential - Retailer - Painting' },
  { value: 'RTL_CACC', label: 'Retailer-Non Essential - Retailer - Cellphone Accessories' },
  { value: 'RTL_CARC', label: 'Retailer-Non Essential - Retailer - Car Accessories' },
  { value: 'RTL_BATT', label: 'Retailer-Non Essential - Retailer - Battery' },
  { value: 'RTL_WATC', label: 'Retailer-Non Essential - Retailer - Watches' },
  { value: 'RTL_WACC', label: 'Retailer-Non Essential - Retailer - Watch Accessories' },
  { value: 'RTL_BRED', label: 'Retailer-Non Essential - Retailer - Bread' },
  { value: 'RTL_SGLS', label: 'Retailer-Non Essential - Retailer - Sunglasses' },
  { value: 'RTL_PLAS', label: 'Retailer-Non Essential - Retailer - Non-Essential Commodities/Importer - Plastic Ware' },
  { value: 'RTL_BKSP', label: 'Retailer-Non Essential - Retailer - Bakery Supplies' },
  { value: 'RTL_HOSE', label: 'Retailer-Non Essential - Retailer - Hose Regulator' },
  { value: 'RTL_SRPL', label: 'Retailer-Non Essential - Retailer - Surplus' },
  { value: 'RTL_GENS', label: 'Retailer-Non Essential - Retailer - Genset Units and Parts' },
  { value: 'RTL_TXTL', label: 'Retailer-Non Essential - Retailer - Textile' },
  { value: 'RTL_PETC', label: 'Retailer-Non Essential - Retailer - Pet Care Products' },
  { value: 'RTL_AUTM', label: 'Retailer-Non Essential - Retailer - Automotive' },
  { value: 'RTL_HLTH', label: 'Retailer-Non Essential - Retailer - Health Products' },
  { value: 'RTL_TSI', label: 'Retailer-Non Essential - Retailer - Toasted Siopao' },
  { value: 'RTL_ZIPP', label: 'Retailer-Non Essential - Retailer - Zipper' },
  { value: 'RTL_SPRT', label: 'Retailer-Non Essential - Retailer - Sports Equipment' },
  { value: 'RTL_EBKE', label: 'Retailer-Non Essential - Other - Electric Bike' },
  { value: 'RTL_ONBA', label: 'Retailer-Non Essential - Retailer - Online Business Bags and Accessories' },
  { value: 'RTL_BIBK', label: 'Retailer-Non Essential - Retailer - Bibingka' },
  { value: 'RTL_CSFT', label: 'Retailer-Non Essential - Retailer - Computer Software Application' },
  { value: 'RTL_CHMP', label: 'Retailer-Non Essential - Retailer - Chemical Products' },
  { value: 'RTL_HRBL', label: 'Retailer-Non Essential - Retailer - Herbal Products' },
  { value: 'RTL_POPC', label: 'Retailer-Non Essential - Retailer - Popcorn' },
  { value: 'RTL_CELL', label: 'Retailer-Non Essential - Retailer - Cellphone' },
  { value: 'RTL_SLRP', label: 'Retailer-Non Essential - Retailer - Solar Panel' },
  { value: 'RTL_HYDH', label: 'Retailer-Non Essential - Retailer - Hydraulic Hose' },
  { value: 'RTL_SSLS', label: 'Retailer-Non Essential - Retailer - Sari-Sari Store/Loading Station' },
  { value: 'RTL_RFNG', label: 'Retailer-Non Essential - Roofing' },
  { value: 'RTL_PNDS', label: 'Retailer-Non Essential - Retailer - Party Needs' },
  { value: 'RTL_ONLB', label: 'Retailer-Non Essential - Retailer - Online Business' },
  { value: 'RTL_TBIC', label: 'Retailer-Non Essential - Retailer - Tube Ice' },
  { value: 'RTL_RCCH', label: 'Retailer-Non Essential - Retailer - Non-Essential Commodities / Roasted Chicken' },
  { value: 'RTL_ACCS', label: 'Retailer-Non Essential – Non Essential - Accessories Sales' },
  { value: 'RTL_MSLE', label: 'Retailer-Non Essential - Retailer - Medical Supplies / Equipment / Loading Station' },
  { value: 'RTL_ACPT', label: 'Retailer-Non Essential - Retailer - Airconditioning Parts / Airconditioning Unit' },
  { value: 'RTL_SIOM', label: 'Retailer-Non Essential - Retailer - Siomai' },
  { value: 'RTL_CPCA', label: 'Retailer-Non Essential - Retailer - Cellphone Accessories / Computer Parts Accessories' },
  { value: 'RTL_CSSI', label: 'Retailer-Non Essential - Retailer - Construction Supply / Importer / Exporter / Non-Essential Commodities' },
  { value: 'RTL_SHJW', label: 'Retailer-Non Essential - Retailer - Shoes/Jewelry' },
  { value: 'RTL_EYWR', label: 'Retailer-Non Essential - Retailer - Eyewear' },
  { value: 'RTL_STEL', label: 'Retailer-Non Essential – Non Essential - Steel' },
  { value: 'RTL_RTSB', label: 'Retailer-Non Essential - Retailer - RTW / Bags / Shoes' },
  { value: 'RTL_ICE', label: 'Retailer-Non Essential - Ice' },
  { value: 'RTL_PNML', label: 'Retailer-Non Essential - Retailer - Pancit Malabon' },
  { value: 'RTL_WTRT', label: 'Retailer-Non Essential – Non Essential - Water Treatment Supplies' },
  { value: 'RTL_RTWA', label: 'Retailer-Non Essential - Retailer - RTW Accessories' },
  { value: 'RTL_MTLP', label: 'Retailer-Non Essential - Retailer - Metal Products' },
  { value: 'RTL_PSTC', label: 'Retailer-Non Essential - Retailer - Pest Control Products' },
  { value: 'RTL_TOYS', label: 'Retailer-Non Essential - Retailer - Toys' },
  { value: 'RTL_RCKP', label: 'Retailer-Non Essential - Retailer - Rocks and Pebbles' },
  { value: 'RTL_RCMT', label: 'Retailer-Non Essential - Retailer - Roasted Chicken Meat' },
  { value: 'RTL_OPTO', label: 'Retailer-Non Essential - Retailer - Ornamental Plants / Orchids' },
  { value: 'RTL_IDST', label: 'Retailer-Non Essential - Retailer - Independent Distributor' },
  { value: 'RTL_OBEA', label: 'Retailer-Non Essential - Retailer - Organic Beauty Products' },
  { value: 'RTL_UPHS', label: 'Retailer-Non Essential - Retailer - Upholstery Supply' },
  { value: 'RTL_DTRG', label: 'Retailer-Non Essential - Retailer - Detergent' },
  { value: 'RTL_LQDT', label: 'Retailer-Non Essential - Retailer - Liquid Detergent' },
  { value: 'RTL_EPRT', label: 'Retailer-Non Essential - Retailer - Electronic Parts' },
  { value: 'RTL_SS2M', label: 'Retailer-Non Essential - Retailer - Sari Sari Store 2nd Hand Motorcycle' },
  { value: 'RTL_PLTT', label: 'Retailer-Non Essential - Retailer - Pallet' },
  { value: 'RTL_MVHE', label: 'Retailer-Non Essential - Retailer - Motor Vehicle and Heavy Equipment' },
  { value: 'RTL_VAPE', label: 'Retailer-Non Essential - Retailer - Vape' },
  { value: 'RTL_CHOC', label: 'Retailer-Non Essential - Retailer - Chocolates' },
  { value: 'RTL_SPWR', label: 'Retailer-Non Essential - Retailer - Sportswear' },
  { value: 'RTL_ROOF', label: 'Retailer-Non Essential - Retailer - Roof' },
  { value: 'RTL_BOUT', label: 'Retailer-Non Essential - Retailer - Fashion Boutique' },
  { value: 'RTL_PLWR', label: 'Retailer-Non Essential - Retailer - Plastic Ware' },
  { value: 'RTL_CTNY', label: 'Retailer-Non Essential - Retailer - Cotton Candy' },
  { value: 'RTL_FSDV', label: 'Retailer-Non Essential - Retailer - Fuel Saving Devices' },
  { value: 'RTL_SSCL', label: 'Retailer-Non Essential - Sari-Sari / Cigarette / Liquor' },
  { value: 'RTL_SSCT', label: 'Retailer-Non Essential - Retailer - Sari-Sari / Cigarette' },
  { value: 'RTL_SSLQ', label: 'Retailer-Non Essential - Retailer - Sari-Sari / Liquor' },
  { value: 'RTL_BTFX', label: 'Retailer-Non Essential - Retailer - Bathroom Fixtures' },
  { value: 'RTL_NLLC', label: 'Retailer-Non Essential - Retailer-Non Essential / Liquor / Cigarette' },
  { value: 'RTL_NTBC', label: 'Retailer-Non Essential - Retailer - Non-Essential Commodities / Tobacco' },
  { value: 'RTL_PLNT', label: 'Retailer-Non Essential - Retailer - Plants' },
  { value: 'RTL_ASUP', label: 'Retailer-Non Essential - Retailer - Airsoft Supply Accessories' },
  { value: 'RTL_NBOL', label: 'Retailer-Non Essential - Retailer - Nuts and Bolts' },
  { value: 'RTL_PLYD', label: 'Retailer-Non Essential - Retailer - Plywood' },
  { value: 'RTL_CLQ', label: 'Retailer-Non Essential - Retailer - Cigarette / Liquor' },
  { value: 'RTL_INSM', label: 'Retailer-Non Essential - Retailer - Insulation Materials' },
  { value: 'RTL_MGCL', label: 'Retailer-Non Essential - Retailer - Mini-Grocery / Liquor / Cigarettes' },
  { value: 'RTL_BNSL', label: 'Retailer-Non Essential - Retailer - Buy and Sell' },
  { value: 'RTL_ECTO', label: 'Retailer-Non Essential - Retailer (E-Cigarette / Tobacco Online Selling)' },
  { value: 'RTL_RECG', label: 'Retailer-Non Essential - Retailer - E-Cigarette' },
  { value: 'RTL_MDDS', label: 'Retailer - Medical and Dental Supplies' },
  { value: 'RTL_KFDS', label: 'Retailer-Non Essential - Retailer - Korean Foods' },
  { value: 'RTL_BALL', label: 'Retailer-Non Essential - Balloons' },
  { value: 'RTL_MCSP', label: 'Retailer-Non Essential - Retailer - Motorcycle Spare Parts Accessories' },
  { value: 'RTL_MCAC', label: 'Retailer-Non Essential - Retailer - Motorcycle Accessories' },
  { value: 'RTL_PKMT', label: 'Retailer-Non Essential - Retailer - Packaging Materials' },
  { value: 'RTL_2LBR', label: 'Retailer-Non Essential - Retailer - 2nd Hand Lumber' },
  { value: 'RTL_LUBR', label: 'Retailer-Non Essential - Retailer - Lubricants' },
  { value: 'RTL_SCDE', label: 'Retailer-Non Essential - Retailer - Security Devices' },
  { value: 'RTL_LCHN', label: 'Retailer-Non Essential - Retailer - Lechon' },
  { value: 'RTL_ACPR', label: 'Retailer-Non Essential - Retailer - Airconditioning Parts' },
  { value: 'RTL_FRFP', label: 'Retailer-Non Essential - Frozen Food Products' },
  { value: 'RTL_ASPT', label: 'Retailer-Non Essential - Retailer - Auto Spare Parts' },
  { value: 'RTL_POSM', label: 'Retailer-Non Essential - Retailer - POS Machine' },
  { value: 'RTL_HLMT', label: 'Retailer-Non Essential - Retailer - Helmet' },
  { value: 'RTL_CCPR', label: 'Retailer-Non Essential - Retailer - CCTV/POS Machine/Repair Services' },
  { value: 'RTL_GFSP', label: 'Retailer-Non Essential - Retailer - Gift Shop' },
  { value: 'RTL_NCGN', label: 'Retailer-Non Essential - Retailer - Non Essential Commodities/Gun' },
  { value: 'RTL_SLQW', label: 'Retailer-Non Essential - Retailer - Softdrinks / Liquor or Wine' },
  { value: 'RTL_MDSP', label: 'Retailer-Non Essential - Medical Supplies' },
  { value: 'RTL_SKTB', label: 'Retailer-Non Essential - Retailer - Skateboard' },
  { value: 'RTL_GRCL', label: 'Retailer-Non Essential - Retailer - Grocery / Liquor / Cigarettes' },
  { value: 'RTL_HMDC', label: 'Retailer-Non Essential - Retailer - Home Decoration' },
  { value: 'RTL_BWLP', label: 'Retailer-Non Essential - Retailer - Beauty and Wellness Products' },
  { value: 'RTL_USOL', label: 'Retailer-Non Essential - Retailer - Used Oil' },
  { value: 'RTL_SHUC', label: 'Retailer-Non Essential - Retailer - Second Hand Used Car' },
  { value: 'RTL_BGPR', label: 'Retailer-Non Essential - Retailer - Bags Perfumes' },
  { value: 'RTL_INSP', label: 'Retailer-Non Essential - Retailer - Industrial Machines Spare Parts' },
  { value: 'RTL_WHMC', label: 'Retailer-Non Essential - Retailer - Water Heater Machine' },
  { value: 'RTL_KTWR', label: 'Retailer-Non Essential - Retailer - Kitchenware' },
  { value: 'RTL_WTVD', label: 'Retailer-Non Essential - Retailer - Water (Vending Machine)' },
  { value: 'RTL_FRCH', label: 'Retailer-Non Essential - Retailer - Fried Chicken' },
  { value: 'RTL_MTPT', label: 'Retailer-Non Essential - Retailer - Meat Products' },
  { value: 'RTL_CSMP', label: 'Retailer-Non Essential - Retailer - Cosmetic Products' },
  { value: 'RTL_BGFW', label: 'Retailer-Non Essential - Retailer - Bags Footwear' },
  { value: 'RTL_BPEW', label: 'Retailer-Non Essential - Retailer - Beauty Products Eyewear' },
  { value: 'RTL_BDST', label: 'Retailer-Non Essential - Retailer - Bedsheets' },
  { value: 'RTL_KIMC', label: 'Retailer-Non Essential - Retailer - Kimchi' },
  { value: 'RTL_ELSP', label: 'Retailer-Non Essential - Retailer - Electrical Electronic Supplies' },
  { value: 'RTL_VETP', label: 'Retailer-Non Essential - Retailer - Veterinary Drugs and Products, Feed Additives and Supplements' },
  { value: 'RTL_BXES', label: 'Retailer-Non Essential - Retailer - Boxes' },
  { value: 'RTL_FARM', label: 'Retailer-Non Essential - Retailer - Fire Alarm' },
  { value: 'RTL_FPEQ', label: 'Retailer-Non Essential - Retailer - Fire Protection Equipment' },
  { value: 'RTL_JUDY', label: 'Retailer-Non Essential - Retailer - Judy' },
  { value: 'RTL_NCMT', label: 'Retailer-Non Essential - Retailer - Non Essential Commodities' },
  { value: 'RTL_SRST', label: 'Retailer-Non Essential - Retailer - Sari-sari Store' },
  { value: 'RTL_RTWE', label: 'Retailer-Non Essential - Retailer - RTW' },
  { value: 'RTL_SCRP', label: 'Retailer-Non Essential - Retailer - Scrap' },
  { value: 'RTL_LPGN', label: 'Retailer-Non Essential - Retailer – LPG' },
  { value: 'RTL_FLWR', label: 'Retailer-Non Essential - Retailer - Flower Shop' },
  { value: 'RTL_MSP', label: 'Retailer-Non Essential - Retailer - Motor Vehicle Spare Parts' },
  { value: 'RTL_BKMZ', label: 'Retailer-Non Essential - Retailer - Books Magazines' },
  { value: 'RTL_BTYD', label: 'Retailer-Non Essential - Retailer - Beauty Products' },
  { value: 'RTL_CNSS', label: 'Retailer-Non Essential - Retailer - Construction Supply' },
  { value: 'RTL_RFNT', label: 'Retailer-Non Essential - Retailer - Furniture' },
  { value: 'RTL_CSFA', label: 'Retailer-Non Essential - Retailer - Crosstitch Accessories and Frames' },
  { value: 'RTL_FTWG', label: 'Retailer-Non Essential - Retailer - Footwear' },
  { value: 'RTL_CNDY', label: 'Retailer-Non Essential - Retailer - Candies' },
  { value: 'RTL_CPAC', label: 'Retailer-Non Essential - Retailer - Cellphone Accessories' },
  { value: 'RTL_DNTS', label: 'Retailer-Non Essential - Retailer - Donuts' },
  { value: 'RTL_OPST', label: 'Retailer-Non Essential - Retailer - Optical Supplies' },
  { value: 'RTL_CPAK', label: 'Retailer-Non Essential - Retailer - Computer Parts Accessories' },
  { value: 'RTL_CPTR', label: 'Retailer-Non Essential - Retailer - Computers Parts' },
  { value: 'RTL_BRGR', label: 'Retailer-Non Essential - Retailer - Burger' },
  { value: 'RTL_DRGS', label: 'Retailer-Non Essential - Retailer - Drug Store' },
  { value: 'RTL_MNUS', label: 'Retailer-Non Essential - Retailer - Musical Instrument' },
  { value: 'RTL_APL', label: 'Retailer-Non Essential - Retailer - Appliances' },
  { value: 'RTL_INDS', label: 'Retailer-Non Essential - Retailer - Industrial Sales' },
  { value: 'RTL_INDP', label: 'Retailer-Non Essential - Retailer - Industrial Products' },
  { value: 'RTL_PTSH', label: 'Retailer-Non Essential - Retailer - Pet Shop' },
  { value: 'RTL_BSHP', label: 'Retailer-Non Essential - Retailer - Bicycle Spare Parts' },
  { value: 'RTL_MSUE', label: 'Retailer-Non Essential - Retailer - Medical Supplies Equipment' },
  { value: 'RTL_SHES', label: 'Retailer-Non Essential - Retailer - Shoes' },
  { value: 'RTL_NCOM', label: 'Retailer-Non Essential - Retailer - Non Essential Commodities (Office Only)' },
  { value: 'RTL_PRFD', label: 'Retailer-Non Essential - Retailer - Processed Food' },
  { value: 'RTL_PRFM', label: 'Retailer-Non Essential - Retailer - Perfumes' },
  { value: 'RTL_CLCD', label: 'Retailer-Non Essential - Retailer - Cellcard' },
  { value: 'RTL_SHRM', label: 'Retailer-Non Essential - Retailer - Shawarma' },
  { value: 'RTL_TLCS', label: 'Retailer-Non Essential - Retailer - Tiles Ceramics' },
  { value: 'RTL_JWLR', label: 'Retailer-Non Essential - Retailer - Jewelry' },
  { value: 'RTL_MDMS', label: 'Retailer-Non Essential - Retailer - Modem' },
  { value: 'RTL_SSBA', label: 'Retailer-Non Essential - Retailer - Sari-Sari Store Bakery' },
  { value: 'RTL_NCI', label: 'Retailer-Non Essential - Retailer - Non Essential Commodities/Importer' },
  { value: 'RTL_INDC', label: 'Retailer-Non Essential - Retailer - Industrial/Chemical and All Types of Equipment' },
  { value: 'RTL_GRRY', label: 'Retailer-Non Essential - Retailer - Grocery' },
  { value: 'RTL_FLFO', label: 'Retailer-Non Essential - Retailer - Fuel (Office Only)' },
  { value: 'RTL_RTNR', label: 'Retailer-Non Essential - Retailer - Router Non Essential' },
  { value: 'RTL_RTRT', label: 'Retailer-Non Essential - Retailer - Router' },
  { value: 'RTL_FLUL', label: 'Retailer-Non Essential - Retailer - Fuel' },
  { value: 'RTL_MVCL', label: 'Retailer-Non Essential - Retailer - Motor Vehicle' },
  { value: 'RTL_MSPT', label: 'Retailer-Non Essential - Retailer - Motorcycle Spare Parts' },
  { value: 'RTL_LDST', label: 'Retailer-Non Essential - Retailer - Loading Station' },
  { value: 'RTL_PZZA', label: 'Retailer-Non Essential - Retailer - Pizza' },
  { value: 'RTL_CSIH', label: 'Retailer-Non Essential - Retailer - Construction Supply / Importer' },
  { value: 'RTL_DNSP', label: 'Retailer-Non Essential - Retailer - Dental Supplies' },
  { value: 'RTL_FEXT', label: 'Retailer-Non Essential - Retailer - Fire Extinguisher' },
  { value: 'RTL_FSUP', label: 'Retailer-Non Essential - Retailer - Food Supplements' },
  { value: 'RTL_MSSP', label: 'Retailer-Non Essential - Retailer - Motorcycle Spare Parts' },
  { value: 'RTL_ICRM', label: 'Retailer-Non Essential - Retailer - Ice Cream' },
  { value: 'RTL_ORGF', label: 'Retailer-Non Essential - Retailer - Organic Fertilizer' },
  { value: 'RTL_MGRC', label: 'Retailer-Non Essential - Retailer - Mini-Grocery' },
  { value: 'RTL_CMSC', label: 'Retailer-Non Essential - Retailer - Cosmetics' },
  { value: 'RTL_ECSU', label: 'Retailer-Non Essential - Retailer - Electronics Supply' },
  { value: 'RTL_GLAS', label: 'Retailer-Non Essential - Retailer - Glassware' },
  { value: 'RTL_PLST', label: 'Retailer-Non Essential - Retailer - Plastic Ware' },
  { value: 'RTL_FAAU', label: 'Retailer-Non Essential - Retailer - Firearms and Ammunition' },
  { value: 'RTL_ECGD', label: 'Retailer-Non Essential - Retailer - Electronics Gadget' },
  { value: 'RTL_PNTS', label: 'Retailer-Non Essential - Retailer - Paints' },
  { value: 'RTL_CAPS', label: 'Retailer-Non Essential - Retailer - Caps' },
  { value: 'RTL_BGS', label: 'Retailer-Non Essential - Retailer - Bags Shoes' },
  { value: 'RTL_SLVX', label: 'Retailer-Non Essential - Retailer - Silver Accessories' },
  { value: 'RTL_RLGI', label: 'Retailer-Non Essential - Retailer - Religious Item' },
  { value: 'RTL_SAPX', label: 'Retailer-Non Essential - Retailer - Soap' },
  { value: 'RTL_APRL', label: 'Retailer-Non Essential - Retailer - Apparels' },
  { value: 'RTL_TSHR', label: 'Retailer-Non Essential - Retailer - T-Shirts' },
  { value: 'RTL_CAKE', label: 'Retailer-Non Essential - Retailer - Cake' },
  { value: 'RTL_KAKN', label: 'Retailer-Non Essential - Retailer - Kakanin' },
  { value: 'RTL_UKAY', label: 'Retailer-Non Essential - Retailer - Ukay Ukay' },
  { value: 'RTL_SODK', label: 'Retailer-Non Essential - Retailer - Softdrinks' },
  { value: 'RTL_GLAL', label: 'Retailer-Non Essential - Retailer - Glass and Aluminum' },
  { value: 'RTL_HBPT', label: 'Retailer-Non Essential - Retailer - Herbal Beauty Products' },
  { value: 'RTL_CPNS', label: 'Retailer-Non Essential - Retailer - Computer Printer Services' },
  { value: 'RTL_FOOT', label: 'Retailer-Non Essential - Retailer - Footwear (Office Only)' },
  { value: 'RTL_CHEM', label: 'Retailer-Non Essential - Retailer - Cleaning Chemicals' },
  { value: 'RTL_MOTO', label: 'Retailer-Non Essential - Retailer - Motorcycle' },
  { value: 'RTL_MVBT', label: 'Retailer-Non Essential - Retailer - Motor Vehicle Battery' },
  { value: 'RTL_BUJU', label: 'Retailer-Non Essential - Retailer - Buko Juice' },
  { value: 'RTL_DUPM', label: 'Retailer-Non Essential - Retailer - Duplicator Machine' },
  { value: 'RTL_TIRE', label: 'Retailer-Non Essential - Retailer - Tire Supply' },
  { value: 'RTL_PINY', label: 'Retailer-Non Essential - Retailer - Pinoy Delicacies/Pasalubong' },
  { value: 'RTL_DVCA', label: 'Retailer-Non Essential - Retailer - Digital Video Camera Accessories' },
  { value: 'RTL_SURP', label: 'Retailer-Non Essential - Retailer - Surplus TV' },
  { value: 'RTL_DUMI', label: 'Retailer-Non Essential - Retailer - Duplicator Machine / Importer' },
  { value: 'RTL_HOFS', label: 'Retailer-Non Essential - Retailer - Hose Fittings' },
  { value: 'RTL_BOOK', label: 'Retailer-Non Essential - Retailer - Book' },
  { value: 'RTL_SKBP', label: 'Retailer-Non Essential - Retailer - Skateboard Parts Apparel' },
  { value: 'RTL_TISS', label: 'Retailer-Non Essential - Retailer - Tissue' },
  { value: 'RTL_TVMV', label: 'Retailer-Non Essential - Retailer - Tissue (Vending Machine)' },
  { value: 'RTL_BGA', label: 'Retailer-Non Essential - Retailer - Bags Accessories' },
  { value: 'RTL_RAGX', label: 'Retailer-Non Essential - Retailer - Rag' },
  { value: 'RTL_BSCT', label: 'Retailer-Non Essential - Retailer - Biscuit' },
  { value: 'RTL_IDSP', label: 'Retailer-Non Essential - Retailer - Industrial Spare Parts' },
  { value: 'RTL_DIAP', label: 'Retailer-Non Essential - Retailer - Diaper' },
  { value: 'RTL_STKR', label: 'Retailer-Non Essential - Retailer - Sticker' },
  { value: 'RTL_CCLM', label: 'Retailer-Non Essential - Retailer - Coco Lumber' },
  { value: 'WHO_NEC', label: 'Wholesaler / Exporter - Wholesaler - Non Essential Commodities' },
  { value: 'WHO_DIS', label: 'Wholesaler / Exporter - Distributor - Non Essential Commodities' },
  { value: 'WHO_EXP', label: 'Wholesaler / Exporter - Exporter - Non Essential Commodities' },
  { value: 'WHO_PRO', label: 'Wholesaler / Exporter - Producer - Non Essential Commodities' },
  { value: 'WHO_DEA', label: 'Wholesaler / Exporter - Dealer - Non Essential Commodities' },
  { value: 'WHO_SOF', label: 'Wholesaler / Exporter - Dealer - Softdrinks' },
  { value: 'WHO_BER', label: 'Wholesaler / Exporter - Dealer - Beer' },
  { value: 'WHO_APP', label: 'Wholesaler / Exporter - Dealer - Appliance' },
  { value: 'WHO_NECW', label: 'Wholesaler / Exporter - Wholesaler - Non Essential Commodities' },
  { value: 'WHO_MEX', label: 'Wholesaler / Exporter - Manufacturer / Exporter - Non Essential Commodities' },
  { value: 'WHO_LPG', label: 'Wholesaler / Exporter - Dealer - LPG' },
  { value: 'WHO_JNK', label: 'Wholesaler / Exporter - Wholesaler - Junkshop' },
  { value: 'WHO_AUT', label: 'Wholesaler / Exporter - Dealer - Automotive' },
  { value: 'WHO_LPGW', label: 'Wholesaler / Exporter - Wholesaler - LPG' },
  { value: 'WHO_CON', label: 'Wholesaler / Exporter - Wholesaler - Construction Materials' },
  { value: 'WHO_FUR', label: 'Wholesaler / Exporter - Wholesaler - Furniture' },
  { value: 'WHO_CNS', label: 'Wholesaler / Exporter - Wholesaler - Construction Supply' },
  { value: 'WHO_RICC', label: 'Wholesaler / Exporter - Dealer - Rice Corn' },
  { value: 'WHO_PFG', label: 'Wholesaler / Exporter - Wholesaler - Piggery Farm' },
  { value: 'WHO_WEX', label: 'Wholesaler / Exporter - Wholesaler - Exporter' },
  { value: 'WHO_WEO', label: 'Wholesaler / Exporter - Wholesaler - Exporter (Office Only)' },
  { value: 'WHO_DEI', label: 'Wholesaler / Exporter - Dealer - Importer - Non Essential Commodities' },
  { value: 'WHO_ECO', label: 'Wholesaler / Exporter - Dealer - Essential Commodities' },
  { value: 'WHO_WIL', label: 'Wholesaler / Exporter - Wholesaler - Wine Liquor' },
  { value: 'WHO_LGL', label: 'Wholesaler / Exporter - Dealer - Non Essential Commodities (Lights)' },
  { value: 'WHO_MTC', label: 'Wholesaler / Exporter - Dealer - Motorcycle' },
  { value: 'WHO_PTF', label: 'Wholesaler / Exporter - Wholesaler - Poultry Farm' },
  { value: 'WHO_OJNK', label: 'Wholesaler / Exporter - Wholesaler - Junkshop (Office Only)' },
  { value: 'WHO_RIC', label: 'Wholesaler / Exporter - Wholesaler - Rice' },
  { value: 'WHO_HEA', label: 'Wholesaler / Exporter - Wholesaler - Health Products' },
  { value: 'WHO_MTP', label: 'Wholesaler / Exporter - Dealer - Motorcycle Parts' },
  { value: 'WHO_NECI', label: 'Wholesaler / Exporter - Exporter / Importer - Non Essential Commodities' },
  { value: 'WHO_WHI', label: 'Wholesaler / Exporter - Wholesaler - Wholesaler / Importer' },
  { value: 'WHO_WNEC', label: 'Wholesaler / Exporter - Wholesaler - Importer - Non Essential Commodities' },
  { value: 'WHO_SOE', label: 'Wholesaler / Exporter - Dealer - School, Office Supplies Equipment' },
  { value: 'WHO_WAT', label: 'Wholesaler / Exporter - Distributor - Water Supply' },
  { value: 'WHO_SFTD', label: 'Wholesaler / Exporter - Distributor - Softdrinks' },
  { value: 'WHO_DSS', label: 'Wholesaler / Exporter - Wholesaler - Dental Supplies' },
  { value: 'WHO_RID', label: 'Wholesaler / Exporter - Dealer - Rice' },
  { value: 'WHO_BEA', label: 'Wholesaler / Exporter - Wholesaler - Beauty Products' },
  { value: 'WHO_SEC', label: 'Wholesaler / Exporter - Dealer - Security Equipment' },
  { value: 'WHO_BED', label: 'Wholesaler / Exporter - Distributor - Beauty Products' },
  { value: 'WHO_MED', label: 'Wholesaler / Exporter - Distributor - Medical Equipment' },
  { value: 'WHO_IMM', label: 'Wholesaler / Exporter - Importer - Medical Equipment' },
  { value: 'WHO_IEC', label: 'Wholesaler / Exporter - Wholesaler - Importer - Essential Commodities' },
  { value: 'WHO_PLS', label: 'Wholesaler / Exporter - Wholesaler - Importer - Poultry Livestock Supply' },
  { value: 'WHO_CBX', label: 'Wholesaler / Exporter - Wholesaler - Carton Box' },
  { value: 'WHO_WL', label: 'Wholesaler / Exporter - Dealer - Wine Liquor' },
  { value: 'WHO_HCL', label: 'Wholesaler / Exporter - Distributor - Household Cleaner' },
  { value: 'WHO_FDF', label: 'Wholesaler / Exporter - Dealer - Frozen Food' },
  { value: 'WHO_DNEC', label: 'Wholesaler / Exporter - Distributor - Non Essential Commodities / Importer' },
  { value: 'WHO_TSD', label: 'Wholesaler / Exporter - Wholesaler - Importer - Traffic Safety Device' },
  { value: 'WHO_BKS', label: 'Wholesaler / Exporter - Distributor - Books' },
  { value: 'WHO_STE', label: 'Wholesaler / Exporter - Wholesaler - Steel' },
  { value: 'WHO_FPD', label: 'Wholesaler / Exporter - Wholesaler - Food Products' },
  { value: 'WHO_PCT', label: 'Wholesaler / Exporter - Wholesaler - Packaging Tape' },
  { value: 'WHO_DCON', label: 'Wholesaler / Exporter - Dealer - Construction Materials' },
  { value: 'WHO_LED', label: 'Wholesaler / Exporter - Distributor - LED Light' },
  { value: 'WHO_HAN', label: 'Wholesaler / Exporter - Exporter - Handicraft Products' },
  { value: 'WHO_SSO', label: 'Wholesaler / Exporter - Wholesaler - School Supply Office Supply' },
  { value: 'WHO_SCRM', label: 'Wholesaler / Exporter - Wholesaler - Scrap Metal' },
  { value: 'WHO_DPMP', label: 'Wholesaler / Exporter - Distributor - Packaging Materials (Meat Processing Products)' },
  { value: 'WHO_FVR', label: 'Wholesaler / Exporter - Dealer - Fruits and Vegetables' },
  { value: 'WHO_HRP', label: 'Wholesaler / Exporter - Wholesaler - Herbal Product' },
  { value: 'WHO_BSC', label: 'Wholesaler / Exporter - Wholesaler - Biscuits' },
  { value: 'WHO_GOL', label: 'Wholesaler / Exporter - Wholesaler - Golf Products' },
  { value: 'WHO_MES', label: 'Wholesaler / Exporter - Wholesaler - Machinery, Equipment, and Supplies' },
  { value: 'WHO_BAN', label: 'Wholesaler / Exporter - Dealer - Banana' },
  { value: 'WHO_PHP', label: 'Wholesaler / Exporter - Distributor - Pharmaceutical Product' },
  { value: 'WHO_BEAS', label: 'Wholesaler / Exporter - Exporter - Beauty Soap' },
  { value: 'WHO_SVI', label: 'Wholesaler / Exporter - Distributor - Spices/Vanilla Product - Raw' },
  { value: 'WHO_IMP', label: 'Wholesaler / Exporter - Wholesaler - Importer' },
  { value: 'WHO_MSP', label: 'Wholesaler / Exporter - Wholesaler - Motorcycle Spare Parts' },
  { value: 'WHO_CAP', label: 'Wholesaler / Exporter - Wholesaler - Cap' },
  { value: 'WHO_PMP', label: 'Wholesaler / Exporter - Wholesaler - Importer - Packaging Materials for Meat Processing' },
  { value: 'WHO_LAB', label: 'Wholesaler / Exporter - Importer - Laboratory Equipment' },
  { value: 'WHO_MCP', label: 'Wholesaler / Exporter - Dealer - Machineries Parts (Office Only)' },
  { value: 'WHO_FSU', label: 'Wholesaler / Exporter - Distributor - Food Supplement' },
  { value: 'WHO_MVS', label: 'Wholesaler / Exporter - Dealer - Motor Vehicle Spare Parts / Importer' },
  { value: 'WHO_JWL', label: 'Wholesaler / Exporter - Exporter - Jewelries' },
  { value: 'WHO_PWA', label: 'Wholesaler / Exporter - Importer - Plastic Ware' },
  { value: 'WHO_MIW', label: 'Wholesaler / Exporter - Distributor - Mineral Water' },
  { value: 'WHO_CIT', label: 'Wholesaler / Exporter - Wholesaler - Cigarettes and Other Tobacco Products' },
  { value: 'WHO_SCRP', label: 'Wholesaler / Exporter - Wholesaler - Scrap' },
  { value: 'WHO_INEC', label: 'Wholesaler / Exporter - Importer - Non Essential Commodities' },
  { value: 'WHO_AFE', label: 'Wholesaler / Exporter - Dealer - Appliance Furniture' },
  { value: 'WHO_FDR', label: 'Wholesaler / Exporter - Dealer - Fruit Drinks' },
  { value: 'WHO_MVSP', label: 'Wholesaler / Exporter - Importer - Motor Vehicle Spare Parts' },
  { value: 'WHO_INP', label: 'Wholesaler / Exporter - Wholesaler - Industrial Products' },
  { value: 'WHO_CCL', label: 'Wholesaler / Exporter - Distributor - Cleaning Chemical' },
  { value: 'WHO_IECE', label: 'Wholesaler / Exporter - Exporter - Import/Export of Construction Equipment' },
  { value: 'WHO_APS', label: 'Wholesaler / Exporter - Wholesaler - Appliances' },
  { value: 'WHO_SOD', label: 'Wholesaler / Exporter - Wholesaler - Softdrinks' },
  { value: 'WHO_ONEC', label: 'Wholesaler / Exporter - Wholesaler - Importer - Non Essential Commodities (Office Only)' },
  { value: 'WHO_MSE', label: 'Wholesaler / Exporter - Wholesaler - Medical Supplies Equipment' },
  { value: 'WHO_LPGN', label: 'Wholesaler / Exporter - Wholesaler - LPG / Non Essential Commodities' },
  { value: 'WHO_BSD', label: 'Wholesaler / Exporter - Wholesaler - Beer / Softdrinks' },
  { value: 'WHO_ICE', label: 'Wholesaler / Exporter - Distributor - Ice' },
  { value: 'WHO_EGG', label: 'Wholesaler / Exporter - Dealer - Egg' },
  { value: 'WHO_BPS', label: 'Wholesaler / Exporter - Wholesaler - Beauty Products and Supplements' },
  { value: 'WHO_GLS', label: 'Wholesaler / Exporter - Wholesaler - Gloves/Shoes' },
  { value: 'WHO_TSS', label: 'Wholesaler / Exporter - Wholesaler - Tissue and Soap' },
  { value: 'WHO_KFD', label: 'Wholesaler / Exporter - Wholesaler - Korean Foods' },
  { value: 'WHO_AUS', label: 'Wholesaler / Exporter - Wholesaler - Auto Supply' },
  { value: 'WHO_CLM', label: 'Wholesaler / Exporter - Dealer - Coco Lumber' },
  { value: 'WHO_PLT', label: 'Wholesaler / Exporter - Wholesaler - Pallet' },
  { value: 'WHO_LBR', label: 'Wholesaler / Exporter - Wholesaler - Lumber' },
  { value: 'WHO_BST', label: 'Wholesaler / Exporter - Distributor - Biscuit' },
  { value: 'WHO_DMP', label: 'Wholesaler / Exporter - Distributor - Del Monte Products' },
  { value: 'WHO_RTW', label: 'Wholesaler / Exporter - Wholesaler - RTW' },
  { value: 'WHO_PLY', label: 'Wholesaler / Exporter - Wholesaler - Plywood' },
  { value: 'WHO_EVS', label: 'Wholesaler / Exporter - Event Supplier' },
  { value: 'WHO_YAK', label: 'Wholesaler / Exporter - Wholesale - Yakult' },
  { value: 'WHO_DCT', label: 'Wholesaler / Exporter - Wholesaler - Drum and Container' },
  { value: 'WHO_PET', label: 'Wholesaler / Exporter - Importer - Petroleum Products / Office Only' },
  { value: 'WHO_IECS', label: 'Wholesaler / Exporter - Import/Export Construction Materials / Wholesaler - Construction Supply' },
  { value: 'WHO_EBT', label: 'Wholesaler / Exporter - Wholesaler - Empty Bottle' },
  { value: 'WHO_WLSD', label: 'Wholesaler / Exporter - Dealer - Wine Liquor / Softdrinks' },
  { value: 'WHO_CAR', label: 'Wholesaler / Exporter - Wholesaler - Car Accessories' },
  { value: 'WHO_WSP', label: 'Wholesaler / Exporter - Distributor - Water Service Provider' },
  { value: 'WHO_RMI', label: 'Wholesaler / Exporter - Distributor - Raw Materials Import/Export' },
  { value: 'WHO_ELE', label: 'Wholesaler / Exporter - Importer - Electronics' },
  { value: 'WHO_INDP', label: 'Wholesaler / Exporter - Importer - Industrial Products' },
  { value: 'WHO_FDS', label: 'Wholesaler / Exporter - Wholesaler - Food Supplement' },
  { value: 'WHO_HYS', label: 'Wholesaler / Exporter - Wholesaler - Hydraulic Hose' },
  { value: 'WHO_HYI', label: 'Wholesaler / Exporter - Importer - Hydraulic Hose' },
  { value: 'WHO_DSD', label: 'Wholesaler / Exporter - Importer / Exporter - Dental Supplies/Devices' },
  { value: 'WHO_RTX', label: 'Wholesaler / Exporter - Wholesaler - Rugs / Textile' },
  { value: 'WHO_NECO', label: 'Wholesaler / Exporter - Wholesaler - Non Essential Commodities (Office Only)' },
  { value: 'WHO_IME', label: 'Wholesaler / Exporter - Wholesaler - Industrial Machinery Equipment (Office Only)' },
  { value: 'WHO_ALC', label: 'Wholesaler / Exporter - Distributor - Alcohol' },
  { value: 'WHO_OPL', label: 'Wholesaler / Exporter - Wholesaler - Ornamental Plants' },
  { value: 'WHO_SMC', label: 'Wholesaler / Exporter - Wholesaler - Surplus Machineries' },
  { value: 'WHO_GRM', label: 'Wholesaler / Exporter - Exporter - Garments' },
  { value: 'WHO_DMSE', label: 'Wholesaler / Exporter - Distributor - Medical Supplies Equipment' },
  { value: 'WHO_FFD', label: 'Wholesaler / Exporter - Frozen Food Products' },
  { value: 'WHO_SPS', label: 'Wholesaler / Exporter - Distributor/Importer - Spices' },
  { value: 'WHO_PBG', label: 'Wholesaler / Exporter - Wholesaler - Plastic Bag' },
  { value: 'WHO_PNT', label: 'Wholesaler / Exporter - Wholesaler / Importer of Paint' },
  { value: 'WHO_SCM', label: 'Wholesaler / Exporter - Importer - Scrap Metal' },
  { value: 'WHO_CPA', label: 'Wholesaler / Exporter - Wholesaler - Computer Parts and Accessories' },
  { value: 'WHO_SWD', label: 'Wholesaler / Exporter - Wholesaler - Scrap Wood' },
  { value: 'WHO_CTM', label: 'Wholesaler / Exporter - Importer - Construction Materials' },
  { value: 'WHO_TLB', label: 'Wholesaler / Exporter - Distributor/Importer - Tire, Lubricant, Battery' },
  { value: 'WHO_CSO', label: 'Wholesaler / Exporter - Distributor - Computer Software' },
  { value: 'WHO_RCE', label: 'Wholesaler-Essential - Dealer - Rice' },
  { value: 'WHO_MPP', label: 'Wholesaler-Essential - Wholesaler - Medicinal and Pharmaceutical Products' },
  { value: 'WHO_OSE', label: 'Wholesaler-Essential - Wholesaler - Oil and Sugar' },
  { value: 'WHO_MPR', label: 'Wholesaler-Essential - Wholesaler - Importer - Marine Products' },
  { value: 'WHO_DPHP', label: 'Wholesaler-Essential - Distributor - Pharmaceutical Product' },
  { value: 'WHO_WEGG', label: 'Wholesaler-Essential - Wholesaler - Egg' },
  { value: 'WHO_CHK', label: 'Wholesaler-Essential - Dealer - Chicken' },
  { value: 'WHO_OSF', label: 'Wholesaler-Essential - Wholesaler - Office Supplies and Printed Form' },
  { value: 'WHO_OSP', label: 'Wholesaler-Essential - Wholesaler - Office Supply' },
  { value: 'WHO_WRCE', label: 'Wholesaler-Essential - Wholesaler - Rice' },
  { value: 'WHO_IGS', label: 'Wholesaler-Essential - Distributor - Industrial Gas' },
  { value: 'WHO_AGP', label: 'Wholesaler-Essential - Distributor - Agricultural Products' },
  { value: 'WHO_FMS', label: 'Wholesaler-Essential - Retailer - Frozen Meat and Seafood Products' },
  { value: 'WHO_ECE', label: 'Wholesaler-Essential - Importer / Exporter - Essential Commodities' },
  { value: 'WHO_WPHP', label: 'Wholesaler-Essential - Wholesaler - Importer - Pharmaceutical Products' },
  { value: 'WHO_FMP', label: 'Wholesaler-Essential - Wholesaler - Frozen Meat Products' },
  { value: 'WHO_PST', label: 'Wholesaler-Essential - Wholesaler - Pesticides' },
  { value: 'WHO_ECM', label: 'Wholesaler-Essential - Wholesaler - Essential Commodities' },
  { value: 'WHO_DEC', label: 'Wholesaler-Essential - Distributors - Essential Commodities' },
  { value: 'WHO_RCO', label: 'Wholesaler-Essential - Distributor - Rice and Corn' },
  { value: 'WHO_RCN', label: 'Wholesaler-Essential - Dealer - Rice and Corn' },
  { value: 'WHO_WCF', label: 'Wholesaler-Essential - Dealer - Wheat or Cassava Flour' },
  { value: 'WHO_MET', label: 'Wholesaler-Essential - Dealer - Meat' },
  { value: 'WHO_DDP', label: 'Wholesaler-Essential - Dealer - Dairy Products' },
  { value: 'WHO_PPF', label: 'Wholesaler-Essential - Dealer - Processed or Preserved Food' },
  { value: 'WHO_SGR', label: 'Wholesaler-Essential - Dealers - Sugar' },
  { value: 'WHO_DLPG', label: 'Wholesaler-Essential - Dealer - LPG' },
  { value: 'WHO_CEM', label: 'Wholesaler-Essential - Dealer - Cement' },
  { value: 'WHO_SGRD', label: 'Wholesaler-Essential - Distributor - Sugar' },
  { value: 'WHO_DMED', label: 'Wholesaler-Essential - Distributor - Medicine' },
  { value: 'WHO_COI', label: 'Wholesaler-Essential - Distributor - Cooking Oil' },
  { value: 'WHO_LNS', label: 'Wholesaler-Essential - Distributor - Laundry Soap' },
  { value: 'WHO_DDET', label: 'Wholesaler-Essential - Distributor - Detergents' },
  { value: 'WHO_DSLT', label: 'Wholesaler-Essential - Distributor - Salt' },
  { value: 'WHO_FRT', label: 'Wholesaler-Essential - Distributor - Fertilizers' },
  { value: 'WHO_PSTC', label: 'Wholesaler-Essential - Distributor - Pesticides' },
  { value: 'WHO_INST', label: 'Wholesaler-Essential - Distributor - Insecticides' },
  { value: 'WHO_PFDS', label: 'Wholesaler-Essential - Distributor - Poultry Feeds and Other Animal Feeds' },
  { value: 'WHO_DSHS', label: 'Wholesaler-Essential - Distributor - School Supplies' },
  { value: 'WHO_LPGD', label: 'Wholesaler-Essential - Distributor - LPG' },
  { value: 'WHO_RCNC', label: 'Wholesaler-Essential - Wholesaler - Rice and Corn' },
  { value: 'WHO_LNSO', label: 'Wholesaler-Essential - Wholesaler - Laundry Soap' },
  { value: 'WHO_DETO', label: 'Wholesaler-Essential - Wholesaler - Detergent' },
  { value: 'WHO_WWCF', label: 'Wholesaler-Essential - Wholesaler - Wheat or Cassava Flour' },
  { value: 'WHO_WDDP', label: 'Wholesaler-Essential - Wholesaler - Dairy Products' },
  { value: 'WHO_WMET', label: 'Wholesaler-Essential - Wholesaler - Meat' },
  { value: 'WHO_WSGR', label: 'Wholesaler-Essential - Wholesaler - Sugar' },
  { value: 'WHO_SLT', label: 'Wholesaler-Essential - Wholesaler - Salt' },
  { value: 'WHO_WMED', label: 'Wholesaler-Essential - Wholesaler - Medicine' },
  { value: 'WHO_WPFS', label: 'Wholesaler-Essential - Wholesaler - Poultry Feeds and Other Animal Feeds' },
  { value: 'WHO_WCEM', label: 'Wholesaler-Essential - Wholesaler - Cement' },
  { value: 'WHO_DAGP', label: 'Wholesaler-Essential - Dealer - Agricultural Products' },
  { value: 'WHO_DESC', label: 'Wholesaler-Essential - Dealer - Essential Commodities' },
  { value: 'WHO_MFP', label: 'Wholesaler-Essential - Dealer - Marine and Freshwater Products' },
  { value: 'WHO_DMDC', label: 'Wholesaler-Essential - Dealer - Medicine' },
  { value: 'WHO_DSSP', label: 'Wholesaler-Essential - Dealer - School Supplies' },
  { value: 'WHO_LSD', label: 'Wholesaler-Essential - Dealer - Laundry Soap and/or Detergent' },
  { value: 'WHO_DSEC', label: 'Wholesaler-Essential - Distributor - Essential Commodities' },
  { value: 'WHO_DECD', label: 'Wholesaler-Essential - Dealer - Essential Commodities' },
  { value: 'WHO_NM', label: 'Wholesaler-Essential - Distributor - Newspaper and Magazines' },
  { value: 'WHO_PFAE', label: 'Wholesaler-Essential - Distributor - Poultry, Agricultural, and Food Equipment' },
  { value: 'WHO_WHL', label: 'Wholesaler-Essential - Distributor - Wholesaler' },
  { value: 'WHO_CHC', label: 'Wholesaler-Essential - Distributor - Chicken' },
  { value: 'WHO_CHCK', label: 'Wholesaler-Essential - Distributor Chicken' },
  { value: 'WHO_PFFD', label: 'Wholesaler-Essential - Distributor - Poultry Feeds and Food Equipment / Importer' },
  { value: 'WHO_DSFD', label: 'Wholesaler-Essential - Distributor - Soft Drinks' },
  { value: 'WHO_VEG', label: 'Wholesaler-Essential - Dealer - Vegetables' },
  { value: 'WHO_SSOF', label: 'Wholesaler-Essential - Wholesaler - School Supply Office Supply' },
  { value: 'WHO_SFD', label: 'Wholesaler-Essential - Dealer - Seafoods' },
  { value: 'WHO_FLR', label: 'Wholesaler-Essential - Distributor - Flour' },
];


// Map for business nature for display purposes
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
  "CNT_RNTS": "Contractor - Contractor - Rental Services",
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
  "MFR_HERB": "Manufacturer / Producer - Manufacturer - Herbal Products",
  "MFR_CHAR": "Manufacturer / Producer - Manufacturer - Charcoal",
  "MFR_TOKW": "Manufacturer / Producer - Manufacturer - Tokwa",
  "MFR_ESSE": "Manufacturer / Producer - Producer - Essential Commodities (Office Only)",
  "MFR_GASI": "Manufacturer / Producer - Manufacturer - Import / Export Industrial Gas",
  "MFR_RM": "Manufacturer / Producer - Rice Mill - Office Only",
  "MFR_SUGA": "Manufacturer / Producer - Producer - Sugarcane Farm",
  "MFR_ICEC": "Manufacturer / Producer - Manufacturer - Ice Cream",
  "MFR_LAUN": "Manufacturer / Producer - Manufacturer - Laundry Soap",
  "MFR_DETE": "Manufacturer / Producer - Manufacturer - Detergents",
  "MFR_MEDI": "Manufacturer / Producer - Manufacturer / Repacker - Medicines",
  "MFR_ERC": "Manufacturer / Producer - Exporter - Rice and Corn",
  "MFR_EWH": "Manufacturer / Producer - Exporter - Wheat or Cassava Flour",
  "MFR_COOK": "Manufacturer / Producer - Manufacturer - Cooking Oil",
  "MFR_RWH": "Manufacturer / Producer - Repacker - Wheat or Cassava Flour",
  "MFR_WHET": "Manufacturer / Producer - Miller - Wheat",
  "MFR_RICE": "Manufacturer / Producer - Repacker - Rice and Corn",
  "MFR_MEAT": "Manufacturer / Producer - Exporter - Meat",
  "MFR_PF": "Manufacturer / Producer - Manufacturer - Poultry Feeds and Other Animal Feeds",
  "MFR_SCHL": "Manufacturer / Producer - Manufacturer - School Supplies",
  "MFR_CEMT": "Manufacturer / Producer - Manufacturer - Cement",
  "MFR_LPG": "Manufacturer / Producer - Manufacturer - LPG",
  "MFR_PROF": "Manufacturer / Producer - Repacker - Processed or Preserved Food",
  "MFR_MILL": "Manufacturer / Producer - Miller - Rice and Corn",
  "MFR_PROC": "Manufacturer / Producer - Manufacturer - Processed or Preserved Foods",
  "MFR_SALT": "Manufacturer / Producer - Manufacturer - Salt",
  "MFR_SUGR": "Manufacturer / Producer - Manufacturer - Sugar",
  "MFR_EXSG": "Manufacturer / Producer - Exporter - Sugar",
  "MFR_AGRI": "Manufacturer / Producer - Exporter - Agricultural, Marine, and Freshwater Products",
  "MFR_ELS": "Manufacturer / Producer - Exporter - Laundry Soap",
  "MFR_DETR": "Manufacturer / Producer - Exporter - Detergents",
  "MFR_MEDC": "Manufacturer / Producer - Exporter - Medicine",
  "MFR_EXCT": "Manufacturer / Producer - Exporter - Cement",
  "MFR_DAIR": "Manufacturer / Producer - Exporter - Dairy Products",
  "MFR_EMET": "Manufacturer / Producer - Exporter - Meat",
  "MFR_FEED": "Manufacturer / Producer - Exporter - Poultry Feeds and Other Animal Feeds",
  "MFR_COKO": "Manufacturer / Producer - Exporter - Cooking Oil",
  "MFR_AGIM": "Manufacturer / Producer - Manufacturer - Agricultural Implements, Equipment, and Post-Harvest Facilities",
  "MFR_FERT": "Manufacturer / Producer - Manufacturer - Fertilizers",
  "MFR_PEST": "Manufacturer / Producer - Manufacturer - Pesticides, Insecticides",
  "MFR_RCRN": "Manufacturer / Producer - Repackers - Rice and Corn",
  "MFR_WFLO": "Manufacturer / Producer - Repackers - Wheat or Cassava Flour",
  "MFR_RSUG": "Manufacturer / Producer - Repacker - Sugar",
  "MFR_RSAL": "Manufacturer / Producer - Repacker - Salt",
  "MFR_RCOK": "Manufacturer / Producer - Repacker - Cooking Oil",
  "MFR_RDET": "Manufacturer / Producer - Repacker - Detergents",
  "MFR_RPST": "Manufacturer / Producer - Repacker - Pesticides",
  "MFR_RFRT": "Manufacturer / Producer - Repacker - Fertilizers",
  "MFR_RINS": "Manufacturer / Producer - Repacker - Insecticides",
  "MFR_RFED": "Manufacturer / Producer - Repacker - Poultry Feeds and Other Animal Feeds",
  "MFR_EXES": "Manufacturer / Producer - Exporter - Other Essential Commodities",
  "MFR_ECMP": "Manufacturer / Producer - Producer - Essential Commodities",
  "MFR_MXES": "Manufacturer / Producer - Manufacturer / Exporter - Essential Commodities",
  "MFR_ESEN": "Manufacturer / Producer - Manufacturer - Essential Commodities",
  "MFR_MRCE": "Manufacturer / Producer - Miller - Rice Mill",
  "MFR_EXNS": "Manufacturer / Producer - Exporter - Non-Essential Commodities",
  "MFR_RJMC": "Manufacturer / Producer - Repacker - Janitorial Maintenance Chemicals",
  "MFR_PSP": "Manufacturer / Producer - Manufacturer - Soap",
  "MFR_RNES": "Manufacturer / Producer - Repacker - Non-Essential Commodities",
  "MFR_TAHO": "Manufacturer / Producer - Manufacturer - TAHO",
  "MFR_DONT": "Manufacturer / Producer - Manufacturer - Donut",
  "MFR_SIOP": "Manufacturer / Producer - Manufacturer - Siopao",
  "MFR_JUCS": "Manufacturer / Producer - Manufacturer - Juices",
  "MFR_PUTO": "Manufacturer / Producer - Manufacturer - Puto",
  "MFR_LWRP": "Manufacturer / Producer - Manufacturer - Lumpia Wrapper",
  "MFR_FPWD": "Manufacturer / Producer - Manufacturer - Foot Powder",
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
  "OPR_CKPT": "Operator - Cockpit - Operator - Cockpit",
  "OPR_PRMT": "Operator - Cockpit - Promoter - Ordinary Operator",
  "OPR_PNTS": "Operator - Cockpit - Promoter - Pintakasi / Concierto",
  "OPR_TSLB": "Operator - Cockpit - Operator - Telesabong",
  "OPR_GLNK": "Operator - Golf Links - Operator - Golf Links",
  "OPR_CEME": "Operator - Private Cemeteries - Private Cemeteries / Memorial Parks",
  "OPR_MKET": "Operator - Privately Owned Market - Privately Owned Public Market",
  "OPR_CAFE": "Operator - Restaurant - Cafe - Cafe",
  "OPR_CFTR": "Operator - Restaurant - Cafeteria - Cafeteria",
  "OPR_ICRM": "Operator - Restaurant - Ice Cream - Ice Cream and Other Refreshment Operator",
  "OPR_REST": "Operator - Restaurant - Restaurant - Restaurant Operator",
  "OPR_CARN": "Operator - Restaurant - Carinderia - Carinderia",
  "OPR_PNCT": "Operator - Restaurant - Panciteria - Panciteria",
  "OPR_SODA": "Operator - Restaurant - Soda Fountain Bar - Soda Fountain Bar",
  "OPR_CATR": "Operator - Restaurant - Food Caterer - Food Caterer",
  "OPR_SEST": "Operator - Restaurant - Similar Establishment",
  "OPR_CNTN": "Operator - Restaurant - Similar Establishment - Canteen",
  "OPR_EATR": "Operator - Restaurant - Similar Establishment - Eatery",
  "OPR_FFOD": "Operator - Restaurant - Similar Establishment - Fastfood",
  "OPR_FSTD": "Operator - Restaurant - Similar Establishment - Foodstand",
  "OPR_CFSH": "Operator - Restaurant - Cafeteria - Coffee Shop",
  "OPR_FCTO": "Operator - Restaurant - Food - Food Caterer (Office Only)",
  "OPR_RTOF": "Operator - Restaurant - Restaurant - Office Only",
  "OPR_FBVO": "Operator - Restaurant - Similar - Food Beverage (Office Only)",
  "OPR_GRIL": "Operator - Restaurant - Restaurant - Grille",
  "OPR_GRLL": "Operator - Restaurant - Restaurant - Grill",
  "OPR_TEAH": "Operator - Restaurant - Similar - Tea House",
  "OPR_RFRT": "Operator - Restaurant - Restaurant - Refreshment",
  "OPR_CFTS": "Operator - Restaurant - Cafeteria - Coffee and Tea Shop",
  "OPR_FBVG": "Operator - Restaurant - Restaurant - Food Beverage",
  "OPR_SUBD": "Operator - Subdivision - Subdivision Operator - Subdivision Operator",
  "OPR_RESD": "Operator - Subdivision - Real Estate Developer - Real Estate Developer",
  "OPR_ROFF": "Operator - Subdivision - Real Estate Developer (Office Only)",
  "OPR_THTR": "Operator - Theaters - Operator - Theater Operator",
  "OPR_CINE": "Operator - Theaters - Operator - Cinemahouse",
  "OPR_VMHS": "Operator - Theaters - Operator - Video-Movie House Utilizing BETA, VHS, JVC, Laser Disc Player, or Similar Apparatus",
  "OPR_SHWH": "Operator - Theaters - Operator - Showhouse Open to the Public for-a-fee",
  "OPR_TLSB": "Operator - Theaters - Operator - Telesabong",
  "OPR_OLBS": "Operator - Theaters - Operator - On-Line Betting Station",
  "OTC_ACCT": "Other Contractor - Other Contractor - Accounting Firms or Offices Rendering Accounting or Bookkeeping Services",
  "OTC_ACTR": "Other Contractor - Other Contractor - Actuarial or Appraisal Offices",
  "OTC_ADAG": "Other Contractor – Other Contractor - Advertising Agencies",
  "OTC_BBKS": "Other Contractor - Other Contractor - Belt and Buckle Shops",
  "OTC_BROK": "Other Contractor - Other Contractor - Brokering Offices (Real Brokers, Custom Brokers, and Similar Ones)",
  "OTC_BSMN": "Other Contractor - Other Contractor - Business Management Firms/Offices",
  "OTC_CRPN": "Other Contractor - Other Contractor - Carpentry Shops",
  "OTC_COMM": "Other Contractor - Other Contractor - Communications or Wire Services (Radio, Telegraph, Telefax, etc.)",
  "OTC_REPR": "Other Contractor - Other Contractor - Computer or Electronic Repair Centers or Shops",
  "OTC_CNST": "Other Contractor - Other Contractor - Consultancy Firms/Offices",
  "OTC_DFAS": "Other Contractor - Other Contractor - Drafting or Fine Arts Shops, Painting or Sign Shops",
  "OTC_EMPL": "Other Contractor - Other Contractor - Employment Agencies",
  "OTC_ENGR": "Other Contractor - Other Contractor - Engineering Offices Rendering Services on Architectural, Civic, Chemical, Electric",
  "OTC_FLOW": "Other Contractor - Other Contractor - Flower Shops Not Engaged in Wholesale or Retail but Rendering Services Upon Order",
  "OTC_FRGT": "Other Contractor - Other Contractor - Freight Services, Trucking Services",
  "OTC_PAWS": "Other Contractor - Other Contractor - House Painting Shops/House Wiring Shops",
  "OTC_ICEC": "Other Contractor - Other Contractor - Ice and Cold Storage for-a-fee",
  "OTC_INDR": "Other Contractor - Other Contractor - Interior Decoration Offices or Shops",
  "OTC_JKGY": "Other Contractor - Other Contractor - Judo-Karate Gyms for-a-fee",
  "OTC_LDSP": "Other Contractor - Other Contractor - Landscaping Contracting Offices or Shops",
  "OTC_LTHM": "Other Contractor - Other Contractor - Lathe Machine Shops",
  "OTC_LAWF": "Other Contractor - Other Contractor - Law Offices Rendering Legal or Notarial Services",
  "OTC_CLNC": "Other Contractor - Other Contractor - Medical Clinics, Dental Clinics, Optical Clinics, and Similar Clinics",
  "OTC_SCHL": "Other Contractor - Other Contractor - Operators of Dancing, Driving, Judo-Karate Schools",
  "OTC_PPRS": "Other Contractor - Other Contractor - Perma-Press Shops",
  "OTC_HOSP": "Other Contractor - Other Contractor - Private Hospitals and Private Educational Institutions",
  "OTC_PROM": "Other Contractor - Other Contractor - Promotion Offices or Agencies, Promoters of Shows, Games, or Performances",
  "OTC_DUPL": "Other Contractor - Other Contractor - Recopying or Duplicating, Xerox Copying or Mimeographing Services",
  "OTC_RENT": "Other Contractor - Other Contractor - Rental Agencies/Offices/Shops Renting Out for-a-fee Machines, Apparatuses, Equipment",
  "OTC_RPHA": "Other Contractor - Other Contractor - Repair Centers/Shops for Home Appliances",
  "OTC_RTAG": "Other Contractor - Other Contractor - Rental Agencies/Offices/Shops",
  "OTC_RPME": "Other Contractor - Other Contractor - Repair Center/Shops for Medical Equipment",
  "OTC_RPCO": "Other Contractor - Other Contractor - Repair Shops for Computers and Other Electronic Equipment",
  "OTC_SCUL": "Other Contractor - Other Contractor - Sculpture Shops",
  "OTC_SRVM": "Other Contractor - Other Contractor - Service Stations for Motor Vehicles",
  "OTC_SRVO": "Other Contractor - Other Contractor - Surveying Offices (Private Land Surveying or Geodetic)",
  "OTC_TTRM": "Other Contractor - Other Contractor - Transportation Terminals for-a-fee",
  "OTC_VACI": "Other Contractor - Other Contractor - Vaciador Shops",
  "OTC_VCSR": "Other Contractor - Other Contractor - Video Coverage Services",
  "OTC_WTCH": "Other Contractor - Other Contractor - Watch Repair Center or Shop",
  "OTC_SIML": "Other Contractor - Other Contractor - Other Similar Establishment Rendering or Offering to Render Services for-a-fee",
  "OTC_BLLP": "Other Contractor - Other Contractor - Bill Payment",
  "OTC_MNPS": "Other Contractor - Other Contractor - Manpower Service",
  "OTC_JNTS": "Other Contractor - Other Contractor - Janitorial Service",
  "OTC_PEST": "Other Contractor - Other Contractor - Pest Control",
  "OTC_JWLR": "Other Contractor - Other Contractor - Jewelry Repair Shop",
  "OTC_NPPR": "Other Contractor - Other Contractor - Newspaper Publication",
  "OTC_HAUL": "Other Contractor - Other Contractor - Hauling Services",
  "OTC_PRTG": "Other Contractor - Other Contractor - Printing",
  "OTC_PRTS": "Other Contractor - Other Contractor - Printing Services",
  "OTC_WRTY": "Other Contractor - Other Contractor - Warranty Services",
  "OTC_KDCT": "Other Contractor - Other Contractor - Rental Kiddie Carts",
  "OTC_RAMD": "Other Contractor - Other Contractor - Rental of Amusement Devices",
  "OTC_MCLN": "Other Contractor - Other Contractor - Medical Clinic",
  "OTC_RNTS": "Other Contractor - Other Contractor - Rentals of Chairs, Tables, Utensils",
  "OTC_RPRC": "Other Contractor - Other Contractor - Repair Shop",
  "OTC_RMUS": "Other Contractor - Other Contractor - Rental of Musical Instruments/Apparatuses",
  "OTC_VETC": "Other Contractor - Other Contractor - Veterinary Clinic",
  "OTC_PRPR": "Other Contractor - Other Contractor - Printing Press",
  "OTC_FRMS": "Other Contractor - Other Contractor - Frame Shop",
  "OTC_DRVS": "Other Contractor - Other Contractor - Driving School",
  "OTC_GWRS": "Other Contractor - Other Contractor - Gift Wrapping Services",
  "OTC_RVCL": "Other Contractor - Other Contractor - Rental of Vehicles",
  "OTC_PVTS": "Other Contractor - Other Contractor - Private School",
  "OTC_OPTC": "Other Contractor - Other Contractor - Optical Clinic",
  "OTC_TRTC": "Other Contractor - Other Contractor - Training Center",
  "OTC_DNTC": "Other Contractor - Other Contractor - Dental Clinic",
  "OTC_CMWS": "Other Contractor - Other Contractor - Communications or Wire Services",
  "OTC_TPHC": "Other Contractor - Other Contractor - Therapy Clinic",
  "OTC_INST": "Other Contractor - Other Contractor - Installation Services",
  "OTC_PRMA": "Other Contractor - Other Contractor - Promotional Agency",
  "OTC_BKPB": "Other Contractor - Other Contractor - Books Publication",
  "OTC_FWDS": "Other Contractor - Other Contractor - Forwarding Services",
  "OTC_FWOF": "Other Contractor - Other Contractor - Forwarding Services (Office Only)",
  "OTC_NPOF": "Other Contractor - Other Contractor - Newspaper Publication (Office Only)",
  "OTC_SKNC": "Other Contractor - Other Contractor - Skin Clinic",
  "OTC_GRMS": "Other Contractor - Other Contractor - Garments Subcontractor",
  "OTC_FRGO": "Other Contractor - Other Contractor - Freight Services/Trucking Services (Office Only)",
  "OTC_VEDS": "Other Contractor - Other Contractor - Video Editing Services",
  "OTC_TTGO": "Other Contractor - Other Contractor - Transportation Terminals (Garage Only)",
  "OTC_TUTS": "Other Contractor - Other Contractor - Tutorial Services",
  "OTC_RNOS": "Other Contractor - Other Contractor - Rendering Other Services",
  "OTC_RNLB": "Other Contractor - Other Contractor - Rental of Books",
  "OTC_INKR": "Other Contractor - Other Contractor - Ink Refilling Services",
  "OTC_CDPO": "Other Contractor - Other - Collection Dispatching Office",
  "OTC_DNTL": "Other Contractor - Other - Dental Laboratories",
  "OTC_DRTL": "Other Contractor - Other - Drug Testing Laboratory",
  "OTC_GRTO": "Other Contractor - Other - Garage and Terminal Office (Without Service Facilities)",
  "OTC_RNDG": "Other Contractor - Other - Rental of Dresses and Gowns",
  "OTC_ANBC": "Other Contractor - Other - Animal Bite Clinic",
  "OTC_MCMS": "Other Contractor - Other - Music Composition/Musical Arrangement",
  "OTC_OPVH": "Other Contractor - Other Contractor - Private Hospital",
  "OTC_PVTH": "Other Contractor - Private Hospital",
  "OTC_PHO": "Other Contractor - Other - Private Hospital",
  "OTC_OPH": "Other Contractor - Other Contractor - Private Hospital",
  "OTC_RVWC": "Other Contractor - Other - Review Center",
  "OTC_ACCO": "Other Contractor - Other - Accounting Consultancy Office",
  "OTC_EVOR": "Other Contractor - Other - Events Organizer/Coordinator",
  "OTC_JTHS": "Other Contractor - Other - Janitorial Service/Helmet Depository",
  "OTC_ML": "Other Contractor - Other - Medical Laboratory",
  "OTC_MDAG": "Other Contractor - Other - Modeling Agency",
  "OTC_BBDS": "Other Contractor - Other - Brake Bonding Services",
  "OTC_CIAD": "Other Contractor - Other - Cinema Advertisement",
  "OTC_PRTN": "Other Contractor - Other - Party Needs",
  "OTC_FRNO": "Other Contractor - Other - Franchising Office",
  "OTC_MKTO": "Other Contractor - Other - Marketing Office",
  "OTC_INPS": "Other Contractor - Other - Installation Ports and Networking Services",
  "OTC_MDL": "Other Contractor - Other - Medical/Diagnostic Laboratories",
  "OTC_FASH": "Other Contractor - Other - Fashion Boutique",
  "OTC_PSVS": "Other Contractor - Other - Private School/Vocational School",
  "OTC_ARCD": "Other Contractor - Contractor - Architectural Design Services",
  "OTC_SCHC": "Other Contractor - Other - Special Child Center",
  "OTC_SHUT": "Other Contractor - Other - Shuttle Services",
  "OTC_TKTS": "Other Contractor - Other - Ticketing/Bills Payment/Courier Services/Loading",
  "OTC_MDCL": "Other Contractor - Other - Medical Clinic w/ Laboratory",
  "OTC_MUSC": "Other Contractor - Other - Music Studio",
  "OTC_PNCN": "Other Contractor - Other - Party Needs Catering Services",
  "OTC_ANCL": "Other Contractor - Other - Animal Clinic",
  "OTC_TWSV": "Other Contractor - Other - Towing Services",
  "OTC_RPTE": "Other Contractor - Other - Rental of Printing Equipment",
  "OTC_HDSC": "Other Contractor - Other - Hemodialysis Center",
  "OTC_WLDS": "Other Contractor - Other - Welding Shop",
  "OTC_BKOF": "Other Contractor - Other - Basketball Officiating",
  "OTC_WXSL": "Other Contractor - Other - Waxing Salon",
  "OTC_ANGL": "Other Contractor - Other - Animal Grooming Salon",
  "OTC_BLRS": "Other Contractor - Other - Boiler Repair",
  "OTC_SBCT": "Other Contractor - Other - Subcontractor-Rendering Other Services",
  "OTC_TRSC": "Other Contractor - Other - Training Center-Security",
  "OTC_TKOF": "Other Contractor - Other - Ticketing Office",
  "OTC_TFSV": "Other Contractor - Other - Tours Services for Field Trip",
  "OTC_REHE": "Other Contractor - Other - Rental of Heavy Equipment",
  "OTC_CICS": "Other Contractor - Other - Car Interior and Custom Services",
  "OTC_RAGC": "Other Contractor - Other - Recruitment Agency",
  "OTC_FLMS": "Other Contractor - Contractor - Film Studio",
  "OTC_HLSV": "Other Contractor - Other - Health Services",
  "OTC_MFSV": "Other Contractor - Other - Messenger and Forwarding Services",
  "OTC_GTSF": "Other Contractor - Other - Garage and Terminal Office (With Service Facilities)",
  "OTC_TSIT": "Other Contractor - Other - Tiles and Stone Installation",
  "OTC_GMNT": "Other Contractor - Contractor - Garments Contractor",
  "OTC_CBW": "Other Contractor - Other - Custom Bonded Warehouse",
  "OTC_SEBT": "Other Contractor - Other - Soil Exploration/Boring Test",
  "OTC_INFB": "Other Contractor - Other - Information Booth",
  "OTC_AELC": "Other Contractor - Other - Auto Electrical Shop",
  "OTC_EMBS": "Other Contractor - Other - Embroidery Shop",
  "OTC_CSBR": "Other Contractor - Other - Casket Broker",
  "OTC_PLBG": "Other Contractor - Other - Plumbing Services",
  "OTC_ACPC": "Other Contractor - Other - Acupuncture Clinic",
  "OTC_SALP": "Other Contractor - Other - Salon and SPA",
  "OTC_ADVS": "Other Contractor - Other - Advertising Services",
  "OTC_ELIS": "Other Contractor - Other - Electrical and Industrial Services",
  "OTC_SKMD": "Other Contractor - Other - Skin and Medical Clinic",
  "OTC_CWVS": "Other Contractor - Contractor - Carwash Vulcanizing Shop",
  "OTC_MRPS": "Other Contractor - Other - Motorcycle Repair Shop",
  "OTC_HFAG": "Other Contractor - Other - Home for the Aged",
  "OTC_WGMK": "Other Contractor - Other - Wig Making",
  "OTC_DNCS": "Other Contractor - Other - Dance Studio",
  "OTC_OHCS": "Other Contractor - Other - Home Care Services (Office Only)",
  "OTC_PKGS": "Other Contractor - Other - Packaging Services",
  "OTC_RCTU": "Other Contractor - Rentals of Chairs, Tables, Utensils/Catering Services",
  "OTC_FRSV": "Other Contractor - Other Contractor - Forwarding Services, Freight Services, Trucking Services",
  "OTC_TOBP": "Other Contractor - Other Contractor - Ticketing Office / Bill Payment / Forwarding Services",
  "OTC_MFCS": "Other Contractor - Other Contractor - Messenger, Forwarding Services, and Courier",
  "OTC_BPTK": "Other Contractor - Other Contractor - Bill Payment / Ticketing Office",
  "OTC_RMDE": "Other Contractor - Other - Rental of Medical Equipment",
  "OTC_MSKS": "Other Contractor - Music School",
  "OTC_PRTP": "Other Contractor - Other Contractor - Printing Publishing",
  "OTC_PSCS": "Other Contractor - Other - Psychological Services",
  "OTC_RCT": "Other Contractor - Other Contractor - Rental of Chairs, Tables",
  "OTC_ONDR": "Other Contractor - Online Data Researcher",
  "OTC_TRKS": "Other Contractor - Other Contractor - Trucking Services",
  "OTC_TTUR": "Other Contractor - Other Contractor - Training Center - Tutorial",
  "OTC_BPLS": "Other Contractor - Other - Bills Payment/Loading Station",
  "OTC_FNCP": "Other Contractor - Contractor - Funeral Chapel",
  "OTC_HMCS": "Other Contractor - Other Contractor - Home Care Services",
  "OTC_OPTL": "Other Contractor - Other Contractor - Optical Laboratory",
  "OTC_DIAL": "Other Contractor - Other Contractor - Dialysis Service",
  "OTC_BKGS": "Other Contractor - Other Contractor - Bookkeeping Services",
  "OTC_IMNS": "Other Contractor - Other Contractor - Installation/Maintenance Services",
    "OTC_DLVS": "Other Contractor - Other Contractor - Delivery Services",
    "OTC_DTEN": "Other Contractor - Other Contractor - Data Encoding Services",
    "OTC_VTAS": "Other Contractor - Other Contractor - Virtual Assistance Services",
    "OTC_CORS": "Other Contractor - Other Contractor - Courier Services",
    "OTC_CABS": "Other Contractor - Cabling Services",
    "OTC_ACO": "Other Contractor - Accounting Consultancy Office / Computer Design Programs",
    "OTC_PNCS": "Other Contractor - Other Contractor - Personal Care Services",
    "OTC_CMSR": "Other Contractor - Other Contractor - Common Space Rental Services",
    "OTC_DVHB": "Other Contractor - Other Contractor - Delivery Hub Services",
    "OTC_DCMT": "Other Contractor - Other Contractor - Documentation Services",
    "OTC_CLSV": "Other Contractor - Other Contractor - Courier/Logistics Services",
    "OTC_MTGY": "Other Contractor - Martial Arts Gym",
    "OTC_ARCN": "Other Contractor - Animal Rescue Center",
    "OTC_RPRS": "Other Contractor - Contractor - Repair Shop",
    "OTC_WCDP": "Other Contractor - Other Contractor - Waste Collection Disposal",
    "OTC_ARTS": "Other Contractor - Other Contractor - Art Studio",
    "OTC_BDPS": "Other Contractor - Other Contractor - Body Piercing Services",
    "OTC_RMNS": "Other Contractor - Other Contractor - Repair & Maintenance Services",
    "OTC_CWSP": "Other Contractor - Other Contractor - Coworking Space for a Fee",
    "OLB_IMPR": "Other LOB – Other LOB - Importer",
    "PDD_DLTR": "Peddler – Peddler - Delivery Truck",
    "PDD_VANS": "Peddler – Peddler - Van",
    "PDD_AMDV": "Peddler - Peddler Proprietor - Amusement Devices",
    "PRP_VDOK": "Proprietor-Amusement Devices - Proprietor - Videoke Machine",
    "PRP_FHPC": "Proprietor-Amusement Devices - Proprietor - Family Home Computers",
    "PRP_GMWD": "Proprietor-Amusement Devices - Proprietor - Game and Watch Devices",
    "PRP_SLTM": "Proprietor-Amusement Devices - Proprietor - Slot Machines not Classified as Gambling Devices",
    "PRP_OTAD": "Proprietor-Amusement Devices - Proprietor - Other Amusement Devices",
    "PRP_CMTR": "Proprietor-Amusement Devices - Proprietor - Computer Rentals",
    "PRP_PLST": "Proprietor-Amusement Devices - Proprietor - Playstation",
    "PRP_VDRL": "Proprietor-Amusement Devices - Proprietor - Video Rental",
  "PRP_VGMS": "Proprietor-Amusement Devices - Proprietor - Video Games",
  "PRP_KDRD": "Proprietor-Amusement Devices - Proprietor - Kiddie Rides",
  "PRP_TLSB": "Proprietor-Amusement Devices - Proprietor - Telesabong",
  "PRP_VDKB": "Proprietor-Amusement Devices - Proprietor - Videoke Bar",
  "PRP_OLGS": "Proprietor-Amusement Devices - Proprietor - On-line Gaming Station",
  "PRP_OLBS": "Proprietor-Amusement Devices - Proprietor - On-line Betting Station",
  "RTL_SAMP": "Retailer (Sample) - Sample",
  "RTL_GUNS": "Retailer – Gun - Gun",
  "RTL_ECIG": "Retailer-Cigarettes - E-Cigarette",
  "RTL_TBRC": "Retailer-Cigarettes - Retail Dealer - Tobacco",
  "RTL_TOBR": "Retailer-Cigarettes - Retailer - Tobacco",
  "RTL_SNCI": "Retailer-Cigarettes - Retail Dealer - Snuff including Cigars and Cigarettes",
  "RTL_SNCR": "Retailer-Cigarettes - Retailer - Snuff including Cigars and Cigarettes",
  "RTL_STR": "Retailer-Essential - Retailer - Store",
  "RTL_ESCM": "Retailer-Essential - Retailer - Essential Commodities",
  "RTL_BKRY": "Retailer-Essential - Retailer - Bakery",
  "RTL_SCHS": "Retailer-Essential - Retailer - School Supplies",
  "RTL_MDIC": "Retailer-Essential - Retailer - Medicine",
  "RTL_PFAN": "Retailer-Essential - Retailer - Poultry Feeds and Other Animal Feeds",
  "RTL_RICE": "Retailer-Essential - Retailer - Rice",
  "RTL_MEAT": "Retailer-Essential - Retailer - Meat",
  "RTL_CHKN": "Retailer-Essential - Retailer - Chicken",
  "RTL_FISH": "Retailer-Essential - Retailer - Fish",
  "RTL_CMNT": "Retailer-Essential - Retailer - Chicken/Meat",
  "RTL_SCOS": "Retailer-Essential - Retailer - School Office Supplies",
  "RTL_OFSU": "Retailer-Essential - Retailer - Office Supplies",
  "RTL_VEGE": "Retailer-Essential - Retailer - Vegetable",
  "RTL_FRVG": "Retailer-Essential - Retailer - Fruits and Vegetables",
  "RTL_DFRS": "Retailer-Essential - Retailer - Dried Fish",
  "RTL_COCO": "Retailer-Essential - Retailer - Coconut",
  "RTL_BANA": "Retailer-Essential - Retailer - Banana",
  "RTL_SGLM": "Retailer-Essential - Retailer - Sago Gulaman",
  "RTL_FRUT": "Retailer-Essential - Retailer - Fruits",
  "RTL_EGG": "Retailer-Essential - Retailer - Egg",
  "RTL_LPG": "Retailer-Essential - Retailer - LPG",
  "RTL_CRBP": "Retailer-Essential - Retailer - Crabs and Prawns",
  "RTL_LUMP": "Retailer-Essential - Retailer - Lumpia Wrapper",
  "RTL_FRZS": "Retailer-Essential - Retailer - Frozen Seafoods Products",
  "RTL_SUPL": "Retailer-Essential - Retailer - Food Supplement",
  "RTL_RIGM": "Retailer-Essential - Retailer - Rice and General Merchandise",
  "RTL_BEEF": "Retailer-Essential - Retailer - Beef",
  "RTL_SEAF": "Retailer-Essential - Retailer - Seafoods",
  "RTL_CLDC": "Retailer-Essential - Retailer - Cold Cuts",
  "RTL_NUTS": "Retailer-Essential - Retailer - Nuts",
  "RTL_BAGN": "Retailer-Essential - Retailer - Bagoong",
  "RTL_RIPF": "Retailer-Essential - Retailer - Rice and Poultry Feeds",
  "RTL_MEVE": "Retailer-Essential - Retailer - Meat/Vegetable",
  "RTL_MESP": "Retailer-Essential - Retailer - Meat Seafoods Products",
  "RTL_FMSP": "Retailer-Essential - Retailer - Frozen Meat Seafoods Products",
  "RTL_FRMT": "Retailer-Essential - Retailer - Frozen Meat",
  "RTL_MEFS": "Retailer-Essential - Retailer - Meat and Fish",
  "RTL_FVGE": "Retailer-Essential - Retailer - Fish/Vegetables",
  "RTL_LIQ": "Retailer-Liquors - Retailer - Liquor or Wine",
  "RTL_FLQB": "Retailer-Liquors - Retailer - Fermented Liquor (Beer)",
  "RTL_VINO": "Retailer-Liquors - Retailer - Vino Liquor",
  "RTL_TUBA": "Retailer-Liquors - Retailer - Tuba",
  "RTL_BASI": "Retailer-Liquors - Retailer - Basi",
  "RTL_OTDS": "Retailer-Liquors - Retailer - Other Distilled Spirits not Classified as Denatured Alcohol",
  "RTL_LQWN": "Retailer-Liquors - Retailer - Liquor or Wine",
    "RTL_ILWN": "Retailer-Liquors - Retail - Liquor or Wine / Importer",
    "RTL_MED": "Retailer-Medicine - Retailer-Medicine",
    "RTL_APPL": "Retailer-Non Essential - Retailer - Appliances and Furniture",
    "RTL_CCTV": "Retailer-Non Essential - Retailer - CCTV",
    "RTL_PCLA": "Retailer-Non Essential - Retailer - Paper Clay Arts",
    "RTL_OFFC": "Retailer-Non Essential - Retailer - Office Only",
    "RTL_JSUR": "Retailer-Non Essential - Retailer - Japan Surplus",
    "RTL_OEQP": "Retailer-Non Essential - Retailer - Office Machines, Equipment, and Computers",
    "RTL_ESUP": "Retailer-Non Essential - Retailer - Electrical Supply",
    "RTL_EMAC": "Retailer-Non Essential - Retailer - Electronic Machines",
    "RTL_RFIS": "Retailer-Non Essential - Retailer - Roasted Fish",
    "RTL_RCHK": "Retailer-Non Essential - Retailer - Roasted Chicken",
    "RTL_TXTF": "Retailer-Non Essential - Retailer - Textile Paints and Fabrics",
    "RTL_LITE": "Retailer-Non Essential - Retailer - Lighting",
    "RTL_GRVS": "Retailer-Non Essential - Retailer - Gravel and Sand",
    "RTL_AUTO": "Retailer-Non Essential - Retailer - Auto Supply",
    "RTL_GIVE": "Retailer-Non Essential - Retailer - Corporate Giveaways",
    "RTL_ECG": "Retailer-Non Essential - Retailer - Electronic Cigarette",
    "RTL_CHAR": "Retailer-Non Essential - Retailer - Charcoal",
    "RTL_SUPA": "Retailer-Non Essential - Other - Surplus (Auto Spare Parts)",
    "RTL_SUPP": "Retailer-Non Essential - Retailer - Surplus (Auto Spare Parts)",
    "RTL_PROC": "Retailer-Non Essential - Retailer - Processed Meat",
    "RTL_CURT": "Retailer-Non Essential - Retailer - Curtain",
    "RTL_FURN": "Retailer-Non Essential - Retailer - Surplus Furniture",
    "RTL_HHPR": "Retailer-Non Essential - Retailer - Household Products",
    "RTL_FACC": "Retailer-Non Essential - Retailer - Fashion Accessories",
    "RTL_BAKE": "Retailer-Non Essential - Retailer - Bakery Equipment",
    "RTL_MVSP": "Retailer-Non Essential - Retailer - Surplus Motor Vehicle",
    "RTL_HAND": "Retailer-Non Essential - Retailer - Handicraft Products",
  "RTL_SGUL": "Retailer-Non Essential - Retailer - Sago Gulaman",
  "RTL_STON": "Retailer-Non Essential - Retailer - Stonecraft",
  "RTL_WPRF": "Retailer-Non Essential - Retailer - Waterproofing (Office Only)",
  "RTL_PNTG": "Retailer-Non Essential - Retailer - Painting",
  "RTL_CACC": "Retailer-Non Essential - Retailer - Cellphone Accessories",
  "RTL_CARC": "Retailer-Non Essential - Retailer - Car Accessories",
  "RTL_BATT": "Retailer-Non Essential - Retailer - Battery",
  "RTL_WATC": "Retailer-Non Essential - Retailer - Watches",
  "RTL_WACC": "Retailer-Non Essential - Retailer - Watch Accessories",
  "RTL_BRED": "Retailer-Non Essential - Retailer - Bread",
  "RTL_SGLS": "Retailer-Non Essential - Retailer - Sunglasses",
  "RTL_PLAS": "Retailer-Non Essential - Retailer - Non-Essential Commodities/Importer - Plastic Ware",
  "RTL_BKSP": "Retailer-Non Essential - Retailer - Bakery Supplies",
  "RTL_HOSE": "Retailer-Non Essential - Retailer - Hose Regulator",
  "RTL_SRPL": "Retailer-Non Essential - Retailer - Surplus",
  "RTL_GENS": "Retailer-Non Essential - Retailer - Genset Units and Parts",
  "RTL_TXTL": "Retailer-Non Essential - Retailer - Textile",
  "RTL_PETC": "Retailer-Non Essential - Retailer - Pet Care Products",
  "RTL_AUTM": "Retailer-Non Essential - Retailer - Automotive",
  "RTL_HLTH": "Retailer-Non Essential - Retailer - Health Products",
  "RTL_TSI": "Retailer-Non Essential - Retailer - Toasted Siopao",
  "RTL_ZIPP": "Retailer-Non Essential - Retailer - Zipper",
  "RTL_SPRT": "Retailer-Non Essential - Retailer - Sports Equipment",
  "RTL_EBKE": "Retailer-Non Essential - Other - Electric Bike",
  "RTL_ONBA": "Retailer-Non Essential - Retailer - Online Business Bags and Accessories",
  "RTL_BIBK": "Retailer-Non Essential - Retailer - Bibingka",
  "RTL_CSFT": "Retailer-Non Essential - Retailer - Computer Software Application",
  "RTL_CHMP": "Retailer-Non Essential - Retailer - Chemical Products",
  "RTL_HRBL": "Retailer-Non Essential - Retailer - Herbal Products",
  "RTL_POPC": "Retailer-Non Essential - Retailer - Popcorn",
  "RTL_CELL": "Retailer-Non Essential - Retailer - Cellphone",
  "RTL_SLRP": "Retailer-Non Essential - Retailer - Solar Panel",
  "RTL_HYDH": "Retailer-Non Essential - Retailer - Hydraulic Hose",
  "RTL_SSLS": "Retailer-Non Essential - Retailer - Sari-Sari Store/Loading Station",
  "RTL_RFNG": "Retailer-Non Essential - Roofing",
  "RTL_PNDS": "Retailer-Non Essential - Retailer - Party Needs",
  "RTL_ONLB": "Retailer-Non Essential - Retailer - Online Business",
  "RTL_TBIC": "Retailer-Non Essential - Retailer - Tube Ice",
  "RTL_RCCH": "Retailer-Non Essential - Retailer - Non-Essential Commodities / Roasted Chicken",
  "RTL_ACCS": "Retailer-Non Essential – Non Essential - Accessories Sales",
  "RTL_MSLE": "Retailer-Non Essential - Retailer - Medical Supplies / Equipment / Loading Station",
  "RTL_ACPT": "Retailer-Non Essential - Retailer - Airconditioning Parts / Airconditioning Unit",
  "RTL_SIOM": "Retailer-Non Essential - Retailer - Siomai",
  "RTL_CPCA": "Retailer-Non Essential - Retailer - Cellphone Accessories / Computer Parts Accessories",
  "RTL_CSSI": "Retailer-Non Essential - Retailer - Construction Supply / Importer / Exporter / Non-Essential Commodities",
  "RTL_SHJW": "Retailer-Non Essential - Retailer - Shoes/Jewelry",
  "RTL_EYWR": "Retailer-Non Essential - Retailer - Eyewear",
  "RTL_STEL": "Retailer-Non Essential – Non Essential - Steel",
  "RTL_RTSB": "Retailer-Non Essential - Retailer - RTW / Bags / Shoes",
  "RTL_ICE": "Retailer-Non Essential - Ice",
  "RTL_PNML": "Retailer-Non Essential - Retailer - Pancit Malabon",
  "RTL_WTRT": "Retailer-Non Essential – Non Essential - Water Treatment Supplies",
  "RTL_RTWA": "Retailer-Non Essential - Retailer - RTW Accessories",
  "RTL_MTLP": "Retailer-Non Essential - Retailer - Metal Products",
  "RTL_PSTC": "Retailer-Non Essential - Retailer - Pest Control Products",
  "RTL_TOYS": "Retailer-Non Essential - Retailer - Toys",
  "RTL_RCKP": "Retailer-Non Essential - Retailer - Rocks and Pebbles",
  "RTL_RCMT": "Retailer-Non Essential - Retailer - Roasted Chicken Meat",
  "RTL_OPTO": "Retailer-Non Essential - Retailer - Ornamental Plants / Orchids",
  "RTL_IDST": "Retailer-Non Essential - Retailer - Independent Distributor",
  "RTL_OBEA": "Retailer-Non Essential - Retailer - Organic Beauty Products",
  "RTL_UPHS": "Retailer-Non Essential - Retailer - Upholstery Supply",
  "RTL_DTRG": "Retailer-Non Essential - Retailer - Detergent",
  "RTL_LQDT": "Retailer-Non Essential - Retailer - Liquid Detergent",
  "RTL_EPRT": "Retailer-Non Essential - Retailer - Electronic Parts",
  "RTL_SS2M": "Retailer-Non Essential - Retailer - Sari Sari Store 2nd Hand Motorcycle",
  "RTL_PLTT": "Retailer-Non Essential - Retailer - Pallet",
  "RTL_MVHE": "Retailer-Non Essential - Retailer - Motor Vehicle and Heavy Equipment",
  "RTL_VAPE": "Retailer-Non Essential - Retailer - Vape",
  "RTL_CHOC": "Retailer-Non Essential - Retailer - Chocolates",
  "RTL_SPWR": "Retailer-Non Essential - Retailer - Sportswear",
  "RTL_ROOF": "Retailer-Non Essential - Retailer - Roof",
  "RTL_BOUT": "Retailer-Non Essential - Retailer - Fashion Boutique",
  "RTL_PLWR": "Retailer-Non Essential - Retailer - Plastic Ware",
  "RTL_CTNY": "Retailer-Non Essential - Retailer - Cotton Candy",
  "RTL_FSDV": "Retailer-Non Essential - Retailer - Fuel Saving Devices",
  "RTL_SSCL": "Retailer-Non Essential - Sari-Sari / Cigarette / Liquor",
  "RTL_SSCT": "Retailer-Non Essential - Retailer - Sari-Sari / Cigarette",
  "RTL_SSLQ": "Retailer-Non Essential - Retailer - Sari-Sari / Liquor",
  "RTL_BTFX": "Retailer-Non Essential - Retailer - Bathroom Fixtures",
  "RTL_NLLC": "Retailer-Non Essential - Retailer-Non Essential / Liquor / Cigarette",
  "RTL_NTBC": "Retailer-Non Essential - Retailer - Non-Essential Commodities / Tobacco",
  "RTL_PLNT": "Retailer-Non Essential - Retailer - Plants",
  "RTL_ASUP": "Retailer-Non Essential - Retailer - Airsoft Supply Accessories",
  "RTL_NBOL": "Retailer-Non Essential - Retailer - Nuts and Bolts",
  "RTL_PLYD": "Retailer-Non Essential - Retailer - Plywood",
  "RTL_CLQ": "Retailer-Non Essential - Retailer - Cigarette / Liquor",
  "RTL_INSM": "Retailer-Non Essential - Retailer - Insulation Materials",
  "RTL_MGCL": "Retailer-Non Essential - Retailer - Mini-Grocery / Liquor / Cigarettes",
  "RTL_BNSL": "Retailer-Non Essential - Retailer - Buy and Sell",
  "RTL_ECTO": "Retailer-Non Essential - Retailer (E-Cigarette / Tobacco Online Selling)",
  "RTL_RECG": "Retailer-Non Essential - Retailer - E-Cigarette",
  "RTL_MDDS": "Retailer - Medical and Dental Supplies",
  "RTL_KFDS": "Retailer-Non Essential - Retailer - Korean Foods",
  "RTL_BALL": "Retailer-Non Essential - Balloons",
  "RTL_MCSP": "Retailer-Non Essential - Retailer - Motorcycle Spare Parts Accessories",
  "RTL_MCAC": "Retailer-Non Essential - Retailer - Motorcycle Accessories",
  "RTL_PKMT": "Retailer-Non Essential - Retailer - Packaging Materials",
  "RTL_2LBR": "Retailer-Non Essential - Retailer - 2nd Hand Lumber",
  "RTL_LUBR": "Retailer-Non Essential - Retailer - Lubricants",
  "RTL_SCDE": "Retailer-Non Essential - Retailer - Security Devices",
  "RTL_LCHN": "Retailer-Non Essential - Retailer - Lechon",
  "RTL_ACPR": "Retailer-Non Essential - Retailer - Airconditioning Parts",
  "RTL_FRFP": "Retailer-Non Essential - Frozen Food Products",
  "RTL_ASPT": "Retailer-Non Essential - Retailer - Auto Spare Parts",
  "RTL_POSM": "Retailer-Non Essential - Retailer - POS Machine",
  "RTL_HLMT": "Retailer-Non Essential - Retailer - Helmet",
  "RTL_CCPR": "Retailer-Non Essential - Retailer - CCTV/POS Machine/Repair Services",
  "RTL_GFSP": "Retailer-Non Essential - Retailer - Gift Shop",
  "RTL_NCGN": "Retailer-Non Essential - Retailer - Non Essential Commodities/Gun",
  "RTL_SLQW": "Retailer-Non Essential - Retailer - Softdrinks / Liquor or Wine",
  "RTL_MDSP": "Retailer-Non Essential - Medical Supplies",
  "RTL_SKTB": "Retailer-Non Essential - Retailer - Skateboard",
  "RTL_GRCL": "Retailer-Non Essential - Retailer - Grocery / Liquor / Cigarettes",
  "RTL_HMDC": "Retailer-Non Essential - Retailer - Home Decoration",
  "RTL_BWLP": "Retailer-Non Essential - Retailer - Beauty and Wellness Products",
  "RTL_USOL": "Retailer-Non Essential - Retailer - Used Oil",
  "RTL_SHUC": "Retailer-Non Essential - Retailer - Second Hand Used Car",
  "RTL_BGPR": "Retailer-Non Essential - Retailer - Bags Perfumes",
  "RTL_INSP": "Retailer-Non Essential - Retailer - Industrial Machines Spare Parts",
  "RTL_WHMC": "Retailer-Non Essential - Retailer - Water Heater Machine",
  "RTL_KTWR": "Retailer-Non Essential - Retailer - Kitchenware",
  "RTL_WTVD": "Retailer-Non Essential - Retailer - Water (Vending Machine)",
  "RTL_FRCH": "Retailer-Non Essential - Retailer - Fried Chicken",
  "RTL_MTPT": "Retailer-Non Essential - Retailer - Meat Products",
  "RTL_CSMP": "Retailer-Non Essential - Retailer - Cosmetic Products",
  "RTL_BGFW": "Retailer-Non Essential - Retailer - Bags Footwear",
  "RTL_BPEW": "Retailer-Non Essential - Retailer - Beauty Products Eyewear",
  "RTL_BDST": "Retailer-Non Essential - Retailer - Bedsheets",
  "RTL_KIMC": "Retailer-Non Essential - Retailer - Kimchi",
  "RTL_ELSP": "Retailer-Non Essential - Retailer - Electrical Electronic Supplies",
  "RTL_VETP": "Retailer-Non Essential - Retailer - Veterinary Drugs and Products, Feed Additives and Supplements",
  "RTL_BXES": "Retailer-Non Essential - Retailer - Boxes",
  "RTL_FARM": "Retailer-Non Essential - Retailer - Fire Alarm",
  "RTL_FPEQ": "Retailer-Non Essential - Retailer - Fire Protection Equipment",
  "RTL_JUDY": "Retailer-Non Essential - Retailer - Judy",
  "RTL_NCMT": "Retailer-Non Essential - Retailer - Non Essential Commodities",
  "RTL_SRST": "Retailer-Non Essential - Retailer - Sari-sari Store",
  "RTL_RTWE": "Retailer-Non Essential - Retailer - RTW",
  "RTL_SCRP": "Retailer-Non Essential - Retailer - Scrap",
  "RTL_LPGN": "Retailer-Non Essential - Retailer – LPG",
  "RTL_FLWR": "Retailer-Non Essential - Retailer - Flower Shop",
  "RTL_MSP": "Retailer-Non Essential - Retailer - Motor Vehicle Spare Parts",
  "RTL_BKMZ": "Retailer-Non Essential - Retailer - Books Magazines",
  "RTL_BTYD": "Retailer-Non Essential - Retailer - Beauty Products",
  "RTL_CNSS": "Retailer-Non Essential - Retailer - Construction Supply",
  "RTL_RFNT": "Retailer-Non Essential - Retailer - Furniture",
  "RTL_CSFA": "Retailer-Non Essential - Retailer - Crosstitch Accessories and Frames",
  "RTL_FTWG": "Retailer-Non Essential - Retailer - Footwear",
  "RTL_CNDY": "Retailer-Non Essential - Retailer - Candies",
  "RTL_CPAC": "Retailer-Non Essential - Retailer - Cellphone Accessories",
  "RTL_DNTS": "Retailer-Non Essential - Retailer - Donuts",
  "RTL_OPST": "Retailer-Non Essential - Retailer - Optical Supplies",
  "RTL_CPAK": "Retailer-Non Essential - Retailer - Computer Parts Accessories",
  "RTL_CPTR": "Retailer-Non Essential - Retailer - Computers Parts",
  "RTL_BRGR": "Retailer-Non Essential - Retailer - Burger",
  "RTL_DRGS": "Retailer-Non Essential - Retailer - Drug Store",
  "RTL_MNUS": "Retailer-Non Essential - Retailer - Musical Instrument",
  "RTL_APL": "Retailer-Non Essential - Retailer - Appliances",
  "RTL_INDS": "Retailer-Non Essential - Retailer - Industrial Sales",
  "RTL_INDP": "Retailer-Non Essential - Retailer - Industrial Products",
  "RTL_PTSH": "Retailer-Non Essential - Retailer - Pet Shop",
  "RTL_BSHP": "Retailer-Non Essential - Retailer - Bicycle Spare Parts",
  "RTL_MSUE": "Retailer-Non Essential - Retailer - Medical Supplies Equipment",
  "RTL_SHES": "Retailer-Non Essential - Retailer - Shoes",
  "RTL_NCOM": "Retailer-Non Essential - Retailer - Non Essential Commodities (Office Only)",
  "RTL_PRFD": "Retailer-Non Essential - Retailer - Processed Food",
  "RTL_PRFM": "Retailer-Non Essential - Retailer - Perfumes",
  "RTL_CLCD": "Retailer-Non Essential - Retailer - Cellcard",
  "RTL_SHRM": "Retailer-Non Essential - Retailer - Shawarma",
  "RTL_TLCS": "Retailer-Non Essential - Retailer - Tiles Ceramics",
  "RTL_JWLR": "Retailer-Non Essential - Retailer - Jewelry",
  "RTL_MDMS": "Retailer-Non Essential - Retailer - Modem",
  "RTL_SSBA": "Retailer-Non Essential - Retailer - Sari-Sari Store Bakery",
  "RTL_NCI": "Retailer-Non Essential - Retailer - Non Essential Commodities/Importer",
  "RTL_INDC": "Retailer-Non Essential - Retailer - Industrial/Chemical and All Types of Equipment",
  "RTL_GRRY": "Retailer-Non Essential - Retailer - Grocery",
  "RTL_FLFO": "Retailer-Non Essential - Retailer - Fuel (Office Only)",
  "RTL_RTNR": "Retailer-Non Essential - Retailer - Router Non Essential",
  "RTL_RTRT": "Retailer-Non Essential - Retailer - Router",
  "RTL_FLUL": "Retailer-Non Essential - Retailer - Fuel",
  "RTL_MVCL": "Retailer-Non Essential - Retailer - Motor Vehicle",
  "RTL_MSPT": "Retailer-Non Essential - Retailer - Motorcycle Spare Parts",
  "RTL_LDST": "Retailer-Non Essential - Retailer - Loading Station",
  "RTL_PZZA": "Retailer-Non Essential - Retailer - Pizza",
  "RTL_CSIH": "Retailer-Non Essential - Retailer - Construction Supply / Importer",
  "RTL_DNSP": "Retailer-Non Essential - Retailer - Dental Supplies",
  "RTL_FEXT": "Retailer-Non Essential - Retailer - Fire Extinguisher",
  "RTL_FSUP": "Retailer-Non Essential - Retailer - Food Supplements",
  "RTL_MSSP": "Retailer-Non Essential - Retailer - Motorcycle Spare Parts",
  "RTL_ICRM": "Retailer-Non Essential - Retailer - Ice Cream",
  "RTL_ORGF": "Retailer-Non Essential - Retailer - Organic Fertilizer",
  "RTL_MGRC": "Retailer-Non Essential - Retailer - Mini-Grocery",
  "RTL_CMSC": "Retailer-Non Essential - Retailer - Cosmetics",
  "RTL_ECSU": "Retailer-Non Essential - Retailer - Electronics Supply",
  "RTL_GLAS": "Retailer-Non Essential - Retailer - Glassware",
  "RTL_PLST": "Retailer-Non Essential - Retailer - Plastic Ware",
  "RTL_FAAU": "Retailer-Non Essential - Retailer - Firearms and Ammunition",
  "RTL_ECGD": "Retailer-Non Essential - Retailer - Electronics Gadget",
  "RTL_PNTS": "Retailer-Non Essential - Retailer - Paints",
  "RTL_CAPS": "Retailer-Non Essential - Retailer - Caps",
  "RTL_BGS": "Retailer-Non Essential - Retailer - Bags Shoes",
  "RTL_SLVX": "Retailer-Non Essential - Retailer - Silver Accessories",
  "RTL_RLGI": "Retailer-Non Essential - Retailer - Religious Item",
  "RTL_SAPX": "Retailer-Non Essential - Retailer - Soap",
  "RTL_APRL": "Retailer-Non Essential - Retailer - Apparels",
  "RTL_TSHR": "Retailer-Non Essential - Retailer - T-Shirts",
  "RTL_CAKE": "Retailer-Non Essential - Retailer - Cake",
  "RTL_KAKN": "Retailer-Non Essential - Retailer - Kakanin",
  "RTL_UKAY": "Retailer-Non Essential - Retailer - Ukay Ukay",
  "RTL_SODK": "Retailer-Non Essential - Retailer - Softdrinks",
  "RTL_GLAL": "Retailer-Non Essential - Retailer - Glass and Aluminum",
  "RTL_HBPT": "Retailer-Non Essential - Retailer - Herbal Beauty Products",
  "RTL_CPNS": "Retailer-Non Essential - Retailer - Computer Printer Services",
  "RTL_FOOT": "Retailer-Non Essential - Retailer - Footwear (Office Only)",
  "RTL_CHEM": "Retailer-Non Essential - Retailer - Cleaning Chemicals",
  "RTL_MOTO": "Retailer-Non Essential - Retailer - Motorcycle",
  "RTL_MVBT": "Retailer-Non Essential - Retailer - Motor Vehicle Battery",
  "RTL_BUJU": "Retailer-Non Essential - Retailer - Buko Juice",
  "RTL_DUPM": "Retailer-Non Essential - Retailer - Duplicator Machine",
  "RTL_TIRE": "Retailer-Non Essential - Retailer - Tire Supply",
  "RTL_PINY": "Retailer-Non Essential - Retailer - Pinoy Delicacies/Pasalubong",
  "RTL_DVCA": "Retailer-Non Essential - Retailer - Digital Video Camera Accessories",
  "RTL_SURP": "Retailer-Non Essential - Retailer - Surplus TV",
  "RTL_DUMI": "Retailer-Non Essential - Retailer - Duplicator Machine / Importer",
  "RTL_HOFS": "Retailer-Non Essential - Retailer - Hose Fittings",
  "RTL_BOOK": "Retailer-Non Essential - Retailer - Book",
  "RTL_SKBP": "Retailer-Non Essential - Retailer - Skateboard Parts Apparel",
  "RTL_TISS": "Retailer-Non Essential - Retailer - Tissue",
  "RTL_TVMV": "Retailer-Non Essential - Retailer - Tissue (Vending Machine)",
  "RTL_BGA": "Retailer-Non Essential - Retailer - Bags Accessories",
  "RTL_RAGX": "Retailer-Non Essential - Retailer - Rag",
  "RTL_BSCT": "Retailer-Non Essential - Retailer - Biscuit",
  "RTL_IDSP": "Retailer-Non Essential - Retailer - Industrial Spare Parts",
    "RTL_DIAP": "Retailer-Non Essential - Retailer - Diaper",
    "RTL_STKR": "Retailer-Non Essential - Retailer - Sticker",
    "RTL_CCLM": "Retailer-Non Essential - Retailer - Coco Lumber",
    "WHO_NEC": "Wholesaler / Exporter - Wholesaler - Non Essential Commodities",
    "WHO_DIS": "Wholesaler / Exporter - Distributor - Non Essential Commodities",
    "WHO_EXP": "Wholesaler / Exporter - Exporter - Non Essential Commodities",
    "WHO_PRO": "Wholesaler / Exporter - Producer - Non Essential Commodities",
    "WHO_DEA": "Wholesaler / Exporter - Dealer - Non Essential Commodities",
    "WHO_SOF": "Wholesaler / Exporter - Dealer - Softdrinks",
    "WHO_BER": "Wholesaler / Exporter - Dealer - Beer",
    "WHO_APP": "Wholesaler / Exporter - Dealer - Appliance",
    "WHO_NECW": "Wholesaler / Exporter - Wholesaler - Non Essential Commodities",
    "WHO_MEX": "Wholesaler / Exporter - Manufacturer / Exporter - Non Essential Commodities",
    "WHO_LPG": "Wholesaler / Exporter - Dealer - LPG",
    "WHO_JNK": "Wholesaler / Exporter - Wholesaler - Junkshop",
    "WHO_AUT": "Wholesaler / Exporter - Dealer - Automotive",
    "WHO_LPGW": "Wholesaler / Exporter - Wholesaler - LPG",
    "WHO_CON": "Wholesaler / Exporter - Wholesaler - Construction Materials",
    "WHO_FUR": "Wholesaler / Exporter - Wholesaler - Furniture",
    "WHO_CNS": "Wholesaler / Exporter - Wholesaler - Construction Supply",
    "WHO_RICC": "Wholesaler / Exporter - Dealer - Rice Corn",
    "WHO_PFG": "Wholesaler / Exporter - Wholesaler - Piggery Farm",
    "WHO_WEX": "Wholesaler / Exporter - Wholesaler - Exporter",
    "WHO_WEO": "Wholesaler / Exporter - Wholesaler - Exporter (Office Only)",
    "WHO_DEI": "Wholesaler / Exporter - Dealer - Importer - Non Essential Commodities",
    "WHO_ECO": "Wholesaler / Exporter - Dealer - Essential Commodities",
    "WHO_WIL": "Wholesaler / Exporter - Wholesaler - Wine Liquor",
    "WHO_LGL": "Wholesaler / Exporter - Dealer - Non Essential Commodities (Lights)",
    "WHO_MTC": "Wholesaler / Exporter - Dealer - Motorcycle",
    "WHO_PTF": "Wholesaler / Exporter - Wholesaler - Poultry Farm",
    "WHO_OJNK": "Wholesaler / Exporter - Wholesaler - Junkshop (Office Only)",
  "WHO_RIC": "Wholesaler / Exporter - Wholesaler - Rice",
  "WHO_HEA": "Wholesaler / Exporter - Wholesaler - Health Products",
  "WHO_MTP": "Wholesaler / Exporter - Dealer - Motorcycle Parts",
  "WHO_NECI": "Wholesaler / Exporter - Exporter / Importer - Non Essential Commodities",
  "WHO_WHI": "Wholesaler / Exporter - Wholesaler - Wholesaler / Importer",
  "WHO_WNEC": "Wholesaler / Exporter - Wholesaler - Importer - Non Essential Commodities",
  "WHO_SOE": "Wholesaler / Exporter - Dealer - School, Office Supplies Equipment",
  "WHO_WAT": "Wholesaler / Exporter - Distributor - Water Supply",
  "WHO_SFTD": "Wholesaler / Exporter - Distributor - Softdrinks",
  "WHO_DSS": "Wholesaler / Exporter - Wholesaler - Dental Supplies",
  "WHO_RID": "Wholesaler / Exporter - Dealer - Rice",
  "WHO_BEA": "Wholesaler / Exporter - Wholesaler - Beauty Products",
  "WHO_SEC": "Wholesaler / Exporter - Dealer - Security Equipment",
  "WHO_BED": "Wholesaler / Exporter - Distributor - Beauty Products",
  "WHO_MED": "Wholesaler / Exporter - Distributor - Medical Equipment",
  "WHO_IMM": "Wholesaler / Exporter - Importer - Medical Equipment",
  "WHO_IEC": "Wholesaler / Exporter - Wholesaler - Importer - Essential Commodities",
  "WHO_PLS": "Wholesaler / Exporter - Wholesaler - Importer - Poultry Livestock Supply",
  "WHO_CBX": "Wholesaler / Exporter - Wholesaler - Carton Box",
  "WHO_WL": "Wholesaler / Exporter - Dealer - Wine Liquor",
  "WHO_HCL": "Wholesaler / Exporter - Distributor - Household Cleaner",
  "WHO_FDF": "Wholesaler / Exporter - Dealer - Frozen Food",
  "WHO_DNEC": "Wholesaler / Exporter - Distributor - Non Essential Commodities / Importer",
  "WHO_TSD": "Wholesaler / Exporter - Wholesaler - Importer - Traffic Safety Device",
  "WHO_BKS": "Wholesaler / Exporter - Distributor - Books",
  "WHO_STE": "Wholesaler / Exporter - Wholesaler - Steel",
  "WHO_FPD": "Wholesaler / Exporter - Wholesaler - Food Products",
  "WHO_PCT": "Wholesaler / Exporter - Wholesaler - Packaging Tape",
  "WHO_DCON": "Wholesaler / Exporter - Dealer - Construction Materials",
  "WHO_LED": "Wholesaler / Exporter - Distributor - LED Light",
  "WHO_HAN": "Wholesaler / Exporter - Exporter - Handicraft Products",
  "WHO_SSO": "Wholesaler / Exporter - Wholesaler - School Supply Office Supply",
  "WHO_SCRM": "Wholesaler / Exporter - Wholesaler - Scrap Metal",
  "WHO_DPMP": "Wholesaler / Exporter - Distributor - Packaging Materials (Meat Processing Products)",
  "WHO_FVR": "Wholesaler / Exporter - Dealer - Fruits and Vegetables",
  "WHO_HRP": "Wholesaler / Exporter - Wholesaler - Herbal Product",
  "WHO_BSC": "Wholesaler / Exporter - Wholesaler - Biscuits",
  "WHO_GOL": "Wholesaler / Exporter - Wholesaler - Golf Products",
  "WHO_MES": "Wholesaler / Exporter - Wholesaler - Machinery, Equipment, and Supplies",
  "WHO_BAN": "Wholesaler / Exporter - Dealer - Banana",
  "WHO_PHP": "Wholesaler / Exporter - Distributor - Pharmaceutical Product",
  "WHO_BEAS": "Wholesaler / Exporter - Exporter - Beauty Soap",
  "WHO_SVI": "Wholesaler / Exporter - Distributor - Spices/Vanilla Product - Raw",
  "WHO_IMP": "Wholesaler / Exporter - Wholesaler - Importer",
  "WHO_MSP": "Wholesaler / Exporter - Wholesaler - Motorcycle Spare Parts",
  "WHO_CAP": "Wholesaler / Exporter - Wholesaler - Cap",
  "WHO_PMP": "Wholesaler / Exporter - Wholesaler - Importer - Packaging Materials for Meat Processing",
  "WHO_LAB": "Wholesaler / Exporter - Importer - Laboratory Equipment",
  "WHO_MCP": "Wholesaler / Exporter - Dealer - Machineries Parts (Office Only)",
  "WHO_FSU": "Wholesaler / Exporter - Distributor - Food Supplement",
  "WHO_MVS": "Wholesaler / Exporter - Dealer - Motor Vehicle Spare Parts / Importer",
  "WHO_JWL": "Wholesaler / Exporter - Exporter - Jewelries",
  "WHO_PWA": "Wholesaler / Exporter - Importer - Plastic Ware",
  "WHO_MIW": "Wholesaler / Exporter - Distributor - Mineral Water",
  "WHO_CIT": "Wholesaler / Exporter - Wholesaler - Cigarettes and Other Tobacco Products",
  "WHO_SCRP": "Wholesaler / Exporter - Wholesaler - Scrap",
  "WHO_INEC": "Wholesaler / Exporter - Importer - Non Essential Commodities",
  "WHO_AFE": "Wholesaler / Exporter - Dealer - Appliance Furniture",
  "WHO_FDR": "Wholesaler / Exporter - Dealer - Fruit Drinks",
  "WHO_MVSP": "Wholesaler / Exporter - Importer - Motor Vehicle Spare Parts",
  "WHO_INP": "Wholesaler / Exporter - Wholesaler - Industrial Products",
  "WHO_CCL": "Wholesaler / Exporter - Distributor - Cleaning Chemical",
  "WHO_IECE": "Wholesaler / Exporter - Exporter - Import/Export of Construction Equipment",
  "WHO_APS": "Wholesaler / Exporter - Wholesaler - Appliances",
  "WHO_SOD": "Wholesaler / Exporter - Wholesaler - Softdrinks",
  "WHO_ONEC": "Wholesaler / Exporter - Wholesaler - Importer - Non Essential Commodities (Office Only)",
  "WHO_MSE": "Wholesaler / Exporter - Wholesaler - Medical Supplies Equipment",
  "WHO_LPGN": "Wholesaler / Exporter - Wholesaler - LPG / Non Essential Commodities",
  "WHO_BSD": "Wholesaler / Exporter - Wholesaler - Beer / Softdrinks",
  "WHO_ICE": "Wholesaler / Exporter - Distributor - Ice",
  "WHO_EGG": "Wholesaler / Exporter - Dealer - Egg",
  "WHO_BPS": "Wholesaler / Exporter - Wholesaler - Beauty Products and Supplements",
  "WHO_GLS": "Wholesaler / Exporter - Wholesaler - Gloves/Shoes",
  "WHO_TSS": "Wholesaler / Exporter - Wholesaler - Tissue and Soap",
  "WHO_KFD": "Wholesaler / Exporter - Wholesaler - Korean Foods",
  "WHO_AUS": "Wholesaler / Exporter - Wholesaler - Auto Supply",
  "WHO_CLM": "Wholesaler / Exporter - Dealer - Coco Lumber",
  "WHO_PLT": "Wholesaler / Exporter - Wholesaler - Pallet",
  "WHO_LBR": "Wholesaler / Exporter - Wholesaler - Lumber",
  "WHO_BST": "Wholesaler / Exporter - Distributor - Biscuit",
  "WHO_DMP": "Wholesaler / Exporter - Distributor - Del Monte Products",
  "WHO_RTW": "Wholesaler / Exporter - Wholesaler - RTW",
  "WHO_PLY": "Wholesaler / Exporter - Wholesaler - Plywood",
  "WHO_EVS": "Wholesaler / Exporter - Event Supplier",
  "WHO_YAK": "Wholesaler / Exporter - Wholesale - Yakult",
  "WHO_DCT": "Wholesaler / Exporter - Wholesaler - Drum and Container",
  "WHO_PET": "Wholesaler / Exporter - Importer - Petroleum Products / Office Only",
  "WHO_IECS": "Wholesaler / Exporter - Import/Export Construction Materials / Wholesaler - Construction Supply",
  "WHO_EBT": "Wholesaler / Exporter - Wholesaler - Empty Bottle",
  "WHO_WLSD": "Wholesaler / Exporter - Dealer - Wine Liquor / Softdrinks",
  "WHO_CAR": "Wholesaler / Exporter - Wholesaler - Car Accessories",
  "WHO_WSP": "Wholesaler / Exporter - Distributor - Water Service Provider",
  "WHO_RMI": "Wholesaler / Exporter - Distributor - Raw Materials Import/Export",
  "WHO_ELE": "Wholesaler / Exporter - Importer - Electronics",
  "WHO_INDP": "Wholesaler / Exporter - Importer - Industrial Products",
  "WHO_FDS": "Wholesaler / Exporter - Wholesaler - Food Supplement",
  "WHO_HYS": "Wholesaler / Exporter - Wholesaler - Hydraulic Hose",
  "WHO_HYI": "Wholesaler / Exporter - Importer - Hydraulic Hose",
  "WHO_DSD": "Wholesaler / Exporter - Importer / Exporter - Dental Supplies/Devices",
  "WHO_RTX": "Wholesaler / Exporter - Wholesaler - Rugs / Textile",
  "WHO_NECO": "Wholesaler / Exporter - Wholesaler - Non Essential Commodities (Office Only)",
  "WHO_IME": "Wholesaler / Exporter - Wholesaler - Industrial Machinery Equipment (Office Only)",
  "WHO_ALC": "Wholesaler / Exporter - Distributor - Alcohol",
  "WHO_OPL": "Wholesaler / Exporter - Wholesaler - Ornamental Plants",
  "WHO_SMC": "Wholesaler / Exporter - Wholesaler - Surplus Machineries",
  "WHO_GRM": "Wholesaler / Exporter - Exporter - Garments",
  "WHO_DMSE": "Wholesaler / Exporter - Distributor - Medical Supplies Equipment",
  "WHO_FFD": "Wholesaler / Exporter - Frozen Food Products",
  "WHO_SPS": "Wholesaler / Exporter - Distributor/Importer - Spices",
  "WHO_PBG": "Wholesaler / Exporter - Wholesaler - Plastic Bag",
  "WHO_PNT": "Wholesaler / Exporter - Wholesaler / Importer of Paint",
  "WHO_SCM": "Wholesaler / Exporter - Importer - Scrap Metal",
  "WHO_CPA": "Wholesaler / Exporter - Wholesaler - Computer Parts and Accessories",
  "WHO_SWD": "Wholesaler / Exporter - Wholesaler - Scrap Wood",
  "WHO_CTM": "Wholesaler / Exporter - Importer - Construction Materials",
  "WHO_TLB": "Wholesaler / Exporter - Distributor/Importer - Tire, Lubricant, Battery",
  "WHO_CSO": "Wholesaler / Exporter - Distributor - Computer Software",
  "WHO_RCE": "Wholesaler-Essential - Dealer - Rice",
  "WHO_MPP": "Wholesaler-Essential - Wholesaler - Medicinal and Pharmaceutical Products",
  "WHO_OSE": "Wholesaler-Essential - Wholesaler - Oil and Sugar",
  "WHO_MPR": "Wholesaler-Essential - Wholesaler - Importer - Marine Products",
  "WHO_DPHP": "Wholesaler-Essential - Distributor - Pharmaceutical Product",
  "WHO_WEGG": "Wholesaler-Essential - Wholesaler - Egg",
  "WHO_CHK": "Wholesaler-Essential - Dealer - Chicken",
  "WHO_OSF": "Wholesaler-Essential - Wholesaler - Office Supplies and Printed Form",
  "WHO_OSP": "Wholesaler-Essential - Wholesaler - Office Supply",
  "WHO_WRCE": "Wholesaler-Essential - Wholesaler - Rice",
  "WHO_IGS": "Wholesaler-Essential - Distributor - Industrial Gas",
  "WHO_AGP": "Wholesaler-Essential - Distributor - Agricultural Products",
  "WHO_FMS": "Wholesaler-Essential - Retailer - Frozen Meat and Seafood Products",
  "WHO_ECE": "Wholesaler-Essential - Importer / Exporter - Essential Commodities",
  "WHO_WPHP": "Wholesaler-Essential - Wholesaler - Importer - Pharmaceutical Products",
  "WHO_FMP": "Wholesaler-Essential - Wholesaler - Frozen Meat Products",
  "WHO_PST": "Wholesaler-Essential - Wholesaler - Pesticides",
  "WHO_ECM": "Wholesaler-Essential - Wholesaler - Essential Commodities",
  "WHO_DEC": "Wholesaler-Essential - Distributors - Essential Commodities",
  "WHO_RCO": "Wholesaler-Essential - Distributor - Rice and Corn",
  "WHO_RCN": "Wholesaler-Essential - Dealer - Rice and Corn",
  "WHO_WCF": "Wholesaler-Essential - Dealer - Wheat or Cassava Flour",
  "WHO_MET": "Wholesaler-Essential - Dealer - Meat",
  "WHO_DDP": "Wholesaler-Essential - Dealer - Dairy Products",
  "WHO_PPF": "Wholesaler-Essential - Dealer - Processed or Preserved Food",
  "WHO_SGR": "Wholesaler-Essential - Dealers - Sugar",
  "WHO_DLPG": "Wholesaler-Essential - Dealer - LPG",
  "WHO_CEM": "Wholesaler-Essential - Dealer - Cement",
  "WHO_SGRD": "Wholesaler-Essential - Distributor - Sugar",
  "WHO_DMED": "Wholesaler-Essential - Distributor - Medicine",
  "WHO_COI": "Wholesaler-Essential - Distributor - Cooking Oil",
  "WHO_LNS": "Wholesaler-Essential - Distributor - Laundry Soap",
  "WHO_DDET": "Wholesaler-Essential - Distributor - Detergents",
  "WHO_DSLT": "Wholesaler-Essential - Distributor - Salt",
  "WHO_FRT": "Wholesaler-Essential - Distributor - Fertilizers",
  "WHO_PSTC": "Wholesaler-Essential - Distributor - Pesticides",
  "WHO_INST": "Wholesaler-Essential - Distributor - Insecticides",
  "WHO_PFDS": "Wholesaler-Essential - Distributor - Poultry Feeds and Other Animal Feeds",
  "WHO_DSHS": "Wholesaler-Essential - Distributor - School Supplies",
  "WHO_LPGD": "Wholesaler-Essential - Distributor - LPG",
  "WHO_RCNC": "Wholesaler-Essential - Wholesaler - Rice and Corn",
  "WHO_LNSO": "Wholesaler-Essential - Wholesaler - Laundry Soap",
  "WHO_DETO": "Wholesaler-Essential - Wholesaler - Detergent",
  "WHO_WWCF": "Wholesaler-Essential - Wholesaler - Wheat or Cassava Flour",
  "WHO_WDDP": "Wholesaler-Essential - Wholesaler - Dairy Products",
  "WHO_WMET": "Wholesaler-Essential - Wholesaler - Meat",
  "WHO_WSGR": "Wholesaler-Essential - Wholesaler - Sugar",
  "WHO_SLT": "Wholesaler-Essential - Wholesaler - Salt",
  "WHO_WMED": "Wholesaler-Essential - Wholesaler - Medicine",
  "WHO_WPFS": "Wholesaler-Essential - Wholesaler - Poultry Feeds and Other Animal Feeds",
  "WHO_WCEM": "Wholesaler-Essential - Wholesaler - Cement",
  "WHO_DAGP": "Wholesaler-Essential - Dealer - Agricultural Products",
  "WHO_DESC": "Wholesaler-Essential - Dealer - Essential Commodities",
  "WHO_MFP": "Wholesaler-Essential - Dealer - Marine and Freshwater Products",
  "WHO_DMDC": "Wholesaler-Essential - Dealer - Medicine",
  "WHO_DSSP": "Wholesaler-Essential - Dealer - School Supplies",
  "WHO_LSD": "Wholesaler-Essential - Dealer - Laundry Soap and/or Detergent",
  "WHO_DSEC": "Wholesaler-Essential - Distributor - Essential Commodities",
  "WHO_DECD": "Wholesaler-Essential - Dealer - Essential Commodities",
  "WHO_NM": "Wholesaler-Essential - Distributor - Newspaper and Magazines",
  "WHO_PFAE": "Wholesaler-Essential - Distributor - Poultry, Agricultural, and Food Equipment",
  "WHO_WHL": "Wholesaler-Essential - Distributor - Wholesaler",
  "WHO_CHC": "Wholesaler-Essential - Distributor - Chicken",
  "WHO_CHCK": "Wholesaler-Essential - Distributor Chicken",
  "WHO_PFFD": "Wholesaler-Essential - Distributor - Poultry Feeds and Food Equipment / Importer",
  "WHO_DSFD": "Wholesaler-Essential - Distributor - Soft Drinks",
  "WHO_VEG": "Wholesaler-Essential - Dealer - Vegetables",
  "WHO_SSOF": "Wholesaler-Essential - Wholesaler - School Supply Office Supply",
  "WHO_SFD": "Wholesaler-Essential - Dealer - Seafoods",
  "WHO_FLR": "Wholesaler-Essential - Distributor - Flour",
};


// Handle input changes for form fields
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setNewBusiness((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

// Handle change for businessNature dropdown
const handleDropdownChange = (selectedOption: BusinessNatureOption | null) => {
  setNewBusiness((prevState) => ({
    ...prevState,
    businessNature: selectedOption ? selectedOption.value : '',
  }));
};

// Handle form submission (adding business to the table)
const handleAddBusiness = () => {
  if (newBusiness.businessNature === '') {
    // Handle the case when businessNature is empty
    alert("Please select a Business Nature");
    return; // Exit the function to prevent further action
  } else {
    // Proceed to add the business
    setBusinesses((prevState) => [...prevState, newBusiness]);
    setNewBusiness({
      businessNature: '',
      businessType: '',
      capitalInvestment: '',
    });
  }
};


// Handle removing a business from the table
const handleRemoveBusiness = (index: number) => {
  setBusinesses((prevState) => prevState.filter((_, i) => i !== index));
};

  return (
    <section className="dashboard-container">
      <div className="sidebar-container">
        <ClientSideBar handleLogout={handleLogout} /> {/* Pass handleLogout to ClientSideBar */}
      </div>

      <div className="content">
        <header>
          <h1>Business Permit Application</h1>
        </header>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="businesspermit-form">
              <h2>Step 1: Personal Details</h2>
              <h2>Personal Details</h2>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={corporation}
                    onChange={() => {
                      setCorporation(!corporation);
                      setFirstName('');
                      setLastName('');
                      setMiddleInitial('');
                      setCivilStatus('Undefined');
                      setGender('Corporation');

                      if (corporation) {
                        setCompanyName(''); // Clear the company name if unchecking
                        setCivilStatus('');
                        setGender('');
                      }
                    }}
                  />
                  Check if Corporation
                </label>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>LAST NAME:</label>

                  <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} required disabled={corporation} />
                </div>
                <div className="form-group">
                  <label>FIRST NAME:</label>
                  <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)}  required disabled={corporation} />
                </div>
                <div className="form-group">
                  <label>MIDDLE INITIAL:</label>
                  <input type="text" value={middleinitial} onChange={(e) => setMiddleInitial(e.target.value)}  disabled={corporation} />
                </div>
                <div className="form-group">
                  <label>Company Name:</label>
                  <input type="text" value={companyname} onChange={(e) => setCompanyName(e.target.value)}  disabled={!corporation} />
                </div>
              </div>
              <div className="form-group">
                <label>CIVIL STATUS:</label>
                <select
                  value={civilstatus}
                  onChange={(e) => setCivilStatus(e.target.value)}
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
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-control"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Corp">Corporation</option>
                </select>
              </div>
              <div className="form-group">
                <label>CITIZENSHIP:</label>
                <input type="text" value={citizenship} onChange={(e) => setCitizenship(e.target.value)} />

              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>TIN NUMBER:</label>
                  <input type="number" value={tinnumber} onChange={(e) => setTinNumber(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" checked={representative} onChange={() => setRepresentative(!representative)} />
                  Check if Thru Representative
                </label>
              </div>
              <div className="form-group">
                <label>Representative Full Name:</label>
                <input type="text" value={repfullname} onChange={(e) => setRepFullName(e.target.value)} disabled={!representative} />
              </div>
              <div className="form-group">
                <label>Designation/Position:</label>
                <input type="text" value={repdesignation} onChange={(e) => setRepDesignation(e.target.value)} disabled={!representative} />
              </div>
              <div className="form-group">
                <label>Representative Mobile Number:</label>
                <input type="text" value={repmobilenumber} onChange={(e) => setRepMobileNumber(e.target.value)} disabled={!representative} />
              </div>
              <h2>Contact Information</h2>
              <div className="form-group">
                <label>House/Bldg No./Blk and Lot</label>
                <input type="text" value={houseandlot} onChange={(e) => setHouseandLot(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Building Name / Street Name</label>
                <input type="text" value={buildingstreetname} onChange={(e) => setBuildingStreetName(e.target.value)}  />
              </div>
              <div className="form-group">
                <label>Subdivision / Compound Name</label>
                <input type="text" value={subdivision} onChange={(e) => setSubdivision(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Region</label>
                <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Province</label>
                <input type="text" value={province} onChange={(e) => setProvince(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Municipality</label>
                <input type="text" value={municipality} onChange={(e) => setMunicipality(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Barangay</label>
                <input type="text" value={barangay} onChange={(e) => setBarangay(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Telephone Number</label>
                <input type="text" value={telephonenumber} onChange={(e) => setTelephoneNumber(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="text" value={mobilenumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                {!isFormValid && <p style={{ color: 'red' }}>Please fill in all required fields.</p>}
                <button type="button" onClick={goToNextStep}>Next</button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              {/* Content for Step 2 */}
              <div className="businesspermit-form">
                <button type="button" onClick={goToPreviousStep}>Back</button>
                <h2>Step 2 Business Information</h2>
                <div className="form-group">
                  <label>Business Name:</label>
                  <input type="text" value={businessname} onChange={(e) => setBusinessName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Business Scale:</label>
                  <select
                    value={businessscale}
                    onChange={(e) => setBusinessScale(e.target.value)}
                    className="form-control"
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
                  <input type="text" value={paymentmethod} onChange={(e) => setPaymentMethod(e.target.value)}  />
                </div>
                <h2>Buisness Contact Information</h2>
                <div className="form-group">
                  <label>House/Bldg No./Blk and Lot:</label>
                  <input type="text" value={businessbuildingblocklot} onChange={(e) => setBusinessBuildingBlockLot(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Building Name/Street Name:</label>
                  <input type="text" value={businessbuildingname} onChange={(e) => setBusinessBuildingName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Subdivision/Compound Name:</label>
                  <input type="text" value={businesssubcompname} onChange={(e) => setBusinessSubCompName(e.target.value)}  />
                </div>
                <div className="form-group">
                  <label>Region:</label>
                  <input type="text" value={businessregion} onChange={(e) => setBusinessRegion(e.target.value)} disabled />
                </div>
                <div className="form-group">
                  <label>Province:</label>
                  <input type="text" value={businessprovince} onChange={(e) => setBusinessProvince(e.target.value)} disabled />
                </div>
                <div className="form-group">
                  <label>City/Municipality:</label>
                  <input type="text" value={businessmunicipality} onChange={(e) => setBusinessMunicipality(e.target.value)} disabled />
                </div>
                <div className="form-group">
                  <label>Barangay:</label>
                  <select
                    value={businessbarangay}
                    onChange={(e) => setbusinessBarangay(e.target.value)}
                    className="form-control"
                  >
                    <option value="" disabled>Select Barangay</option>
                    <option value="BM">Burol Main</option>
                    <option value="LI">Langkaan I</option>
                    <option value="PI">Paliparan I</option>
                    <option value="SB">Sabang</option>
                    <option value="SLG">Salawag</option>
                    <option value="SALI">Salitran I</option>
                    <option value="SAMI">Sampaloc I</option>
                    <option value="SAI">San Agustin I</option>
                    <option value="SJ">San Jose</option>
                    <option value="ZI">Zone I</option>
                    <option value="ZII">Zone II</option>
                    <option value="ZIII">Zone III</option>
                    <option value="ZIV">Zone IV</option>
                    <option value="DE">Datu Esmael</option>
                    <option value="EBI">Emmanuel Bergado I</option>
                    <option value="FI">Fatima I</option>
                    <option value="LMI">Luzviminda I</option>
                    <option value="SPI">Saint Peter I</option>
                    <option value="SADI">San Andres I</option>
                    <option value="SADPI">San Antonio De Padua I</option>
                    <option value="SD">San Dionisio</option>
                    <option value="SE">San Esteban</option>
                    <option value="SFI">San Francisco I</option>
                    <option value="SILI">San Isidro Labrador I</option>
                    <option value="SJN">San Juan</option>
                    <option value="SLRI">San Lorenzo Ruiz I</option>
                    <option value="SLI">San Luis I</option>
                    <option value="SMANI">San Manuel I</option>
                    <option value="SM">San Mateo</option>
                    <option value="SMGI">San Miguel I</option>
                    <option value="SNI">San Nicolas I</option>
                    <option value="SL">Santa Lucia</option>
                    <option value="SNS">San Simon</option>
                    <option value="SCI">Santa Cristina I</option>
                    <option value="SCZI">Santa Cruz I</option>
                    <option value="SF">Santa Fe</option>
                    <option value="SMR">Santa Maria</option>
                    <option value="SC">Santo Cristo</option>
                    <option value="STNI">Santo Niño I</option>
                    <option value="BRI">Burol I</option>
                    <option value="BRII">Burol II</option>
                    <option value="BRIII">Burol III</option>
                    <option value="EBII">Emmanuel Bergado II</option>
                    <option value="FII">Fatima II</option>
                    <option value="FIII">Fatima III</option>
                    <option value="LII">Langkaan II</option>
                    <option value="LMII">Luzviminda II</option>
                    <option value="PII">Paliparan II</option>
                    <option value="PIII">Paliparan III</option>
                    <option value="SPII">Saint Peter II</option>
                    <option value="SALII">Salitran II</option>
                    <option value="SALIII">Salitran III</option>
                    <option value="SALIV">Salitran IV</option>
                    <option value="SAMII">Sampaloc II</option>
                    <option value="SAMIII">Sampaloc III</option>
                    <option value="SAMIV">Sampaloc IV</option>
                    <option value="SAMV">Sampaloc V</option>
                    <option value="SAII">San Agustin II</option>
                    <option value="SAIII">San Agustin III</option>
                    <option value="SADII">San Andres II</option>
                    <option value="SADPII">San Antonio De Padua II</option>
                    <option value="SFII">San Francisco II</option>
                    <option value="SILII">San Isidro Labrador II</option>
                    <option value="SLRII">San Lorenzo Ruiz II</option>
                    <option value="SLII">San Luis II</option>
                    <option value="SMANII">San Manuel II</option>
                    <option value="SMGII">San Miguel II</option>
                    <option value="SNII">San Nicolas II</option>
                    <option value="SCII">Santa Cristina II</option>
                    <option value="SCZII">Santa Cruz II</option>


                  </select>
                </div>

                <div className="form-group">
                  <label>Zip:</label>
                  <input type="text" value={businesszip} onChange={(e) => setBusinessZip(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Contact Number:</label>
                  <input type="text" value={businesscontactnumber} onChange={(e) => setBusinessContactNumber(e.target.value)} />
                  Check if Same as Owner Info
                  <input
  type="checkbox"
  onChange={(e) => {
    if (e.target.checked) {
      setBusinessContactNumber(mobilenumber); // Set the value when checked
    } else {
      setBusinessContactNumber(''); // Clear the value when unchecked
    }
  }}
/>

                </div>
                <h2>Necessities Information</h2>
                <div className="form-group">
                  <label>Ownership Type:</label>
                  <select
                    value={ownershiptype}
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
                  <input type="text" value={agencyregistered} onChange={(e) => setAgencyRegistered(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>DTI Registration No:</label>
                  <input
                    type="text"
                    value={dtiregistrationnum}
                    onChange={(e) => setDTIRegistrationNum(e.target.value)}
                    placeholder="Enter DTI Registration No"
                    disabled={ownershiptype === "COOP" || ownershiptype === "CORP" || ownershiptype === "INST" || ownershiptype === "PART"}
                  />
                </div>
                <div className="form-group">
                  <label>DTI Registration Date:</label>
                  <input type="date" value={dtiregistrationdate} onChange={(e) => setDTIRegistrationDate(e.target.value)} disabled={ownershiptype === "COOP" || ownershiptype === "CORP" || ownershiptype === "INST" || ownershiptype === "PART"} />
                </div>
                <div className="form-group">
                  <label>DTI Expiration Date:</label>
                  <input type="date" value={dtiregistrationexpdate} onChange={(e) => setDTIRegistrationExpDate(e.target.value)} disabled={ownershiptype === "COOP" || ownershiptype === "CORP" || ownershiptype === "INST" || ownershiptype === "PART"} />
                </div>
                <div className="form-group">
                  <label>SEC Registration No:</label>
                  <input type="text" value={secregistrationnum} onChange={(e) => setSECRegistrationNum(e.target.value)} disabled={ownershiptype === "COOP" || ownershiptype === "SOLE"} />
                </div>
                <div className="form-group">
                  <label>BIR Registration No:</label>
                  <input type="text" value={birregistrationnum} onChange={(e) => setBIRRegistrationNum(e.target.value)} disabled={ownershiptype === "CORP" || ownershiptype === "INST" || ownershiptype === "PART" || ownershiptype === "SOLE"} />
                </div>
                <div className="form-group">
                  <label>Industry Sector:</label>
                  <select
                    value={industrysector}
                    onChange={(e) => setIndustrySector(e.target.value)}
                    className="form-control"
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
                    value={businessoperation}
                    onChange={(e) => setBusinessOperation(e.target.value)}
                    className="form-control"
                  >
                    <option value="Daytime">DAYTIME</option>
                    <option value="Nightshift">NIGHTSHIFT</option>
                    <option value="Day&Night">BOTH DAY AND NIGHT</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Business Type:</label>
                  <select
                    value={typeofbusiness}
                    onChange={(e) => setTypeofBusiness(e.target.value)}
                    className="form-control"
                  >
                    <option value="Main">MAIN</option>
                    <option value="Franchise">FRANCHISE</option>
                    <option value="Branch">BRANCH</option>
                  </select>
                </div>
                <button type="button" onClick={goToNextStep}>Next</button>

              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              {/* Content for Step 3 */}
              <div className="businesspermit-form">
                <button type="button" onClick={goToPreviousStep}>Backe</button>
                <h2>Step 3 Other Information</h2>
                <h2>Other Business Information</h2>
                <div className="form-group">
                  <label>Date Established:</label>
                  <input type="date" value={dateestablished} onChange={(e) => setDateEstablished(e.target.value)} />
                  <label>Check if Same as DTI</label>
                  <input
  type="checkbox"
  onChange={(e) => {
    if (e.target.checked) {
      setDateEstablished(dtiregistrationdate); // Set the value when checked
    } else {
      setDateEstablished(''); // Clear the value when unchecked
    }
  }}
/>
                </div>
                <div className="form-group">
                  <label>Start Date:</label>
                  <input type="date" value={startdate} onChange={(e) => setStartDate(e.target.value)} />
                  <label>Check if Same as DTI</label>
                  <input
  type="checkbox"
  onChange={(e) => {
    if (e.target.checked) {
      setStartDate(dtiregistrationdate); // Set the value when checked
    } else {
      setStartDate(''); // Clear the value when unchecked
    }
  }}
/>
                </div>
                <div className="form-group">
                  <label>Occupancy:</label>
                  <select
                    value={occupancy}
                    onChange={(e) => setOccupancy(e.target.value)}
                    className="form-control"
                  >
                    <option value="" disabled>Select Occupancy</option>
                    <option value="Agree">Agree To Use</option>
                    <option value="Owned">Owned</option>
                    <option value="Rented">Rented</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Business Type:</label>
                  <select
                    value={otherbusinesstype}
                    onChange={(e) => setOtherBusinessType(e.target.value)}
                    className="form-control"
                  >
                    <option value="" disabled>Select Business Type</option>
                    <option value="COMM">COMMERCIAL</option>
                    <option value="INDUST">INDUSTRIAL</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Email Address:</label>
                  <input type="text" value={businessemail} onChange={(e) => setBusinessEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Business Area:</label>
                  <input type="number" value={businessarea} onChange={(e) => setBusinessArea(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Lot Area:</label>
                  <input type="number" value={businesslotarea} onChange={(e) => setBusinessLotArea(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>No of Workers:</label>
                  Male:
                  <input type="text" value={numofworkermale} onChange={handleMaleChange} /> 
                  Female:
                  <input type="text" value={numofworkerfemale} onChange={handleFemaleChange} />
                </div>
                <div className="form-group">
                  <label>Total:</label>
                  <input type="text" value={numofworkertotal} readOnly placeholder='Total Workers'/>
                </div>
                <div className="form-group">
                  <label>Employees residing within LGU:</label>
                  <input type="text" value={numofworkerlgu} onChange={(e) => setNumofWorkerLGU(e.target.value)} />
                </div>
                <h2>Fill up only if Business Place is Rented</h2>
                <div className="form-group">
                  <label>Lessor's Full Name:</label>
                  <input type="text" value={lessorfullname} onChange={(e) => setLessorFullName(e.target.value)} disabled={occupancy === "Agree" || occupancy === "" || occupancy === "Owned"} />
                </div>
                <div className="form-group">
                  <label>Lessor's Mobile Number:</label>
                  <input type="text" value={lessormobilenumber} onChange={(e) => setLessorMobileNumber(e.target.value)} disabled={occupancy === "Agree" || occupancy === "" || occupancy === "Owned"}/>
                </div>
                <div className="form-group">
                  <label>Monthly Rent:</label>
                  <input type="text" value={monthlyrent} onChange={(e) => setMonthlyRent(e.target.value)} disabled={occupancy === "Agree" || occupancy === "" || occupancy === "Owned"}/>
                </div>
                <div className="form-group">
                  <label>Lessor's Full Address:</label>
                  <input type="text" value={lessorfulladdress} onChange={(e) => setLessorFullAddress(e.target.value)} disabled={occupancy === "Agree" || occupancy === "" || occupancy === "Owned"} />
                </div>
                <div className="form-group">
                  <label>Email Address:</label>
                  <input type="text" value={lessoremailaddress} onChange={(e) => setLessorEmailAddress(e.target.value)} disabled={occupancy === "Agree" || occupancy === "" || occupancy === "Owned"}/>
                </div>
                <button type="button" onClick={goToNextStep}>Next</button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              {/* Content for Step 4 */}
              <div className="businesspermit-form">
                <button type="button" onClick={goToPreviousStep}>Backd</button>
                <h2>Step 4 Map Location</h2>
                <h4>Map Location</h4>

                <MapLocation initialLat={lat} initialLng={lng} onLocationChange={handleLocationChange} />

                <div style={{ marginTop: '10px' }}>
                  <label>
                    Latitude:
                    <input type="text" value={lat} readOnly />
                  </label>
                  <br />
                  <label>
                    Longitude:
                    <input type="text" value={lng} readOnly />
                  </label>
                </div>
                <button type="button" onClick={goToNextStep}>Next</button>
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              <div className="businesspermit-form">
                {/* Content for Step 5 */}
                <button type="button" onClick={goToPreviousStep}>Backc</button>
                <h2>Step 5 Business Nature</h2>
                <Select
        name="businessNature"
        value={newBusiness.businessNature
          ? businessNatureOptions.find(
              (option) => option.value === newBusiness.businessNature
            )
          : null // Reset the value to null to show the placeholder
        }
        onChange={handleDropdownChange}
        options={businessNatureOptions}
        placeholder="Select or Type Business Nature"
      />

      {/* Input for Business Type */}
      <input
        type="text"
        name="businessType"
        placeholder="Business Type"
        value={newBusiness.businessType}
        onChange={handleInputChange}
      />

      {/* Input for Capital Investment */}
      <input
        type="number"
        name="capitalInvestment"
        placeholder="Capital Investment"
        value={newBusiness.capitalInvestment}
        onChange={handleInputChange}
      />

      {/* Add Business Button */}
      <button onClick={(e) => {
                             e.preventDefault(); // Prevents default form submission or button behavior
                             handleAddBusiness(); // Calls your custom function
                            }}>Add Business</button>

      <h2>Businesses to Add</h2>

      {/* Table to display added businesses */}
      <table className="permit-table">
        <thead>
          <tr>
            <th>Business Nature</th>
            <th>Business Type</th>
            <th>Capital Investment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business, index) => (
            <tr key={index}>
              <td>{businessNatureMap[business.businessNature as keyof typeof businessNatureMap] || business.businessNature}</td>

              <td>{business.businessType}</td>
              <td>{business.capitalInvestment}</td>
              <td>
                <button onClick={(e) => {handleRemoveBusiness(index); e.preventDefault();}}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
                
    
    
                 
                <button type="button" onClick={goToNextStep}>Next</button>

              </div>
            </div>
          )}
          {step === 6 && (
            <div>
              <div className="businesspermit-form">
                {/* Content for Step 6 */}
                <button type="button" onClick={goToPreviousStep}>Backc</button>
                <label>Upload DTI / SEC / CDA:</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document1')} />
                <label>Occupancy Permit (Optional)</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document2')} />
                <label>Lease Contract (if rented) / Tax Declaration (If Owned)</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document3')} />
                <label>Authorization Letter / S.P.A. / Board Resolution / Secretary's Certificate (if thru representative)</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document4')} />
                <label>No file chosen Owner's ID</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document5')} />
                <label>Picture of Establishment (Perspective View)</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document6')} />
                <button type="submit">Submit</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default BusinessPermit;
