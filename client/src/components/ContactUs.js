import React, { useState } from 'react';
import './ContactUs.css'; // Import CSS file for ContactUs component

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to submit contact form data
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle success response (e.g., show success message)
        console.log('Contact form submitted successfully!');
        // Reset form fields after successful submission
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to submit contact form');
      }
    } catch (error) {
      console.error('Contact form submission error:', error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  const handlePhoneClick = () => {
    // Implement phone click action (e.g., initiate call)
    window.location.href = 'tel:6304651677';
  };

  const handleEmailClick = () => {
    // Implement email click action (e.g., open email client)
    window.location.href = 'mailto:shravskonga97@gmail.com';
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <fieldset className="contact-fieldset">
            <legend>Contact Form</legend>
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Message:</td>
                  <td>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td></td> {/* Empty cell for spacing */}
                  <td>
                    <button type="submit">Send Message</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </form>

        {/* Contact Helpline Information */}
        <div className="contact-info">
          <p>
            Phone: <span className="clickable" onClick={handlePhoneClick}>630-465-1677</span>
          </p>
          <p>
            Email: <span className="clickable" onClick={handleEmailClick}>shravskonga97@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
