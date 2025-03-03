import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ClientStyles.css';
import { businessNatureMap, businessNatureOptions } from "../components/Interface(Front-end)/BusinessNatureMap"; 
import ClientNavbar from '../components/NavigationBars/clientnavbar';
import MapLocation from '../components/MapContents/MapLocation';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';

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

  const logFormData = (formData: FormData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, doc: 'document1' | 'document2' | 'document3' | 'document4' | 'document5' | 'document6' | 'document7'| 'document8' | 'document9' | 'document10') => {
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
    
    // Step 1
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
  
    // Step 2
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
  
    // Step 3
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
  
    // Step 4
    formData.append('lat', String(lat));
    formData.append('lng', String(lng));
  
    // Step 5
    formData.append('businesses', JSON.stringify(businesses));
  
    // Attach documents if they exist
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });
  
    logFormData(formData);
  
    // Show loading SweetAlert
    Swal.fire({
      title: 'Submitting Application...',
      text: 'Please wait while we process your request.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const response = await axios.post('http://localhost:3000/client/businesspermitapplication', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
  
      console.log(response.data);
  
      if (response.status === 200) {
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Application Submitted!',
          text: 'Your business permit application has been submitted successfully!',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate('/dashboard');
        });
      } else {
        const errorMessage = (response.data as { message: string }).message;
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: errorMessage || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
      });
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

  //Business Nature
  // Define type for newBusiness and businesses state
  const [newBusiness, setNewBusiness] = useState<{
    businessNature: string;
    businessType: string;
    capitalInvestment: number;
  }>({
    businessNature: '',
    businessType: '',
    capitalInvestment: 0,
  });
  
  // Define businesses state as an array of objects
  const [businesses, setBusinesses] = useState<
    { businessNature: string; businessType: string; capitalInvestment: number }[]
  >([]);


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
    if (step === 2) {
      // Check if required fields are filled for step 1
      if (!paymentmethod) {
        setIsFormValid(false); // Set form as invalid
        return; // Prevent moving to the next step
      }
    }
    if (step === 5) {
      // Check if at least one business is added
      if (businesses.length === 0) {
        setIsFormValid(false);
        return;
      }
    }
  

    // Reset validity state if validation passes
    setIsFormValid(true);
    setStep(prevStep => prevStep + 1);
  };

  const goToPreviousStep = () => {
      setIsFormValid(true);
    setStep(prevStep => prevStep - 1);
  };


  //Form Pages End





// Map for business nature for display purposes



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
  } 
  if (newBusiness.capitalInvestment === 0 || newBusiness.capitalInvestment < 0) {
    alert("Please input a valid Capital Investment.");
    return; // Exit the function to prevent further action
  }else {
    // Proceed to add the business
    setBusinesses((prevState) => [...prevState, newBusiness]);
    setNewBusiness({
      businessNature: '',
      businessType: '',
      capitalInvestment: 0,
    });
  }
};


