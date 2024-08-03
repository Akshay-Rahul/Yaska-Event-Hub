import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import './Register.css';

const AdminRegister = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      new Noty({
        type: 'error',
        layout: 'topRight',
        text: 'Passwords do not match',
        timeout: 3000,
      }).show();
      return;
    }

    try {
      const { username, email, password } = formData;
      await axios.post('http://localhost:8080/users', {
        username,
        email,
        password,
        role: 'admin'
      });
      new Noty({
        type: 'success',
        layout: 'topRight',
        text: 'Registration successful',
        timeout: 3000,
      }).show();
      navigate('/adminlogin');
    } catch (error) {
      new Noty({
        type: 'error',
        layout: 'topRight',
        text: error.response ? error.response.data : error.message,
        timeout: 3000,
      }).show();
    }
  };

  return (
    <div className='register-page'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Admin Register</h1>
          <div className='input-box'>
            <input
              type="text"
              name="username"
              placeholder='Username'
              value={formData.username}
              onChange={handleInputChange}
              required
              aria-label="Username"
            />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input
              type="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange}
              required
              aria-label="Email"
            />
            <FaEnvelope className='icon' />
          </div>
          <div className='input-box'>
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleInputChange}
              required
              aria-label="Password"
            />
            <FaLock className='icon' />
          </div>
          <div className='input-box'>
            <input
              type="password"
              name="confirmPassword"
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              aria-label="Confirm Password"
            />
            <FaLock className='icon' />
          </div>
          <div className='terms-box'>
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={handleTermsChange}
              required
            />
            <label htmlFor="terms">
              I agree to the <span className="terms-link">Terms and Conditions</span>
            </label>
          </div>
          <button type='submit' disabled={!termsAccepted}>Register</button>
          <div className='login-link'>
            <p>Already have an account? <Link to="/adminlogin">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
