import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ClientStyles.css';
import ClientNavbar from '../components/NavigationBars/clientnavbar';
import axios from 'axios';
import { WorkPermits} from "../components/Interface(Front-end)/Types";

const WorkPermit: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isFormValid, setIsFormValid] = useState(true); 
  const [workPermits, setWorkPermits] = useState<WorkPermits[]>([]);
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
  const [workpermitclassification, setWorkPermitClassification] =useState ('');
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
  const [latestWorkPermit, setLatestWorkPermit] = useState<WorkPermits | null>(null);
  
  const fetchWorkPermits = async () => {
      try {
        const response = await fetch('http://localhost:3000/client/fetchuserworkpermits', {
          method: 'GET',
          credentials: 'include', 
          headers: {
            'Content-Type': 'application/json',
          },

        });
        
        const WorkPermitData = await response.json();
        setWorkPermits(WorkPermitData);

 // Sort WorkPermitData by createdAt in descending order
 WorkPermitData.sort((a: WorkPermits, b: WorkPermits) => {
  const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0; // Use 0 if createdAt is undefined
  const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0; // Use 0 if createdAt is undefined
  return dateB - dateA; // Sort in descending order
});

// Set the latest work permit if there are any permits
if (WorkPermitData.length > 0) {
  setLatestWorkPermit(WorkPermitData[0]);
}
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
  useEffect(() => {

 
  console.log('Repeating');
    fetchWorkPermits();
  }, [navigate]); 

  

  useEffect(() => {
    if (latestWorkPermit) {
      setLastName(latestWorkPermit.formData.personalInformation.lastName ?? '');
      setFirstName(latestWorkPermit.formData.personalInformation.firstName ?? '');
      setMiddleInitial(latestWorkPermit.formData.personalInformation.middleInitial ?? '');
      setPermanentAddress(latestWorkPermit.formData.personalInformation.permanentAddress ??'');
      setTemporaryAddress(latestWorkPermit.formData.personalInformation.temporaryAddress ?? '');
      const dob = latestWorkPermit.formData.personalInformation.dateOfBirth;
    if (dob) {
      const formattedDOB = new Date(dob).toISOString().split('T')[0]; // Converts to 'YYYY-MM-DD'
      setDateOfBirth(formattedDOB);
    } else {
      setDateOfBirth(''); // Fallback to empty string if undefined
    }
      setDateOfBirth(dob ?? ''); // Ensure it's a string or an empty string
      setAge(latestWorkPermit.formData.personalInformation.age ?? '');
      setPlaceOfBirth(latestWorkPermit.formData.personalInformation.placeOfBirth ?? '');
      setCitizenship(latestWorkPermit.formData.personalInformation.citizenship ?? '');
      setCivilStatus(latestWorkPermit.formData.personalInformation.civilStatus ?? '');
      setGender(latestWorkPermit.formData.personalInformation.gender ?? '');
      setMobileTel(latestWorkPermit.formData.personalInformation.mobileTel ?? '');
      setEmail(latestWorkPermit.formData.personalInformation.email ?? '');
      setEducationalAttainment(latestWorkPermit.formData.personalInformation.educationalAttainment ?? '');
      setNatureOfWork(latestWorkPermit.formData.personalInformation.natureOfWork ?? '');
      setPlaceOfWork(latestWorkPermit.formData.personalInformation.placeOfWork ?? '');
      setCompanyName(latestWorkPermit.formData.personalInformation.companyName ?? '');
      setName2(latestWorkPermit.formData.emergencyContact.name2 ?? '');
      setMobileTel2(latestWorkPermit.formData.emergencyContact.mobileTel2 ?? '');
      setAddress(latestWorkPermit.formData.emergencyContact.address ?? '');
    }
  }, [latestWorkPermit]);



      const goToNextStep = () => {
          // Perform validation based on the current step

       if (step === 1) {
     // Check if required fields are filled for step 1
    if (!firstName || !lastName || !workpermitclassification) {
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
    
      useEffect(() => {
        if (workPermits.length === 0) {
          setWorkPermitClassification("New");
        } else {
          setWorkPermitClassification("Renew");
        }
      }, [workPermits]);
      
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
    formData.append('workpermitclassification', workpermitclassification);

    if (files.document1) formData.append('document1', files.document1);
    if (files.document2) formData.append('document2', files.document2);
    if (files.document3) formData.append('document3', files.document3);
    if (files.document4) formData.append('document4', files.document4);

    logFormData(formData);

  
    try {
      const response = await axios.post('http://localhost:3000/client/workpermitapplication', formData, {
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/check-auth-client', {
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
  }, [navigate]);


  return (
    <section className="dashboard-container">
          {/* Navbar */}
          <ClientNavbar/>

      <div className="content">
        <header>
          <h1>Work Permit Application</h1>
        </header>
        <form onSubmit={handleSubmit}>
{step === 1 &&(
        <div className="workpermit-form">
          <h2>Personal Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>LAST NAME:</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
            </div>
            <div className="form-group">
              <label>FIRST NAME:</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}  required />
            </div>
            <div className="form-group">
              <label>MIDDLE INITIAL:</label>
              <input type="text" value={middleInitial} onChange={(e) => setMiddleInitial(e.target.value)}   />
            </div>
          </div>
          <div className="form-group">
            <label>PERMANENT ADDRESS:</label>
            <input type="text" value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)}  />
          </div>
          <div className="form-group">
          <label className="checkbox-label">
            <input 
            type="checkbox" 
            checked={currentlyResiding} 
            onChange={() => setCurrentlyResiding(!currentlyResiding)} 
          />
            Check if Currently Residing in Dasmarinas
          </label>
          </div>
          <div className="form-group">
            <label>TEMPORARY ADDRESS (IF ANY):</label>
            <input type="text" value={temporaryAddress} onChange={(e) => setTemporaryAddress(e.target.value)}   />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>DATE OF BIRTH:</label>
              <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}  />
            </div>
            <div className="form-group">
              <label>AGE:</label>
              <input type="number" value={age}  onChange={(e) => setAge(Number(e.target.value))}  />
            </div>
            <div className="form-group">
              <label>PLACE OF BIRTH:</label>
              <input type="text" value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)}  />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>CITIZENSHIP:</label>
              <input type="text" value={citizenship} onChange={(e) => setCitizenship(e.target.value)}  />
            </div>
            <div className="form-group">
              <label>CIVIL STATUS:</label>
              <input type="text" value={civilStatus} onChange={(e) => setCivilStatus(e.target.value)}  />
              </div>
              <div className="form-group">
              <label htmlFor="gender">GENDER:</label>
                <select 
                  id="gender" 
                  name="gender" 
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)} 
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
</div>

                </div>
              <div className="form-row">
              <div className="form-group">
              <label>HEIGHT:</label>
              <input type="text" value={height} onChange={(e) => setHeight(e.target.value)}  />
              </div>
              <div className="form-group">
              <label>WEIGHT:</label>
              <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
          <div className="form-group">
            <label>MOBILE/TEL. NO:</label>
            <input type="text" value={mobileTel} onChange={(e) => setMobileTel(e.target.value)}  />
            </div>
            <div className="form-group">
            <label>EMAIL ADDRESS:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}   />
            </div>
            <div className="form-group">
            <label>EDUCATIONAL ATTAINMENT:</label>
            <input type="text" value={educationalAttainment} onChange={(e) => setEducationalAttainment(e.target.value)}  />
          </div>
          </div>
          <div className="form-row">
          <div className="form-group">
            <label>NATURE OF WORK:</label>
            <input type="text" value={natureOfWork} onChange={(e) => setNatureOfWork(e.target.value)}  />
          </div>
          <div className="form-group">
            <label>PLACE OF WORK:</label>
            <input type="text" value={placeOfWork} onChange={(e) => setPlaceOfWork(e.target.value)}  />
          </div>
          <div className="form-group">
            <label>COMPANY NAME:</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          </div>

        <div className="form-group gender-group">
          <label htmlFor="classification">Work Permit Classification:</label>
          <input
  type="text"
  id="classification"
  name="classification"
  value={
    workPermits.length === 0
      ? "First Time Job Seeker / New Work Permit"
      : "Work Permit Renewal"
  }
  disabled
