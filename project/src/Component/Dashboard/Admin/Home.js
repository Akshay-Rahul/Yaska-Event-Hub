import React from 'react';
import './Home.css';


const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <header className="home-header">
          <h1>Welcome to the Education Portal</h1>
          <p>Your journey to knowledge begins here</p>
        </header>
        <div className="home-image-container">
          <img src='' alt="Educational illustration" className="home-image" />
          <div className="home-image-text">
            <p>
              Our education portal stands out with its unique features designed to foster a dynamic learning environment. From interactive storybooks that captivate young learners to an advanced Learning Management System (LMS) that streamlines course management, we offer a variety of tools to support education. Our platform also includes personalized learning paths, real-time progress tracking, and engaging multimedia resources. With collaborative tools and a comprehensive resource library, students and educators alike can experience a truly integrated and enriching educational experience.
            </p>
          </div>
        </div>
        <div className="button-container">
          <button className="explore-button">Explore Now!</button>
        </div>
        <div className="about-us-container">
          <div className="about-us-image">
            <img src='' alt="About Us" className="section-image" />
          </div>
          <div className="about-us-text">
            <h2>About Us</h2>
            <p>
              We provide a comprehensive online education platform that offers a wide range of resources and tools for students, educators, and institutions. Our mission is to make learning accessible and engaging for everyone.
            </p>
          </div>
        </div>
        <div className="our-services-container">
          <div className="our-services-image">
            <img src='' alt="Our Services" className="section-image" />
          </div>
          <div className="our-services-text">
            <h2>Our Services</h2>
            <p>
              Our platform includes interactive storybooks, online classes, and a vast resource library to enhance your learning experience. Join us and explore the endless possibilities of education.
            </p>
          </div>
        </div>
        <div className="features-container">
          <div className="features-image">
            <img src='' alt="Features" className="section-image" />
          </div>
          <div className="features-text">
            <h2>Features</h2>
            <p>
              Our features are designed to provide a seamless learning experience. From personalized learning paths to collaborative tools, we have everything you need to succeed.
            </p>
          </div>
        </div>
        <div className="testimonials">
          <h2>Testimonials</h2>
          <p>Hear from our satisfied users:</p>
          <div className="testimonials-container">
            <div className="testimonial-item">
              <blockquote>
                "This portal has transformed the way my children learn. The interactive storybooks are their favorite!" - Parent
              </blockquote>
            </div>
            <div className="testimonial-item">
              <blockquote>
                "As a teacher, I find the online classes feature extremely useful. It has made remote teaching a breeze." - Educator
              </blockquote>
            </div>
            <div className="testimonial-item">
              <blockquote>
                "The resource library is a treasure trove of information. I can find everything I need for my studies." - Student
              </blockquote>
            </div>
          </div>
        </div>
        <div className="contact-us">
          <h2>Contact Us</h2>
          <p>
            We are here to help you. If you have any questions or need assistance, please feel free to contact us.
          </p>
          <address>
            Email: support@educationportal.com<br />
            Phone: +123-456-7890<br />
            Address: 123 Education Street, Learning City, Knowledge Country
          </address>
        </div>
      </div>
    </div>
  );
};

export default Home;
