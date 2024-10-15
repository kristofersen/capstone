import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Account {
  userId: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
}

const Accounts: React.FC = () => {
  const [admins, setAdmins] = useState<Account[]>([]);
  const [dataControllers, setDataControllers] = useState<Account[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  

  
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const adminResponse = await fetch('http://localhost:3000/adminusers');
        const dataControllerResponse = await fetch('http://localhost:3000/datacontrollers');

        if (!adminResponse.ok) {
          const errorText = await adminResponse.text();
          throw new Error(`Failed to fetch admins: ${errorText}`);
        }

        if (!dataControllerResponse.ok) {
          const errorText = await dataControllerResponse.text();
          throw new Error(`Failed to fetch data controllers: ${errorText}`);
        }

        const adminData = await adminResponse.json();
        const dataControllerData = await dataControllerResponse.json();

        setAdmins(adminData);
        setDataControllers(dataControllerData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchAccounts();
  }, []);


  if (error) {
    return <div>Error: {error}</div>; // Error message
}

  const handleEdit = (account: Account) => {
    navigate(`/superadmin/edituser/${account.userId}`);
  };

  const handleRemove = async (account: Account) => {
    try {
      const response = await fetch(`http://localhost:3000/accounts/${account.userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to remove account: ${errorText}`);
      }

      // Update the state to remove the deleted account
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.userId !== account.userId));
      setDataControllers((prevDataControllers) =>
        prevDataControllers.filter((controller) => controller.userId !== account.userId)
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const renderActionsDropdown = (account: Account) => (
    <select
      onChange={(e) => {
        const action = e.target.value;
        if (action === 'edit') handleEdit(account);
        if (action === 'remove') handleRemove(account);
      }}
    >
      <option value="">Select</option>
      <option value="edit">Edit</option>
      <option value="remove">Remove</option>
    </select>
  );

  return (
    <div>
      <div className="navbar">
        <div className="menu-toggle">
          <span>&#9776;</span>
        </div>
        <div className="logo">Accounts</div>
        <div className="user-actions">
          <a href="/superadmin/login" className="logout">Log Out</a>
          <span className="notification">&#128276;</span>
        </div>
      </div>

      <section className="account-section">
        <h2>Admin</h2>
        <div className="filter-search">
          <span>Filter:</span>
          <input type="text" placeholder="" />
          <span>Search:</span>
          <input type="text" placeholder="" />
        </div>
        <table className="account-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Mobile No.</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index}>
                <td>{admin.firstName} {admin.lastName}</td>
                <td>{admin.userId}</td>
                <td>{admin.contactNumber}</td>
                <td>{admin.email}</td>
                <td>{renderActionsDropdown(admin)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="account-section">
        <h2>Data Controller</h2>
        <div className="filter-search">
          <span>Filter:</span>
          <input type="text" placeholder="" />
          <span>Search:</span>
          <input type="text" placeholder="" />
        </div>
        <table className="account-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Username</th>
              <th>Mobile No.</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataControllers.map((controller, index) => (
              <tr key={index}>
                <td>{controller.firstName} {controller.lastName}</td>
                <td>{controller.userId}</td>
                <td>{controller.contactNumber}</td>
                <td>{controller.email}</td>
                <td>{renderActionsDropdown(controller)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Accounts;