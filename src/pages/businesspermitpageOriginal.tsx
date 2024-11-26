import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ClientStyles.css';
import ClientSideBar from './components/ClientSideBar';
import MapLocation from './components/MapLocation';
import axios from 'axios';


interface Business {
  businessNature: string;
  businessType: string;
  capitalInvestment: number;
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
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [newBusiness, setNewBusiness] = useState<Business>({
    businessNature: '',
    businessType: '',
    capitalInvestment: 20000,
  });
  //Step 6
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

  const logFormData = (formData: FormData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
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



  const handleLocationChange = (latitude: number, longitude: number) => {
    setLat(latitude);
    setLng(longitude);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBusiness({ ...newBusiness, [name]: value });
  };

  const handleAddBusiness = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default button behavior
    setBusinesses([...businesses, newBusiness]);
    setNewBusiness({ businessNature: '', businessType: '', capitalInvestment: 20000 });
  };

  const handleRemoveBusiness = (index: number) => {
    const updatedBusinesses = businesses.filter((_, i) => i !== index);
    setBusinesses(updatedBusinesses);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('lastName', lastname);
    formData.append('firstName', firstname);
    formData.append('middleInitial', middleinitial);
    formData.append('civilstatus', civilstatus);
    formData.append('gender', gender);
    formData.append('citizenship', citizenship);
    formData.append('tinnumber', tinnumber);
    formData.append('representative', String(representative));
    formData.append('repfullname', repfullname);
    formData.append('repdesignation', repdesignation);
    formData.append('repmobilenumber', repmobilenumber);
    formData.append('businessname', businessname);
    formData.append('businessscale', businessscale);
    formData.append('paymentmethod', paymentmethod);


    if (files.document1) formData.append('document1', files.document1);
    if (files.document2) formData.append('document2', files.document2);
    if (files.document3) formData.append('document3', files.document3);
    if (files.document4) formData.append('document4', files.document4);
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
                <h1>Add Businesses</h1>

                <div>
    
                <select
    name="businessNature"
    value={newBusiness.businessNature}
    onChange={handleInputChange}
  >
    <option value="" disabled>Select Business Nature</option>
    <option value="BNK_IC">Bank - Other Financial Institutions - Investment Company</option>
    <option value="BNK_HIC">Bank - Holding Investment Company</option>
    <option value="BNK_BNK">Bank - Financial Institution - Bank</option>
    <option value="BNK_NBI">Bank - Other Financial Institution - Non-Bank Intermediary</option>
    <option value="BNK_LI">Bank - Other Financial Institution - Lending Investor</option>
    <option value="BNK_FIC">Bank - Other Financial Institution - Finance and Investments Company</option>
    <option value="BNK_MS">Bank - Other Financial Institution - Money Shop</option>
    <option value="BNK_ICO">Bank - Other Financial Institution - Insurance Company</option>
    <option value="BNK_SM">Bank - Other Financial Institution - Stock Market</option>
    <option value="BNK_SB">Bank - Other Financial Institution - Stock Broker</option>
    <option value="BNK_DSFE">Bank - Other Financial Institution - Dealer in Securities and Foreign Exchange</option>
    <option value="BNK_DAEP">Bank - Other Financial Institution - Dealer in Educational Plan Agencies, Health Plan Agencies, and Memoria</option>
    <option value="BNK_EPP">Bank - Other Financial Institution - Educational/Pension Plans</option>
    <option value="BNK_REM">Bank - Other Financial Institution - Remittance</option>
    <option value="BNK_CA">Bank - Other - Collection Agent</option>
    <option value="BNK_PSR">Bank - Other - Pawnshop / Remittance</option>
    <option value="BNK_FED">Bank - Other Financial Institution - Foreign Exchange Dealer</option>
    <option value="BNK_FE">Bank - Other - Remittance / Moneyshop / MC Foreign Exchange</option>
    <option value="BNK_ATM">Bank - Financial - ATM Machine</option>
    <option value="BNK_MC">Bank - Other - Money Transfer / Remittance / Money Changer</option>
    <option value="BNK_PSMC">Bank - Other - Pawnshop / Money Changer</option>
    <option value="BNK_IA">Bank - Other - Insurance Agency</option>
    <option value="CNT_DC">Contractor - Contractor - Dry-cleaning or dyeing establishment, steam laundries, and laundries using washing machines</option>
    <option value="CNT_BCS">Contractor - Contractor - Battery Charging Shop</option>
    <option value="CNT_BP">Contractor - Contractor - Beauty Parlor</option>
    <option value="CNT_BA">Contractor - Contractor - Business Agent</option>
    <option value="CNT_CFO">Contractor - Contractor - Cinematographic Film Owners, Lessors, and Distributors</option>
    <option value="CNT_IB">Contractor - Contractor - Immigration Brokers</option>
 {/* Done */}  {/* Done */}


    <option value="CNT_CB">Contractor - Contractor - Commercial Brokers</option>
<option value="CNT_EPL">Contractor - Contractor - Engraving, Plating, and Plastic Lamination Establishment</option>
<option value="CNT_FDSW">Contractor - Contractor - Filling, Demolition, and Salvage Works Contractors</option>
<option value="CNT_FP">Contractor - Contractor - Funeral Parlors</option>
<option value="CNT_FS">Contractor - Contractor - Furniture Shops</option>
<option value="CNT_GE">Contractor - Contractor - General Engineering, General Building, and Specialty Contractors</option>
<option value="CNT_HSP">Contractor - Contractor - House and/or Sign Painters</option>
<option value="CNT_MCS">Contractor - Contractor - Massage Clinics / Sauna, Turkish and Swedish Baths / SPA</option>
<option value="CNT_MH">Contractor - Contractor - Milliners and Hatters</option>
<option value="CNT_PL">Contractor - Contractor - Parking Lots or Establishments for Parking Purposes</option>
<option value="CNT_WSP">Contractor - Contractor - Persons Engaged in the Installation of Water System and Gas or Electric Light, Heat or Power</option>
<option value="CNT_PS">Contractor - Contractor - Photographic Studios</option>
<option value="CNT_PBL">Contractor - Contractor - Printers, Bookbinders, Lithographers</option>
<option value="CNT_PDWA">Contractor - Contractor - Private Detective or Watchman Agencies</option>
<option value="CNT_DOCK">Contractor - Contractor - Proprietors or Operators of Dockyards</option>
<option value="CNT_POH">Contractor - Contractor - Proprietors or Operators of Hotels, Motels, and Lodging Houses</option>
<option value="CNT_MDA">Contractor - Contractor - Proprietors or Operators of Mine Drilling Apparatus</option>
<option value="CNT_SMP">Contractor - Contractor - Proprietors or Operators of Smelting Plants</option>
<option value="CNT_PUB">Contractor - Contractor - Publishers Except Those Engaged in the Publication of Any Newspaper, Magazines, Reviews</option>
<option value="CNT_RCS">Contractor - Contractor - Recapping Shops</option>
<option value="CNT_RMVHE">Contractor - Contractor - Repainting Shops of Motor Vehicles and Heavy Equipment</option>
<option value="CNT_RPMH">Contractor - Contractor - Repair Shops of Motor Vehicle and Heavy Equipment</option>
<option value="CNT_RPMED">Contractor - Contractor - Repair Shops for Any Kind of Mechanical and Electric Devices, Instruments, Apparatus or Equipment</option>
<option value="CNT_SAW">Contractor - Contractor - Sawmills under Contract to Saw or Cut Logs Belonging to Others</option>
<option value="CNT_SRS">Contractor - Contractor - Shoe Repair Shops</option>
<option value="CNT_LPL">Contractor - Contractor - Shops for Planning or Surfacing and Recutting Lumber</option>
<option value="CNT_SBCS">Contractor - Contractor - Slenderizing and Bodybuilding Saloons</option>
<option value="CNT_SMH">Contractor - Contractor - Smiths (Blacksmith, Goldsmith, Keysmith, Locksmith, or Tinsmith)</option>
<option value="CNT_TL">Contractor - Contractor - Tailor or Dress Shops, Modiste Shops, Haberdashery Shops</option>
<option value="CNT_US">Contractor - Contractor - Upholstery Shop</option>
 {/* Done */}  {/* Done */}


<option value="CNT_VS">Contractor - Contractor - Vulcanizing Shop</option>
<option value="CNT_WS">Contractor - Contractor - Warehousing or Forwarding Services</option>
<option value="CNT_WGS">Contractor - Contractor - Washing or Greasing Shop / Change Oil</option>
<option value="CNT_OSE">Contractor - Contractor - Other Similar Establishment</option>
<option value="CNT_IRS">Contractor - Contractor - Ink Refilling Station</option>
<option value="CNT_DIC">Contractor - Contractor - Diesel Calibration</option>
<option value="CNT_TS">Contractor - Contractor - Transport Services</option>
<option value="CNT_TTA">Contractor - Contractor - Travel and Tour Agency</option>
<option value="CNT_EXH">Contractor - Contractor - Exhibitor</option>
<option value="CNT_WLS">Contractor - Contractor - Waterwaste Laboratory Service</option>
<option value="CNT_RHC">Contractor - Contractor - Rehabilitation Center</option>
<option value="CNT_RF">Contractor - Contractor - Religious Foundations and Non-Government Organizations</option>
<option value="CNT_CRG">Contractor - Contractor - Computer Rentals (With Games)</option>
<option value="CNT_CRNG">Contractor - Contractor - Computer Rentals (No Games)</option>
<option value="CNT_LS">Contractor - Contractor - Laundry Services</option>
<option value="CNT_RSV">Contractor - Contractor - Repair Services</option>
<option value="CNT_RSH">Contractor - Contractor - Repair Shop</option>
<option value="CNT_DS">Contractor - Contractor - Dress Shop</option>
<option value="CNT_TDS">Contractor - Contractor - Tailoring / Dress Shop</option>
<option value="CNT_SGEN">Contractor - Contractor - Subcontractor / Gen. Engineering</option>
<option value="CNT_GSS">Contractor - Contractor - Goldsmith / Silversmith</option>
<option value="CNT_TCS">Contractor - Contractor - Telecommunication Services</option>
<option value="CNT_BS">Contractor - Contractor - Barber Shop / Beauty Parlor</option>
<option value="CNT_VR">Contractor - Contractor - Video Rental</option>
<option value="CNT_EO">Contractor - Contractor - Exhibit Organizer</option>
<option value="CNT_RAS">Contractor - Contractor - Ref Aircon Services</option>
 {/* Done */}  {/* Done */}



<option value="CNT_FPO">Contractor - Contractor - Funeral Parlors (Office Only)</option>
<option value="CNT_CDP">Contractor - Contractor - Computer Desktop Publishing</option>
<option value="CNT_SS">Contractor - Contractor - Sign Services</option>
<option value="CNT_CBR">Contractor - Contractor - Custom Broker</option>
<option value="CNT_PB">Contractor - Contractor - Publishers (Books)</option>
<option value="CNT_RC">Contractor - Contractor - Review Center</option>
<option value="CNT_ETC">Contractor - Contractor - Emission Testing Center</option>
<option value="CNT_CCS">Contractor - Contractor - Child Care Services</option>
<option value="CNT_DAS">Contractor - Contractor - Design and Ads Services</option>
<option value="CNT_CDPG">Contractor - Contractor - Computer Design Programs</option>
<option value="CNT_IC">Contractor - Contractor - Internet Connection</option>
<option value="CNT_BB">Contractor - Contractor - Billboards</option>
<option value="CNT_PRT">Contractor - Contractor - Printing Services</option>
<option value="CNT_CC">Contractor - Contractor - Call Center</option>
<option value="CNT_RP">Contractor - Contractor - Radio Production (Sponsorship)</option>
<option value="CNT_WH">Contractor - Contractor - Warehouse</option>
<option value="CNT_CS">Contractor - Contractor - Customer Services</option>
<option value="CNT_REM">Contractor - Contractor - Remittance</option>
<option value="CNT_MCPO">Contractor - Contractor - Medical Clinic (Office Only)</option>
<option value="CNT_GBS">Contractor - Contractor - General Building and Specialty Contractor (Office Only)</option>
<option value="CNT_RS">Contractor - Contractor - Recording Studio</option>
<option value="CNT_SRO">Contractor - Contractor - Show Room Only</option>
<option value="CNT_LRED">Contractor - Lessor - Real Estate Dealer</option>
<option value="CNT_RED">Contractor - Contractor - Real Estate Dealer</option>
<option value="CNT_PC">Contractor - Contractor - Powder Coating</option>
<option value="CNT_GSP">Contractor - Contractor - Gen. Eng'g, Gen. Bldg, and Specialty Contractor</option>
<option value="CNT_TRC">Contractor - Contractor - Therapy and Rehabilitation Center</option>
<option value="CNT_TSO">Contractor - Contractor - Transport Services / Office Only</option>
<option value="CNT_GEI">Contractor - Contractor - General Engineering, General Building, and Specialty Contractor / Importer</option>
<option value="CNT_MC">Contractor - Contractor - Massage Clinics / Sauna, Turkish and Swedish Baths / Gym</option>
 {/* Done */}  {/* Done */}




<option value="CNT_SA">Contractor - Contractor - Security Agency</option>
<option value="CNT_WI">Contractor - Contractor - Warehouse / Importer</option>
<option value="CNT_AS">Contractor - Contractor - Design and Artwork Services</option>
<option value="CNT_CTS">Contractor - Contractor - Catering Services</option>
<option value="CNT_REPS">Contractor - Contractor - Repainting Automotive Shop</option>
<option value="CNT_CR">Contractor - Contractor - Crematory</option>
<option value="CNT_WWTF">Contractor - Contractor - Water Waste Treatment Facility (Office Only)</option>
<option value="CNT_TSW">Contractor - Contractor - Tailoring / Sportswear</option>
<option value="CNT_EDAS">Contractor - Contractor - Engineering Designs / Autocad Services</option>
<option value="CNT_ADS">Contractor - Contractor - Architectural Design Services</option>
<option value="CNT_PTS">Contractor - Contractor - Painting Services</option>
<option value="CNT_PHB">Contractor - Contractor - Photo Booth</option>
<option value="CNT_WC">Contractor - Contractor - Wellness Clinic</option>
<option value="CNT_ESS">Contractor - Contractor - Event Security Services</option>
<option value="CNT_EC">Contractor - Contractor - Electrical Contractor</option>
<option value="CNT_GBC">Contractor - Contractor - General Building and Specialty Contractor / LESSOR</option>
<option value="CNT_MW">Contractor - Contractor - Mechanical Works</option>
<option value="CNT_SWC">Contractor - Contractor - Subcontractor - Woodcraft</option>
<option value="CNT_ARS">Contractor - Contractor - Aircon Services</option>
<option value="CNT_REB">Contractor - Contractor - Real Estate Broker</option>
<option value="CNT_MS">Contractor - Contractor - Massage Services</option>
<option value="CNT_TTS">Contractor - Contractor - Tattoo Shop</option>
<option value="CNT_TLS">Contractor - Contractor - Tailoring Shop</option>
<option value="CNT_PH">Contractor - Contractor - Photography</option>
<option value="CNT_TNS">Contractor - Contractor - Transport Services / Operator</option>
<option value="CNT_GESC">Contractor - Contractor - Gen. Eng'g, Gen. Bldg and Specialty Contractor / Importer</option>
<option value="CNT_ARPS">Contractor - Other - Auto Repair / Body Paint Shop</option>
<option value="CNT_RARS">Contractor - Contractor - Repainting Auto Repair Shop</option>
<option value="CNT_C">Contractor - Other - Curtains</option>
 {/* Done */} {/* Done */}



<option value="CNT_CBUP">Contractor - Contractor - Curtains, Beddings, Upholstery</option>
<option value="CNT_CUS">Contractor - Other - Counseling Services</option>
<option value="CNT_CCUS">Contractor - Contractor - Counseling Services</option>
<option value="CNT_DPS">Contractor - Contractor - Digital Printing Services</option>
<option value="CNT_VPC">Contractor - Contractor - Video Photo Coverage Services</option>
<option value="CNT_GD">Contractor - Contractor - Graphic Design</option>
<option value="CNT_GS">Contractor - Contractor - Gasoline Station (Office Only)</option>
<option value="CNT_MHS">Contractor - Contractor - Machine Shop</option>
<option value="CNT_MRI">Contractor - Contractor - MRI / Ultrasound</option>
<option value="CNT_CPR">Contractor - Contractor - Cellphone Repair</option>
<option value="CNT_CW">Contractor - Contractor - Carwash</option>
<option value="CNT_TOBF">Contractor - Other Contractor - Ticketing Office / Bill Payment / Forwarding Services</option>
<option value="CNT_CSW">Contractor - Contractor - Cold Storage Warehouse</option>
<option value="CNT_GEMS">Contractor - Contractor - General Engineering and Specialty Contractor / Machine Shop</option>
<option value="CNT_SCG">Contractor - Contractor - Subcontractor - Gloves</option>
<option value="CNT_VSRA">Contractor - Contractor - Vulcanizing Shop / Repainting Automotive Shop</option>
<option value="CNT_ES">Contractor - Contractor - Electronic Services</option>
<option value="CNT_PNO">Contractor - Contractor - Publisher of Newspaper (Office Only)</option>
<option value="CNT_CAD">Contractor - Contractor - Carwash Auto Detailing</option>
<option value="CNT_LR">Contractor - Contractor - Lounge Rental</option>
<option value="CNT_UPTS">Contractor - Contractor - Upholstery Shop / Tailoring Shop</option>
<option value="CNT_STCR">Contractor - Contractor - Service Tables and Chairs Rental</option>
<option value="CNT_REF">Contractor - Contractor - Referee</option>
<option value="CNT_ES2">Contractor - Other - Electrical Services</option>
<option value="CNT_PPUB">Contractor - Contractor - Printing Publishing</option>
<option value="CNT_USDS">Contractor - Contractor - Upholstery Shop / Dress Shop</option>
<option value="CNT_LSS">Contractor - Other - Land Surveying Services</option>
<option value="CNT_PPS">Contractor - Contractor - Photography and Printing Services</option>
<option value="CNT_FNS">Contractor - Contractor - Funeral Services</option>
<option value="CNT_HF">Contractor - Contractor - Hauling / Forwarding</option>
 {/* Done */} {/* Done */}



<option value="CNT_SHS">Contractor - Contractor - School Service</option>
<option value="CNT_LO">Contractor - Contractor - Liaison Office</option>
<option value="CNT_APO">Contractor - Contractor - Agricultural Products (Office Only)</option>
<option value="CNT_WDS">Contractor - Contractor - Well-Drilling Services</option>
<option value="CNT_FCF">Contractor - Contractor - Franchisor (Foodcart)</option>
<option value="CNT_FPNE">Contractor - Contractor - Funeral Parlors (No Embalming)</option>
<option value="CNT_CS2">Contractor - Contractor - Calibration Services</option>
<option value="CNT_ID">Contractor - Contractor - Interior Design</option>
<option value="CNT_CWH">Contractor - Contractor - Carwash (Home Service)</option>
<option value="CNT_MKS">Contractor - Contractor - Marketing Services</option>
<option value="CNT_ITR">Contractor - Contractor - IT Related Services</option>
<option value="CNT_SD">Contractor - Contractor - Software Developer</option>
<option value="CNT_AES">Contractor - Contractor - Aeronautical Engineering Services</option>
<option value="CNT_CWCP">Contractor - Contractor - Carwash / Car Painting</option>
<option value="CNT_RH">Contractor - Contractor - Retreat House</option>
<option value="CNT_PO">Contractor - Contractor - Promotion Offices or Agencies, Promoters of Shows, Games or Performances</option>
<option value="CNT_STF">Contractor - Contractor - Swab Testing Facility</option>
<option value="CNT_BIP">Contractor - Contractor - Bills Payment</option>
<option value="CNT_OS">Contractor - Contractor - Online Services</option>
<option value="CNT_GLS">Contractor - Contractor - Galvanizing Services</option>
<option value="CNT_ARP">Contractor - Contractor - Auto Repair Shop</option>
<option value="CNT_RNTS">Contractor - Contractor - Rental Services</option>
<option value="CNT_AC">Contractor - Contractor - Aesthetic Center</option>
<option value="CNT_RLS">Contractor - Contractor - Rental of Lights and Sounds</option>
<option value="CNT_PRDC">Contractor - Contractor - Production Company</option>
<option value="CNT_BPV">Contractor - Contractor - Bills Payment (Vendo Machine)</option>
<option value="CNT_PC2">Contractor - Contractor - Pediatric Clinic</option>
<option value="CNT_EPIS">Contractor - Contractor - Electrical Plumbing Installation Services</option>
<option value="CNT_CT">Contractor - Contractor Tax</option>
<option value="CNT_CT2">Contractor - Contractor - Contractor Tax</option>
 {/* Done */} {/* Done */}




<option value="CNT_GAS">Contractor - Gasoline Station - Contractor - Gasoline Station</option>
<option value="CNT_GSRS">Contractor - Gasoline Station - Contractor - Gasoline Station / Repair Services</option>
<option value="EXM_PEZA">Exempted - Exempted - Manufacturer of Plastic Product (PEZA)</option>
<option value="EXM_RO">Exempted - Exempted - Religious Organization</option>
<option value="EXM_CS">Exempted - Exempted - Clinic Services</option>
<option value="EXM_LIC">Exempted - Exempted - Lying In Clinic (M.C. No. 2016-0170)</option>
<option value="EXM_DOC">Exempted - Exempted - Dental and Optical Clinic</option>
<option value="EXM_LPG">Exempted - Exempted - LPG</option>
<option value="EXM_MC">Exempted - Exempted - Medical Clinic</option>
<option value="EXM_MLC">Exempted - Exempted - Medical Clinic / Lying-In Clinic</option>
<option value="EXM_DT">Exempted - Exempted - Drug Testing</option>
<option value="EXM_SOC">Exempted - Exempted - Skin and Optical Clinic</option>
<option value="EXM_MHC">Exempted - Exempted - Mental Health Clinic</option>
<option value="EXM_ETR">Exempted - Exempted - Energy Transmission (R.A. 9511)</option>
<option value="EXM_TC">Exempted - Exempted - Therapy Clinic</option>
<option value="EXM_TCS">Exempted - Exempted - Telecommunication Services (Cell Site)</option>
<option value="EXM_CT">Exempted - Exempted - Cooperative (Transport Services)</option>
<option value="EXM_GS">Exempted - Exempted - Gasoline Station</option>
<option value="EXM_DC">Exempted - Exempted - Dental Clinic</option>
<option value="EXM_TS">Exempted - Exempted - Telecommunication Services</option>
<option value="EXM_EA">Exempted - Exempted - Employment Agency (Cooperative)</option>
<option value="EXM_BS">Exempted - Exempted - Bank Services</option>
<option value="EXM_DIS">Exempted - Exempted - Digital Imaging Services (R.A. 7459)</option>
<option value="EXM_EU">Exempted - Exempted - Electric Utility</option>
<option value="EXM_EU71">Exempted - Exempted - Electric Utility (R.A. 7160 L.G.C. 1991)</option>
<option value="EXM_RS">Exempted - Exempted - Repair Services</option>
<option value="EXM_AS">Exempted - Exempted - Accounting Services</option>
<option value="EXM_C">Exempted - Exempted - Cooperative</option>
<option value="EXM_LO">Exempted - Exempted - Law Offices</option>
<option value="EXM_MC2">Exempted - Exempted - Massage Clinic</option>
 {/* Done */}  {/* Done */}




<option value="EXM_RM">Exempted - Retailer - Reinforced Materials</option>
<option value="EXM_RA74">Exempted - Exempted - R.A. 7459</option>
<option value="EXM_OC">Exempted - Operator - Optical Clinic</option>
<option value="EXM_OC2">Exempted - Exempted - Optical Clinic</option>
<option value="EXM_WS">Exempted - Wholesaler - Surveying Office</option>
<option value="EXM_SO">Exempted - Exempted - Surveying Office</option>
<option value="EXM_SPEZ">Exempted - Exempted - Manufacture of Semi-Conductor Device (PEZA)</option>
<option value="EXM_VC">Exempted - Exempted - Veterinary Clinic</option>
<option value="EXM_COOP">Exempted - Cooperative - Exempted - Cooperative</option>
<option value="LSS_SC">Lessor - Lessor - Shopping Center</option>
<option value="LSS_FC">Lessor - Lessor - Food Court</option>
<option value="LSS_CBW">Lessor - Lessor - Customs Bonded Warehouse</option>
<option value="LSS_OOPM">Lessor - Lessor - Office Only / Private Owned Market</option>
<option value="LSS_REA">Lessor - Lessor - Real Estate Including Apartments</option>
<option value="LSS_O">Lessor - Lessor - Others</option>
<option value="LSS_POM">Lessor - Lessor - Publicly Owned Market</option>
<option value="LSS_PROM">Lessor - Lessor - Private Owned Market</option>
<option value="LSS_OPRM">Lessor - Lessor - Others / Private Owned Market</option>
<option value="LSS_L">Lessor - Lessor - Land Only</option>
<option value="LSS_REB">Lessor - Lessor - Real Estate Including Building</option>
<option value="LSS_BO">Lessor - Lessor - Building Only</option>
<option value="LSS_DM">Lessor - Lessor - Dormitory</option>
<option value="LSS_BH">Lessor - Lessor - Boarding House</option>
<option value="LSS_SFR">Lessor - Lessor - Space for Rent</option>
<option value="LSS_A">Lessor - Lessor - Apartment</option>
<option value="LSS_STFR">Lessor - Lessor - Stall for Rent</option>
<option value="MFR_BEDS">Manufacturer - Manufacturer - BEDS</option>
<option value="MFR_SH">Manufacturer - Manufacturer - Shoes</option>
<option value="MFR_DS">Manufacturer - Manufacturer - Distilled Spirits</option>
<option value="MFR_AS">Manufacturer - Assembler - Sample</option>
{/* Done */} {/* Done */}




<option value="MFR_ACOM">Manufacturer - Assembler - Computer</option>
<option value="MFR_ABED">Manufacturer - Assembler - Beds</option>
<option value="MFR_MFRX">Manufacturer - Manufacturer - X</option>
<option value="MFR_AWNE">Manufacturer - Assembler - Wine</option>
<option value="MFR_MFRP">Manufacturer - Manufacturer - Repackers</option>
<option value="MFR_RPKR">Manufacturer - Repacker</option>
<option value="MFR_PDS">Manufacturer - Processor - Distilled Spirits</option>
<option value="MFR_DDS">Manufacturer - Distiller - Distilled Spirit</option>
<option value="MFR_RCDS">Manufacturer - Rectifier and/or Compounder - Distilled Spirits</option>
<option value="MFR_RLIQ">Manufacturer - Rectifier and/or Compounder - Liquors</option>
<option value="MFR_RWNE">Manufacturer - Rectifier and/or Compounder - Wine</option>
<option value="MFR_RCCC">Manufacturer - Rectifier and/or Compounder - CC</option>
<option value="MFR_RPX">Manufacturer - Repacker - X</option>
<option value="MFR_R">Manufacturer - R</option>
<option value="MFR_RCA">Manufacturer - Rectifier and/or Compounder - A</option>
<option value="MFR_MNEC">Manufacturer - Manufacturer - Non-Essential Commodities</option>
<option value="MFR_MWNE">Manufacturer - Manufacturer - Wine</option>
<option value="MFR_DLIQ">Manufacturer - Distiller - Liquors</option>
<option value="MFR_DWNE">Manufacturer - Distiller - Wine</option>
<option value="MFR_PLIQ">Manufacturer - Processor - Liquors</option>
<option value="MFR_PWNE">Manufacturer - Processor - Wine</option>
<option value="MFR_BLIQ">Manufacturer - Brewer - Liquors</option>
<option value="MFR_ASDS">Manufacturer - Assembler - Distilled Spirit</option>
<option value="MFR_ALIQ">Manufacturer - Assembler - Liquors</option>
<option value="MFR_AASS">Manufacturer - Assembler - Assembler</option>
<option value="MFR_PNEC">Manufacturer - Processor - Non-Essential Commodities</option>
<option value="MFR_PEC">Manufacturer - Processor - Essential Commodities</option>
<option value="MFR_AFAB">Manufacturer - Assembler - Fabricator/Importer</option>
<option value="MFR_PWRS">Manufacturer - Processor - Water Refilling Station</option>
<option value="MFR_MPC">Manufacturer - Manufacturer - Plastic Container</option>
{/* Done */} {/* Done */}



<option value="MFR_MFR">Manufacturer - Manufacturer - Manufacturer</option>
<option value="MFR_MHB">Manufacturer - Manufacturer - Hollow Blocks</option>
<option value="MFR_MFT">Manufacturer - Manufacturer - Furniture</option>
<option value="MFR_MSH">Manufacturer - Manufacturer - Sash</option>
<option value="MFR_MOF">Manufacturer - Manufacturer - Manufacturer (Office Only)</option>
<option value="MFR_MSC">Manufacturer - Manufacturer - Shell Craft</option>
<option value="MFR_MHD">Manufacturer - Manufacturer - Handicrafts</option>
<option value="MFR_MMC">Manufacturer - Manufacturer - Molding of Plastic Products</option>
<option value="MFR_MMP">Manufacturer - Manufacturer - (Moldings) of Plastic Products</option>
<option value="MFR_MIM">Manufacturer - Manufacturer - Manufacturer/Importer</option>
<option value="MFR_MMIM">Manufacturer - Manufacturer - Manufacturer / Importer</option>
<option value="MFR_AFB">Manufacturer - Assembler - Fabricator</option>
<option value="MFR_PL">Manufacturer - Manufacturer - Plastic and Metal</option>
<option value="MFR_MEXI">Manufacturer - Manufacturer - Manufacturer/Exporter/Importer</option>
<option value="MFR_MI">Manufacturer - Manufacturer - Manufacturer - Ice</option>
<option value="MFR_PKM">Manufacturer - Manufacturer - Packaging Materials</option>
<option value="MFR_INSP">Manufacturer - Manufacturer - Insulating Panel</option>
<option value="MFR_MPP">Manufacturer - Manufacturer - (Moldings) of Plastic Products / Importer</option>
<option value="MFR_IP">Manufacturer - Manufacturer - Ice Plant</option>
<option value="MFR_CHIC">Manufacturer - Manufacturer - Chicharon</option>
<option value="MFR_MRUG">Manufacturer - Manufacturer - Rug</option>
<option value="MFR_MPB">Manufacturer - Manufacturer - Peanut Butter</option>
<option value="MFR_MEP">Manufacturer - Manufacturer - Electronic Parts</option>
<option value="MFR_APFC">Manufacturer - Assembler - Pre-Fabricated Housing Components</option>
<option value="MFR_MASP">Manufacturer - Manufacturer - Asphalt</option>
<option value="MFR_MPLP">Manufacturer - Manufacturer - Polypropylene Plastic</option>
<option value="MFR_MFLG">Manufacturer - Manufacturer - Flags</option>
<option value="MFR_MPCB">Manufacturer - Manufacturer - Precast Wall Concrete Blocks</option>
<option value="MFR_MSF">Manufacturer - Manufacturer - Sash and Furniture</option>
<option value="MFR_AFO">Manufacturer - Assembler - Fabricator (Office Only)</option>
{/* Done */} {/* Done */}



<option value="MFR_COS">Manufacturer - Manufacturer - Cosmetics Products</option>
<option value="MFR_IMP">Manufacturer - Manufacturer - Importer</option>
<option value="MFR_PVC">Manufacturer - Manufacturer - PVC Pipes</option>
<option value="MFR_FT">Manufacturer - Manufacturer - Footwear</option>
<option value="MFR_SMK">Manufacturer - Processor - Smoke Fish</option>
<option value="MFR_SMKD">Manufacturer - Processor - Smoked Fish</option>
<option value="MFR_EMP">Manufacturer - Manufacturer - Empanada</option>
<option value="MFR_CASK">Manufacturer - Manufacturer - Casket</option>
<option value="MFR_PALL">Manufacturer - Pallets</option>
<option value="MFR_COND">Manufacturer - Manufacturer - Condiments</option>
<option value="MFR_NUTS">Manufacturer - Manufacturer - Nuts</option>
<option value="MFR_MCRT">Manufacturer - Manufacturer - Curtains</option>
<option value="MFR_MEGR">Manufacturer - Manufacturer - Manufacturer / Exporter / Garments</option>
<option value="MFR_MGR">Manufacturer - Manufacturer - Garments</option>
<option value="MFR_AIMP">Manufacturer - Assembler / Manufacturer - Importer</option>
<option value="MFR_CASC">Manufacturer - Manufacturer - Cassava Cake</option>
<option value="MFR_OPP">Manufacturer - Other Contractor – Printer & Publishing</option>
<option value="MFR_RAG">Manufacturer - Manufacturer - Rags</option>
<option value="MFR_PROP">Manufacturer - Manufacturer - Propeller</option>
<option value="MFR_BPL">Manufacturer - Manufacturer - Batching Plant</option>
<option value="MFR_GRV">Manufacturer - Manufacturer - Gravestone/Lapida</option>
<option value="MFR_SIO">Manufacturer - Manufacturer - Siomai Siopao</option>
<option value="MFR_MDC">Manufacturer - Manufacturer - Disposable Plastic Cup</option>
<option value="MFR_MBP">Manufacturer - Manufacturer - Beauty Products</option>
<option value="MFR_FC">Manufacturer - Manufacturer - Foodcart</option>
<option value="MFR_CAND">Manufacturer - Manufacturer - Candle</option>
<option value="MFR_ETR">Manufacturer - Manufacturer - E-Trike</option>
<option value="MFR_DPI">Manufacturer - Manufacturer - Door Panel Importer/Exporter</option>
<option value="MFR_POLV">Manufacturer - Manufacturer - Polvoron</option>
<option value="MFR_CNP">Manufacturer - Manufacturer - Concrete Pipe</option>
{/* Done */} {/* Done */}




<option value="MFR_SOAP">Manufacturer - Manufacturer - Soap (Office Only)</option>
<option value="MFR_MODU">Manufacturer - Manufacturer - Modular Cabinet</option>
<option value="MFR_INSU">Manufacturer - Insulation Products</option>
<option value="MFR_FIRE">Manufacturer - Manufacturer - Fire Extinguisher</option>
<option value="MFR_LEAT">Manufacturer - Manufacturer - Leather Bags</option>
<option value="MFR_DOGT">Manufacturer - Manufacturer - Dog Treats</option>
<option value="MFR_LANT">Manufacturer - Manufacturer - Lantern</option>
<option value="MFR_VETD">Manufacturer - Manufacturer - Veterinary Drugs and Products, Feed Additives, and Supplements</option>
<option value="MFR_PROS">Manufacturer - Manufacturer - Prosthetic Body Parts</option>
<option value="MFR_SCRU">Manufacturer - Assembler - Scrubbing Pad</option>
<option value="MFR_NONC">Manufacturer - Manufacturer - Non-Essential Commodities / Importer</option>
<option value="MFR_OFFI">Manufacturer - Manufacturer - Manufacturer (Office Only) / Importer</option>
<option value="MFR_CDM">Manufacturer - Repacker - Condiments</option>
<option value="MFR_PINO">Manufacturer - Manufacturer - Pinoy Delicacies</option>
<option value="MFR_HERB">Manufacturer / Producer - Manufacturer - Herbal Products</option>
<option value="MFR_CHAR">Manufacturer / Producer - Manufacturer - Charcoal</option>
<option value="MFR_TOKW">Manufacturer / Producer - Manufacturer - Tokwa</option>
<option value="MFR_ESSE">Manufacturer / Producer - Producer - Essential Commodities (Office Only)</option>
<option value="MFR_GASI">Manufacturer / Producer - Manufacturer - Import / Export Industrial Gas</option>
<option value="MFR_RM">Manufacturer / Producer - Rice Mill - Office Only</option>
<option value="MFR_SUGA">Manufacturer / Producer - Producer - Sugarcane Farm</option>
<option value="MFR_ICEC">Manufacturer / Producer - Manufacturer - Ice Cream</option>
<option value="MFR_LAUN">Manufacturer / Producer - Manufacturer - Laundry Soap</option>
<option value="MFR_DETE">Manufacturer / Producer - Manufacturer - Detergents</option>
<option value="MFR_MEDI">Manufacturer / Producer - Manufacturer / Repacker - Medicines</option>
<option value="MFR_ERC">Manufacturer / Producer - Exporter - Rice and Corn</option>
<option value="MFR_EWH">Manufacturer / Producer - Exporter - Wheat or Cassava Flour</option>
<option value="MFR_COOK">Manufacturer / Producer - Manufacturer - Cooking Oil</option>
<option value="MFR_RWH">Manufacturer / Producer - Repacker - Wheat or Cassava Flour</option>
{/* Done */} {/* Done */}




<option value="MFR_WHET">Manufacturer / Producer - Miller - Wheat</option>
<option value="MFR_RICE">Manufacturer / Producer - Repacker - Rice and Corn</option>
<option value="MFR_MEAT">Manufacturer / Producer - Exporter - Meat</option>
<option value="MFR_PF">Manufacturer / Producer - Manufacturer - Poultry Feeds and Other Animal Feeds</option>
<option value="MFR_SCHL">Manufacturer / Producer - Manufacturer - School Supplies</option>
<option value="MFR_CEMT">Manufacturer / Producer - Manufacturer - Cement</option>
<option value="MFR_LPG">Manufacturer / Producer - Manufacturer - LPG</option>
<option value="MFR_PROF">Manufacturer / Producer - Repacker - Processed or Preserved Food</option>
<option value="MFR_MILL">Manufacturer / Producer - Miller - Rice and Corn</option>
<option value="MFR_PROC">Manufacturer / Producer - Manufacturer - Processed or Preserved Foods</option>
<option value="MFR_SALT">Manufacturer / Producer - Manufacturer - Salt</option>
<option value="MFR_SUGR">Manufacturer / Producer - Manufacturer - Sugar</option>
<option value="MFR_EXSG">Manufacturer / Producer - Exporter - Sugar</option>
<option value="MFR_AGRI">Manufacturer / Producer - Exporter - Agricultural, Marine, and Freshwater Products</option>
<option value="MFR_ELS">Manufacturer / Producer - Exporter - Laundry Soap</option>
<option value="MFR_DETR">Manufacturer / Producer - Exporter - Detergents</option>
<option value="MFR_MEDC">Manufacturer / Producer - Exporter - Medicine</option>
<option value="MFR_EXCT">Manufacturer / Producer - Exporter - Cement</option>
<option value="MFR_DAIR">Manufacturer / Producer - Exporter - Dairy Products</option>
<option value="MFR_EMET">Manufacturer / Producer - Exporter - Meat</option>
<option value="MFR_FEED">Manufacturer / Producer - Exporter - Poultry Feeds and Other Animal Feeds</option>
<option value="MFR_COKO">Manufacturer / Producer - Exporter - Cooking Oil</option>
<option value="MFR_AGIM">Manufacturer / Producer - Manufacturer - Agricultural Implements, Equipment, and Post-Harvest Facilities</option>
<option value="MFR_FERT">Manufacturer / Producer - Manufacturer - Fertilizers</option>
<option value="MFR_PEST">Manufacturer / Producer - Manufacturer - Pesticides, Insecticides</option>
<option value="MFR_RCRN">Manufacturer / Producer - Repackers - Rice and Corn</option>
<option value="MFR_WFLO">Manufacturer / Producer - Repackers - Wheat or Cassava Flour</option>
<option value="MFR_RSUG">Manufacturer / Producer - Repacker - Sugar</option>
<option value="MFR_RSAL">Manufacturer / Producer - Repacker - Salt</option>
{/* Done */} {/* Done */}




<option value="MFR_RCOK">Manufacturer / Producer - Repacker - Cooking Oil</option>
<option value="MFR_RDET">Manufacturer / Producer - Repacker - Detergents</option>
<option value="MFR_RPST">Manufacturer / Producer - Repacker - Pesticides</option>
<option value="MFR_RFRT">Manufacturer / Producer - Repacker - Fertilizers</option>
<option value="MFR_RINS">Manufacturer / Producer - Repacker - Insecticides</option>
<option value="MFR_RFED">Manufacturer / Producer - Repacker - Poultry Feeds and Other Animal Feeds</option>
<option value="MFR_EXES">Manufacturer / Producer - Exporter - Other Essential Commodities</option>
<option value="MFR_ECMP">Manufacturer / Producer - Producer - Essential Commodities</option>
<option value="MFR_MXES">Manufacturer / Producer - Manufacturer / Exporter - Essential Commodities</option>
<option value="MFR_ESEN">Manufacturer / Producer - Manufacturer - Essential Commodities</option>
<option value="MFR_MRCE">Manufacturer / Producer - Miller - Rice Mill</option>
<option value="MFR_EXNS">Manufacturer / Producer - Exporter - Non-Essential Commodities</option>
<option value="MFR_RJMC">Manufacturer / Producer - Repacker - Janitorial Maintenance Chemicals</option>
<option value="MFR_PSP">Manufacturer / Producer - Manufacturer - Soap</option>
<option value="MFR_RNES">Manufacturer / Producer - Repacker - Non-Essential Commodities</option>
<option value="MFR_TAHO">Manufacturer / Producer - Manufacturer - TAHO</option>
<option value="MFR_DONT">Manufacturer / Producer - Manufacturer - Donut</option>
<option value="MFR_SIOP">Manufacturer / Producer - Manufacturer - Siopao</option>
<option value="MFR_JUCS">Manufacturer / Producer - Manufacturer - Juices</option>
<option value="MFR_PUTO">Manufacturer / Producer - Manufacturer - Puto</option>
<option value="MFR_LWRP">Manufacturer / Producer - Manufacturer - Lumpia Wrapper</option>
<option value="MFR_FPWD">Manufacturer / Producer - Manufacturer - Foot Powder</option>
<option value="MILL_OMRC">Millers - Other Than Rice and Corn - Miller - Other Commodities Other Than Rice and Corn</option>
<option value="MILL_CFGR">Millers - Other Than Rice and Corn - Operator - Coffee Grinder</option>
<option value="MILL_COGR">Millers - Other Than Rice and Corn - Operator - Coconut Grinder</option>
<option value="MILL_MTGR">Millers - Other Than Rice and Corn - Operator - Meat Grinder</option>
<option value="NSNP_PVSC">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private School</option>
<option value="NSNP_FNDN">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Foundation</option>
<option value="NSNP_PVHS">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Hospital</option>
<option value="NSNP_FIVT">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Filipino Inventor</option>
{/* Done */} {/* Done */}




<option value="NSNP_FRAN">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Franchise Holder</option>
<option value="NSNP_NGO">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Non-Government Organization (NGO)</option>
<option value="NSNP_RELG">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Religious Organization</option>
<option value="NSNP_RENO">Non-Stock/Non-Profit - No - Religious Organization</option>
<option value="NSNP_MSCL">Non-Stock/Non-Profit - No - Massage Clinic</option>
<option value="NSNP_NSP">Non-Stock/Non-Profit - Non-Stock/Non-Profit</option>
<option value="NSNP_MSCA">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Music Composition/Musical Arrangement</option>
<option value="NSNP_PRHS">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Hospital and Private School</option>
<option value="NSNP_TRSC">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Training School</option>
<option value="NSNP_PHIM">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Hospital / Importer</option>
<option value="NSNP_FDIM">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Foundation / Importer</option>
<option value="NSNP_PVMT">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Private Market</option>
<option value="NSNP_HOA">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Home Owners Association</option>
<option value="NSNP_PHAR">Non-Stock/Non-Profit - Pharmacy</option>
<option value="NSNP_TSVS">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Transport Services</option>
<option value="NSNP_ASSOC">Non-Stock/Non-Profit - Non-Stock/Non-Profit - Association</option>
<option value="OPR_OBNG">Operator - Amusement Places - Operator - Bingo / Office Only</option>
<option value="OPR_OTBS">Operator - Amusement Places - Operator - Off Track Betting Station</option>
<option value="OPR_STL">Operator - Amusement Places - Operator - Small Town Lottery (STL)</option>
<option value="OPR_CRST">Operator - Amusement Places - Operator - Cafe and Restobar</option>
<option value="OPR_EVT">Operator - Amusement Places - Operator - Events Place</option>
<option value="OPR_ECAS">Operator - Amusement Places - Operator - E-Casino Games</option>
<option value="OPR_BARS">Operator - Amusement Places - Operator - Bar or Cocktail Lounge including "beer gardens", "beerhouses", "disco pub", "pub house"</option>
<option value="OPR_SPRT">Operator - Amusement Places - Operator - Boxing Stadium, Sports Arena or Similar Establishments; Sports Contest Promoters</option>
<option value="OPR_BILL">Operator - Amusement Places - Operator - Billiard or Pool Hall</option>
<option value="OPR_BOWL">Operator - Amusement Places - Operator - Bowling Center</option>
<option value="OPR_DNHL">Operator - Amusement Places - Operator - Cabaret or Dance Hall, Dance Studio/Dancing Schools</option>
<option value="OPR_CIRC">Operator - Amusement Places - Operator - Circuses, Carnival, Merry-Go-Round, Roller Coaster, Ferris Wheel, Swings, Shooting Gallery</option>
<option value="OPR_DCLB">Operator - Amusement Places - Operator - Day Club and Night Club</option>
{/* Done */} {/* Done */}



<option value="OPR_GOLF">Operator - Amusement Places - Operator - Golf Links</option>
<option value="OPR_PELT">Operator - Amusement Places - Operator - Pelota Court for-a-fee</option>
<option value="OPR_RACE">Operator - Amusement Places - Operator - Race Track for-a-fee</option>
<option value="OPR_RSRT">Operator - Amusement Places - Operator - Resorts (Inland Resorts)</option>
<option value="OPR_SKAT">Operator - Amusement Places - Operator - Skating Rink for-a-fee</option>
<option value="OPR_SWIM">Operator - Amusement Places - Operator - Swimming Pool or Bathhouses for-a-fee</option>
<option value="OPR_TENN">Operator - Amusement Places - Operator - Tennis Court for-a-fee</option>
<option value="OPR_OTHR">Operator - Amusement Places - Operator - Other Similar Establishment or Amusement Places</option>
<option value="OPR_BNG">Operator - Amusement Places - Operator - Bingo</option>
<option value="OPR_LOTO">Operator - Amusement Places - Operator - Lotto Outlet</option>
<option value="OPR_KTV">Operator - Amusement Places - Operator - KTV Bar</option>
<option value="OPR_VIDE">Operator - Amusement Places - Proprietor - Videoke Bar</option>
<option value="OPR_VKB">Operator - Amusement Places - Operator - Videoke Bar</option>
<option value="OPR_MSTU">Operator - Amusement Places - Operator - Music Studio</option>
<option value="OPR_KTVB">Operator - Amusement Places - Operator - KTV Bar/Billiard Hall</option>
<option value="OPR_EBGO">Operator - Amusement Places - Operator - Bingo / Electronic Bingo</option>
<option value="OPR_BARR">Operator - Amusement Places - Operator - Bar and Restaurant</option>
<option value="OPR_TBLT">Operator - Amusement Places - Operator - Table Tennis for-a-fee</option>
<option value="OPR_EVID">Operator - Amusement Places - Operator - Eatery with Videoke</option>
<option value="OPR_FIRE">Operator - Amusement Places - Operator - Firing Range</option>
<option value="OPR_BHOU">Operator - Boarding House - Operator - Boarding Houses</option>
<option value="OPR_DORM">Operator - Boarding House - Lessor - Operator - Dormitories</option>
<option value="OPR_CKPT">Operator - Cockpit - Operator - Cockpit</option>
<option value="OPR_PRMT">Operator - Cockpit - Promoter - Ordinary Operator</option>
<option value="OPR_PNTS">Operator - Cockpit - Promoter - Pintakasi / Concierto</option>
<option value="OPR_TSLB">Operator - Cockpit - Operator - Telesabong</option>
<option value="OPR_GLNK">Operator - Golf Links - Operator - Golf Links</option>
<option value="OPR_CEME">Operator - Private Cemeteries - Private Cemeteries / Memorial Parks</option>
<option value="OPR_MKET">Operator - Privately Owned Market - Privately Owned Public Market</option>
<option value="OPR_CAFE">Operator - Restaurant - Cafe - Cafe</option>
{/* Done */} {/* Done */}



<option value="OPR_CFTR">Operator - Restaurant - Cafeteria - Cafeteria</option>
<option value="OPR_ICRM">Operator - Restaurant - Ice Cream - Ice Cream and Other Refreshment Operator</option>
<option value="OPR_REST">Operator - Restaurant - Restaurant - Restaurant Operator</option>
<option value="OPR_CARN">Operator - Restaurant - Carinderia - Carinderia</option>
<option value="OPR_PNCT">Operator - Restaurant - Panciteria - Panciteria</option>
<option value="OPR_SODA">Operator - Restaurant - Soda Fountain Bar - Soda Fountain Bar</option>
<option value="OPR_CATR">Operator - Restaurant - Food Caterer - Food Caterer</option>
<option value="OPR_SEST">Operator - Restaurant - Similar Establishment</option>
<option value="OPR_CNTN">Operator - Restaurant - Similar Establishment - Canteen</option>
<option value="OPR_EATR">Operator - Restaurant - Similar Establishment - Eatery</option>
<option value="OPR_FFOD">Operator - Restaurant - Similar Establishment - Fastfood</option>
<option value="OPR_FSTD">Operator - Restaurant - Similar Establishment - Foodstand</option>
<option value="OPR_CFSH">Operator - Restaurant - Cafeteria - Coffee Shop</option>
<option value="OPR_FCTO">Operator - Restaurant - Food - Food Caterer (Office Only)</option>
<option value="OPR_RTOF">Operator - Restaurant - Restaurant - Office Only</option>
<option value="OPR_FBVO">Operator - Restaurant - Similar - Food Beverage (Office Only)</option>
<option value="OPR_GRIL">Operator - Restaurant - Restaurant - Grille</option>
<option value="OPR_GRLL">Operator - Restaurant - Restaurant - Grill</option>
<option value="OPR_TEAH">Operator - Restaurant - Similar - Tea House</option>
<option value="OPR_RFRT">Operator - Restaurant - Restaurant - Refreshment</option>
<option value="OPR_CFTS">Operator - Restaurant - Cafeteria - Coffee and Tea Shop</option>
<option value="OPR_FBVG">Operator - Restaurant - Restaurant - Food Beverage</option>
<option value="OPR_SUBD">Operator - Subdivision - Subdivision Operator - Subdivision Operator</option>
<option value="OPR_RESD">Operator - Subdivision - Real Estate Developer - Real Estate Developer</option>
<option value="OPR_ROFF">Operator - Subdivision - Real Estate Developer (Office Only)</option>
<option value="OPR_THTR">Operator - Theaters - Operator - Theater Operator</option>
<option value="OPR_CINE">Operator - Theaters - Operator - Cinemahouse</option>
<option value="OPR_VMHS">Operator - Theaters - Operator - Video-Movie House Utilizing BETA, VHS, JVC, Laser Disc Player, or Similar Apparatus</option>
<option value="OPR_SHWH">Operator - Theaters - Operator - Showhouse Open to the Public for-a-fee</option>
<option value="OPR_TLSB">Operator - Theaters - Operator - Telesabong</option>
{/* Done */} {/* Done */}
 


<option value="OPR_OLBS">Operator - Theaters - Operator - On-Line Betting Station</option>
<option value="OTC_ACCT">Other Contractor - Other Contractor - Accounting Firms or Offices Rendering Accounting or Bookkeeping Services</option>
<option value="OTC_ACTR">Other Contractor - Other Contractor - Actuarial or Appraisal Offices</option>
<option value="OTC_ADAG">Other Contractor – Other Contractor - Advertising Agencies</option>
<option value="OTC_BBKS">Other Contractor - Other Contractor - Belt and Buckle Shops</option>
<option value="OTC_BROK">Other Contractor - Other Contractor - Brokering Offices (Real Brokers, Custom Brokers, and Similar Ones)</option>
<option value="OTC_BSMN">Other Contractor - Other Contractor - Business Management Firms/Offices</option>
<option value="OTC_CRPN">Other Contractor - Other Contractor - Carpentry Shops</option>
<option value="OTC_COMM">Other Contractor - Other Contractor - Communications or Wire Services (Radio, Telegraph, Telefax, etc.)</option>
<option value="OTC_REPR">Other Contractor - Other Contractor - Computer or Electronic Repair Centers or Shops</option>
<option value="OTC_CNST">Other Contractor - Other Contractor - Consultancy Firms/Offices</option>
<option value="OTC_DFAS">Other Contractor - Other Contractor - Drafting or Fine Arts Shops, Painting or Sign Shops</option>
<option value="OTC_EMPL">Other Contractor - Other Contractor - Employment Agencies</option>
<option value="OTC_ENGR">Other Contractor - Other Contractor - Engineering Offices Rendering Services on Architectural, Civic, Chemical, Electric</option>
<option value="OTC_FLOW">Other Contractor - Other Contractor - Flower Shops Not Engaged in Wholesale or Retail but Rendering Services Upon Order</option>
<option value="OTC_FRGT">Other Contractor - Other Contractor - Freight Services, Trucking Services</option>
<option value="OTC_PAWS">Other Contractor - Other Contractor - House Painting Shops/House Wiring Shops</option>
<option value="OTC_ICEC">Other Contractor - Other Contractor - Ice and Cold Storage for-a-fee</option>
<option value="OTC_INDR">Other Contractor - Other Contractor - Interior Decoration Offices or Shops</option>
<option value="OTC_JKGY">Other Contractor - Other Contractor - Judo-Karate Gyms for-a-fee</option>
<option value="OTC_LDSP">Other Contractor - Other Contractor - Landscaping Contracting Offices or Shops</option>
<option value="OTC_LTHM">Other Contractor - Other Contractor - Lathe Machine Shops</option>
<option value="OTC_LAWF">Other Contractor - Other Contractor - Law Offices Rendering Legal or Notarial Services</option>
<option value="OTC_CLNC">Other Contractor - Other Contractor - Medical Clinics, Dental Clinics, Optical Clinics, and Similar Clinics</option>
<option value="OTC_SCHL">Other Contractor - Other Contractor - Operators of Dancing, Driving, Judo-Karate Schools</option>
<option value="OTC_PPRS">Other Contractor - Other Contractor - Perma-Press Shops</option>
<option value="OTC_HOSP">Other Contractor - Other Contractor - Private Hospitals and Private Educational Institutions</option>
<option value="OTC_PROM">Other Contractor - Other Contractor - Promotion Offices or Agencies, Promoters of Shows, Games, or Performances</option>
<option value="OTC_DUPL">Other Contractor - Other Contractor - Recopying or Duplicating, Xerox Copying or Mimeographing Services</option>
<option value="OTC_RENT">Other Contractor - Other Contractor - Rental Agencies/Offices/Shops Renting Out for-a-fee Machines, Apparatuses, Equipment</option>
{/* Done */} {/* Done */}



<option value="OTC_RPHA">Other Contractor - Other Contractor - Repair Centers/Shops for Home Appliances</option>
<option value="OTC_RTAG">Other Contractor - Other Contractor - Rental Agencies/Offices/Shops</option>
<option value="OTC_RPME">Other Contractor - Other Contractor - Repair Center/Shops for Medical Equipment</option>
<option value="OTC_RPCO">Other Contractor - Other Contractor - Repair Shops for Computers and Other Electronic Equipment</option>
<option value="OTC_SCUL">Other Contractor - Other Contractor - Sculpture Shops</option>
<option value="OTC_SRVM">Other Contractor - Other Contractor - Service Stations for Motor Vehicles</option>
<option value="OTC_SRVO">Other Contractor - Other Contractor - Surveying Offices (Private Land Surveying or Geodetic)</option>
<option value="OTC_TTRM">Other Contractor - Other Contractor - Transportation Terminals for-a-fee</option>
<option value="OTC_VACI">Other Contractor - Other Contractor - Vaciador Shops</option>
<option value="OTC_VCSR">Other Contractor - Other Contractor - Video Coverage Services</option>
<option value="OTC_WTCH">Other Contractor - Other Contractor - Watch Repair Center or Shop</option>
<option value="OTC_SIML">Other Contractor - Other Contractor - Other Similar Establishment Rendering or Offering to Render Services for-a-fee</option>
<option value="OTC_BLLP">Other Contractor - Other Contractor - Bill Payment</option>
<option value="OTC_MNPS">Other Contractor - Other Contractor - Manpower Service</option>
<option value="OTC_JNTS">Other Contractor - Other Contractor - Janitorial Service</option>
<option value="OTC_PEST">Other Contractor - Other Contractor - Pest Control</option>
<option value="OTC_JWLR">Other Contractor - Other Contractor - Jewelry Repair Shop</option>
<option value="OTC_NPPR">Other Contractor - Other Contractor - Newspaper Publication</option>
<option value="OTC_HAUL">Other Contractor - Other Contractor - Hauling Services</option>
<option value="OTC_PRTG">Other Contractor - Other Contractor - Printing</option>
<option value="OTC_PRTS">Other Contractor - Other Contractor - Printing Services</option>
<option value="OTC_WRTY">Other Contractor - Other Contractor - Warranty Services</option>
<option value="OTC_KDCT">Other Contractor - Other Contractor - Rental Kiddie Carts</option>
<option value="OTC_RAMD">Other Contractor - Other Contractor - Rental of Amusement Devices</option>
<option value="OTC_MCLN">Other Contractor - Other Contractor - Medical Clinic</option>
<option value="OTC_RNTS">Other Contractor - Other Contractor - Rentals of Chairs, Tables, Utensils</option>
<option value="OTC_RPRC">Other Contractor - Other Contractor - Repair Shop</option>
<option value="OTC_RMUS">Other Contractor - Other Contractor - Rental of Musical Instruments/Apparatuses</option>
<option value="OTC_VETC">Other Contractor - Other Contractor - Veterinary Clinic</option>
<option value="OTC_PRPR">Other Contractor - Other Contractor - Printing Press</option>
{/* Done */} {/* Done */}








<option value="OTC_FRMS">Other Contractor - Other Contractor - Frame Shop</option>
<option value="OTC_DRVS">Other Contractor - Other Contractor - Driving School</option>
<option value="OTC_GWRS">Other Contractor - Other Contractor - Gift Wrapping Services</option>
<option value="OTC_RVCL">Other Contractor - Other Contractor - Rental of Vehicles</option>
<option value="OTC_PVTS">Other Contractor - Other Contractor - Private School</option>
<option value="OTC_OPTC">Other Contractor - Other Contractor - Optical Clinic</option>
<option value="OTC_TRTC">Other Contractor - Other Contractor - Training Center</option>
<option value="OTC_DNTC">Other Contractor - Other Contractor - Dental Clinic</option>
<option value="OTC_CMWS">Other Contractor - Other Contractor - Communications or Wire Services</option>
<option value="OTC_TPHC">Other Contractor - Other Contractor - Therapy Clinic</option>
<option value="OTC_INST">Other Contractor - Other Contractor - Installation Services</option>
<option value="OTC_PRMA">Other Contractor - Other Contractor - Promotional Agency</option>
<option value="OTC_BKPB">Other Contractor - Other Contractor - Books Publication</option>
<option value="OTC_FWDS">Other Contractor - Other Contractor - Forwarding Services</option>
<option value="OTC_FWOF">Other Contractor - Other Contractor - Forwarding Services (Office Only)</option>
<option value="OTC_NPOF">Other Contractor - Other Contractor - Newspaper Publication (Office Only)</option>
<option value="OTC_SKNC">Other Contractor - Other Contractor - Skin Clinic</option>
<option value="OTC_GRMS">Other Contractor - Other Contractor - Garments Subcontractor</option>
<option value="OTC_FRGO">Other Contractor - Other Contractor - Freight Services/Trucking Services (Office Only)</option>
<option value="OTC_VEDS">Other Contractor - Other Contractor - Video Editing Services</option>
<option value="OTC_TTGO">Other Contractor - Other Contractor - Transportation Terminals (Garage Only)</option>
<option value="OTC_TUTS">Other Contractor - Other Contractor - Tutorial Services</option>
<option value="OTC_RNOS">Other Contractor - Other Contractor - Rendering Other Services</option>
<option value="OTC_RNLB">Other Contractor - Other Contractor - Rental of Books</option>
<option value="OTC_INKR">Other Contractor - Other Contractor - Ink Refilling Services</option>
<option value="OTC_CDPO">Other Contractor - Other - Collection Dispatching Office</option>
<option value="OTC_DNTL">Other Contractor - Other - Dental Laboratories</option>
<option value="OTC_DRTL">Other Contractor - Other - Drug Testing Laboratory</option>
<option value="OTC_GRTO">Other Contractor - Other - Garage and Terminal Office (Without Service Facilities)</option>
<option value="OTC_RNDG">Other Contractor - Other - Rental of Dresses and Gowns</option>
{/* Done */} {/* Done */}




<option value="OTC_ANBC">Other Contractor - Other - Animal Bite Clinic</option>
<option value="OTC_MCMS">Other Contractor - Other - Music Composition/Musical Arrangement</option>
<option value="OTC_OPVH">Other Contractor - Other Contractor - Private Hospital</option>
<option value="OTC_PVTH">Other Contractor - Private Hospital</option>
<option value="OTC_PHO">Other Contractor - Other - Private Hospital</option>
<option value="OTC_OPH">Other Contractor - Other Contractor - Private Hospital</option>
<option value="OTC_RVWC">Other Contractor - Other - Review Center</option>
<option value="OTC_ACCO">Other Contractor - Other - Accounting Consultancy Office</option>
<option value="OTC_EVOR">Other Contractor - Other - Events Organizer/Coordinator</option>
<option value="OTC_JNTS">Other Contractor - Other - Janitorial Service/Helmet Depository</option>
<option value="OTC_ML">Other Contractor - Other - Medical Laboratory</option>
<option value="OTC_MDAG">Other Contractor - Other - Modeling Agency</option>
<option value="OTC_BBDS">Other Contractor - Other - Brake Bonding Services</option>
<option value="OTC_CIAD">Other Contractor - Other - Cinema Advertisement</option>
<option value="OTC_PRTN">Other Contractor - Other - Party Needs</option>
<option value="OTC_FRNO">Other Contractor - Other - Franchising Office</option>
<option value="OTC_MKTO">Other Contractor - Other - Marketing Office</option>
<option value="OTC_INPS">Other Contractor - Other - Installation Ports and Networking Services</option>
<option value="OTC_MDL">Other Contractor - Other - Medical/Diagnostic Laboratories</option>
<option value="OTC_FASH">Other Contractor - Other - Fashion Boutique</option>
<option value="OTC_PSVS">Other Contractor - Other - Private School/Vocational School</option>
<option value="OTC_ARCD">Other Contractor - Contractor - Architectural Design Services</option>
<option value="OTC_SCHC">Other Contractor - Other - Special Child Center</option>
<option value="OTC_SHUT">Other Contractor - Other - Shuttle Services</option>
<option value="OTC_TKTS">Other Contractor - Other - Ticketing/Bills Payment/Courier Services/Loading</option>
<option value="OTC_MDCL">Other Contractor - Other - Medical Clinic w/ Laboratory</option>
<option value="OTC_MUSC">Other Contractor - Other - Music Studio</option>
<option value="OTC_PNCN">Other Contractor - Other - Party Needs Catering Services</option>
<option value="OTC_ANCL">Other Contractor - Other - Animal Clinic</option>
{/* Done */} {/* Done */}


<option value="OTC_TWSV">Other Contractor - Other - Towing Services</option>
<option value="OTC_RPTE">Other Contractor - Other - Rental of Printing Equipment</option>
<option value="OTC_HDSC">Other Contractor - Other - Hemodialysis Center</option>
<option value="OTC_WLDS">Other Contractor - Other - Welding Shop</option>
<option value="OTC_BKOF">Other Contractor - Other - Basketball Officiating</option>
<option value="OTC_WXSL">Other Contractor - Other - Waxing Salon</option>
<option value="OTC_ANGL">Other Contractor - Other - Animal Grooming Salon</option>
<option value="OTC_BLRS">Other Contractor - Other - Boiler Repair</option>
<option value="OTC_SBCT">Other Contractor - Other - Subcontractor-Rendering Other Services</option>
<option value="OTC_TRSC">Other Contractor - Other - Training Center-Security</option>
<option value="OTC_TKOF">Other Contractor - Other - Ticketing Office</option>
<option value="OTC_TFSV">Other Contractor - Other - Tours Services for Field Trip</option>
<option value="OTC_REHE">Other Contractor - Other - Rental of Heavy Equipment</option>
<option value="OTC_CICS">Other Contractor - Other - Car Interior and Custom Services</option>
<option value="OTC_RAGC">Other Contractor - Other - Recruitment Agency</option>
<option value="OTC_FLMS">Other Contractor - Contractor - Film Studio</option>
<option value="OTC_HLSV">Other Contractor - Other - Health Services</option>
<option value="OTC_MFSV">Other Contractor - Other - Messenger and Forwarding Services</option>
<option value="OTC_GTSF">Other Contractor - Other - Garage and Terminal Office (With Service Facilities)</option>
<option value="OTC_TSIT">Other Contractor - Other - Tiles and Stone Installation</option>
<option value="OTC_GMNT">Other Contractor - Contractor - Garments Contractor</option>
<option value="OTC_CBW">Other Contractor - Other - Custom Bonded Warehouse</option>
<option value="OTC_SEBT">Other Contractor - Other - Soil Exploration/Boring Test</option>
<option value="OTC_INFB">Other Contractor - Other - Information Booth</option>
<option value="OTC_AELC">Other Contractor - Other - Auto Electrical Shop</option>
<option value="OTC_EMBS">Other Contractor - Other - Embroidery Shop</option>
<option value="OTC_CSBR">Other Contractor - Other - Casket Broker</option>
<option value="OTC_PLBG">Other Contractor - Other - Plumbing Services</option>
<option value="OTC_ACPC">Other Contractor - Other - Acupuncture Clinic</option>
<option value="OTC_SALP">Other Contractor - Other - Salon and SPA</option>
{/* Done */} {/* Done */}





<option value="OTC_ADVS">Other Contractor - Other - Advertising Services</option>
<option value="OTC_ELIS">Other Contractor - Other - Electrical and Industrial Services</option>
<option value="OTC_SKMD">Other Contractor - Other - Skin and Medical Clinic</option>
<option value="OTC_CWVS">Other Contractor - Contractor - Carwash Vulcanizing Shop</option>
<option value="OTC_MRPS">Other Contractor - Other - Motorcycle Repair Shop</option>
<option value="OTC_HFAG">Other Contractor - Other - Home for the Aged</option>
<option value="OTC_WGMK">Other Contractor - Other - Wig Making</option>
<option value="OTC_DNCS">Other Contractor - Other - Dance Studio</option>
<option value="OTC_OHCS">Other Contractor - Other - Home Care Services (Office Only)</option>
<option value="OTC_PKGS">Other Contractor - Other - Packaging Services</option>
<option value="OTC_RCTU">Other Contractor - Rentals of Chairs, Tables, Utensils/Catering Services</option>
<option value="OTC_FRSV">Other Contractor - Other Contractor - Forwarding Services, Freight Services, Trucking Services</option>
<option value="OTC_TOBP">Other Contractor - Other Contractor - Ticketing Office / Bill Payment / Forwarding Services</option>
<option value="OTC_MFCS">Other Contractor - Other Contractor - Messenger, Forwarding Services, and Courier</option>
<option value="OTC_BPTK">Other Contractor - Other Contractor - Bill Payment / Ticketing Office</option>
<option value="OTC_RMDE">Other Contractor - Other - Rental of Medical Equipment</option>
<option value="OTC_MSKS">Other Contractor - Music School</option>
<option value="OTC_PRTP">Other Contractor - Other Contractor - Printing Publishing</option>
<option value="OTC_PSCS">Other Contractor - Other - Psychological Services</option>
<option value="OTC_RCT">Other Contractor - Other Contractor - Rental of Chairs, Tables</option>
<option value="OTC_ONDR">Other Contractor - Online Data Researcher</option>
<option value="OTC_TRKS">Other Contractor - Other Contractor - Trucking Services</option>
<option value="OTC_TTUR">Other Contractor - Other Contractor - Training Center - Tutorial</option>
<option value="OTC_BPLS">Other Contractor - Other - Bills Payment/Loading Station</option>
<option value="OTC_FNCP">Other Contractor - Contractor - Funeral Chapel</option>
<option value="OTC_HMCS">Other Contractor - Other Contractor - Home Care Services</option>
<option value="OTC_OPTL">Other Contractor - Other Contractor - Optical Laboratory</option>
<option value="OTC_DIAL">Other Contractor - Other Contractor - Dialysis Service</option>
<option value="OTC_BKGS">Other Contractor - Other Contractor - Bookkeeping Services</option>
<option value="OTC_IMNS">Other Contractor - Other Contractor - Installation/Maintenance Services</option>
{/* Done */} {/* Done */}



<option value="OTC_DLVS">Other Contractor - Other Contractor - Delivery Services</option>
<option value="OTC_DTEN">Other Contractor - Other Contractor - Data Encoding Services</option>
<option value="OTC_VTAS">Other Contractor - Other Contractor - Virtual Assistance Services</option>
<option value="OTC_CORS">Other Contractor - Other Contractor - Courier Services</option>
<option value="OTC_CABS">Other Contractor - Cabling Services</option>
<option value="OTC_ACO">Other Contractor - Accounting Consultancy Office / Computer Design Programs</option>
<option value="OTC_PNCS">Other Contractor - Other Contractor - Personal Care Services</option>
<option value="OTC_CMSR">Other Contractor - Other Contractor - Common Space Rental Services</option>
<option value="OTC_DVHB">Other Contractor - Other Contractor - Delivery Hub Services</option>
<option value="OTC_DCMT">Other Contractor - Other Contractor - Documentation Services</option>
<option value="OTC_CLSV">Other Contractor - Other Contractor - Courier/Logistics Services</option>
<option value="OTC_MTGY">Other Contractor - Martial Arts Gym</option>
<option value="OTC_ARCN">Other Contractor - Animal Rescue Center</option>
<option value="OTC_RPRS">Other Contractor - Contractor - Repair Shop</option>
<option value="OTC_WCDP">Other Contractor - Other Contractor - Waste Collection Disposal</option>
<option value="OTC_ARTS">Other Contractor - Other Contractor - Art Studio</option>
<option value="OTC_BDPS">Other Contractor - Other Contractor - Body Piercing Services</option>
<option value="OTC_RMNS">Other Contractor - Other Contractor - Repair & Maintenance Services</option>
<option value="OTC_CWSP">Other Contractor - Other Contractor - Coworking Space for a Fee</option>
<option value="OLB_IMPR">Other LOB – Other LOB - Importer</option>
<option value="PDD_DLTR">Peddler – Peddler - Delivery Truck</option>
<option value="PDD_VANS">Peddler – Peddler - Van</option>
<option value="PDD_AMDV">Peddler - Peddler Proprietor - Amusement Devices</option>
<option value="PRP_VDOK">Proprietor-Amusement Devices - Proprietor - Videoke Machine</option>
<option value="PRP_FHPC">Proprietor-Amusement Devices - Proprietor - Family Home Computers</option>
<option value="PRP_GMWD">Proprietor-Amusement Devices - Proprietor - Game and Watch Devices</option>
<option value="PRP_SLTM">Proprietor-Amusement Devices - Proprietor - Slot Machines not Classified as Gambling Devices</option>
<option value="PRP_OTAD">Proprietor-Amusement Devices - Proprietor - Other Amusement Devices</option>
<option value="PRP_CMTR">Proprietor-Amusement Devices - Proprietor - Computer Rentals</option>
<option value="PRP_PLST">Proprietor-Amusement Devices - Proprietor - Playstation</option>
{/* Done */} {/* Done */}



<option value="PRP_VDRL">Proprietor-Amusement Devices - Proprietor - Video Rental</option>
<option value="PRP_VGMS">Proprietor-Amusement Devices - Proprietor - Video Games</option>
<option value="PRP_KDRD">Proprietor-Amusement Devices - Proprietor - Kiddie Rides</option>
<option value="PRP_TLSB">Proprietor-Amusement Devices - Proprietor - Telesabong</option>
<option value="PRP_VDKB">Proprietor-Amusement Devices - Proprietor - Videoke Bar</option>
<option value="PRP_OLGS">Proprietor-Amusement Devices - Proprietor - On-line Gaming Station</option>
<option value="PRP_OLBS">Proprietor-Amusement Devices - Proprietor - On-line Betting Station</option>
<option value="RTL_SAMP">Retailer (Sample) - Sample</option>
<option value="RTL_GUNS">Retailer – Gun - Gun</option>
<option value="RTL_ECIG">Retailer-Cigarettes - E-Cigarette</option>
<option value="RTL_TBRC">Retailer-Cigarettes - Retail Dealer - Tobacco</option>
<option value="RTL_TOBR">Retailer-Cigarettes - Retailer - Tobacco</option>
<option value="RTL_SNCI">Retailer-Cigarettes - Retail Dealer - Snuff including Cigars and Cigarettes</option>
<option value="RTL_SNCR">Retailer-Cigarettes - Retailer - Snuff including Cigars and Cigarettes</option>
<option value="RTL_STR">Retailer-Essential - Retailer - Store</option>
<option value="RTL_ESCM">Retailer-Essential - Retailer - Essential Commodities</option>
<option value="RTL_BKRY">Retailer-Essential - Retailer - Bakery</option>
<option value="RTL_SCHS">Retailer-Essential - Retailer - School Supplies</option>
<option value="RTL_MDIC">Retailer-Essential - Retailer - Medicine</option>
<option value="RTL_PFAN">Retailer-Essential - Retailer - Poultry Feeds and Other Animal Feeds</option>
<option value="RTL_RICE">Retailer-Essential - Retailer - Rice</option>
<option value="RTL_MEAT">Retailer-Essential - Retailer - Meat</option>
<option value="RTL_CHKN">Retailer-Essential - Retailer - Chicken</option>
<option value="RTL_FISH">Retailer-Essential - Retailer - Fish</option>
<option value="RTL_CMNT">Retailer-Essential - Retailer - Chicken/Meat</option>
<option value="RTL_SCOS">Retailer-Essential - Retailer - School Office Supplies</option>
<option value="RTL_OFSU">Retailer-Essential - Retailer - Office Supplies</option>
<option value="RTL_VEGE">Retailer-Essential - Retailer - Vegetable</option>
<option value="RTL_FRVG">Retailer-Essential - Retailer - Fruits and Vegetables</option>
<option value="RTL_DFRS">Retailer-Essential - Retailer - Dried Fish</option>
{/* Done */} {/* Done */}



<option value="RTL_COCO">Retailer-Essential - Retailer - Coconut</option>
<option value="RTL_BANA">Retailer-Essential - Retailer - Banana</option>
<option value="RTL_SGLM">Retailer-Essential - Retailer - Sago Gulaman</option>
<option value="RTL_FRUT">Retailer-Essential - Retailer - Fruits</option>
<option value="RTL_EGG">Retailer-Essential - Retailer - Egg</option>
<option value="RTL_LPG">Retailer-Essential - Retailer - LPG</option>
<option value="RTL_CRBP">Retailer-Essential - Retailer - Crabs and Prawns</option>
<option value="RTL_LUMP">Retailer-Essential - Retailer - Lumpia Wrapper</option>
<option value="RTL_FRZS">Retailer-Essential - Retailer - Frozen Seafoods Products</option>
<option value="RTL_SUPL">Retailer-Essential - Retailer - Food Supplement</option>
<option value="RTL_RIGM">Retailer-Essential - Retailer - Rice and General Merchandise</option>
<option value="RTL_BEEF">Retailer-Essential - Retailer - Beef</option>
<option value="RTL_SEAF">Retailer-Essential - Retailer - Seafoods</option>
<option value="RTL_CLDC">Retailer-Essential - Retailer - Cold Cuts</option>
<option value="RTL_NUTS">Retailer-Essential - Retailer - Nuts</option>
<option value="RTL_BAGN">Retailer-Essential - Retailer - Bagoong</option>
<option value="RTL_RIPF">Retailer-Essential - Retailer - Rice and Poultry Feeds</option>
<option value="RTL_MEVE">Retailer-Essential - Retailer - Meat/Vegetable</option>
<option value="RTL_MESP">Retailer-Essential - Retailer - Meat Seafoods Products</option>
<option value="RTL_FMSP">Retailer-Essential - Retailer - Frozen Meat Seafoods Products</option>
<option value="RTL_FRMT">Retailer-Essential - Retailer - Frozen Meat</option>
<option value="RTL_MEFS">Retailer-Essential - Retailer - Meat and Fish</option>
<option value="RTL_FVGE">Retailer-Essential - Retailer - Fish/Vegetables</option>
<option value="RTL_LIQ">Retailer-Liquors - Retailer - Liquor or Wine</option>
<option value="RTL_FLQB">Retailer-Liquors - Retailer - Fermented Liquor (Beer)</option>
<option value="RTL_VINO">Retailer-Liquors - Retailer - Vino Liquor</option>
<option value="RTL_TUBA">Retailer-Liquors - Retailer - Tuba</option>
<option value="RTL_BASI">Retailer-Liquors - Retailer - Basi</option>
<option value="RTL_OTDS">Retailer-Liquors - Retailer - Other Distilled Spirits not Classified as Denatured Alcohol</option>
<option value="RTL_LQWN">Retailer-Liquors - Retailer - Liquor or Wine</option>
{/* Done */} {/* Done */}




<option value="RTL_ILWN">Retailer-Liquors - Retail - Liquor or Wine / Importer</option>
<option value="RTL_MED">Retailer-Medicine - Retailer-Medicine</option>
<option value="RTL_APPL">Retailer-Non Essential - Retailer - Appliances and Furniture</option>
<option value="RTL_CCTV">Retailer-Non Essential - Retailer - CCTV</option>
<option value="RTL_PCLA">Retailer-Non Essential - Retailer - Paper Clay Arts</option>
<option value="RTL_OFFC">Retailer-Non Essential - Retailer - Office Only</option>
<option value="RTL_JSUR">Retailer-Non Essential - Retailer - Japan Surplus</option>
<option value="RTL_OEQP">Retailer-Non Essential - Retailer - Office Machines, Equipment, and Computers</option>
<option value="RTL_ESUP">Retailer-Non Essential - Retailer - Electrical Supply</option>
<option value="RTL_EMAC">Retailer-Non Essential - Retailer - Electronic Machines</option>
<option value="RTL_RFIS">Retailer-Non Essential - Retailer - Roasted Fish</option>
<option value="RTL_RCHK">Retailer-Non Essential - Retailer - Roasted Chicken</option>
<option value="RTL_TXTF">Retailer-Non Essential - Retailer - Textile Paints and Fabrics</option>
<option value="RTL_LITE">Retailer-Non Essential - Retailer - Lighting</option>
<option value="RTL_GRVS">Retailer-Non Essential - Retailer - Gravel and Sand</option>
<option value="RTL_AUTO">Retailer-Non Essential - Retailer - Auto Supply</option>
<option value="RTL_GIVE">Retailer-Non Essential - Retailer - Corporate Giveaways</option>
<option value="RTL_ECG">Retailer-Non Essential - Retailer - Electronic Cigarette</option>
<option value="RTL_CHAR">Retailer-Non Essential - Retailer - Charcoal</option>
<option value="RTL_SUPA">Retailer-Non Essential - Other - Surplus (Auto Spare Parts)</option>
<option value="RTL_SUPP">Retailer-Non Essential - Retailer - Surplus (Auto Spare Parts)</option>
<option value="RTL_PROC">Retailer-Non Essential - Retailer - Processed Meat</option>
<option value="RTL_CURT">Retailer-Non Essential - Retailer - Curtain</option>
<option value="RTL_FURN">Retailer-Non Essential - Retailer - Surplus Furniture</option>
<option value="RTL_HHPR">Retailer-Non Essential - Retailer - Household Products</option>
<option value="RTL_FACC">Retailer-Non Essential - Retailer - Fashion Accessories</option>
<option value="RTL_BAKE">Retailer-Non Essential - Retailer - Bakery Equipment</option>
<option value="RTL_MVSP">Retailer-Non Essential - Retailer - Surplus Motor Vehicle</option>
{/* Done */} {/* Done */}





<option value="RTL_HAND">Retailer-Non Essential - Retailer - Handicraft Products</option>
<option value="RTL_SGUL">Retailer-Non Essential - Retailer - Sago Gulaman</option>
<option value="RTL_STON">Retailer-Non Essential - Retailer - Stonecraft</option>
<option value="RTL_WPRF">Retailer-Non Essential - Retailer - Waterproofing (Office Only)</option>
<option value="RTL_PNTG">Retailer-Non Essential - Retailer - Painting</option>
<option value="RTL_CACC">Retailer-Non Essential - Retailer - Cellphone Accessories</option>
<option value="RTL_CARC">Retailer-Non Essential - Retailer - Car Accessories</option>
<option value="RTL_BATT">Retailer-Non Essential - Retailer - Battery</option>
<option value="RTL_WATC">Retailer-Non Essential - Retailer - Watches</option>
<option value="RTL_WACC">Retailer-Non Essential - Retailer - Watch Accessories</option>
<option value="RTL_BRED">Retailer-Non Essential - Retailer - Bread</option>
<option value="RTL_SGLS">Retailer-Non Essential - Retailer - Sunglasses</option>
<option value="RTL_PLAS">Retailer-Non Essential - Retailer - Non-Essential Commodities/Importer - Plastic Ware</option>
<option value="RTL_BKSP">Retailer-Non Essential - Retailer - Bakery Supplies</option>
<option value="RTL_HOSE">Retailer-Non Essential - Retailer - Hose Regulator</option>
<option value="RTL_SRPL">Retailer-Non Essential - Retailer - Surplus</option>
<option value="RTL_GENS">Retailer-Non Essential - Retailer - Genset Units and Parts</option>
<option value="RTL_TXTL">Retailer-Non Essential - Retailer - Textile</option>
<option value="RTL_PETC">Retailer-Non Essential - Retailer - Pet Care Products</option>
<option value="RTL_AUTM">Retailer-Non Essential - Retailer - Automotive</option>
<option value="RTL_HLTH">Retailer-Non Essential - Retailer - Health Products</option>
<option value="RTL_TSI">Retailer-Non Essential - Retailer - Toasted Siopao</option>
<option value="RTL_ZIPP">Retailer-Non Essential - Retailer - Zipper</option>
<option value="RTL_SPRT">Retailer-Non Essential - Retailer - Sports Equipment</option>
<option value="RTL_EBKE">Retailer-Non Essential - Other - Electric Bike</option>
<option value="RTL_ONBA">Retailer-Non Essential - Retailer - Online Business Bags and Accessories</option>
{/* Done */} {/* Done */}







<option value="RTL_BIBK">Retailer-Non Essential - Retailer - Bibingka</option>
<option value="RTL_CSFT">Retailer-Non Essential - Retailer - Computer Software Application</option>
<option value="RTL_CHMP">Retailer-Non Essential - Retailer - Chemical Products</option>
<option value="RTL_HRBL">Retailer-Non Essential - Retailer - Herbal Products</option>
<option value="RTL_POPC">Retailer-Non Essential - Retailer - Popcorn</option>
<option value="RTL_CELL">Retailer-Non Essential - Retailer - Cellphone</option>
<option value="RTL_SLRP">Retailer-Non Essential - Retailer - Solar Panel</option>
<option value="RTL_HYDH">Retailer-Non Essential - Retailer - Hydraulic Hose</option>
<option value="RTL_SSLS">Retailer-Non Essential - Retailer - Sari-Sari Store/Loading Station</option>
<option value="RTL_RFNG">Retailer-Non Essential - Roofing</option>
<option value="RTL_PNDS">Retailer-Non Essential - Retailer - Party Needs</option>
<option value="RTL_ONLB">Retailer-Non Essential - Retailer - Online Business</option>
<option value="RTL_TBIC">Retailer-Non Essential - Retailer - Tube Ice</option>
<option value="RTL_RCCH">Retailer-Non Essential - Retailer - Non-Essential Commodities / Roasted Chicken</option>
<option value="RTL_ACCS">Retailer-Non Essential – Non Essential - Accessories Sales</option>
<option value="RTL_MSLE">Retailer-Non Essential - Retailer - Medical Supplies / Equipment / Loading Station</option>
<option value="RTL_ACPT">Retailer-Non Essential - Retailer - Airconditioning Parts / Airconditioning Unit</option>
<option value="RTL_SIOM">Retailer-Non Essential - Retailer - Siomai</option>
<option value="RTL_CPCA">Retailer-Non Essential - Retailer - Cellphone Accessories / Computer Parts Accessories</option>
<option value="RTL_CSSI">Retailer-Non Essential - Retailer - Construction Supply / Importer / Exporter / Non-Essential Commodities</option>
<option value="RTL_SHJW">Retailer-Non Essential - Retailer - Shoes/Jewelry</option>
<option value="RTL_EYWR">Retailer-Non Essential - Retailer - Eyewear</option>
<option value="RTL_STEL">Retailer-Non Essential – Non Essential - Steel</option>
<option value="RTL_RTSB">Retailer-Non Essential - Retailer - RTW / Bags / Shoes</option>
<option value="RTL_ICE">Retailer-Non Essential - Ice</option>
<option value="RTL_PNML">Retailer-Non Essential - Retailer - Pancit Malabon</option>
<option value="RTL_WTRT">Retailer-Non Essential – Non Essential - Water Treatment Supplies</option>
<option value="RTL_RTWA">Retailer-Non Essential - Retailer - RTW Accessories</option>
<option value="RTL_MTLP">Retailer-Non Essential - Retailer - Metal Products</option>
{/* Done */} {/* Done */}




<option value="RTL_PSTC">Retailer-Non Essential - Retailer - Pest Control Products</option>
<option value="RTL_TOYS">Retailer-Non Essential - Retailer - Toys</option>
<option value="RTL_RCKP">Retailer-Non Essential - Retailer - Rocks and Pebbles</option>
<option value="RTL_RCMT">Retailer-Non Essential - Retailer - Roasted Chicken Meat</option>
<option value="RTL_OPTO">Retailer-Non Essential - Retailer - Ornamental Plants / Orchids</option>
<option value="RTL_IDST">Retailer-Non Essential - Retailer - Independent Distributor</option>
<option value="RTL_OBEA">Retailer-Non Essential - Retailer - Organic Beauty Products</option>
<option value="RTL_UPHS">Retailer-Non Essential - Retailer - Upholstery Supply</option>
<option value="RTL_DTRG">Retailer-Non Essential - Retailer - Detergent</option>
<option value="RTL_LQDT">Retailer-Non Essential - Retailer - Liquid Detergent</option>
<option value="RTL_EPRT">Retailer-Non Essential - Retailer - Electronic Parts</option>
<option value="RTL_SS2M">Retailer-Non Essential - Retailer - Sari Sari Store 2nd Hand Motorcycle</option>
<option value="RTL_PLTT">Retailer-Non Essential - Retailer - Pallet</option>
<option value="RTL_MVHE">Retailer-Non Essential - Retailer - Motor Vehicle and Heavy Equipment</option>
<option value="RTL_VAPE">Retailer-Non Essential - Retailer - Vape</option>
<option value="RTL_CHOC">Retailer-Non Essential - Retailer - Chocolates</option>
<option value="RTL_SPWR">Retailer-Non Essential - Retailer - Sportswear</option>
<option value="RTL_ROOF">Retailer-Non Essential - Retailer - Roof</option>
<option value="RTL_BOUT">Retailer-Non Essential - Retailer - Fashion Boutique</option>
<option value="RTL_PLWR">Retailer-Non Essential - Retailer - Plastic Ware</option>
<option value="RTL_CTNY">Retailer-Non Essential - Retailer - Cotton Candy</option>
<option value="RTL_FSDV">Retailer-Non Essential - Retailer - Fuel Saving Devices</option>
<option value="RTL_SSCL">Retailer-Non Essential - Sari-Sari / Cigarette / Liquor</option>
<option value="RTL_SSCT">Retailer-Non Essential - Retailer - Sari-Sari / Cigarette</option>
<option value="RTL_SSLQ">Retailer-Non Essential - Retailer - Sari-Sari / Liquor</option>
<option value="RTL_BTFX">Retailer-Non Essential - Retailer - Bathroom Fixtures</option>
<option value="RTL_NLLC">Retailer-Non Essential - Retailer-Non Essential / Liquor / Cigarette</option>
<option value="RTL_NTBC">Retailer-Non Essential - Retailer - Non-Essential Commodities / Tobacco</option>
<option value="RTL_PLNT">Retailer-Non Essential - Retailer - Plants</option>
<option value="RTL_ASUP">Retailer-Non Essential - Retailer - Airsoft Supply Accessories</option>
{/* Done */} {/* Done */}




<option value="RTL_NBOL">Retailer-Non Essential - Retailer - Nuts and Bolts</option>
<option value="RTL_PLYD">Retailer-Non Essential - Retailer - Plywood</option>
<option value="RTL_CLQ">Retailer-Non Essential - Retailer - Cigarette / Liquor</option>
<option value="RTL_INSM">Retailer-Non Essential - Retailer - Insulation Materials</option>
<option value="RTL_MGCL">Retailer-Non Essential - Retailer - Mini-Grocery / Liquor / Cigarettes</option>
<option value="RTL_BNSL">Retailer-Non Essential - Retailer - Buy and Sell</option>
<option value="RTL_ECTO">Retailer-Non Essential - Retailer (E-Cigarette / Tobacco Online Selling)</option>
<option value="RTL_RECG">Retailer-Non Essential - Retailer - E-Cigarette</option>
<option value="RTL_MDDS">Retailer - Medical and Dental Supplies</option>
<option value="RTL_KFDS">Retailer-Non Essential - Retailer - Korean Foods</option>
<option value="RTL_BALL">Retailer-Non Essential - Balloons</option>
<option value="RTL_MCSP">Retailer-Non Essential - Retailer - Motorcycle Spare Parts Accessories</option>
<option value="RTL_MCAC">Retailer-Non Essential - Retailer - Motorcycle Accessories</option>
<option value="RTL_PKMT">Retailer-Non Essential - Retailer - Packaging Materials</option>
<option value="RTL_2LBR">Retailer-Non Essential - Retailer - 2nd Hand Lumber</option>
<option value="RTL_LUBR">Retailer-Non Essential - Retailer - Lubricants</option>
<option value="RTL_SCDE">Retailer-Non Essential - Retailer - Security Devices</option>
<option value="RTL_LCHN">Retailer-Non Essential - Retailer - Lechon</option>
<option value="RTL_ACPR">Retailer-Non Essential - Retailer - Airconditioning Parts</option>
<option value="RTL_FRFP">Retailer-Non Essential - Frozen Food Products</option>
<option value="RTL_ASPT">Retailer-Non Essential - Retailer - Auto Spare Parts</option>
<option value="RTL_POSM">Retailer-Non Essential - Retailer - POS Machine</option>
<option value="RTL_HLMT">Retailer-Non Essential - Retailer - Helmet</option>
<option value="RTL_CCPR">Retailer-Non Essential - Retailer - CCTV/POS Machine/Repair Services</option>
<option value="RTL_GFSP">Retailer-Non Essential - Retailer - Gift Shop</option>
<option value="RTL_NCGN">Retailer-Non Essential - Retailer - Non Essential Commodities/Gun</option>
<option value="RTL_SLQW">Retailer-Non Essential - Retailer - Softdrinks / Liquor or Wine</option>
<option value="RTL_MDSP">Retailer-Non Essential - Medical Supplies</option>
<option value="RTL_SKTB">Retailer-Non Essential - Retailer - Skateboard</option>
<option value="RTL_GRCL">Retailer-Non Essential - Retailer - Grocery / Liquor / Cigarettes</option>
{/* Done */} {/* Done */}




<option value="RTL_HMDC">Retailer-Non Essential - Retailer - Home Decoration</option>
<option value="RTL_BWLP">Retailer-Non Essential - Retailer - Beauty and Wellness Products</option>
<option value="RTL_USOL">Retailer-Non Essential - Retailer - Used Oil</option>
<option value="RTL_SHUC">Retailer-Non Essential - Retailer - Second Hand Used Car</option>
<option value="RTL_BGPR">Retailer-Non Essential - Retailer - Bags Perfumes</option>
<option value="RTL_INSP">Retailer-Non Essential - Retailer - Industrial Machines Spare Parts</option>
<option value="RTL_WHMC">Retailer-Non Essential - Retailer - Water Heater Machine</option>
<option value="RTL_KTWR">Retailer-Non Essential - Retailer - Kitchenware</option>
<option value="RTL_WTVD">Retailer-Non Essential - Retailer - Water (Vending Machine)</option>
<option value="RTL_FRCH">Retailer-Non Essential - Retailer - Fried Chicken</option>
<option value="RTL_MTPT">Retailer-Non Essential - Retailer - Meat Products</option>
<option value="RTL_CSMP">Retailer-Non Essential - Retailer - Cosmetic Products</option>
<option value="RTL_BGFW">Retailer-Non Essential - Retailer - Bags Footwear</option>
<option value="RTL_BPEW">Retailer-Non Essential - Retailer - Beauty Products Eyewear</option>
<option value="RTL_BDST">Retailer-Non Essential - Retailer - Bedsheets</option>
<option value="RTL_KIMC">Retailer-Non Essential - Retailer - Kimchi</option>
<option value="RTL_ELSP">Retailer-Non Essential - Retailer - Electrical Electronic Supplies</option>
<option value="RTL_VETP">Retailer-Non Essential - Retailer - Veterinary Drugs and Products, Feed Additives and Supplements</option>
<option value="RTL_BXES">Retailer-Non Essential - Retailer - Boxes</option>
<option value="RTL_FARM">Retailer-Non Essential - Retailer - Fire Alarm</option>
<option value="RTL_FPEQ">Retailer-Non Essential - Retailer - Fire Protection Equipment</option>
<option value="RTL_JUDY">Retailer-Non Essential - Retailer - Judy</option>
<option value="RTL_NCMT">Retailer-Non Essential - Retailer - Non Essential Commodities</option>
<option value="RTL_SRST">Retailer-Non Essential - Retailer - Sari-sari Store</option>
<option value="RTL_RTWE">Retailer-Non Essential - Retailer - RTW</option>
<option value="RTL_SCRP">Retailer-Non Essential - Retailer - Scrap</option>
<option value="RTL_LPGN">Retailer-Non Essential - Retailer – LPG</option>
<option value="RTL_FLWR">Retailer-Non Essential - Retailer - Flower Shop</option>
<option value="RTL_MSP">Retailer-Non Essential - Retailer - Motor Vehicle Spare Parts</option>
<option value="RTL_BKMZ">Retailer-Non Essential - Retailer - Books Magazines</option>
{/* Done */} {/* Done */}




<option value="RTL_BTYD">Retailer-Non Essential - Retailer - Beauty Products</option>
<option value="RTL_CNSS">Retailer-Non Essential - Retailer - Construction Supply</option>
<option value="RTL_RFNT">Retailer-Non Essential - Retailer - Furniture</option>
<option value="RTL_CSFA">Retailer-Non Essential - Retailer - Crosstitch Accessories and Frames</option>
<option value="RTL_FTWG">Retailer-Non Essential - Retailer - Footwear</option>
<option value="RTL_CNDY">Retailer-Non Essential - Retailer - Candies</option>
<option value="RTL_CPAC">Retailer-Non Essential - Retailer - Cellphone Accessories</option>
<option value="RTL_DNTS">Retailer-Non Essential - Retailer - Donuts</option>
<option value="RTL_OPST">Retailer-Non Essential - Retailer - Optical Supplies</option>
<option value="RTL_CPAK">Retailer-Non Essential - Retailer - Computer Parts Accessories</option>
<option value="RTL_CPTR">Retailer-Non Essential - Retailer - Computers Parts</option>
<option value="RTL_BRGR">Retailer-Non Essential - Retailer - Burger</option>
<option value="RTL_DRGS">Retailer-Non Essential - Retailer - Drug Store</option>
<option value="RTL_MNUS">Retailer-Non Essential - Retailer - Musical Instrument</option>
<option value="RTL_APL">Retailer-Non Essential - Retailer - Appliances</option>
<option value="RTL_INDS">Retailer-Non Essential - Retailer - Industrial Sales</option>
<option value="RTL_INDP">Retailer-Non Essential - Retailer - Industrial Products</option>
<option value="RTL_PTSH">Retailer-Non Essential - Retailer - Pet Shop</option>
<option value="RTL_BSHP">Retailer-Non Essential - Retailer - Bicycle Spare Parts</option>
<option value="RTL_MSUE">Retailer-Non Essential - Retailer - Medical Supplies Equipment</option>
<option value="RTL_SHES">Retailer-Non Essential - Retailer - Shoes</option>
<option value="RTL_NCOM">Retailer-Non Essential - Retailer - Non Essential Commodities (Office Only)</option>
<option value="RTL_PRFD">Retailer-Non Essential - Retailer - Processed Food</option>
<option value="RTL_PRFM">Retailer-Non Essential - Retailer - Perfumes</option>
<option value="RTL_CLCD">Retailer-Non Essential - Retailer - Cellcard</option>
<option value="RTL_SHRM">Retailer-Non Essential - Retailer - Shawarma</option>
<option value="RTL_TLCS">Retailer-Non Essential - Retailer - Tiles Ceramics</option>
<option value="RTL_JWLR">Retailer-Non Essential - Retailer - Jewelry</option>
<option value="RTL_MDMS">Retailer-Non Essential - Retailer - Modem</option>
<option value="RTL_SSBA">Retailer-Non Essential - Retailer - Sari-Sari Store Bakery</option>
{/* Done */} {/* Done */}




<option value="RTL_NCI">Retailer-Non Essential - Retailer - Non Essential Commodities/Importer</option>
<option value="RTL_INDC">Retailer-Non Essential - Retailer - Industrial/Chemical and All Types of Equipment</option>
<option value="RTL_GRRY">Retailer-Non Essential - Retailer - Grocery</option>
<option value="RTL_FLFO">Retailer-Non Essential - Retailer - Fuel (Office Only)</option>
<option value="RTL_RTNR">Retailer-Non Essential - Retailer - Router Non Essential</option>
<option value="RTL_RTRT">Retailer-Non Essential - Retailer - Router</option>
<option value="RTL_FLUL">Retailer-Non Essential - Retailer - Fuel</option>
<option value="RTL_MVCL">Retailer-Non Essential - Retailer - Motor Vehicle</option>
<option value="RTL_MSPT">Retailer-Non Essential - Retailer - Motorcycle Spare Parts</option>
<option value="RTL_LDST">Retailer-Non Essential - Retailer - Loading Station</option>
<option value="RTL_PZZA">Retailer-Non Essential - Retailer - Pizza</option>
<option value="RTL_CSIH">Retailer-Non Essential - Retailer - Construction Supply / Importer</option>
<option value="RTL_DNSP">Retailer-Non Essential - Retailer - Dental Supplies</option>
<option value="RTL_FEXT">Retailer-Non Essential - Retailer - Fire Extinguisher</option>
<option value="RTL_FSUP">Retailer-Non Essential - Retailer - Food Supplements</option>
<option value="RTL_MSSP">Retailer-Non Essential - Retailer - Motorcycle Spare Parts</option>
<option value="RTL_ICRM">Retailer-Non Essential - Retailer - Ice Cream</option>
<option value="RTL_ORGF">Retailer-Non Essential - Retailer - Organic Fertilizer</option>
<option value="RTL_MGRC">Retailer-Non Essential - Retailer - Mini-Grocery</option>
<option value="RTL_CMSC">Retailer-Non Essential - Retailer - Cosmetics</option>
<option value="RTL_ECSU">Retailer-Non Essential - Retailer - Electronics Supply</option>
<option value="RTL_GLAS">Retailer-Non Essential - Retailer - Glassware</option>
<option value="RTL_PLST">Retailer-Non Essential - Retailer - Plastic Ware</option>
<option value="RTL_FAAU">Retailer-Non Essential - Retailer - Firearms and Ammunition</option>
<option value="RTL_ECGD">Retailer-Non Essential - Retailer - Electronics Gadget</option>
<option value="RTL_PNTS">Retailer-Non Essential - Retailer - Paints</option>
<option value="RTL_CAPS">Retailer-Non Essential - Retailer - Caps</option>
<option value="RTL_BAGS">Retailer-Non Essential - Retailer - Bags Shoes</option>
<option value="RTL_SLVX">Retailer-Non Essential - Retailer - Silver Accessories</option>
<option value="RTL_RLGI">Retailer-Non Essential - Retailer - Religious Item</option>
{/* Done */} {/* Done */}




<option value="RTL_SAPX">Retailer-Non Essential - Retailer - Soap</option>
<option value="RTL_APRL">Retailer-Non Essential - Retailer - Apparels</option>
<option value="RTL_TSHR">Retailer-Non Essential - Retailer - T-Shirts</option>
<option value="RTL_CAKE">Retailer-Non Essential - Retailer - Cake</option>
<option value="RTL_KAKN">Retailer-Non Essential - Retailer - Kakanin</option>
<option value="RTL_UKAY">Retailer-Non Essential - Retailer - Ukay Ukay</option>
<option value="RTL_SODK">Retailer-Non Essential - Retailer - Softdrinks</option>
<option value="RTL_GLAL">Retailer-Non Essential - Retailer - Glass and Aluminum</option>
<option value="RTL_HBPT">Retailer-Non Essential - Retailer - Herbal Beauty Products</option>
<option value="RTL_CPNS">Retailer-Non Essential - Retailer - Computer Printer Services</option>
<option value="RTL_FOOT">Retailer-Non Essential - Retailer - Footwear (Office Only)</option>
<option value="RTL_CHEM">Retailer-Non Essential - Retailer - Cleaning Chemicals</option>
<option value="RTL_MOTO">Retailer-Non Essential - Retailer - Motorcycle</option>
<option value="RTL_MVBT">Retailer-Non Essential - Retailer - Motor Vehicle Battery</option>
<option value="RTL_BUJU">Retailer-Non Essential - Retailer - Buko Juice</option>
<option value="RTL_DUPM">Retailer-Non Essential - Retailer - Duplicator Machine</option>
<option value="RTL_TIRE">Retailer-Non Essential - Retailer - Tire Supply</option>
<option value="RTL_PINY">Retailer-Non Essential - Retailer - Pinoy Delicacies/Pasalubong</option>
<option value="RTL_DVCA">Retailer-Non Essential - Retailer - Digital Video Camera Accessories</option>
<option value="RTL_SURP">Retailer-Non Essential - Retailer - Surplus TV</option>
<option value="RTL_DUMI">Retailer-Non Essential - Retailer - Duplicator Machine / Importer</option>
<option value="RTL_HOFS">Retailer-Non Essential - Retailer - Hose Fittings</option>
<option value="RTL_BOOK">Retailer-Non Essential - Retailer - Book</option>
<option value="RTL_SKBP">Retailer-Non Essential - Retailer - Skateboard Parts Apparel</option>
<option value="RTL_TISS">Retailer-Non Essential - Retailer - Tissue</option>
<option value="RTL_TVMV">Retailer-Non Essential - Retailer - Tissue (Vending Machine)</option>
<option value="RTL_BAGS">Retailer-Non Essential - Retailer - Bags Accessories</option>
<option value="RTL_RAGX">Retailer-Non Essential - Retailer - Rag</option>
<option value="RTL_BSCT">Retailer-Non Essential - Retailer - Biscuit</option>
<option value="RTL_IDSP">Retailer-Non Essential - Retailer - Industrial Spare Parts</option>
{/* Done */} {/* Done */}




<option value="RTL_DIAP">Retailer-Non Essential - Retailer - Diaper</option>
<option value="RTL_STKR">Retailer-Non Essential - Retailer - Sticker</option>
<option value="RTL_CCLM">Retailer-Non Essential - Retailer - Coco Lumber</option>
<option value="WHO_NEC">Wholesaler / Exporter - Wholesaler - Non Essential Commodities</option>
<option value="WHO_DIS">Wholesaler / Exporter - Distributor - Non Essential Commodities</option>
<option value="WHO_EXP">Wholesaler / Exporter - Exporter - Non Essential Commodities</option>
<option value="WHO_PRO">Wholesaler / Exporter - Producer - Non Essential Commodities</option>
<option value="WHO_DEA">Wholesaler / Exporter - Dealer - Non Essential Commodities</option>
<option value="WHO_SOF">Wholesaler / Exporter - Dealer - Softdrinks</option>
<option value="WHO_BER">Wholesaler / Exporter - Dealer - Beer</option>
<option value="WHO_APP">Wholesaler / Exporter - Dealer - Appliance</option>
<option value="WHO_NECW">Wholesaler / Exporter - Wholesaler - Non Essential Commodities</option>
<option value="WHO_MEX">Wholesaler / Exporter - Manufacturer / Exporter - Non Essential Commodities</option>
<option value="WHO_LPG">Wholesaler / Exporter - Dealer - LPG</option>
<option value="WHO_JNK">Wholesaler / Exporter - Wholesaler - Junkshop</option>
<option value="WHO_AUT">Wholesaler / Exporter - Dealer - Automotive</option>
<option value="WHO_LPGW">Wholesaler / Exporter - Wholesaler - LPG</option>
<option value="WHO_CON">Wholesaler / Exporter - Wholesaler - Construction Materials</option>
<option value="WHO_FUR">Wholesaler / Exporter - Wholesaler - Furniture</option>
<option value="WHO_CNS">Wholesaler / Exporter - Wholesaler - Construction Supply</option>
<option value="WHO_RICC">Wholesaler / Exporter - Dealer - Rice Corn</option>
<option value="WHO_PFG">Wholesaler / Exporter - Wholesaler - Piggery Farm</option>
<option value="WHO_WEX">Wholesaler / Exporter - Wholesaler - Exporter</option>
<option value="WHO_WEO">Wholesaler / Exporter - Wholesaler - Exporter (Office Only)</option>
<option value="WHO_DEI">Wholesaler / Exporter - Dealer - Importer - Non Essential Commodities</option>
<option value="WHO_ECO">Wholesaler / Exporter - Dealer - Essential Commodities</option>
<option value="WHO_WIL">Wholesaler / Exporter - Wholesaler - Wine Liquor</option>
<option value="WHO_LGL">Wholesaler / Exporter - Dealer - Non Essential Commodities (Lights)</option>
<option value="WHO_MTC">Wholesaler / Exporter - Dealer - Motorcycle</option>
<option value="WHO_PTF">Wholesaler / Exporter - Wholesaler - Poultry Farm</option>
{/* Done */} {/* Done */}



<option value="WHO_OJNK">Wholesaler / Exporter - Wholesaler - Junkshop (Office Only)</option>
<option value="WHO_RIC">Wholesaler / Exporter - Wholesaler - Rice</option>
<option value="WHO_HEA">Wholesaler / Exporter - Wholesaler - Health Products</option>
<option value="WHO_MTP">Wholesaler / Exporter - Dealer - Motorcycle Parts</option>
<option value="WHO_NECI">Wholesaler / Exporter - Exporter / Importer - Non Essential Commodities</option>
<option value="WHO_WHI">Wholesaler / Exporter - Wholesaler - Wholesaler / Importer</option>
<option value="WHO_WNEC">Wholesaler / Exporter - Wholesaler - Importer - Non Essential Commodities</option>
<option value="WHO_SOE">Wholesaler / Exporter - Dealer - School, Office Supplies Equipment</option>
<option value="WHO_WAT">Wholesaler / Exporter - Distributor - Water Supply</option>
<option value="WHO_SFTD">Wholesaler / Exporter - Distributor - Softdrinks</option>
<option value="WHO_DSS">Wholesaler / Exporter - Wholesaler - Dental Supplies</option>
<option value="WHO_RID">Wholesaler / Exporter - Dealer - Rice</option>
<option value="WHO_BEA">Wholesaler / Exporter - Wholesaler - Beauty Products</option>
<option value="WHO_SEC">Wholesaler / Exporter - Dealer - Security Equipment</option>
<option value="WHO_BED">Wholesaler / Exporter - Distributor - Beauty Products</option>
<option value="WHO_MED">Wholesaler / Exporter - Distributor - Medical Equipment</option>
<option value="WHO_IMM">Wholesaler / Exporter - Importer - Medical Equipment</option>
<option value="WHO_IEC">Wholesaler / Exporter - Wholesaler - Importer - Essential Commodities</option>
<option value="WHO_PLS">Wholesaler / Exporter - Wholesaler - Importer - Poultry Livestock Supply</option>
<option value="WHO_CBX">Wholesaler / Exporter - Wholesaler - Carton Box</option>
<option value="WHO_WL">Wholesaler / Exporter - Dealer - Wine Liquor</option>
<option value="WHO_HCL">Wholesaler / Exporter - Distributor - Household Cleaner</option>
<option value="WHO_FDF">Wholesaler / Exporter - Dealer - Frozen Food</option>
<option value="WHO_DNEC">Wholesaler / Exporter - Distributor - Non Essential Commodities / Importer</option>
<option value="WHO_TSD">Wholesaler / Exporter - Wholesaler - Importer - Traffic Safety Device</option>
<option value="WHO_BKS">Wholesaler / Exporter - Distributor - Books</option>
<option value="WHO_STE">Wholesaler / Exporter - Wholesaler - Steel</option>
<option value="WHO_FPD">Wholesaler / Exporter - Wholesaler - Food Products</option>
<option value="WHO_PCT">Wholesaler / Exporter - Wholesaler - Packaging Tape</option>
<option value="WHO_DCON">Wholesaler / Exporter - Dealer - Construction Materials</option>
{/* Done */} {/* Done */}




<option value="WHO_LED">Wholesaler / Exporter - Distributor - LED Light</option>
<option value="WHO_HAN">Wholesaler / Exporter - Exporter - Handicraft Products</option>
<option value="WHO_SSO">Wholesaler / Exporter - Wholesaler - School Supply Office Supply</option>
<option value="WHO_SCRM">Wholesaler / Exporter - Wholesaler - Scrap Metal</option>
<option value="WHO_DPMP">Wholesaler / Exporter - Distributor - Packaging Materials (Meat Processing Products)</option>
<option value="WHO_FVR">Wholesaler / Exporter - Dealer - Fruits and Vegetables</option>
<option value="WHO_HRP">Wholesaler / Exporter - Wholesaler - Herbal Product</option>
<option value="WHO_BSC">Wholesaler / Exporter - Wholesaler - Biscuits</option>
<option value="WHO_GOL">Wholesaler / Exporter - Wholesaler - Golf Products</option>
<option value="WHO_MES">Wholesaler / Exporter - Wholesaler - Machinery, Equipment, and Supplies</option>
<option value="WHO_BAN">Wholesaler / Exporter - Dealer - Banana</option>
<option value="WHO_PHP">Wholesaler / Exporter - Distributor - Pharmaceutical Product</option>
<option value="WHO_BEAS">Wholesaler / Exporter - Exporter - Beauty Soap</option>
<option value="WHO_SVI">Wholesaler / Exporter - Distributor - Spices/Vanilla Product - Raw</option>
<option value="WHO_IMP">Wholesaler / Exporter - Wholesaler - Importer</option>
<option value="WHO_MSP">Wholesaler / Exporter - Wholesaler - Motorcycle Spare Parts</option>
<option value="WHO_CAP">Wholesaler / Exporter - Wholesaler - Cap</option>
<option value="WHO_PMP">Wholesaler / Exporter - Wholesaler - Importer - Packaging Materials for Meat Processing</option>
<option value="WHO_LAB">Wholesaler / Exporter - Importer - Laboratory Equipment</option>
<option value="WHO_MCP">Wholesaler / Exporter - Dealer - Machineries Parts (Office Only)</option>
<option value="WHO_FSU">Wholesaler / Exporter - Distributor - Food Supplement</option>
<option value="WHO_MVS">Wholesaler / Exporter - Dealer - Motor Vehicle Spare Parts / Importer</option>
<option value="WHO_JWL">Wholesaler / Exporter - Exporter - Jewelries</option>
<option value="WHO_PWA">Wholesaler / Exporter - Importer - Plastic Ware</option>
<option value="WHO_MIW">Wholesaler / Exporter - Distributor - Mineral Water</option>
<option value="WHO_CIT">Wholesaler / Exporter - Wholesaler - Cigarettes and Other Tobacco Products</option>
<option value="WHO_SCRP">Wholesaler / Exporter - Wholesaler - Scrap</option>
<option value="WHO_INEC">Wholesaler / Exporter - Importer - Non Essential Commodities</option>
<option value="WHO_AFE">Wholesaler / Exporter - Dealer - Appliance Furniture</option>
<option value="WHO_FDR">Wholesaler / Exporter - Dealer - Fruit Drinks</option>
{/* Done */} {/* Done */}






<option value="WHO_MVSP">Wholesaler / Exporter - Importer - Motor Vehicle Spare Parts</option>
<option value="WHO_INP">Wholesaler / Exporter - Wholesaler - Industrial Products</option>
<option value="WHO_CCL">Wholesaler / Exporter - Distributor - Cleaning Chemical</option>
<option value="WHO_IECE">Wholesaler / Exporter - Exporter - Import/Export of Construction Equipment</option>
<option value="WHO_APS">Wholesaler / Exporter - Wholesaler - Appliances</option>
<option value="WHO_SOD">Wholesaler / Exporter - Wholesaler - Softdrinks</option>
<option value="WHO_ONEC">Wholesaler / Exporter - Wholesaler - Importer - Non Essential Commodities (Office Only)</option>
<option value="WHO_MSE">Wholesaler / Exporter - Wholesaler - Medical Supplies Equipment</option>
<option value="WHO_LPGN">Wholesaler / Exporter - Wholesaler - LPG / Non Essential Commodities</option>
<option value="WHO_BSD">Wholesaler / Exporter - Wholesaler - Beer / Softdrinks</option>
<option value="WHO_ICE">Wholesaler / Exporter - Distributor - Ice</option>
<option value="WHO_EGG">Wholesaler / Exporter - Dealer - Egg</option>
<option value="WHO_BPS">Wholesaler / Exporter - Wholesaler - Beauty Products and Supplements</option>
<option value="WHO_GLS">Wholesaler / Exporter - Wholesaler - Gloves/Shoes</option>
<option value="WHO_TSS">Wholesaler / Exporter - Wholesaler - Tissue and Soap</option>
<option value="WHO_KFD">Wholesaler / Exporter - Wholesaler - Korean Foods</option>
<option value="WHO_AUS">Wholesaler / Exporter - Wholesaler - Auto Supply</option>
<option value="WHO_CLM">Wholesaler / Exporter - Dealer - Coco Lumber</option>
<option value="WHO_PLT">Wholesaler / Exporter - Wholesaler - Pallet</option>
<option value="WHO_LBR">Wholesaler / Exporter - Wholesaler - Lumber</option>
<option value="WHO_BST">Wholesaler / Exporter - Distributor - Biscuit</option>
<option value="WHO_DMP">Wholesaler / Exporter - Distributor - Del Monte Products</option>
<option value="WHO_RTW">Wholesaler / Exporter - Wholesaler - RTW</option>
<option value="WHO_PLY">Wholesaler / Exporter - Wholesaler - Plywood</option>
<option value="WHO_EVS">Wholesaler / Exporter - Event Supplier</option>
<option value="WHO_YAK">Wholesaler / Exporter - Wholesale - Yakult</option>
<option value="WHO_DCT">Wholesaler / Exporter - Wholesaler - Drum and Container</option>
<option value="WHO_PET">Wholesaler / Exporter - Importer - Petroleum Products / Office Only</option>
<option value="WHO_IECS">Wholesaler / Exporter - Import/Export Construction Materials / Wholesaler - Construction Supply</option>
<option value="WHO_EBT">Wholesaler / Exporter - Wholesaler - Empty Bottle</option>
{/* Done */} {/* Done */}




<option value="WHO_WLSD">Wholesaler / Exporter - Dealer - Wine Liquor / Softdrinks</option>
<option value="WHO_CAR">Wholesaler / Exporter - Wholesaler - Car Accessories</option>
<option value="WHO_WSP">Wholesaler / Exporter - Distributor - Water Service Provider</option>
<option value="WHO_RMI">Wholesaler / Exporter - Distributor - Raw Materials Import/Export</option>
<option value="WHO_ELE">Wholesaler / Exporter - Importer - Electronics</option>
<option value="WHO_INDP">Wholesaler / Exporter - Importer - Industrial Products</option>
<option value="WHO_FDS">Wholesaler / Exporter - Wholesaler - Food Supplement</option>
<option value="WHO_HYS">Wholesaler / Exporter - Wholesaler - Hydraulic Hose</option>
<option value="WHO_HYI">Wholesaler / Exporter - Importer - Hydraulic Hose</option>
<option value="WHO_DSD">Wholesaler / Exporter - Importer / Exporter - Dental Supplies/Devices</option>
<option value="WHO_RTX">Wholesaler / Exporter - Wholesaler - Rugs / Textile</option>
<option value="WHO_NEC">Wholesaler / Exporter - Wholesaler - Non Essential Commodities (Office Only)</option>
<option value="WHO_IME">Wholesaler / Exporter - Wholesaler - Industrial Machinery Equipment (Office Only)</option>
<option value="WHO_ALC">Wholesaler / Exporter - Distributor - Alcohol</option>
<option value="WHO_OPL">Wholesaler / Exporter - Wholesaler - Ornamental Plants</option>
<option value="WHO_SMC">Wholesaler / Exporter - Wholesaler - Surplus Machineries</option>
<option value="WHO_GRM">Wholesaler / Exporter - Exporter - Garments</option>
<option value="WHO_DMSE">Wholesaler / Exporter - Distributor - Medical Supplies Equipment</option>
<option value="WHO_FFD">Wholesaler / Exporter - Frozen Food Products</option>
<option value="WHO_SPS">Wholesaler / Exporter - Distributor/Importer - Spices</option>
<option value="WHO_PBG">Wholesaler / Exporter - Wholesaler - Plastic Bag</option>
<option value="WHO_PNT">Wholesaler / Exporter - Wholesaler / Importer of Paint</option>
<option value="WHO_SCM">Wholesaler / Exporter - Importer - Scrap Metal</option>
<option value="WHO_CPA">Wholesaler / Exporter - Wholesaler - Computer Parts and Accessories</option>
<option value="WHO_SWD">Wholesaler / Exporter - Wholesaler - Scrap Wood</option>
<option value="WHO_CTM">Wholesaler / Exporter - Importer - Construction Materials</option>
<option value="WHO_TLB">Wholesaler / Exporter - Distributor/Importer - Tire, Lubricant, Battery</option>
<option value="WHO_CSO">Wholesaler / Exporter - Distributor - Computer Software</option>
<option value="WHO_RCE">Wholesaler-Essential - Dealer - Rice</option>
<option value="WHO_MPP">Wholesaler-Essential - Wholesaler - Medicinal and Pharmaceutical Products</option>
{/* Done */} {/* Done */}



<option value="WHO_OSE">Wholesaler-Essential - Wholesaler - Oil and Sugar</option>
<option value="WHO_MPR">Wholesaler-Essential - Wholesaler - Importer - Marine Products</option>
<option value="WHO_DPHP">Wholesaler-Essential - Distributor - Pharmaceutical Product</option>
<option value="WHO_WEGG">Wholesaler-Essential - Wholesaler - Egg</option>
<option value="WHO_CHK">Wholesaler-Essential - Dealer - Chicken</option>
<option value="WHO_OSF">Wholesaler-Essential - Wholesaler - Office Supplies and Printed Form</option>
<option value="WHO_OSP">Wholesaler-Essential - Wholesaler - Office Supply</option>
<option value="WHO_WRCE">Wholesaler-Essential - Wholesaler - Rice</option>
<option value="WHO_IGS">Wholesaler-Essential - Distributor - Industrial Gas</option>
<option value="WHO_AGP">Wholesaler-Essential - Distributor - Agricultural Products</option>
<option value="WHO_FMS">Wholesaler-Essential - Retailer - Frozen Meat and Seafood Products</option>
<option value="WHO_ECE">Wholesaler-Essential - Importer / Exporter - Essential Commodities</option>
<option value="WHO_WPHP">Wholesaler-Essential - Wholesaler - Importer - Pharmaceutical Products</option>
<option value="WHO_FMP">Wholesaler-Essential - Wholesaler - Frozen Meat Products</option>
<option value="WHO_PST">Wholesaler-Essential - Wholesaler - Pesticides</option>
<option value="WHO_ECM">Wholesaler-Essential - Wholesaler - Essential Commodities</option>
<option value="WHO_DEC">Wholesaler-Essential - Distributors - Essential Commodities</option>
<option value="WHO_RCO">Wholesaler-Essential - Distributor - Rice and Corn</option>
<option value="WHO_RCN">Wholesaler-Essential - Dealer - Rice and Corn</option>
<option value="WHO_WCF">Wholesaler-Essential - Dealer - Wheat or Cassava Flour</option>
<option value="WHO_MET">Wholesaler-Essential - Dealer - Meat</option>
<option value="WHO_DDP">Wholesaler-Essential - Dealer - Dairy Products</option>
<option value="WHO_PPF">Wholesaler-Essential - Dealer - Processed or Preserved Food</option>
<option value="WHO_SGR">Wholesaler-Essential - Dealers - Sugar</option>
<option value="WHO_DLPG">Wholesaler-Essential - Dealer - LPG</option>
<option value="WHO_CEM">Wholesaler-Essential - Dealer - Cement</option>
<option value="WHO_SGRD">Wholesaler-Essential - Distributor - Sugar</option>
<option value="WHO_DMED">Wholesaler-Essential - Distributor - Medicine</option>
<option value="WHO_COI">Wholesaler-Essential - Distributor - Cooking Oil</option>
<option value="WHO_LNS">Wholesaler-Essential - Distributor - Laundry Soap</option>
{/* Done */} {/* Done */}
 



<option value="WHO_DDET">Wholesaler-Essential - Distributor - Detergents</option>
<option value="WHO_DSLT">Wholesaler-Essential - Distributor - Salt</option>
<option value="WHO_FRT">Wholesaler-Essential - Distributor - Fertilizers</option>
<option value="WHO_PSTC">Wholesaler-Essential - Distributor - Pesticides</option>
<option value="WHO_INST">Wholesaler-Essential - Distributor - Insecticides</option>
<option value="WHO_PFDS">Wholesaler-Essential - Distributor - Poultry Feeds and Other Animal Feeds</option>
<option value="WHO_DSHS">Wholesaler-Essential - Distributor - School Supplies</option>
<option value="WHO_LPGD">Wholesaler-Essential - Distributor - LPG</option>
<option value="WHO_RCNC">Wholesaler-Essential - Wholesaler - Rice and Corn</option>
<option value="WHO_LNSO">Wholesaler-Essential - Wholesaler - Laundry Soap</option>
<option value="WHO_DETO">Wholesaler-Essential - Wholesaler - Detergent</option>
<option value="WHO_WWCF">Wholesaler-Essential - Wholesaler - Wheat or Cassava Flour</option>
<option value="WHO_WDDP">Wholesaler-Essential - Wholesaler - Dairy Products</option>
<option value="WHO_WMET">Wholesaler-Essential - Wholesaler - Meat</option>
<option value="WHO_WSGR">Wholesaler-Essential - Wholesaler - Sugar</option>
<option value="WHO_SLT">Wholesaler-Essential - Wholesaler - Salt</option>
<option value="WHO_WMED">Wholesaler-Essential - Wholesaler - Medicine</option>
<option value="WHO_WPFS">Wholesaler-Essential - Wholesaler - Poultry Feeds and Other Animal Feeds</option>
<option value="WHO_WCEM">Wholesaler-Essential - Wholesaler - Cement</option>
<option value="WHO_DAGP">Wholesaler-Essential - Dealer - Agricultural Products</option>
<option value="WHO_DESC">Wholesaler-Essential - Dealer - Essential Commodities</option>
<option value="WHO_MFP">Wholesaler-Essential - Dealer - Marine and Freshwater Products</option>
<option value="WHO_DMDC">Wholesaler-Essential - Dealer - Medicine</option>
<option value="WHO_DSSP">Wholesaler-Essential - Dealer - School Supplies</option>
<option value="WHO_LSD">Wholesaler-Essential - Dealer - Laundry Soap and/or Detergent</option>
<option value="WHO_DSEC">Wholesaler-Essential - Distributor - Essential Commodities</option>
<option value="WHO_DECD">Wholesaler-Essential - Dealer - Essential Commodities</option>
<option value="WHO_NM">Wholesaler-Essential - Distributor - Newspaper and Magazines</option>
<option value="WHO_PFAE">Wholesaler-Essential - Distributor - Poultry, Agricultural, and Food Equipment</option>
<option value="WHO_WHL">Wholesaler-Essential - Distributor - Wholesaler</option>
{/* Done */} {/* Done */}



<option value="WHO_CHC">Wholesaler-Essential - Distributor - Chicken</option>
<option value="WHO_CHCK">Wholesaler-Essential - Distributor Chicken</option>
<option value="WHO_PFFD">Wholesaler-Essential - Distributor - Poultry Feeds and Food Equipment / Importer</option>
<option value="WHO_DSFD">Wholesaler-Essential - Distributor - Soft Drinks</option>
<option value="WHO_VEG">Wholesaler-Essential - Dealer - Vegetables</option>
<option value="WHO_SSOF">Wholesaler-Essential - Wholesaler - School Supply Office Supply</option>
<option value="WHO_SFD">Wholesaler-Essential - Dealer - Seafoods</option>
<option value="WHO_FLR">Wholesaler-Essential - Distributor - Flour</option>

  </select>
                  <input
                    type="text"
                    name="businessType"
                    placeholder="Business Type"
                    value={newBusiness.businessType}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="capitalInvestment"
                    placeholder="Capital Investment"
                    value={newBusiness.capitalInvestment}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleAddBusiness}>Add Business</button>
                </div>

                <h2>Businesses to Add</h2>
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
                        <td>{business.businessNature}</td>
                        <td>{business.businessType}</td>
                        <td>{business.capitalInvestment}</td>
                        <td>
                          <button onClick={(e) => {
                             e.preventDefault(); // Prevents default form submission or button behavior
                             handleRemoveBusiness(index); // Calls your custom function
                            }}>Remove</button>
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
                <input type="file" />
                <label>Picture of Establishment (Perspective View)</label>
                <input type="file" />
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
