import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Import Components
import AddPatient from './components/AddPatient';
import Register from './components/Register';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Menu Bar */}
        <div className="menu-bar">
          {/* Left side with Menu Links */}
          <div className="menu-links">
            <Link className="menu-link" to="/login">Login</Link>
            <Link className="menu-link" to="/register">Register</Link>
            <Link className="menu-link" to="/add-patient">Add Patient</Link>
            <Link className="menu-link" to="/about-us">About Us</Link>
            <Link className="menu-link" to="/contact-us">Contact Us</Link>
          </div>
          
          {/* Right side with Search Function */}
          <div className="search-section">
            <input className="search-input" type="text" placeholder="Search patients..." />
            <button className="search-button">Search</button>
          </div>
        </div>

        {/* Main Content Area (Routing) */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Example Home component for the "/" route
const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome to Hospital Management System</h1>
      <img
        src="https://4.imimg.com/data4/VW/VR/ANDROID-29626789/product-500x500.jpeg" // Replace this URL with your image URL
        alt="Hospital"
        style={{ display: 'block', margin: 'auto', marginTop: '20px', maxWidth: '100%' }}
      />
    </div>
  );
};

export default App;
