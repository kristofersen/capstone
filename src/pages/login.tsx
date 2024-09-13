import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Utility/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Store the JWT token
        localStorage.setItem('token', data.token);
        setSuccess(data.message);
        setError(null);
        navigate('/dashboard'); // Redirect to home page
      } 
      if (data.error === 'Email is not verified') {
        navigate('/emailverification', { state: { email } }); // Redirect to email verification page if email not verified
      }
      else {
        setError(data.error);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    } catch (error) {
      setError('Error logging in');
      console.error('Error logging in', error);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="bodylogin">
      <div className="login-container">
        <h2>Log In</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
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
          <div className="button-group">
            <button
              type="button"
              className="cancellogin"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <a href="/signup" className="signup-link">
              Don't have an account? <br /> Click here to Sign up
            </a>
            <a href="/forgotpassword" className="signup-link">
              Forgot Password?
            </a>
            <button className="loginbutton" type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
