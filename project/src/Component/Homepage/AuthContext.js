import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage on initial render
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  const isAuthenticated = () => {
    return user !== null; // Check if user is logged in
  };

  const getUser = () => {
    return user; // Retrieve current user data
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};
