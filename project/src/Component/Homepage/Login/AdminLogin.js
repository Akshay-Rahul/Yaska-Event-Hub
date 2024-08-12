import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import { useAuth } from '../AuthContext';

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email: loginData.email,
        password: loginData.password
      });

      const { accessToken } = response.data;

      // Save token in AuthContext or localStorage
      login(accessToken);

      new Noty({
        type: 'success',
        layout: 'topRight',
        text: 'Login successful',
        timeout: 3000,
      }).show();

      navigate('/admindashboard');
    } catch (error) {
      let errorMessage = 'An error occurred'; // Default error message

      if (error.response) {
        // Check if the error response contains a specific message
        if (error.response.status === 401) {
          errorMessage = 'Incorrect email or password'; // Customize error message for 401
        } else {
          errorMessage = error.response.data.message || 'An error occurred';
        }
      }

      new Noty({
        type: 'error',
        layout: 'topRight',
        text: errorMessage,
        timeout: 3000,
      }).show();
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div className='login-page'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Admin Login</h1>
          <div className='input-box'>
            <input 
              type="email" 
              name="email"
              placeholder='Email' 
              value={loginData.email}
              onChange={handleInputChange}
              required 
              aria-label="Email" 
            />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              placeholder='Password' 
              value={loginData.password}
              onChange={handleInputChange}
              required 
              aria-label="Password" 
            />
            {showPassword ? 
              <FaEyeSlash className='icon' onClick={toggleShowPassword} /> : 
              <FaEye className='icon' onClick={toggleShowPassword} />}
          </div>
          <button type='submit'>Login</button>
          <div className='register-link'>
            <p>Don't have an account? <Link to="/adminregister">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
