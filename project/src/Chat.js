import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import vijayAvatar from './vijay.jpg';

const Chatbot = () => {
  const [name, setName] = useState('');

  const steps = [
    {
      id: '0',
      message: 'Vanakam Nanba',
      trigger: '1',
    },
    {
      id: '1',
      message: 'What is your name?',
      trigger: 'get_name',
    },
    {
      id: 'get_name',
      user: true,
      validator: (value) => {
        if (!value || value.trim() === '') {
          return 'Please enter a valid name.';
        }
        return true;
      },
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, how can I assist you with your event today?',
      trigger: 'event_inquiry',
    },
    {
      id: 'event_inquiry',
      options: [
        { value: 'event_details', label: 'Event Details', trigger: 'event_details' },
        { value: 'schedule', label: 'Schedule a New Event', trigger: 'schedule_event' },
        { value: 'register', label: 'Event Registration', trigger: 'event_registration' },
        { value: 'other', label: 'Other', trigger: 'other' },
      ],
    },
    {
      id: 'event_details',
      message: 'I can help with event details. What do you want to know?',
      trigger: 'details_options',
    },
    {
      id: 'details_options',
      options: [
        { value: 'upcoming_events', label: 'Upcoming Events', trigger: 'upcoming_events' },
        { value: 'past_events', label: 'Past Events', trigger: 'past_events' },
        { value: 'event_venues', label: 'Event Venues', trigger: 'event_venues' },
      ],
    },
    {
      id: 'upcoming_events',
      message: 'Here are the upcoming events: [list of events].',
      trigger: 'end',
    },
    {
      id: 'past_events',
      message: 'Here are some past events: [list of events].',
      trigger: 'end',
    },
    {
      id: 'event_venues',
      message: 'We have venues such as [list of venues].',
      trigger: 'end',
    },
    {
      id: 'schedule_event',
      message: 'To schedule a new event, please provide the details such as date, time, and location.',
      trigger: 'end',
    },
    {
      id: 'event_registration',
      message: 'For event registration, please provide your details and the event you want to register for.',
      trigger: 'end',
    },
    {
      id: 'other',
      message: 'Can you please provide more details on how I can assist you?',
      trigger: 'end',
    },
    {
      id: 'end',
      message: 'Thank you for reaching out! If you need more help, feel free to ask.',
      end: true,
    },
  ];

  const config = {
    botAvatar: vijayAvatar,
    botAvatarStyle: {
      borderRadius: '50%',
      width: '60px',
      height: '60px',
    },
    floating: true,
  };

  return (
    <div className="App">
      <div className="chatbot-container">
        <ChatBot
          steps={steps}
          botBubbleColor="#grey"
          botFontColor="#white"
          userBubbleColor="#grey"
          userFontColor="#white"
          botAvatar={vijayAvatar}
          botAvatarStyle={config.botAvatarStyle}
          {...config}
        />
      </div>
    </div>
  );
};

export default Chatbot;
