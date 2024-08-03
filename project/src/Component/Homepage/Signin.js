import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import signimg from "./sign.jpg";

const SignIn = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/adminregister');
  };

  const handleUserClick = () => {
    navigate('/userregister');
  };

  return (
    <section id="signin" className="signin-section">
      <div className="signin-content">
        <div className="signin-text">
          <h3>Sign Up Now</h3>
          <h1>Seamless Event Management at Your Fingertips</h1>
          <p>Register now to unlock a personalized event experience tailored to your interests. Manage schedules, network, and more with ease.</p>
          <div className="signin-buttons">
            <button className="signin-button admin-button" onClick={handleAdminClick}>Admin</button>
            <button className="signin-button user-button" onClick={handleUserClick}>User</button>
          </div>
        </div>
        <div className="signin-image">
          <img src={signimg} alt="Corporate Event Illustration" />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
