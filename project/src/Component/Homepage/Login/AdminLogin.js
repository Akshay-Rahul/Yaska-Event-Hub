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
    username: '',
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
      const response = await axios.get('http://localhost:8080/users');
      const admin = response.data.find(user => 
        user.username === loginData.username && user.password === loginData.password && user.role === 'admin');

      if (admin) {
        login(admin);
        new Noty({
          type: 'success',
          layout: 'topRight',
          text: 'Login successful',
          timeout: 3000,
        }).show();
        navigate('/admindashboard');
      } else {
        new Noty({
          type: 'error',
          layout: 'topRight',
          text: 'Invalid username or password',
          timeout: 3000,
        }).show();
      }
    } catch (error) {
      console.error('There was an error!', error);
      new Noty({
        type: 'error',
        layout: 'topRight',
        text: 'There was an error during login. Please try again.',
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
              type="text" 
              name="username"
              placeholder='Username' 
              value={loginData.username}
              onChange={handleInputChange}
              required 
              aria-label="Username" 
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
