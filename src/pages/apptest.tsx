import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import MapLocation from './components/MapLocation'
import Select from 'react-select';

// Define the type for the options in the dropdown
interface BusinessNatureOption {
  value: string;
  label: string;
}

const AppTest: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [files, setFiles] = useState<{
    document1: File | null;
    document2: File | null;
    document3: File | null;
  }>({
    document1: null,
    document2: null,
    document3: null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, doc: 'document1' | 'document2' | 'document3') => {
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
  { value: 'mfct', label: 'Manufacturing' },
  { value: 'rtl', label: 'Retail' },
  { value: 'serv', label: 'Service' },
  { value: 'techn', label: 'Technology' },
];

// Map for business nature for display purposes
const businessNatureMap = {
  mfct: 'Manufacturing',
  rtl: 'Retail',
  serv: 'Service',
  techn: 'Technology',
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
  setBusinesses((prevState) => [...prevState, newBusiness]);
  setNewBusiness({
    businessNature: '',
    businessType: '',
    capitalInvestment: '',
  });
};

// Handle removing a business from the table
const handleRemoveBusiness = (index: number) => {
  setBusinesses((prevState) => prevState.filter((_, i) => i !== index));
};




const logFormData = (formData: FormData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };

  const [lat, setLat] = useState<number>(14.326248);
  const [lng, setLng] = useState<number>(120.935973);

  const handleLocationChange = (latitude: number, longitude: number) => {
    setLat(latitude);
    setLng(longitude);
  };
   
  


 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('age', String(age));
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('isActive', String(isActive));

    if (files.document1) formData.append('document1', files.document1);
    if (files.document2) formData.append('document2', files.document2);
    if (files.document3) formData.append('document3', files.document3);

    formData.append('newBusiness', JSON.stringify(newBusiness));
    formData.append('businesses', JSON.stringify(businesses));

    logFormData(formData);

    try {
      const response = await axios.post('http://localhost:3000/apptesting', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


// Pdf Creation for reciepts and permits @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const generateReceiptPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text("Receipt", 105, 20, { align: "center" });

    // Add user information
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Age: ${age}`, 20, 60);
    doc.text(`Address: ${address}`, 20, 70);
    doc.text(`Phone Number: ${phoneNumber}`, 20, 80);
    doc.text(`Is Active: ${isActive ? 'Yes' : 'No'}`, 20, 90);

    // Add footer
    doc.text("Thank you for submitting your information!", 20, 120);

    // Save the PDF
    doc.save(`receipt_${name}.pdf`);
  };



  







  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    // Call the backend API route (assuming it's running on http://localhost:3000)
    fetch('http://localhost:3000/apptest/test')
      .then((response) => response.text())
      .then((data) => {
        setData(data);  // Store the data in state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);










  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
      />
        <input
       type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            required
        />
        <label>
            Is Active:
            <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            />
        </label>
      <input type="file" onChange={(e) => handleFileChange(e, 'document1')} required />
      <input type="file" onChange={(e) => handleFileChange(e, 'document2')} required />
      <input type="file" onChange={(e) => handleFileChange(e, 'document3')} required />
      <button type="submit">Submit</button>
      



      <div style={{ padding: '20px' }}>
      <h1>Apply for New Business</h1>
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
    </div>


    <div>
      <h1>Add Businesses</h1>

      <div>
       {/* Dropdown for Business Nature */}
       <Select
        name="businessNature"
        value={businessNatureOptions.find(
          (option) => option.value === newBusiness.businessNature
        )}
        onChange={handleDropdownChange}
        options={businessNatureOptions}
        placeholder="Select Business Nature"
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
      <button onClick={handleAddBusiness}>Add Business</button>

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
                <button onClick={() => handleRemoveBusiness(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

    </div>

      <div>
      <h1>Receipt Page</h1>
      <button onClick={generateReceiptPDF}>
        Download Receipt
      </button>
    </div>

    <div>
      <h1>API Response:</h1>
      <p>{data}</p>
    </div>
    <button onClick={() => console.log(newBusiness)}>Console</button>
    

    </form>
    
  );
};

export default AppTest;