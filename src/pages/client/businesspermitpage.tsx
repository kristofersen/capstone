import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/businesspermitpage.css';

const BusinessPermit: React.FC = () => {
  const navigate = useNavigate();
  const [isRepresentative, setIsRepresentative] = useState(false);
  const [formData, setFormData] = useState({
    owner: {
      lastName: '',
      firstName: '',
      middleInitial: '',
      civilStatus: '',
      gender: '',
      citizenship: '',
      tinNumber: '',
      isRepresentative: false,
      representative: {
        fullName: '',
        designation: '',
        mobileNumber: '',
      }
    },
    businessReference: {
      businessName: '',
      businessScale: '',
      paymentMethod: '',
      houseBuildingNo: '',
      buildingStreetName: '',
      subdivisionCompoundName: '',
      region: '',
      province: '',
      cityMunicipality: '',
      barangay: '',
      businessStreet: '',
      zone: '',
      zip: '',
      contactNumber: '',
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('representative.')) {
      setFormData((prevData) => ({
        ...prevData,
        owner: {
          ...prevData.owner,
          representative: {
            ...prevData.owner.representative,
            [name.split('.')[1]]: value,
          },
        }
      }));
    } else if (Object.keys(formData.owner).includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        owner: {
          ...prevData.owner,
          [name]: value
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        businessReference: {
          ...prevData.businessReference,
          [name]: value
        }
      }));
    }
  };

  const toggleRepresentativeFields = () => {
    setIsRepresentative(!isRepresentative);
    setFormData((prevData) => ({
      ...prevData,
      owner: {
        ...prevData.owner,
        isRepresentative: !isRepresentative,
      }
    }));
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Example: clear session storage
    alert('You have been logged out.');
    navigate('/'); // Redirect to home or login page
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/businesspermitpage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Business Permit Application submitted successfully!');
        // Reset the form or redirect as needed
        setFormData({
          owner: {
            lastName: '',
            firstName: '',
            middleInitial: '',
            civilStatus: '',
            gender: '',
            citizenship: '',
            tinNumber: '',
            isRepresentative: false,
            representative: {
              fullName: '',
              designation: '',
              mobileNumber: '',
            }
          },
          businessReference: {
            businessName: '',
            businessScale: '',
            paymentMethod: '',
            houseBuildingNo: '',
            buildingStreetName: '',
            subdivisionCompoundName: '',
            region: '',
            province: '',
            cityMunicipality: '',
            barangay: '',
            businessStreet: '',
            zone: '',
            zip: '',
            contactNumber: '',
          }
        });
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the application.');
    }
  };

  return (
    <section className="dashboard-container">
      <div className="sidebar-container">
        <div className="sidebar">
          <div className="sidebar-logo">
            <img src="/obpwlslogo.svg" alt="Logo" className="logo-image" />
          </div>
          <ul className="sidebar-list">
            <li><Link to="/dashboard" className="sidebar-link">Dashboard</Link></li>
            <li><Link to="/workpermitpage" className="sidebar-link">Apply for Work Permit</Link></li>
            <li><Link to="/businesspermitpage" className="sidebar-linkactive">Apply for Business Permit</Link></li>
            <li><Link to="/viewapplication" className="sidebar-link">View Applications</Link></li>
            <li><Link to="/" onClick={handleLogout} className="sidebar-link">Log Out</Link></li>
          </ul>
        </div>
      </div>

      <div className="content">
        <header>
          <h1>Business Permit Application</h1>
          <nav>
            <ul>
              <li><Link to="/account" className="button">Account</Link></li>
              <li><Link to="/" onClick={handleLogout} className="button">Logout</Link></li>
            </ul>
          </nav>
        </header>

        {/* Owner Information Form */}
        <form className="businesspermit-form" onSubmit={handleFormSubmit}>
          <h2>Owner's Personal Information</h2>
          <div className="form-group">
            <label>
              <input type="checkbox" name="checkifcorporation" />
              Check if Corporation
            </label>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>LAST NAME:</label>
              <input type="text" name="lastName" value={formData.owner.lastName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>FIRST NAME:</label>
              <input type="text" name="firstName" value={formData.owner.firstName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>MIDDLE INITIAL:</label>
              <input type="text" name="middleInitial" value={formData.owner.middleInitial} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-group">
            <label>CIVIL STATUS:</label>
            <input type="text" name="civilStatus" value={formData.owner.civilStatus} onChange={handleInputChange} />
          </div>
          <div className="form-group gender-group">
            <label>GENDER:</label>
            <label>
              <input type="radio" name="gender" value="male" checked={formData.owner.gender === 'male'} onChange={handleInputChange} />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" checked={formData.owner.gender === 'female'} onChange={handleInputChange} />
              Female
            </label>
          </div>
          <div className="form-group">
            <label>CITIZENSHIP:</label>
            <input type="text" name="citizenship" value={formData.owner.citizenship} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>TIN NUMBER:</label>
              <input type="text" name="tinNumber" value={formData.owner.tinNumber} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" name="checkIfRepresentative" id="checkIfRepresentative" onChange={toggleRepresentativeFields} />
              Check if Thru Representative
            </label>
          </div>
          <div className="form-group">
            <label>Representative Full Name:</label>
            <input type="text" name="representative.fullName" value={formData.owner.representative.fullName} onChange={handleInputChange} disabled={!isRepresentative} />
          </div>
          <div className="form-group">
            <label>Designation/Position:</label>
            <input type="text" name="representative.designation" value={formData.owner.representative.designation} onChange={handleInputChange} disabled={!isRepresentative} />
          </div>
          <div className="form-group">
            <label>Representative Mobile Number:</label>
            <input type="text" name="representative.mobileNumber" value={formData.owner.representative.mobileNumber} onChange={handleInputChange} disabled={!isRepresentative} />
          </div>

          {/* Business Reference Form */}
          <h2>Business Reference Form</h2>
          <div className="form-group">
            <label>Business Name:</label>
            <input type="text" name="businessName" value={formData.businessReference.businessName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Business Scale:</label>
            <input type="text" name="businessScale" value={formData.businessReference.businessScale} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Payment Method:</label>
            <input type="text" name="paymentMethod" value={formData.businessReference.paymentMethod} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>House/Bldg No./Blk and Lot:</label>
            <input type="text" name="houseBuildingNo" value={formData.businessReference.houseBuildingNo} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Building Name/Street Name:</label>
            <input type="text" name="buildingStreetName" value={formData.businessReference.buildingStreetName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Subdivision/Compound Name:</label>
            <input type="text" name="subdivisionCompoundName" value={formData.businessReference.subdivisionCompoundName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Region:</label>
            <input type="text" name="region" value={formData.businessReference.region} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Province:</label>
            <input type="text" name="province" value={formData.businessReference.province} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>City/Municipality:</label>
            <input type="text" name="cityMunicipality" value={formData.businessReference.cityMunicipality} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Barangay:</label>
            <input type="text" name="barangay" value={formData.businessReference.barangay} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Business Street:</label>
            <input type="text" name="businessStreet" value={formData.businessReference.businessStreet} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Zone:</label>
            <input type="text" name="zone" value={formData.businessReference.zone} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Zip:</label>
            <input type="text" name="zip" value={formData.businessReference.zip} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input type="text" name="contactNumber" value={formData.businessReference.contactNumber} onChange={handleInputChange} />
          </div>
          <button type="submit">Submit Application</button>
        </form>
      </div>
    </section>
  );
};

export default BusinessPermit;
