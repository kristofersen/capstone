import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup: React.FC = () => {

const [firstName, setFirstName] = useState('');
const [middleName, setMiddleName] = useState('');
const [lastName, setLastName] = useState('');
const [contactNumber, setContactNumber] = useState('');
const [address, setAddress] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState<string | null>(null);
const navigate = useNavigate();

const handleSubmit = async (event: React.FormEvent) => {
event.preventDefault();
// Validate form
if (!firstName || !middleName || !lastName || !email || !password || !contactNumber || !address) {
setError('All required fields must be filled out.');
return;
}
try {
const response = await fetch('http://localhost:5000/signup', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
firstName,
middleName,
lastName,
contactNumber,
address,
email,
password,
}),
});
const data = await response.json();
if (response.ok) {
setSuccess(data.message);
setError(null);
navigate('/login'); // Redirect to login page
} else {
setError(data.error);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
setError('Error signing up please try again');
}
};

const handleCancel = () => {
navigate('/'); // Redirect to home page
};

return (
<>
<body className="body">
<div className="signup-container">
<h2>Sign Up</h2>
{error && <p className="error">{error}</p>}
{success && <p className="success">{success}</p>}
<form onSubmit={handleSubmit}>
<div className="input-row">
<div className="form-group">
<label htmlFor="firstName">First Name:</label>
<input
type="text"
id="firstName"
value={firstName}
onChange={(e) => setFirstName(e.target.value)}
required
/>
</div>
<div className="form-group">
<label htmlFor="middleName">Middle Name:</label>
<input
type="text"
id="middleName"
value={middleName}
onChange={(e) => setMiddleName(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="lastName">Last Name:</label>
<input
type="text"
id="lastName"
value={lastName}
onChange={(e) => setLastName(e.target.value)}
required
/>
</div>
</div>
<div className="input-row">
<div className="form-group">
<label htmlFor="contactNumber">Contact Number:</label>
<input
type="text"
id="contactNumber"
value={contactNumber}
onChange={(e) => setContactNumber(e.target.value)}
required
/>
</div>
<div className="form-group">
<label htmlFor="address">Address:</label>
<input
type="text"
id="address"
value={address}
onChange={(e) => setAddress(e.target.value)}
required
/>
</div>
</div>
<div className="input-row">
<div className="form-group">
<label htmlFor="email">Email:</label>
<input
type="email"
id="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
</div>
<div className="form-group">
<label htmlFor="password">Password:</label>
<input
type="password"
id="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
</div>
</div>
<div className="button-group">
<button type="button" className="cancelsignup"
onClick={handleCancel}>Cancel</button>
<a href="/login" className="login-link">
Already have an account? <br />Click here to Log in
</a>
<button type="submit" className="signupbutton">Sign Up</button>
</div>
</form>
</div>
</body>
</>
);
};
export default Signup;
