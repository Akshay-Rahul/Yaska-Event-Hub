import React from 'react';
import { FaCalendarAlt, FaMapMarkedAlt, FaShippingFast, FaUserTie } from 'react-icons/fa'; // Import additional icon
import './Service.css';

const Service = () => {
  return (
    <section className="services">
      <h2 className="services-title">Our Corporate Event Hub Services</h2>
      <div className="services-container">
        <div className="service-card">
          <div className="service-icon">
            <FaCalendarAlt size={50} />
          </div>
          <h3>Event Planning</h3>
          <p>We specialize in creating detailed and effective event plans to ensure your corporate event runs smoothly from start to finish.</p>
          <button className="more-button">Learn More</button>
        </div>
        <div className="service-card">
          <div className="service-icon">
            <FaMapMarkedAlt size={50} />
          </div>
          <h3>Venue Management</h3>
          <p>Our team handles all aspects of venue selection and management, ensuring the perfect setting for your corporate gathering.</p>
          <button className="more-button">Learn More</button>
        </div>
        <div className="service-card">
          <div className="service-icon">
            <FaShippingFast size={50} />
          </div>
          <h3>Logistics Coordination</h3>
          <p>We take care of all logistics, including transportation, catering, and equipment, so you can focus on enjoying the event.</p>
          <button className="more-button">Learn More</button>
        </div>
        {/* New Service Card */}
        <div className="service-card">
          <div className="service-icon">
            <FaUserTie size={50} />
          </div>
          <h3>Client Relations</h3>
          <p>We ensure top-notch client relations by understanding your needs and providing tailored solutions to make your event exceptional.</p>
          <button className="more-button">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Service;
