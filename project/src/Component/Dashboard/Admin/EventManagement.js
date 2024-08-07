import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Noty from 'noty';
import './EventManagement.css'; // Import CSS file
import 'noty/lib/noty.css'; // Import Noty CSS
import 'noty/lib/themes/mint.css'; // Import Noty theme

const itemData = [
  {
    img: 'https://i.pinimg.com/736x/e3/71/32/e37132a9e942ea43aee49a98ff257d49.jpg',
    title: 'Cultural Event',
    author: 'Exhibition and Experiential Spaces',
  },
  {
    img: 'https://i.pinimg.com/564x/2d/84/1d/2d841d58c070e9cf046406d04a1c0b5d.jpg',
    title: 'Formal Presentation',
    author: 'Govt. and Institutional',
  },
  {
    img: 'https://i.pinimg.com/564x/8c/f5/c0/8cf5c06674084abbe5b73ba0ad0e6dc3.jpg',
    title: 'Virtual Event',
    author: 'Virtual',
  },
  {
    img: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Corporate Meeting',
    author: 'CSR',
  },
  {
    img: 'https://i.pinimg.com/564x/03/b7/0c/03b70ca7d1ab64bf695dd6baa3d0065a.jpg',
    title: 'Awards & Launches',
    author: 'Awards & Launches',
  },
  {
    img: 'https://i.pinimg.com/564x/10/be/c2/10bec23b295ff3d41113118b8dc594d7.jpg',
    title: 'Musical and Art Shows',
    author: 'Musical Concerts',
  },
  {
    img: 'https://i.pinimg.com/564x/3e/79/fc/3e79fc8ee970cd401841a35bd1875180.jpg',
    title: 'Media/Influencer Pop up',
    author: 'Media/Influencer Activation',
  },
  {
    img: 'https://i.pinimg.com/564x/db/28/c2/db28c2b8a7b1f56db5e3a5936a14b959.jpg',
    title: 'Summits & Conclaves',
    author: 'Summits & Conclaves',
  },
  {
    img: 'https://i.pinimg.com/736x/8b/2f/81/8b2f81df53fe5a048b72bb642ef3ed65.jpg',
    title: 'Charity Fundraisers',
    author: 'Charity Fundraisers',
  },
  {
    img: 'https://i.pinimg.com/564x/10/65/a7/1065a7a32cc18f565bc229a9fbd98637.jpg',
    title: 'Product Launches',
    author: 'Product Launches',
  },
  {
    img: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Conferences',
    author: 'Conference',
  },
  {
    img: 'https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Networking',
    author: 'networking',
  },
  {
    img: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Workshops',
    author: 'workshops',
  },
  {
    img: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Tradeshows',
    author: 'tradeshows',
  },
];

const locations = [
  'New York, NY',
  'San Francisco, CA',
  'Chicago, IL',
  'Washington, D.C.',
  'Los Angeles, CA',
  'Orlando, FL',
  'Atlanta, GA',
  'San Diego, CA',
  'Boston, MA',
];

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '', // Changed from 'time' to 'startTime'
    endTime: '', // Added endTime field
    location: '',
    description: '',
    category: '',
    organizer: '',
    img: '',
  });
  const [selectedItem, setSelectedItem] = useState(null);

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
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      title: formData.title,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime, // Include endTime in event data
      location: formData.location,
      description: formData.description,
      category: formData.category,
      organizerName: formData.organizer,
      img: selectedItem.img,
    };

    axios
      .post('http://localhost:8080/events', eventData)
      .then(() => {
        setFormData({
          title: '',
          date: '',
          startTime: '',
          endTime: '', // Reset endTime field
          location: '',
          description: '',
          category: '',
          organizer: '',
          img: '',
        });
        setIsBooking(false);
        new Noty({
          type: 'success',
          layout: 'topRight',
          text: 'Event created successfully!',
          timeout: 3000,
        }).show();
      })
      .catch((error) => console.error('Error submitting event:', error));
  };

  const handleCardClick = (item) => {
    setFormData({
      title: item.title,
      date: '',
      startTime: '', // Reset startTime field
      endTime: '', // Reset endTime field
      location: '',
      description: '',
      category: '',
      organizer: '',
      img: item.img,
    });
    setSelectedItem(item);
    setIsBooking(true);
  };

  return (
    <div className="event-management-page01">
      <header className="event-header01">
        <h1>SELECT EVENT TYPE</h1>
      </header>

      {isBooking && (
        <div className="modal201">
          <div className="modal2-content01">
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
                <label>Start Time:</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label>End Time:</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label>Location:</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  required
                >
                  <option value="" disabled>Select a location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
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
                <label>Organizer:</label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="button-group01">
                <button type="submit">Submit Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!isBooking && (
        <div className="event-list01">
          {itemData.map((item) => (
            <div
              key={item.img}
              className="event-card01"
              onClick={() => handleCardClick(item)}
            >
              <img src={item.img} alt={item.title} className="event-image01" />
              <h3>{item.title}</h3>
              <p>{item.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventManagement;
