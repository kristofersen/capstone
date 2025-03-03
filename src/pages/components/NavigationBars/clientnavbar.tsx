import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../Styles/clientnavbar.css';
import Swal from 'sweetalert2';



const ClientNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Helper function to determine if the current link is active
  const isActive = (path: string) => location.pathname === path;


  const handleLogout = async () => {
    // Show confirmation dialog before logging out
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    });
  
    if (!result.isConfirmed) return; // Stop execution if user cancels
  
    // Show loading state
    Swal.fire({
      title: 'Logging out...',
      text: 'Please wait while we process your request.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
  
      if (response.ok) {
        // Clear any local storage data (if applicable)
        localStorage.removeItem('profile');
        localStorage.removeItem('userId');
  
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // Redirect to the login page
          navigate('/');
        });
  
      } else {
        // Handle any errors from the server
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: errorData.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
      });
      console.error('Error logging out:', error);
    }
  };
  



   const checkForPending = async () => {
    try {
      const response = await fetch('http://localhost:3000/client/checkpermitlatest', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });
  
      if (!response.ok) {
        console.error('Error fetching permit status');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to fetch permit status. Please try again later.',
        });
        return;
      }
  
      const data = await response.json();
  
      // Handle different statuses with SweetAlert2
      if (data.status === 'Pending') {
        Swal.fire({
          icon: 'info',
          title: 'Pending Approval',
          text: 'Your permit application is pending approval. Please wait for further updates.',
        });
        return;
      }
  
      if (data.status === 'Waiting for Payment') {
        Swal.fire({
          icon: 'warning',
          title: 'Payment Required',
          text: 'Your permit is awaiting payment. Please complete the payment.',
        });
        return;
      }
  
      if (data.status === 'Released') {
        Swal.fire({
          icon: 'warning',
          title: 'Ongoing Permit',
          text: 'You have an ongoing permit. Please wait for expiry.',
        });
        return;
      }
  

      // Default case if none of the above conditions match
      navigate('/workpermitpage');
  
    } catch (error) {
      console.error('Error checking permit status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };
  
  

  return (
    <nav className="navbar cnavbar-custom navbar-expand-lg fixed-top py-3">
      <div className="container-fluid">
        <a className="navbar-brand me-auto text-white" href="/">
          <span className="d-none d-lg-inline">OBWPLS</span>
          <span className="d-lg-none">OBWPLS</span>
        </a>

        {/* Offcanvas Menu */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header offcanvas-custom">
            <h5 className="offcanvas-title text-white" id="offcanvasNavbarLabel">
              OBWPLS
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body offcanvas-custom">
  <ul className="navbar-nav justify-content-end flex-grow-1">
    {[
      { path: '/dashboard', label: 'Dashboard' },
      { label: 'Work Permit', onClick: checkForPending},
      { path: '/businesspermitpage', label: 'Business Permit' },
      { path: '/viewworkpermitapplication', label: 'View WP Applications' },
      { path: '/viewbusinessapplication', label: 'View BP Applications' },
      { path: '/account', label: 'Account' },
      { label: 'Log Out', onClick: handleLogout },
    ].map((item, index) => (
      <li className="nav-item" key={item.path || index}>
        {item.path ? (
          <a
            className={`nav-link text-white ${
              isActive(item.path) ? 'sidebar-linkactive' : 'sidebar-link'
            }`}
            href={item.path}
          >
            {item.label}
          </a>
        ) : (
          <a
            className={`nav-link text-white sidebar-link`}
            onClick={item.onClick}
            role="button"
            tabIndex={0}
          >
            {item.label}
          </a>
        )}
      </li>
    ))}
  </ul>
</div>


        </div>

        {/* Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default ClientNavbar;
