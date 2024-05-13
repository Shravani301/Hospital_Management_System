import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // You can handle success response here (e.g., store token in localStorage)
        // Reset form fields on successful login
        setFormData({ email: '', password: '' });
        setError('');
        // Handle successful login (e.g., redirect to dashboard)
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      setError(error.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h1 className="hospital-name">Hospital Management System</h1>
      <div className="login-content">
        <p className="login-text">Login</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <table className="login-table">
            <tbody>
              <tr>
                <td>
                  <label>Email/Username:</label>
                </td>
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
                <td>
                  <label>Password:</label>
                </td>
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
                <td></td> {/* Empty cell for spacing */}
                <td style={{ textAlign: 'center' }}>
                  <button type="submit">Login</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default Login;
