import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    retypePassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (formData.password !== formData.retypePassword) {
        throw new Error('Passwords do not match');
      }
  
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle success response (e.g., redirect to login)
        setFormData({ email: '', username: '', password: '', retypePassword: '' });
        setError('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      setError(error.message || 'Registration failed');
    }
  };
  
  return (
    <div className="register-container">
      <h2>Hospital Management System</h2>
      <div className="register-form-container">
        <h3>Register</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <table className="register-table">
            <tbody>
              <tr>
                <td><label>Email:</label></td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label>Username:</label></td>
                <td>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label>Password:</label></td>
                <td>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label>Retype Password:</label></td>
                <td>
                  <input
                    type="password"
                    name="retypePassword"
                    value={formData.retypePassword}
                    onChange={handleInputChange}
                    placeholder="Retype Password"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td></td> {/* Empty cell for spacing */}
                <td style={{ textAlign: 'center' }}>
                  <button type="submit">Register</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default Register;
