import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; // Import your CSS file

const Dashboard: React.FC = () => {
const [userDetails, setUserDetails] = useState<{ email: string; firstName: string; 
lastName: string } | null>(null);
const [error, setError] = useState<string | null>(null);
const navigate = useNavigate();
useEffect(() => {

const fetchUserDetails = async () => {
const token = localStorage.getItem('token');

if (!token) {
navigate('/'); // Redirect to login if no token
return;
}
try {
const response = await fetch('http://localhost:5000/profile', {
method: 'GET',
headers: {
Authorization: `Bearer ${token}`,
'Content-Type': 'application/json',
},
});
const data = await response.json();
if (response.ok) {
setUserDetails(data.user);
setError(null);
} else {
setError(data.error || 'Error fetching user details.');
}
} catch (error) {
console.error('Error fetching user details:', error);
setError('Failed to fetch user details, please try again.');
}
};
fetchUserDetails();
}, [navigate]);

const handleLogout = () => {
localStorage.removeItem('token'); // Remove token from localStorage
navigate('/login'); // Redirect to login page
};

return (
<section className="bodydashboard">
<div>
<header>
<h1>Online Business and Work Permit Licensing System</h1>
<nav>
<ul>
<li><a href="/account" className="button">Account</a></li>
<li><button onClick={handleLogout} className="logout-button">Logout</button></li>{}  
</ul>
</nav>

</header>
{error && <p className="error">{error}</p>}
{userDetails ? (
    <div className="user-details">
            <h2>Welcome, {userDetails.firstName} {userDetails.lastName}!</h2>
            <p>Email: {userDetails.email}</p>
            {/* Display other user details as needed */}
          </div>
) : (
<p>Loading user details...</p>
)}
</div>
</section>
);
};
export default Dashboard;
