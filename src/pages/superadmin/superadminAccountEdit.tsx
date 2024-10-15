import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SuperadminAccountEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    email: '',
    userId: '',
    userrole: '', // Initialize as an empty string
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    contactNumber: '',
    address: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/accounts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching user data');
        }
        const userData = await response.json();
        setFormData({
          email: userData.email,
          userId: userData.userId,
          userrole: userData.userrole, // Set the userrole from fetched data
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
      const response = await fetch(`http://localhost:3000/accounts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error updating user data');
      }
      setSuccessMessage('User data updated successfully');
      // Optionally, navigate back to the accounts list or another page
      // navigate('/accounts');
    } catch (error) {
      setError('Error updating user data');
      console.error('Error updating user data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="mail"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        placeholder="User ID"
        required
      />
      <select
        name="userrole"
        value={formData.userrole}
        onChange={handleChange}
        required
      >
        <option value="admin">Admin</option>
        <option value="data controller">Data Controller</option>
      </select>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="middleName"
        value={formData.middleName}
        onChange={handleChange}
        placeholder="Middle Name"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        placeholder="Contact Number"
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <button type="submit">Save</button>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};

export default SuperadminAccountEdit;