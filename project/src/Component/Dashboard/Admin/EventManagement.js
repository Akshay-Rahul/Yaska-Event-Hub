import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Noty from 'noty';
import './EventManagement.css'; // Import CSS file
import 'noty/lib/noty.css'; // Import Noty CSS
import 'noty/lib/themes/mint.css'; // Import Noty theme

const itemData = [
  {
    img: 'https://i.pinimg.com/736x/e3/71/32/e37132a9e942ea43aee49a98ff257d49.jpg',
    title: 'Bed',
    author: 'Exhibition and Experiential Spaces',
  },
  {
    img: 'https://i.pinimg.com/564x/2d/84/1d/2d841d58c070e9cf046406d04a1c0b5d.jpg',
    title: 'Books',
    author: 'Govt. and Institutional',
  },
  {
    img: 'https://i.pinimg.com/564x/8c/f5/c0/8cf5c06674084abbe5b73ba0ad0e6dc3.jpg',
    title: 'Sink',
    author: 'Virtual',
  },
  {
    img: 'https://i.pinimg.com/564x/5b/10/00/5b1000f6819c94eaa6c15e799d19c948.jpg',
    title: 'Kitchen',
    author: 'CSR',
  },
  {
    img: 'https://i.pinimg.com/564x/03/b7/0c/03b70ca7d1ab64bf695dd6baa3d0065a.jpg',
    title: 'Chairs',
    author: 'Awards & Launches',
  },
  {
    img: 'https://i.pinimg.com/564x/10/be/c2/10bec23b295ff3d41113118b8dc594d7.jpg',
    title: 'Laptop',
    author: 'Musical Concerts',
  },
  {
    img: 'https://i.pinimg.com/564x/3e/79/fc/3e79fc8ee970cd401841a35bd1875180.jpg',
    title: 'Doors',
    author: 'Media/Influencer Activation',
  },
  {
    img: 'https://i.pinimg.com/564x/db/28/c2/db28c2b8a7b1f56db5e3a5936a14b959.jpg',
    title: 'Blinds',
    author: 'Summits & Conclaves',
  },
  {
    img: 'https://i.pinimg.com/736x/8b/2f/81/8b2f81df53fe5a048b72bb642ef3ed65.jpg',
    title: 'Storage',
    author: 'Charity Fundraisers',
  },
  {
    img: 'https://i.pinimg.com/564x/10/65/a7/1065a7a32cc18f565bc229a9fbd98637.jpg',
    title: 'Coffee table',
    author: 'Product Launches',
  },
];

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',           // Added time field
    location: '',
    description: '',
    category: '',       // Added category field
    organizer: '',      // Added organizer field
    img: ''             // Added image field
  });
  const [selectedItem, setSelectedItem] = useState(null); // Added state for selected item

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Include image URL in the form data
    const eventData = { ...formData, img: selectedItem.img };

    axios.post('http://localhost:8080/events', eventData)
      .then(() => {
        setFormData({
          title: '',
          date: '',
          time: '',         // Reset time field
          location: '',
          description: '',
          category: '',     // Reset category field
          organizer: '',    // Reset organizer field
          img: ''
        });
        setIsBooking(false);
        new Noty({
          type: 'success',
          layout: 'topRight',
          text: 'Event created successfully!',
          timeout: 3000
        }).show();
      })
      .catch(error => console.error('Error submitting event:', error));
  };

  const handleCardClick = (item) => {
    setFormData({
      title: item.title,
      date: '',
      time: '',         // Reset time field
      location: '',
      description: '',
      category: '',     // Reset category field
      organizer: '',    // Reset organizer field
      img: item.img     // Add this line
    });
    setSelectedItem(item);  // Set selected item
    setIsBooking(true);
  };

  return (
    <div className="event-management-page">
      <header className="header">
        <h1>Event Management</h1>
      </header>

      {isBooking ? (
        <div className="booking-form">
          <h2>Book Event: {formData.title}</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Time:</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Organizer:</label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit">Submit Booking</button>
            <button type="button" onClick={() => setIsBooking(false)}>Back to Events</button>
          </form>
        </div>
      ) : (
        <div className="image-gallery-container">
          <div className="image-gallery">
            {itemData.map((item) => (
              <div
                key={item.img}
                className="image-item"
                onClick={() => handleCardClick(item)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                />
                <div className="image-text">
                  <span>{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
