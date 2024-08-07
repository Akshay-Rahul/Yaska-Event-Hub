import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Test.css';

const testimonials = [
  {
    name: "Emilia Clarke",
    title: "Senior Event Planner at Global Corp",
    quote: "Easy Tutorials managed our recent corporate event with remarkable precision. Their expertise in event planning and execution ensured a seamless experience from start to finish. Highly recommend their services for any corporate event.",
    avatarClass: "prabhakarAvatar",
    rating: 4
  },
  {
    name: "Samantha Ruth",
    title: "Director of Operations at Tech Solutions",
    quote: "We were extremely impressed with Easy Tutorials' handling of our corporate event. Their innovative approach and meticulous planning made the event a standout success. They are our go-to team for future events.",
    avatarClass: "bharatAvatar",
    rating: 5
  },
  {
    name: "Kashmira Pardeshi",
    title: "Event Manager at Creative Enterprises",
    quote: "The corporate event organized by Easy Tutorials exceeded our expectations. Their attention to detail and professional demeanor ensured everything went off without a hitch. We look forward to collaborating with them again.",
    avatarClass: "avinashAvatar",
    rating: 5
  }
];

const getRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <span key={`full-${index}`} className="full-star">&#9733;</span> // Full star
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} className="empty-star">&#9733;</span> // Empty star
      ))}
    </>
  );
};

const Testimonials = () => {
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate('/testimonials');
  };

  return (
    <section className="test">
      <div className="header2">
        <h2>TESTIMONIALS</h2>
        <p>Discover how Easy Tutorials can elevate your corporate events.</p>
      </div>
      <div className="container2">
        {testimonials.map((testimonial, index) => (
          <div className="card2" key={index}>
            <div className="content2">
              <div className={`avatar ${testimonial.avatarClass}`}></div>
              <blockquote>{testimonial.quote}</blockquote>
              <div className="card-footer2">
                <div className="rating2">
                  {getRatingStars(testimonial.rating)}
                </div>
                <h3>{testimonial.name}</h3>
                <span>{testimonial.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
