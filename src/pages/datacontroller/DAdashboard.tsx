import '../Styles/DAdashboard.css'; // Import your CSS file

const DAdashboard: React.FC = () => {

return (
    <section className="DAdashboard-container">
    <div className="DAsidebar-container">
        <div className="DAsidebar">
        <div className="DAsidebar-logo">
            <img src="/obpwlslogo.svg" alt="Logo" className="logo-image" />
        </div>
        <ul className="DAsidebar-list">
            <li><a href="/dashboard" className="DAsidebar-linkactive">Dashboard</a></li>
            <li><a href="/#" className="DAsidebar-link">For Asseessment</a></li>
            <li><a href="/#" className="DAsidebar-link">For Payment</a></li>
            <li><a href="/#" className="DAsidebar-link">Released Permits</a></li>
            <li><a href="/#" className="DAsidebar-link">Reports/Graphs</a></li>
            <li><a href="/" className="DAsidebar-link">Log Out</a></li>
        </ul>
        </div>
    </div>

    <div className="DAcontent">
        <header className='DAheader'>
            <h1>Online Business and Work Permit Licensing System</h1>
                <nav>
                    <ul>
                        <li><a href="/account" className="DAaccountbutton">Account</a></li>
                        <li><a href="/" className="DAlogoutbutton">Logout</a></li>
                    </ul>
                </nav>
        </header>
    </div>
    </section>
);

};

export default DAdashboard;