import React from 'react';
import './Utility/home.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleApplyNowClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <section className="bodylandingpage">
    <div>
      <header>
        <h1>Online Business and Work Permit Licensing System</h1>
        <nav>
          <ul>
            <li><a href="/signup" className="button">Sign Up</a></li>
            <li><a href="/login" className="button">Log In</a></li>
          </ul>
        </nav>
      </header>

      <div className='title'>
        <h2>
          THE CITY OF DASMARIÑAS BUSINESS PERMITS <br></br> AND LICENSING OFFICE
        </h2>
      </div>

      <div className='subtitle'>
        <h2>
          Making <span className="highlight">Business Permit</span> and 
          <span className="highlight"> Work Permit</span> <br /> Application
          <span className="highlight"> Easier.</span>
        </h2>
      </div>

      <div className='applybuttoncontainer'>
        <button className='applybutton' onClick={handleApplyNowClick}>Apply Now</button>
      </div>

      
      <footer>
        <p>&copy; 2024 Online Business and Work Permit Licensing System. All rights reserved.</p>
      </footer>
    </div>
    </section>
  );
};

export default Home;
