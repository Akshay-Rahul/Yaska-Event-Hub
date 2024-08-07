// src/EventList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './EventList.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal201" onClick={onClose}>
      <div className="modal2-content01" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

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
    <div className="event-list-page02">
      <h2 className="event-h1-02">Event List</h2>
      <div className="event-list02">
        {events.map(event => (
          <div key={event.id} className="event-card02">
            <img src={event.img || 'https://via.placeholder.com/300'} alt={event.title} className="event-image02" />
            <div className="event-details02">
              <h4 className="event-name02">{event.title}</h4>
              <p className="event-location02"><strong>Date:</strong> {event.date}</p>
              <p className="event-location02"><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
              <p className="event-location02"><strong>Location:</strong> {event.location}</p>
              <p className="event-location02"><strong>Description:</strong> {event.description}</p>
              <p className="event-location02"><strong>Organizer:</strong> {event.organizerName}</p>
            </div>
            <div className="event-actions02">
              <FontAwesomeIcon icon={faEdit} className="icon-edit02" onClick={() => handleEdit(event)} />
              <FontAwesomeIcon icon={faTrash} className="icon-delete02" onClick={() => handleDelete(event.id)} />
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={!!editEvent} onClose={() => setEditEvent(null)}>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(editEvent); }}>
          <h2>Edit Event</h2>
          <div>
            <label>
              Title:
              <input type="text" name="title" value={editEvent?.title || ''} onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })} required />
            </label>
          </div>
          <div>
            <label>
              Date:
              <input type="date" name="date" value={editEvent?.date || ''} onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })} required />
            </label>
          </div>
          <div>
            <label>
              Start Time:
              <input type="time" name="startTime" value={editEvent?.startTime || ''} onChange={(e) => setEditEvent({ ...editEvent, startTime: e.target.value })} required />
            </label>
          </div>
          <div>
            <label>
              End Time:
              <input type="time" name="endTime" value={editEvent?.endTime || ''} onChange={(e) => setEditEvent({ ...editEvent, endTime: e.target.value })} required />
            </label>
          </div>
          <div>
            <label>
              Location:
              <input type="text" name="location" value={editEvent?.location || ''} onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })} required />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea name="description" value={editEvent?.description || ''} onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })} required />
            </label>
          </div>
          <div>
            <label>
              Organizer Name:
              <input type="text" name="organizerName" value={editEvent?.organizerName || ''} onChange={(e) => setEditEvent({ ...editEvent, organizerName: e.target.value })} required />
            </label>
          </div>
          <div className="button-group01">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditEvent(null)}>Cancel</button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={!!confirmDelete} onClose={cancelDelete}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this event?</p>
        <div className="button-group01">
          <button onClick={confirmDeleteEvent}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      </Modal>
    </div>
  );
};

export default EventList;