/>
        </div>
          <h2>In Case of Emergency</h2>
          <div className="form-row">
          <div className="form-group">
            <label>NAME:</label>
            <input type="text" value={name2} onChange={(e) => setName2(e.target.value)}  />
          </div>
          <div className="form-group">
            <label>MOBILE/TEL. NO:</label>
            <input type="text" value={mobileTel2} onChange={(e) => setMobileTel2(e.target.value)} />
          </div>
          </div>
          <div className="form-group">
            <label>ADDRESS:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}   />
          </div>
          {!isFormValid && <p style={{ color: 'red' }}>Please fill in all required fields.</p>}
          <button type="button" className="nextbutton"onClick={goToNextStep}>Next</button>
        </div>
)}{step === 2 && (
<div className="upload-section"> 
  <div className="upload-item">
    <label>Upload 1x1 Picture:</label>
    <input type="file" onChange={(e) => handleFileChange(e, 'document1')} />
  </div>
  
  <div className="upload-item">
    <label>Upload Cedula:</label>
    <input type="file" onChange={(e) => handleFileChange(e, 'document2')} />
  </div>
  {!currentlyResiding &&(
      <div className="upload-item">
      <label>Upload Referral Letter:</label>
      <input type="file" onChange={(e) => handleFileChange(e, 'document3')} disabled={currentlyResiding} />
    </div>
  )}
  {
  workPermits.length === 0 ? (
    <div className="upload-item">
      <label>Upload FTJS (First Time Job Seeker) Certificate:</label>
      <input type="file" onChange={(e) => handleFileChange(e, 'document4')} disabled={workPermits.length === 0} />
    </div>
  ) : null // Optionally, render something else when the condition is not met
}
  <div className="buttoncontainer">
  <button type="button" onClick={goToPreviousStep} className="btn btn-danger">Back</button>
  <button type="submit" className="btn btn-success">Submit</button>
  </div>
</div>

)}


</form>
      </div>
    </section>
  );
};

export default WorkPermit;
