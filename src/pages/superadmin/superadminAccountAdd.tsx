import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

interface AccountData {
  lastName: string;
  firstName: string;
  middleInitial: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  accountType: {
    admin: boolean;
    dataController: boolean;
 };
}

const SuperadminAddUser: React.FC = () => {
const [formData, setFormData] = useState<AccountData>({
    lastName: '',
    firstName: '',
    middleInitial: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    accountType: {
    admin: false,
    dataController: false,
    },
});

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
    ...formData,
    accountType: {
        admin: name === 'admin' ? checked : false,
        dataController: name === 'dataController' ? checked : false,
    },
    });
};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:3000/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create account: ${errorText}`);
      }

      setSuccess('Account created successfully!');
      setFormData({
        lastName: '',
        firstName: '',
        middleInitial: '',
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        accountType: {
          admin: false,
          dataController: false,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="create-account-page">
      <header className="page-header">
        <h1>Create Account</h1>
        <Link to="/superadmin/dashboard">Home / Create Account</Link>
      </header>

      <section className="account-creation-section">
        <h2>Account Creation</h2>
        <form onSubmit={handleSubmit} className="account-form">
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              required
            />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="middleInitial"
              value={formData.middleInitial}
              onChange={handleInputChange}
              placeholder="Middle Initial"
              maxLength={1}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              required
            />
          </div>

          <div className="form-group account-type">
            <label>Account Type</label>
            <label>
              <input
                type="checkbox"
                name="admin"
                checked={formData.accountType.admin}
                onChange={handleCheckboxChange}
              />
              Admin
            </label>
            <label>
              <input
                type="checkbox"
                name="dataController"
                checked={formData.accountType.dataController}
                onChange={handleCheckboxChange}
              />
              Data Controller
            </label>
          </div>

          <button type="submit" className="create-account-btn">
            Create Account
          </button>
        </form>

        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
      </section>
    </div>
  );
};

export default SuperadminAddUser;