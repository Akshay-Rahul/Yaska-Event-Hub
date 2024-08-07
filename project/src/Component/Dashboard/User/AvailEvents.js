import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AvailEvents.css';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // React Router navigate hook

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

  const handleJoin = (event) => {
    navigate('/tickets', { state: { event } });
  };

  return (
    <div className="event-management-page06">
      <h2>Event List</h2>
      <div className="event-list06">
        {events.map(event => (
          <div key={event.id} className="event-item06">
            <img src={event.img || 'https://via.placeholder.com/200'} alt={event.title} className="event-image06" />
            <div className="event-info06">
              <h4>{event.title}</h4>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Organizer:</strong> {event.organizerName}</p>
            </div>
            <button className="join-button06" onClick={() => handleJoin(event)}>Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
