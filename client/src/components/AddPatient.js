import React, { useState } from 'react';

const AddPatient = () => {
  const [formData, setFormData] = useState({ patientName: '', bedID: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle success response (e.g., show success message)
        // Clear form after successful submission
        setFormData({ patientName: '', bedID: '' });
      } else {
        throw new Error('Failed to add patient');
      }
    } catch (error) {
      console.error('Add patient failed:', error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="add-patient-container">
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit} className="add-patient-form">
        <table className="add-patient-table">
          <tbody>
            <tr>
              <td><label>Patient Name:</label></td>
              <td>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  placeholder="Enter patient name"
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Bed ID:</label></td>
              <td>
                <input
                  type="text"
                  name="bedID"
                  value={formData.bedID}
                  onChange={handleInputChange}
                  placeholder="Enter bed ID"
                  required
                />
              </td>
            </tr>
            <tr>
              <td></td> {/* Empty cell for spacing */}
              <td style={{ textAlign: 'center' }}>
                <button type="submit">Add Patient</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddPatient;
