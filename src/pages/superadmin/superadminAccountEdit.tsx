import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';


const SuperadminAccountEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeID: '',
    username: '',
    mobileNo: '',
    email: '',
    accountType: '',
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
          employeeName: userData.employeeName,
          employeeID: userData.employeeID,
          username: userData.username,
          mobileNo: userData.mobileNo,
          email: userData.email,
          accountType: userData.accountType,
        });
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        throw new Error('Error updating user');
      }
      setSuccessMessage('User updated successfully');
      setTimeout(() => navigate('/superadmin/accounts'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error updating user');
    }
  };

  return (
    <div>
      <div className="create-account-page">
        <header className="page-header">
        <h1>Edit Account</h1>
          <Link to="/superadmin/dashboard">Home </Link>
        </header>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Employee Name</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeID"
              value={formData.employeeID}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Account Type</label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              required
            >
              <option value="">Select Account Type</option>
              <option value="admin">Admin</option>
              <option value="dataController">Data Controller</option>
            </select>
          </div>
          <button type="submit">Update Account</button>
        </form>
      </div>
    </div>
  );
};

export default SuperadminAccountEdit;