import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import './Home.css';
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import About from './About';
import SignIn from './Signin';
import Navbar from './Navbar';
import Contact from './Contact';
import Testimonials from './Test';
import Service from './Service';
import homeImage from './sam2.png'
import Chatbot from '../../Chat';

const Homepage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    if (!user) {
      new Noty({
        type: 'error',
        layout: 'topRight',
        text: 'Please log in to continue.',
        timeout: 3000,
      }).show();
      navigate('/');
    } else if (user.role === 'admin') {
      navigate('/admindashboard');
    } else {
      navigate('/userdashboard');
    }
  };

  return (
    <div className="full-page-container">
      <Chatbot/>
      <Navbar transparent />
      <div className="hero-container">
        <div className="hero-content">
          <h1>Welcome to Your Corporate Event Hub</h1>
          <p>Organize and manage your corporate events effortlessly. Sign up today and streamline your event planning.</p>
          <button className="get-started-button" onClick={handleGetStartedClick}>Get Started</button>
        </div>
        <img src={homeImage} alt="About Us" className="section-image2" />
      </div>
      <About/>
      <Service/>
      <Testimonials />
      <SignIn />
      <Contact/>

      <footer className="footer">
        <div className="footer-links">
          <div className="footer-column">
            <h3>About Us</h3>
            <ul>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#terms-of-service">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Videos</h3>
            <ul>
              <li><a href="#agency">Agency</a></li>
              <li><a href="#ambassadors">Ambassadors</a></li>
              <li><a href="#investors">Investors</a></li>
              <li><a href="#demo">Demo</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#sponsorships">Sponsorships</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <a href="https://www.facebook.com">
              <FaFacebook size={24} style={{ margin: '0 10px', color: '#fff' }} />
            </a>
            <a href="https://www.instagram.com">
              <FaInstagram size={24} style={{ margin: '0 10px', color: '#fff' }} />
            </a>
            <a href="https://www.twitter.com">
              <FaTwitter size={24} style={{ margin: '0 10px', color: '#fff' }} />
            </a>
            <a href="https://www.linkedin.com">
              <FaLinkedin size={24} style={{ margin: '0 10px', color: '#fff' }} />
            </a>
          </div>
          <p>&copy; 2024 Yaska. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
