import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/workpermitpage.css';
import axios from 'axios';

const WorkPermit: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [step, setStep] = useState(1);
  const [isFormValid, setIsFormValid] = useState(true); 

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [currentlyResiding, setCurrentlyResiding] = useState(false);
  const [temporaryAddress, setTemporaryAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [civilStatus, setCivilStatus] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [mobileTel, setMobileTel] = useState('');
  const [email, setEmail] = useState('');
  const [educationalAttainment, setEducationalAttainment] = useState('');
  const [natureOfWork, setNatureOfWork] = useState('');
  const [placeOfWork, setPlaceOfWork] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [name2, setName2] = useState('');
  const [mobileTel2, setMobileTel2] = useState('');
  const [address, setAddress] = useState('');
  const [transaction, setTransaction] = useState('');
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

if (!token) {
    navigate('/'); // Redirect to login if no token
    return;
  }
  
      const goToNextStep = () => {
          // Perform validation based on the current step
       if (step === 1) {
     // Check if required fields are filled for step 1
    if (!firstName || !lastName) {
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
    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('lastName', lastName);
    formData.append('firstName', firstName);
    formData.append('middleInitial', middleInitial);
    formData.append('permanentAddress', permanentAddress);
    formData.append('currentlyResiding', String(currentlyResiding));
    formData.append('temporaryAddress', temporaryAddress);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('age', String(age));
    formData.append('placeOfBirth', placeOfBirth);
    formData.append('citizenship', citizenship);
    formData.append('civilStatus', civilStatus);
    formData.append('gender', gender);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('mobileTel', mobileTel);
    formData.append('email', email);
    formData.append('educationalAttainment', educationalAttainment);
    formData.append('natureOfWork', natureOfWork);
    formData.append('placeOfWork', placeOfWork);
    formData.append('companyName', companyName);
    formData.append('name2', name2);
    formData.append('mobileTel2', mobileTel2);
    formData.append('address', address);
    formData.append('transaction', transaction);

    if (files.document1) formData.append('document1', files.document1);
    if (files.document2) formData.append('document2', files.document2);
    if (files.document3) formData.append('document3', files.document3);
    if (files.document4) formData.append('document4', files.document4);

    logFormData(formData);

  
    try {
      const response = await axios.post('http://localhost:3000/workpermitpage', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
        console.log(response.data);
        if (response.status === 200) {
          alert('Work Permit Application submitted successfully!');
          navigate('/dashboard'); // Redirect to the dashboard or any other page
        } else {
          const errorMessage = (response.data as { message: string }).message;
          console.error('Error submitting application:', errorMessage);
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };
  
  

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/'); // Redirect to the login page or home page
  };

  return (
    <section className="dashboard-container">
      <div className="sidebar-container">
        <div className="sidebar">
          <div className="sidebar-logo">
            <img src="/obpwlslogo.svg" alt="Logo" className="logo-image" />
          </div>
          <ul className="sidebar-list">
            <li><a href="/dashboard" className="sidebar-link">Dashboard</a></li>
            <li><a href="/workpermitpage" className="sidebar-linkactive">Apply for Work Permit</a></li>
            <li><a href="/businesspermitpage" className="sidebar-link">Apply for Business Permit</a></li>
            <li><a href="/viewapplication" className="sidebar-link">View Applications</a></li>
            <li><a href="/" onClick={handleLogout} className="sidebar-link">Log Out</a></li>
          </ul>
        </div>
      </div>

      <div className="content">
        <header>
          <h1>Work Permit Application</h1>
          <nav>
            <ul>
              <li><a href="/account" className="button">Account</a></li>
              <li><a href="/" onClick={handleLogout} className="button">Logout</a></li>
            </ul>
          </nav>
        </header>
        <form onSubmit={handleSubmit}>
{step === 1 &&(
        <div className="workpermit-form">
          <h2>Personal Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>LAST NAME:</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="LastName"  required/>
            </div>
            <div className="form-group">
              <label>FIRST NAME:</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="FirstName" required />
            </div>
            <div className="form-group">
              <label>MIDDLE INITIAL:</label>
              <input type="text" value={middleInitial} onChange={(e) => setMiddleInitial(e.target.value)} placeholder="MiddleInitial"  />
            </div>
          </div>
          <div className="form-group">
            <label>PERMANENT ADDRESS:</label>
            <input type="text" value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} placeholder="PermanentAddress"  />
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={currentlyResiding} onChange={() => setCurrentlyResiding(!currentlyResiding)} />
              Check if Currently Residing in Dasmarinas
            </label>
          </div>
          <div className="form-group">
            <label>TEMPORARY ADDRESS (IF ANY):</label>
            <input type="text" value={temporaryAddress} onChange={(e) => setTemporaryAddress(e.target.value)} placeholder="TemporaryAddress"  />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>DATE OF BIRTH:</label>
              <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} placeholder="DateOfBirth"  />
            </div>
            <div className="form-group">
              <label>AGE:</label>
              <input type="number" value={age}  onChange={(e) => setAge(Number(e.target.value))} placeholder="Age"  />
            </div>
            <div className="form-group">
              <label>PLACE OF BIRTH:</label>
              <input type="text" value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} placeholder="PlaceOfBirth"  />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>CITIZENSHIP:</label>
              <input type="text" value={citizenship} onChange={(e) => setCitizenship(e.target.value)} placeholder="Citizenship"  />
            </div>
            <div className="form-group">
              <label>CIVIL STATUS:</label>
              <input type="text" value={civilStatus} onChange={(e) => setCivilStatus(e.target.value)} placeholder="CivilStatus"  />
            </div>
              <div className="form-group gender-group">
              <label>GENDER:</label>
              <label>
              <input 
                type="radio" 
                name="gender" // Grouping name for radio buttons
                value="Male" // Set the value directly here
                checked={gender === "Male"} // Set checked based on state
                onChange={() => setGender("Male")} 
              /> Male
               </label>
              <label>
              <input 
                  type="radio" 
                  name="gender" // Grouping name for radio buttons
                  value="Female" // Set the value directly here
                  checked={gender === "Female"} // Set checked based on state
                  onChange={() => setGender("Female")} 
               />Female
                 </label>
                </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>HEIGHT:</label>
              <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height"  />
            </div>
            <div className="form-group">
              <label>WEIGHT:</label>
              <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight"  />
            </div>
          </div>
          <div className="form-group">
            <label>MOBILE/TEL. NO:</label>
            <input type="text" value={mobileTel} onChange={(e) => setMobileTel(e.target.value)} placeholder="MobileTel"  />
          </div>
          <div className="form-group">
            <label>EMAIL ADDRESS:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"  />
          </div>
          <div className="form-group">
            <label>EDUCATIONAL ATTAINMENT:</label>
            <input type="text" value={educationalAttainment} onChange={(e) => setEducationalAttainment(e.target.value)} placeholder="EducationalAttainment"  />
          </div>
          <div className="form-group">
            <label>NATURE OF WORK:</label>
            <input type="text" value={natureOfWork} onChange={(e) => setNatureOfWork(e.target.value)} placeholder="NatureOfWork"  />
          </div>
          <div className="form-group">
            <label>PLACE OF WORK:</label>
            <input type="text" value={placeOfWork} onChange={(e) => setPlaceOfWork(e.target.value)} placeholder="PlaceOfWork"  />
          </div>
          <div className="form-group">
            <label>COMPANY NAME:</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="CompanyName"  />
          </div>
          <h2>In Case of Emergency</h2>
          <div className="form-group">
            <label>NAME:</label>
            <input type="text" value={name2} onChange={(e) => setName2(e.target.value)} placeholder="Name2"  />
          </div>
          <div className="form-group">
            <label>MOBILE/TEL. NO:</label>
            <input type="text" value={mobileTel2} onChange={(e) => setMobileTel2(e.target.value)} placeholder="MobileTel2"  />
          </div>
          <div className="form-group">
            <label>ADDRESS:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"  />
          </div>
          {!isFormValid && <p style={{ color: 'red' }}>Please fill in all required fields.</p>}
          <button type="button" onClick={goToNextStep}>Next</button>
        </div>
)}{step === 2 && (
  <div>
    {/* Content for Step 2 */}
    <button type="button" onClick={goToPreviousStep}>Back</button>
    <button type="button" onClick={goToNextStep}>Next</button>
      <label>Upload 1x1 Picture:</label>
      <input type="file" onChange={(e) => handleFileChange(e, 'document1')}  />
      <label>Upload Cedula</label>
      <input type="file" onChange={(e) => handleFileChange(e, 'document2')}  />
      <label>Upload Referral Letter</label>
      <input type="file" onChange={(e) => handleFileChange(e, 'document3')}  />
      <label>Upload FTJS Cert.</label>
      <input type="file" onChange={(e) => handleFileChange(e, 'document4')}  />

  </div>
)}
{step === 3 && (
  <div>
    {/* Content for Step 3 */}
    <button type="button" onClick={goToPreviousStep}>Back</button>

    <div className="form-group payment-group">
              <label>Mode of Payment:</label>
              <label>
              <input 
                type="radio" 
                name="payment" // Grouping name for radio buttons
                value="Online" // Set the value directly here
                checked={transaction === "Online"} // Set checked based on state
                onChange={() => setTransaction("Online")} 
                required
              /> Online Payment
               </label>
              <label>
              <input 
                  type="radio" 
                  name="payment" // Grouping name for radio buttons
                  value="Offline" // Set the value directly here
                  checked={transaction === "Offline"} // Set checked based on state
                  onChange={() => setTransaction("Offline")} 
               />Onsite/Offline Payment
                 </label>
                </div>
    <button type="submit" className="submitbuttonworkpermit">Submit</button>


    
  </div>
)}
</form>
      </div>
    </section>
  );
};

export default WorkPermit;
