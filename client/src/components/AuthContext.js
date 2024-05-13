import React, { createContext, useContext, useState } from 'react';

// Create authentication context
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state

  // Method to set the authenticated user
  const login = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData); // Set authenticated user data in state
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  // Method to clear the authenticated user (logout)
  const logout = () => {
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
