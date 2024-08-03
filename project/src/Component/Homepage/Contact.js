import React, { useState } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [status, setStatus] = useState(''); // Add a status state for feedback

  const EmailForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();

      // Your EmailJS service ID, template ID, and Public Key
      const serviceId = 'service_01o2nuk';
      const templateId = 'template_eb42swy';
      const publicKey = 'nnJgQKjuooMDL70e7';

      // Create a new object that contains dynamic template params
      const templateParams = {
        from_name: name,
        from_email: email,
        to_name: 'Web Wizard',
        message: message,
      };

      // Send the email using EmailJS
      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log('Email sent successfully!', response);
          setName('');
          setEmail('');
          setMessage('');
          setStatus('Email sent successfully!');
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          setStatus('Error sending email. Please try again.');
        });
    };

    return (
      <form onSubmit={handleSubmit} className='emailForm'>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          cols="30"
          rows="10"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="button">Send Email</button>
        {status && <p className="form-status">{status}</p>}
      </form>
    );
  };

  return (
    <section id="contact" className="content-section">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-box">
          <EmailForm /> {/* Use the EmailForm component here */}
          <div className="contact-info">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.619316440285!2d76.94125574105601!3d11.008222339480481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8591c7f4e7ba5%3A0x55632b2830cb9f8a!2sR.S.%20Puram%2C%20Coimbatore%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sus!4v1722622142392!5m2!1sen!2sus"
              width="600"
              height="600"
              style={{ border: '0' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="R.S. Puram, Coimbatore"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
