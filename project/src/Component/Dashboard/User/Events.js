import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Event.css';

const EventPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated user data, replace with actual fetch
  const userId = "1"; // Replace with actual user ID from your auth system

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(`http://localhost:8080/users/${userId}`);
        const userData = userResponse.data;
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div className="event-page04">
      <h2>Joined Events</h2>
      {user.joinedEvents && user.joinedEvents.length > 0 ? (
        <div className="event-list04">
          {user.joinedEvents.map((event) => (
            <div key={event.id} className="event-item04">
              <img
                src={event.eventImage || 'https://via.placeholder.com/200'}
                alt={event.eventName}
                className="event-image04"
              />
              <div className="event-details04">
                <h3>{event.eventName}</h3>
                <p>
                  <strong>Date:</strong> {event.eventDate}
                </p>
                <p>
                  <strong>Location:</strong> {event.eventLocation}
                </p>
                <p>
                  <strong>Description:</strong> {event.eventDescription}
                </p>
                <p>
                  <strong>Organizer:</strong> {event.eventOrganizer || 'Unknown'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events joined yet.</p>
      )}
    </div>
  );
};

export default EventPage;
