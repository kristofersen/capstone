import React from 'react';
import './dashboard.css'; // Import your CSS file

const dashboard: React.FC = () => {

    return (
        <section className="bodydashboard">
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
    </div>  
    </section> 
      );
};
    
    export default dashboard;
    