import React, { useState } from 'react';
import './FeedbackForm.css';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSmile } from '@fortawesome/free-solid-svg-icons';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, location, feedback, rating }),
      });
      new Noty({
        type: 'success',
        layout: 'topRight',
        text: 'Thank you for your feedback!',
        timeout: 3000,
      }).show();
      setName('');
      setEmail('');
      setLocation('');
      setFeedback('');
      setRating(0);
    } catch (error) {
      new Noty({
        type: 'error',
        layout: 'topRight',
        text: 'Failed to submit feedback! Please try again.',
        timeout: 3000,
      }).show();
    }
  };

  const handleStarClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleStarHover = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleStarHoverLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="feedback-form-container">
      <h2 className="feedback-form-title">We Value Your Feedback!</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
            placeholder="Your Location"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={
                  (hoverRating || rating) >= star ? 'star filled' : 'star'
                }
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarHoverLeave}
              />
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="feedback">Your Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="form-control"
            placeholder="Share your thoughts here..."
            rows="5"
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          <FontAwesomeIcon icon={faSmile} className="emoji-icon" />
              Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
