import React, { useState } from 'react';

const SuperadminAccountAdd = () => {
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Build the payload to be sent to the server
    const userData = {
      firstName,
      middleInitial,
      lastName,
      contactNumber,
      email,
      username,
      password,
      role,
      // firstName: "John",
      // middleInitial: "D",
      // lastName: "Doe",
      // contactNumber: "1234567890",
      // email: "john.doe@example.com",
      // username: "johndoe",
      // password: "password123",
      // role: "admin"
    };


    try {
      const response = await fetch('http://localhost:3000/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('User created successfully!');
        setError(null);
        // Clear the form after successful submission
        setFirstName('');
        setMiddleInitial('');
        setLastName('');
        setContactNumber('');
        setEmail('');
        setUsername('');
        setPassword('');
        setRole('');
      } else {
        setError(data.message || 'Failed to create user');
        setSuccess(null);
      }
    } catch (error) {
      setError('An error occurred while creating the user');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <label>
          Middle Initial:
          <input type="text" value={middleInitial} onChange={(e) => setMiddleInitial(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <label>
          Contact Number:
          <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        {/* optional username */}
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="data controller">Data Controller</option>
          </select>
        </label>
        <button type="submit">Create User</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default SuperadminAccountAdd;
