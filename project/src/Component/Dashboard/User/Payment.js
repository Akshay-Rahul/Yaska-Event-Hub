import React, { useState } from 'react';
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import './Payment.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

const Tickets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event; // Get event details from state
  const [userId] = useState("1"); // Replace with actual user ID from your auth system

  const [paymentDetails, setPaymentDetails] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [isOrderSummaryOpen, setOrderSummaryOpen] = useState(false);

  const handleChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleJoin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Create a new joined event with image URL
      const newJoinedEvent = {
        eventId: event.id,
        eventName: event.title,
        eventDate: event.date,
        eventLocation: event.location,
        eventDescription: event.description,
        eventCategory: event.category,
        eventOrganizer: event.organizerName, // Ensure this matches your backend model
        eventImage: event.img || 'https://via.placeholder.com/200', // Add the image URL
      };

      // Post the new joined event
      await axios.post(`http://localhost:8080/users/${userId}/join-event`, newJoinedEvent);

      // Show the success notification
      new Noty({
        type: 'success',
        layout: 'topRight',
        text: 'Joined successfully!',
        timeout: 3000,
      }).show();

      // Optionally, navigate to another page
      navigate('/userdashboard'); // Navigate to MyEvents or another page if needed
    } catch (error) {
      console.error('Error joining the event:', error);
      new Noty({
        type: 'error',
        layout: 'topRight',
        text: 'Error joining the event. Please try again.',
        timeout: 3000,
      }).show();
    }
  };

  const handleOpenOrderSummary = () => {
    setOrderSummaryOpen(true);
  };

  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-details">
          <h2>Event Details</h2>
          <div className="event-summary">
            <h3>Event: <span>{event?.title || 'N/A'}</span></h3>
            <p>Date: <span>{event?.date || 'N/A'}</span></p>
            <p>Location: <span>{event?.location || 'N/A'}</span></p>
          </div>

          <form className="payment-form" onSubmit={handleJoin}>
            <h3>Payment Information</h3>
            <label>
              Name on Card
              <input
                type="text"
                name="nameOnCard"
                value={paymentDetails.nameOnCard}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </label>
            <label>
              Card Number
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </label>
            <label>
              Expiration Date
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                required
              />
            </label>
            <label>
              CVV
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </label>
            <button type="button" className="submit-button" onClick={handleOpenOrderSummary}>
              View Order Summary
            </button>
          </form>
        </div>

        <Modal isOpen={isOrderSummaryOpen} onClose={() => setOrderSummaryOpen(false)}>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Event Ticket: $100</p>
            <p>Tax: $5</p>
            <p>Total: $105</p>
            <button className="submit-button" onClick={handleJoin}>Confirm and Pay</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Tickets;
