import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {
  FaTachometerAlt, FaCalendarAlt, FaUsers, FaChartBar, FaBuilding, FaBell, FaCog, FaDollarSign, FaRegHandshake, FaAlignLeft
} from 'react-icons/fa';
import './UserDashboard.css'; // Ensure this path is correct

import { useAuth } from '../../Homepage/AuthContext';
import Navbar2 from './Navbar2';
import Home from '../Admin/Home';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
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
        return <Home />;
      case 'event-management':
        return <Home />;
      case 'attendees':
        return <Home />;
      case 'reports':
        return <Home />;
      case 'venues':
        return <Home />;
      case 'notifications':
        return <Home />;
      case 'settings':
        return <Home />;
      case 'payments':
        return <Home />;
      case 'sponsors':
        return <Home />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="user-dashboard-container">
      <Navbar2 />
      <aside className={`user-side-panel-container ${collapsed ? 'collapsed' : ''}`}>
        <div className="user-side-panel-header">
          <button className="user-side-panel-collapse-button" onClick={handleCollapse}>
            <FaAlignLeft />
          </button>
          <div 
            className="user-navbar-logo"
            onClick={handleLogoClick}
          >
            User
          </div>
        </div>
        <ul className="user-side-panel-links">
          {[
            { key: 'dashboard', icon: <FaTachometerAlt />, text: 'Dashboard' },
            { key: 'event-management', icon: <FaCalendarAlt />, text: 'Event Management' },
            { key: 'attendees', icon: <FaUsers />, text: 'Attendees' },
            { key: 'reports', icon: <FaChartBar />, text: 'Reports' },
            { key: 'venues', icon: <FaBuilding />, text: 'Venues' },
            { key: 'notifications', icon: <FaBell />, text: 'Notifications' },
            { key: 'payments', icon: <FaDollarSign />, text: 'Payments' },
            { key: 'sponsors', icon: <FaRegHandshake />, text: 'Sponsors' },
            { key: 'settings', icon: <FaCog />, text: 'Settings' },
          ].map(({ key, icon, text }) => (
            <li key={key}>
              <button
                className={`user-side-panel-link ${activeView === key ? 'active' : ''}`}
                onClick={() => setActiveView(key)}
              >
                <div className={`user-side-panel-icon ${activeView === key ? 'active' : ''}`}>
                  {icon}
                </div>
                {!collapsed && <span className="user-side-panel-text">{text}</span>}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className={`user-dashboard-content ${collapsed ? 'collapsed' : ''}`}>
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