// Handle removing a business from the table
const handleRemoveBusiness = (index: number) => {
  setBusinesses((prevState) => prevState.filter((_, i) => i !== index));
};

  return (
    <section className="dashboard-container">
          {/* Navbar */}
          <ClientNavbar/>

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
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={corporation}
                    onChange={() => {
                      setCorporation(!corporation);
                      setFirstName('');
                      setLastName('');
                      setMiddleInitial('');
                      setCivilStatus('Undefined');
                      setGender('Corp');

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
               <div className="form-row">
                <div className="form-group">
                <label>CIVIL STATUS:</label>
                <select
                  value={civilstatus}
                  onChange={(e) => setCivilStatus(e.target.value)}
                  disabled={corporation}
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
                  disabled={corporation}
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
                </div>
                <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={representative} onChange={() => setRepresentative(!representative)} />
                  Check if Thru Representative
                </label>
               </div>
               <div className="form-row">
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
               </div>
                <h2>Contact Information</h2>
               <div className="form-row">
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
               </div>
               <div className="form-row">
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
              </div>
              <div className="form-row">
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
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                {!isFormValid && <p style={{ color: 'red' }}>Please fill in all required fields.</p>}
                <button type="button" onClick={goToNextStep} className="btn btn-success">Next</button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              {/* Content for Step 2 */}
              <div className="businesspermit-form">
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
      <select
        value={paymentmethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="form-control"
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
                  <input type="text" value={businessbarangay} onChange={(e) => setbusinessBarangay(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Zip:</label>
                  <input type="text" value={businesszip} onChange={(e) => setBusinessZip(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Contact Number:</label>
                  <input type="text" value={businesscontactnumber} onChange={(e) => setBusinessContactNumber(e.target.value)} />
                  <label className="checkbox-label">
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
                  Check if Same as Owner Info
                  </label>


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
                {!isFormValid && <p style={{ color: 'red' }}>Please fill in all required fields.</p>}
                <div style={{ display: 'flex', gap: '13px' }}>
  <button className="btn btn-danger" type="button" onClick={goToPreviousStep}>
    Back
  </button>
  <button type="button" onClick={goToNextStep} className="btn btn-success">
    Next
  </button>
</div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              {/* Content for Step 3 */}
              <div className="businesspermit-form">
                <h2>Step 3 Other Information</h2>
                <h2>Other Business Information</h2>
                <div className="form-group">
                  <label>Date Established:</label>
                  <input type="date" value={dateestablished} onChange={(e) => setDateEstablished(e.target.value)} />
                  <label className="checkbox-label">
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
                      Check if Same as DTI
                  </label>


                </div>
                <div className="form-group">
                  <label>Start Date:</label>
                  <input type="date" value={startdate} onChange={(e) => setStartDate(e.target.value)} />
                  <label className="checkbox-label">
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
  Check if Same as DTI
</label>

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
                  <input type="number" value={numofworkermale} onChange={handleMaleChange} /> 
                  Female:
                  <input type="number" value={numofworkerfemale} onChange={handleFemaleChange} />
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
                <button type="button" onClick={goToPreviousStep} className="btn btn-danger">Back</button>
                <button type="button" onClick={goToNextStep} className="btn btn-success">Next</button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              {/* Content for Step 4 */}
              <div className="businesspermit-form">
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
                <button type="button" onClick={goToPreviousStep}className="btn btn-danger">Back</button>
                <button type="button" onClick={goToNextStep}className="btn btn-success">Next</button>
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              <div className="businesspermit-form">
                {/* Content for Step 5 */}
                
                <h2>Step 5 Business Nature</h2>
                Business Nature:
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
      Business Type:
      <input
        type="text"
        name="businessType"
        placeholder="Business Type"
        value={newBusiness.businessType = "New"}
        disabled
        onChange={handleInputChange}
      />

      {/* Input for Capital Investment */}
      Capital Investment:
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
                            }}className="addbusiness">Add Business</button>

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
                <button onClick={(e) => {handleRemoveBusiness(index); e.preventDefault();}} className="removebutton">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div> {!isFormValid && <p style={{ color: 'red' }}>Please add at least one business nature before proceeding.</p>}
                <button type="button" onClick={goToPreviousStep}className="btn btn-danger">Back</button>
                <button type="button" onClick={goToNextStep} className="btn btn-success" >Next</button>
                </div>

              </div>
            </div>
          )}
          {step === 6 && (
            <div className="upload-section">
                <label>
                  Upload DTI / SEC / CDA:
                </label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document1')} />
                <label>
                  Occupancy Permit (Optional):
                </label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document2')} />
                <label>
                  Lease Contract (if rented) / Tax Declaration (If Owned):
                </label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document3')} />
                <label>
                  Authorization Letter / S.P.A. / Board Resolution / Secretary's Certificate (if thru representative):
                </label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document4')} />
                <label>
                 Owner's ID:
                </label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document5')} />
                <label>
                  Picture of Establishment (Perspective View):
                </label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document6')} />
                <label>
                Zoning:
                </label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document7')} />
                <label>
                Office of the Building Official:
                </label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document8')} />
                <label>
                City Health Office:
                </label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document9')} />
                <label>
                Bureau of Fire Protection:
                </label>
                <input type="file" onChange={(e) => handleFileChange(e, 'document10')} />
                
              <div>
              <button className="btn btn-danger" type="button" onClick={goToPreviousStep}>Back</button>
              <button className="btn btn-success" type="submit">Submit</button>
              </div>
          </div>
          )}
        </form>
      </div>
    </section>
  );
};


export default BusinessPermit;
