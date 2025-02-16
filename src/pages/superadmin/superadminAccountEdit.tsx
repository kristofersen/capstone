import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import '../Styles/SuperAdminStyles.css';

const SuperadminAccountEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    email: '',
    userId: '',
    userrole: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    contactNumber: '',
    address: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/superadmin/getuser/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching user data');
        }
        const userData = await response.json();
        setFormData({
          email: userData.email,
          userId: userData.userId,
          userrole: userData.userrole,
          password: userData.password,
          firstName: userData.firstName,
          middleName: userData.middleName,
          lastName: userData.lastName,
          contactNumber: userData.contactNumber,
          address: userData.address,
        });
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hashedPassword = bcrypt.hashSync(formData.password, 10);
      const updatedFormData = { ...formData, password: hashedPassword };

      const response = await fetch(`http://localhost:3000/superadmin/updateuser/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedFormData),
      });
      if (!response.ok) {
        throw new Error('Error updating user data');
      }
      setSuccessMessage('User data updated successfully');
      navigate('/superadmin/accounts');
    } catch (error) {
      setError('Error updating user data');
      console.error('Error updating user data:', error);
    }
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

  const handleBack = () => {
    navigate('/superadmin/dashboard');
  }

  return (
      <><h1 className="SAaccountaddH1">Edit User</h1><form className="SaAccountAddForm" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required />
      </div>
      <div className="form-group">
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          name="userId"
          id="userId"
          value={formData.userId}
          onChange={handleChange}
          placeholder="User ID"
          required />
      </div>
      <div className="form-group">
        <label htmlFor="userrole">Role</label>
        <select
          name="userrole"
          id="userrole"
          value={formData.userrole}
          onChange={handleChange}
          required
        >
          <option value="Admin">Admin</option>
          <option value="Data Controller">Data Controller</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required />
      </div>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name" />
      </div>
      <div className="form-group">
        <label htmlFor="middleName">Middle Name</label>
        <input
          type="text"
          name="middleName"
          id="middleName"
          value={formData.middleName}
          onChange={handleChange}
          placeholder="Middle Name" />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name" />
      </div>
      <div className="form-group">
        <label htmlFor="contactNumber">Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          id="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number" />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address" />
      </div>
      <div className="button-group">
        <button type="button" onClick={handleBack} className="SAbackButton">Back</button>
        <button type="submit" className="SAcreateAccountButton">Save</button>
      </div>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form></>
  );
};

export default SuperadminAccountEdit;