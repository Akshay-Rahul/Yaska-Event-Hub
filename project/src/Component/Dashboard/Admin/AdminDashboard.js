import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {
  FaTachometerAlt, FaCalendarAlt, FaUsers, FaChartBar, FaBuilding, FaDollarSign, FaRegHandshake
} from 'react-icons/fa';
import { VscFeedback } from "react-icons/vsc";
import { MdEvent } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import './AdminDashboard.css'; // Ensure this path is correct

import { useAuth } from '../../Homepage/AuthContext';
import Navbar2 from './Navbar2';
import AdminOverview from './AdminOverview';
import Home from './Home';
import Scheduler from './AdminScheduler';
import EventManagement from './EventManagement';
import EventList from './EventList';
import Reports from './Reports';
import VenuesPage from './Venues';
import FeedbackReceiver from './Feedback2';
import Attendees from './Attend';

const AdminDashboard = () => {
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
      if (!event.target.closest('.admin-account-icon')) {
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
        return <AdminOverview />;
        case 'event-management':
          return <EventManagement />;
        case 'events':
          return <EventList />;
        case 'calendar':
          return <Scheduler />;
        case 'attendees':
          return <Attendees />;
        case 'reports':
          return <Reports />;
        case 'venues':
          return <VenuesPage />;
        case 'payments':
          return <Home />;
        case 'sponsors':
          return <Home />;
        case 'feedback':
          return <FeedbackReceiver />;
        default:
          return <Home />;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <Navbar2 />
      <aside className="admin-side-panel-container">
        <div className="admin-side-panel-header">
          <div className="admin-navbar-logo">
            Admin
          </div>
        </div>
        <ul className="admin-side-panel-links">
          {[
             { key: 'dashboard', icon: <FaTachometerAlt />, text: 'Dashboard' },
             { key: 'event-management', icon: <MdEventAvailable />, text: 'Event Management' },
             { key: 'events', icon: <MdEvent />, text: 'Events' },
             { key: 'calendar', icon: <FaCalendarAlt />, text: 'Calendar' },
             { key: 'attendees', icon: <FaUsers />, text: 'Attendees' },
             { key: 'reports', icon: <FaChartBar />, text: 'Reports' },
             { key: 'venues', icon: <FaBuilding />, text: 'Venues' },
             { key: 'payments', icon: <FaDollarSign />, text: 'Payments' },
             { key: 'sponsors', icon: <FaRegHandshake />, text: 'Sponsors' },
             { key: 'feedback', icon: <VscFeedback />, text: 'Feedback' },
          ].map(({ key, icon, text }) => (
            <li key={key}>
              <button
                className={`admin-side-panel-link ${activeView === key ? 'active' : ''}`}
                onClick={() => setActiveView(key)}
              >
                <div className={`admin-side-panel-icon ${activeView === key ? 'active' : ''}`}>
                  {icon}
                </div>
                <span className="admin-side-panel-text">{text}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="admin-dashboard-content">
        <main className="admin-main-section">
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

export default AdminDashboard;
