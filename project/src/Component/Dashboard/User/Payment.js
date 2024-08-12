import React, { useState } from 'react';
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

  const [paymentDetails, setPaymentDetails] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

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
      // Show the success notification
      new Noty({
        type: 'success',
        layout: 'topRight',
        text: 'Joined successfully!',
        timeout: 3000,
      }).show();

      // Navigate to homepage
      navigate('/userdashboard'); // Adjust to your home page route
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

          <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
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
