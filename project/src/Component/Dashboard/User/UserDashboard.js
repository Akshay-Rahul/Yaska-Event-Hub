import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {
  FaTachometerAlt, FaCalendarAlt, FaUsers, FaChartBar, FaBuilding, FaBell, FaCog, FaDollarSign, FaRegHandshake
} from 'react-icons/fa';
import { VscFeedback } from "react-icons/vsc";
import { MdEvent } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import './UserDashboard.css'; // Ensure this path is correct

import { useAuth } from '../../Homepage/AuthContext';
import Navbar2 from './Navbar2';
import Home from '../Admin/Home';
import UserOverview from './UserOverview';
import UserScheduler from './UserScheduler';
import EventPage from './Events';
import MyEvents from './AvailEvents';
import Reports from './Reports';
import FeedbackForm from './FeedbackForm';
import VenuesPage from '../Admin/Venues';
import Attendees from './Attend';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-account-icon')) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <UserOverview />;
      case 'events':
        return <MyEvents />;
        case 'myevents':
        return <EventPage />;
      case 'calendar':
        return <UserScheduler />;
      case 'attendees':
        return <Attendees />;
      case 'reports':
        return <Reports />;
      case 'venues':
        return <VenuesPage />;
      case 'sponsors':
        return <Home />;
      case 'feedback':
        return <FeedbackForm />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="user-dashboard-container">
      <Navbar2 />
      <aside className="user-side-panel-container">
        <div className="user-side-panel-header">
          <div className="user-navbar-logo">
            User
          </div>
        </div>
        <ul className="user-side-panel-links">
          {[
            { key: 'dashboard', icon: <FaTachometerAlt />, text: 'Dashboard' },
            { key: 'events', icon: <MdEvent />, text: 'Events' },
            { key: 'myevents', icon: <MdEventAvailable />, text: 'My Events' },
            { key: 'calendar', icon: <FaCalendarAlt />, text: 'Calendar' },
            { key: 'attendees', icon: <FaUsers />, text: 'Attendees' },
            { key: 'reports', icon: <FaChartBar />, text: 'Reports' },
            { key: 'venues', icon: <FaBuilding />, text: 'Venues' },
            { key: 'sponsors', icon: <FaRegHandshake />, text: 'Sponsors' },
            { key: 'feedback', icon: <VscFeedback />, text: 'Feedback' },
      
          ].map(({ key, icon, text }) => (
            <li key={key}>
              <button
                className={`user-side-panel-link ${activeView === key ? 'active' : ''}`}
                onClick={() => setActiveView(key)}
              >
                <div className={`user-side-panel-icon ${activeView === key ? 'active' : ''}`}>
                  {icon}
                </div>
                <span className="user-side-panel-text">{text}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="user-dashboard-content">
        <main className="user-main-section">
          <CSSTransition
            in={true}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            {renderContent()}
          </CSSTransition>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
