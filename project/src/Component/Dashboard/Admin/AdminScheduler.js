import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import './Scheduler.css';

const API_URL = 'http://localhost:8080/calendarevents';

const AdminScheduler = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: null, allDay: true });
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_URL);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (arg) => {
    setNewEvent({ ...newEvent, date: arg.date, allDay: arg.allDay });
    setShowModal(true);
  };

  const handleEventClick = (clickInfo) => {
    setEventToDelete(clickInfo.event);
    setShowDeleteModal(true);
  };

  const handleAddEvent = async () => {
    if (newEvent.title) {
      try {
        const response = await axios.post(API_URL, newEvent);
        setEvents([...events, response.data]);
        setShowModal(false);
        setNewEvent({ title: '', date: null, allDay: true });
      } catch (error) {
        console.error('Error adding event:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, title: e.target.value });
  };

  const handleDeleteEvent = async () => {
    if (eventToDelete) {
      try {
        await axios.delete(`${API_URL}/${eventToDelete.id}`);
        setEvents(events.filter(event => event.id !== eventToDelete.id));
        setShowDeleteModal(false);
        setEventToDelete(null);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <div className="scheduler-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
      />

      {showModal && (
        <div className="modal1">
          <div className="modal1-content">
            <h2>Add Event</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={handleInputChange}
            />
            <button onClick={handleAddEvent}>Add Event</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal1">
          <div className="modal1-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete the event '{eventToDelete.title}'?</p>
            <div className="button-group">
              <button onClick={handleDeleteEvent}>Delete</button>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminScheduler;
