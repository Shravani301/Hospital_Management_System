import React, { useEffect, useState } from 'react';

const PatientDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
        const response = await fetch('/api/patients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include authorization token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPatients(data.patients); // Set fetched patients to state
        } else {
          throw new Error('Failed to fetch patients');
        }
      } catch (error) {
        console.error('Fetch patients error:', error.message);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchPatients();

    // Clean-up function (if needed)
    return () => {
      // Any clean-up logic can be placed here
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
      const response = await fetch(`/api/patients?search=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include authorization token
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPatients(data.patients); // Update patients with search results
      } else {
        throw new Error('Failed to search patients');
      }
    } catch (error) {
      console.error('Search patients error:', error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2>Patients</h2>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search by patient name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>
            {patient.patientName} - Bed ID: {patient.bedID}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;
