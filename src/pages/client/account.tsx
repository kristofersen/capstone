import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/account.css'; // Import your CSS file


interface User {
  _id: string;
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string,
  contactNumber: string,
  address: string,
  password: string,
}


const Account: React.FC = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
//For ForgetPassword @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const [otp, setOtp] = useState('');
const [otpSent, setOtpSent] = useState(false);
const [otpCountdown, setOtpCountdown] = useState<number | null>(null); // Timer countdown state
const [success, setSuccess] = useState<string | null>(null);
const [confirmpassword, setConfirmPassword] = useState('');
const [email, setEmail] = useState(userDetails?.email || '');
const [password, setPassword] = useState(userDetails?.password || '');  // Set initial state from location


//End Forget Password @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  useEffect(() => {
    
    if (!token) {
      navigate('/'); // Redirect to login if no token
      return;
    } else{
      if (userDetails?.email) {
        setEmail(userDetails.email);  // Update email if userDetails changes
      }
    const fetchUserDetails = async () => {


      try {
        const response = await fetch('http://localhost:3000/profile', {
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
    fetchUserDetails();}


    let timer: NodeJS.Timeout;
        if (otpCountdown !== null) {
            // Start countdown
            timer = setInterval(() => {
                setOtpCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
            }, 1000);
        }

        if (otpCountdown === 0) {
            // Re-enable button after countdown
            setOtpSent(false);
            setOtpCountdown(null);
        }

        return () => clearInterval(timer); // Clear interval on component unmount or when countdown reaches 0


  }, [token, navigate, otpCountdown, userDetails]);

  


// For Forget Password @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const handleSendOtp = async () => {
  if (!userDetails?.email) return;



  try {
      const response = await fetch('http://localhost:3000/send-otp', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userDetails?.email }),
      });
      const data = await response.json();
      if (response.ok) {
          setSuccess('OTP sent to your email.');
          setOtpSent(true); // Disable the button
          setOtpCountdown(10); // Set the timer to 10 seconds
          setTimeout(() => {
              setSuccess(null);
          }, 3000);
          setError(null);
      } else {
          setError(data.error);
          setTimeout(() => {
              setError(null);
          }, 3000);
      }
  } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Error sending OTP, please try again.');
  }
};


const handleVerifyOtp = async () => {
  if (!userDetails?.email || !otp) return;

  if (confirmpassword !== userDetails?.password) {
      setError('Password Not Match.');
      return;
  }

  try {
      const response = await fetch('http://localhost:3000/update-password', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userDetails?.email, otp, password: userDetails?.password }),
      });
      const data = await response.json();
      if (response.ok) {
          setSuccess('Password Changed');
          navigate('/login');
          setError(null);
      } else {
          setError(data.error);
      }
  } catch (error) {
      console.error('Error verifying OTP, please try again.', error);
      setError('Error verifying OTP, please try again.');
  }
};

// End Forget Password @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Redirect to home page
  };
  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <section className="dashboard-container">
  <div className="sidebar-container">
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/obpwlslogo.svg" alt="Logo" className="logo-image" />
      </div>
      <ul className="sidebar-list">
            <li>
                <a href="/dashboard" className="sidebar-link">
                <img src="/dashboardlogo.svg" alt="Logo" className="sidebarlogoimage" />Dashboard
                </a>
            </li>
            <li>
                <a href="/workpermitpage" className="sidebar-link">
                <img src="/applicationslogo.svg" alt="Logo" className="sidebarlogoimage" />Work Permit
                </a>
            </li>
            <li>
                <a href="/businesspermitpage" className="sidebar-link">
                <img src="/applicationslogo.svg" alt="Logo" className="sidebarlogoimage" />Business Permit
                </a>
            </li>
            <li>
                <a href="/viewworkpermitapplication" className="sidebar-link">
                <img src="/viewspecificapplicationlogo.svg" alt="Logo" className="sidebarlogoimage" />View WP Applications
                </a>
            </li>
            <li>
                <a href="/viewbusinessapplication" className="sidebar-link">
                <img src="/viewspecificapplicationlogo.svg" alt="Logo" className="sidebarlogoimage" />View BP Applications
                </a>
            </li>
            <li>
                <a href="/viewallapplication" className="sidebar-link">
                <img src="/viewallapplicationslogo.svg" alt="Logo" className="sidebarlogoimage" />View All Applications
                </a>
            </li>
            <li>
                <a href="/account" className="sidebar-linkactive">
                <img src="/accountlogo.svg" alt="Logo" className="sidebarlogoimage" />Account
                </a>
            </li>
            <li>
                <a href="/" onClick={handleLogout} className="sidebar-link">
                <img src="/logoutlogo.svg" alt="Logo" className="sidebarlogoimage" />Log Out
                </a>
            </li>
        </ul>
    </div>
  </div>

  <div className="content">
    <header>
      <h1>Online Business and Work Permit Licensing System</h1>
    </header>

    <div className="account-page">
      {error && <p className="error">{error}</p>}
      {userDetails ? (
        <div className="user-details">
          <div className="profile-info">
            <div className="profile-picture">
              <img src="/profileicon.svg" alt="Profile Icon" />
            </div>
            <h2>{userDetails.firstName} {userDetails.middleName} {userDetails.lastName}</h2>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
 User Details: <h3>{userDetails?.email}</h3>
 Contact Number: <h3>{userDetails?.contactNumber}</h3>
 Address: <h3>{userDetails?.address}</h3>



 

 {/* Forget Password Section */}
 <div>
      {/* Step 3: Render a button to toggle the form */}
      <button onClick={handleButtonClick}>
        {isFormVisible ? 'Close' : 'Change Password?'}
      </button>

      {/* Conditionally render the form based on isFormVisible */}
      {isFormVisible && (
        <div className="emailverification-container">
        <h1>Forgot Password</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
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
        </div>
        <div className="input-row">
            <div className="form-group">
                <label htmlFor="otp">Enter OTP:</label>
                <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
            </div>
        </div>
        <div className="input-row">
            <div className="form-group">
                <label htmlFor="otp">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
        </div>
        <div className="input-row">
            <div className="form-group">
                <label htmlFor="otp">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmpassword"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
        </div>
        <div className="button-group">
        <button type="button" className="cancelForgotPassword" onClick={handleButtonClick}>
            Cancel
        </button>
            <button
                type="button"
                className={`sendotp ${otpSent ? 'disabled-button' : ''}`}  // Add conditional class
                onClick={handleSendOtp}
                disabled={otpSent} // Disable button if OTP is sent
            >
            Send OTP
            </button>
                <label className="otp-timer-label">
                {otpSent && otpCountdown !== null ? `(${otpCountdown}s)` : ''}
                </label>
            <button
                type="button"
                className="verifyemail"
                onClick={handleVerifyOtp}
            >
                Change Password
            </button>
        </div>
    </div>
      )}
    </div>














    </div>
</section>
  );
};

export default Account;
