import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import aboutImage from './sam.avif';

const About = () => {
  return (
    <section className="about-section1" id="about">
      <div className="content-container1">
        <div className="content1">
          <h2>About Us</h2>
          <p>
            We specialize in comprehensive corporate event management services, ensuring every detail is meticulously planned and executed.
            Our experienced team is dedicated to making your events successful and memorable.
          </p>
          <Link to="/team" className="team-button">Meet Our Team</Link>
        </div>
        <img src={aboutImage} alt="About Us" className="section-image1" />
      </div>
    </section>
  );
};

export default About;
