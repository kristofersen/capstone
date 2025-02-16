import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/SuperAdminStyles.css';

const SuperadminAccountAdd = () => {
  const navigate = useNavigate(); // Define navigate

const [formData, setFormData] = useState({
  firstName: '',
  middleName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  password: '',
  address: '',
  userrole: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/superadmin/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add user');
      }
  
      await response.json();
      navigate('/superadmin/accounts');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/check-auth-superadmin', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (response.status === 401) {
          console.error('Access denied: No token');
          navigate('/superadmin/login');
          return;
        }
  
        if (response.status === 204) {
          console.log('Access Success');
          return;
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
  
    checkAuth();
  }, [navigate]);
  

  return (
    <div>
      <h1 className='SAaccountaddH1'>Create New User</h1>
      <form className="SaAccountAddForm" onSubmit={handleSubmit}>
        <div className="flex-row">
          <label>
            First Name:
            <input type="text" value={formData.firstName} onChange={handleChange} required />
          </label>
          <label>
            Middle Initial:
            <input type="text" value={formData.middleName} onChange={handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" value={formData.lastName} onChange={handleChange} required />
          </label>
        </div>

        <div className="flex-row">
          <label>
            Contact Number:
            <input type="text" value={formData.contactNumber} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" value={formData.email} onChange={handleChange} required />
          </label>
        </div>

        <div className="flex-row">
          <label>
            Address:
            <input type="text" value={formData.address} onChange={handleChange} required />
          </label>
          <label>
            Password:
            <input type="password" value={formData.password} onChange={handleChange} required />
          </label>
        </div>

        <label>
          Role:
          <select value={formData.userrole} onChange={handleChange} required>
            <option value="" disabled>Select a role</option>
            <option value="CL">Client</option>
            <option value="ADM">Admin</option>
            <option value="DC">Data Controller</option>
          </select>
        </label>

        <div className="button-group">
          <button type="button" onClick={handleBack} className="SAbackButton">Back</button>
          <button type="submit" className="SAcreateAccountButton" >Create User</button>
        </div>
      </form>
    </div>
  );
};

export default SuperadminAccountAdd;
