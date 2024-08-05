import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import './Scheduler.css';

const API_URL = 'http://localhost:8080/calendarevents';

const AdminScheduler = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', allDay: false });
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_URL);
        setEvents(
          response.data.map((event) => ({
            ...event,
            start: new Date(event.start).toISOString(),
            end: new Date(event.end).toISOString(),
          }))
        );
      } catch (error) {
        new Noty({
          text: 'Error fetching events. Please try again.',
          type: 'error',
          timeout: 3000,
        }).show();
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (arg) => {
    const startDate = new Date(arg.dateStr);
    const endDate = arg.allDay ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : startDate;

    setNewEvent({
      ...newEvent,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      allDay: arg.allDay,
    });
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
        setNewEvent({ title: '', start: '', end: '', allDay: false });

        new Noty({
          text: 'Event added successfully!',
          type: 'success',
          timeout: 3000,
        }).show();
      } catch (error) {
        new Noty({
          text: 'Error adding event. Please try again.',
          type: 'error',
          timeout: 3000,
        }).show();
      }
    } else {
      new Noty({
        text: 'Event title is required.',
        type: 'warning',
        timeout: 3000,
      }).show();
    }
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, title: e.target.value });
  };

  const handleDeleteEvent = async () => {
    if (eventToDelete) {
      // Optimistically update the UI
      const filteredEvents = events.filter((event) => event.id !== eventToDelete.id);
      setEvents(filteredEvents);
      setShowDeleteModal(false);
      setEventToDelete(null);

      try {
        await axios.delete(`${API_URL}/${eventToDelete.id}`);

        new Noty({
          text: 'Event deleted successfully!',
          type: 'success',
          timeout: 3000,
        }).show();
      } catch (error) {
        // Revert the UI change if the API call fails
        setEvents([...filteredEvents, eventToDelete]);
        new Noty({
          text: 'Error deleting event. Please try again.',
          type: 'error',
          timeout: 3000,
        }).show();
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
