import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Utility/workpermitpage.css';

const WorkPermit: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    personalInformation: {
      lastName: '',
      firstName: '',
      middleInitial: '',
      permanentAddress: '',
      currentlyResiding: false,
      temporaryAddress: '',
      dateOfBirth: '',
      age: '',
      placeOfBirth: '',
      citizenship: '',
      civilStatus: '',
      gender: '',
      height: '',
      weight: '',
      mobileTel: '',
      email: '',
      educationalAttainment: '',
      natureOfWork: '',
      placeOfWork: '',
      companyName: '',
    },
    emergencyContact: {
      name: '',
      mobileTel2: '',
      address: ''
    }
    
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
  
    // Handling Emergency Contact fields
    if (name === 'name' || name === 'mobileTel2' || name === 'address') {
      setFormData(prevState => ({
        ...prevState,
        emergencyContact: {
          ...prevState.emergencyContact,
          [name]: value
        }
      }));
    } else if (type === 'checkbox' && name === 'currentlyResiding') {
      setFormData(prevState => ({
        ...prevState,
        personalInformation: {
          ...prevState.personalInformation,
          currentlyResiding: checked
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        personalInformation: {
          ...prevState.personalInformation,
          [name]: value
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/workpermitpage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Work Permit Application submitted successfully!');
        navigate('/dashboard'); // Redirect to the dashboard or any other page
      } else {
        alert('Failed to submit the application.');
      }
    } catch (error) {
      console.error('Error submitting work permit application:', error);
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
            <li><a href="/view-applications" className="sidebar-link">View Applications</a></li>
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

        <form className="workpermit-form" onSubmit={handleSubmit}>
          <h2>Personal Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>LAST NAME:</label>
              <input type="text" name="lastName" value={formData.personalInformation.lastName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>FIRST NAME:</label>
              <input type="text" name="firstName" value={formData.personalInformation.firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>MIDDLE INITIAL:</label>
              <input type="text" name="middleInitial" value={formData.personalInformation.middleInitial} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>PERMANENT ADDRESS:</label>
            <input type="text" name="permanentAddress" value={formData.personalInformation.permanentAddress} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" name="currentlyResiding" checked={formData.personalInformation.currentlyResiding} onChange={handleChange} />
              Check if Currently Residing in Dasmarinas
            </label>
          </div>
          <div className="form-group">
            <label>TEMPORARY ADDRESS (IF ANY):</label>
            <input type="text" name="temporaryAddress" value={formData.personalInformation.temporaryAddress} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>DATE OF BIRTH:</label>
              <input type="date" name="dateOfBirth" value={formData.personalInformation.dateOfBirth} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>AGE:</label>
              <input type="number" name="age" value={formData.personalInformation.age} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>PLACE OF BIRTH:</label>
              <input type="text" name="placeOfBirth" value={formData.personalInformation.placeOfBirth} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>CITIZENSHIP:</label>
              <input type="text" name="citizenship" value={formData.personalInformation.citizenship} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>CIVIL STATUS:</label>
              <input type="text" name="civilStatus" value={formData.personalInformation.civilStatus} onChange={handleChange} />
            </div>
            <div className="form-group gender-group">
              <label>GENDER:</label>
              <label>
                <input type="radio" name="gender" value="male" checked={formData.personalInformation.gender === 'male'} onChange={handleChange} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" checked={formData.personalInformation.gender === 'female'} onChange={handleChange} />
                Female
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>HEIGHT:</label>
              <input type="text" name="height" value={formData.personalInformation.height} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>WEIGHT:</label>
              <input type="text" name="weight" value={formData.personalInformation.weight} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>MOBILE/TEL. NO:</label>
            <input type="text" name="mobileTel" value={formData.personalInformation.mobileTel} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>EMAIL ADDRESS:</label>
            <input type="email" name="email" value={formData.personalInformation.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>EDUCATIONAL ATTAINMENT:</label>
            <input type="text" name="educationalAttainment" value={formData.personalInformation.educationalAttainment} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>NATURE OF WORK:</label>
            <input type="text" name="natureOfWork" value={formData.personalInformation.natureOfWork} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>PLACE OF WORK:</label>
            <input type="text" name="placeOfWork" value={formData.personalInformation.placeOfWork} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>COMPANY NAME:</label>
            <input type="text" name="companyName" value={formData.personalInformation.companyName} onChange={handleChange} />
          </div>
          <h2>In Case of Emergency</h2>
          <div className="form-group">
            <label>NAME:</label>
            <input type="text" name="name" value={formData.emergencyContact.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>MOBILE/TEL. NO:</label>
            <input type="text" name="mobileTel2" value={formData.emergencyContact.mobileTel2} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>ADDRESS:</label>
            <input type="text" name="address" value={formData.emergencyContact.address} onChange={handleChange} />
          </div>
          <button type="submit" className="button">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default WorkPermit;
