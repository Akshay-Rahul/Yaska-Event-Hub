import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

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

  const handleEdit = (event) => {
    setEditEvent(event);
  };

  const handleDelete = (eventId) => {
    setConfirmDelete(eventId);
  };

  const confirmDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:8080/events/${confirmDelete}`);
      setEvents(events.filter(event => event.id !== confirmDelete));
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleSave = async (updatedEvent) => {
    try {
      await axios.put(`http://localhost:8080/events/${updatedEvent.id}`, updatedEvent);
      setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
      setEditEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  if (!events || events.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-list-page">
      <h2>Event List</h2>
      <div className="event-list">
        {events.map(event => (
          <div key={event.id} className="event-item">
            <img src={event.img || 'https://via.placeholder.com/200'} alt={event.title} className="event-image" />
            <div className="event-info">
              <h4>{event.title}</h4>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Organizer:</strong> {event.organizerName}</p>
            </div>
            <div className="event-actions">
              <FontAwesomeIcon icon={faEdit} className="icon-edit" onClick={() => handleEdit(event)} />
              <FontAwesomeIcon icon={faTrash} className="icon-delete" onClick={() => handleDelete(event.id)} />
            </div>
          </div>
        ))}
      </div>
      {editEvent && (
        <div className="edit-event-modal">
          <form onSubmit={(e) => { e.preventDefault(); handleSave(editEvent); }}>
            <h3>Edit Event</h3>
            <label>
              Title:
              <input type="text" name="title" value={editEvent.title} onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })} required />
            </label>
            <label>
              Date:
              <input type="date" name="date" value={editEvent.date} onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })} required />
            </label>
            <label>
              Start Time:
              <input type="time" name="startTime" value={editEvent.startTime} onChange={(e) => setEditEvent({ ...editEvent, startTime: e.target.value })} required />
            </label>
            <label>
              End Time:
              <input type="time" name="endTime" value={editEvent.endTime} onChange={(e) => setEditEvent({ ...editEvent, endTime: e.target.value })} required />
            </label>
            <label>
              Location:
              <input type="text" name="location" value={editEvent.location} onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })} required />
            </label>
            <label>
              Description:
              <textarea name="description" value={editEvent.description} onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })} required />
            </label>
            <label>
              Category:
              <input type="text" name="category" value={editEvent.category} onChange={(e) => setEditEvent({ ...editEvent, category: e.target.value })} required />
            </label>
            <label>
              Organizer Name:
              <input type="text" name="organizerName" value={editEvent.organizerName} onChange={(e) => setEditEvent({ ...editEvent, organizerName: e.target.value })} required />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditEvent(null)}>Cancel</button>
          </form>
        </div>
      )}
      {confirmDelete && (
        <div className="confirm-delete">
          <p>Are you sure you want to delete this event?</p>
          <button onClick={confirmDeleteEvent}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default EventList;
