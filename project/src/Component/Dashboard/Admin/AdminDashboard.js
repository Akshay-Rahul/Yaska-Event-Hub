import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {
  FaTachometerAlt, FaCalendarAlt, FaUsers, FaChartBar, FaBuilding, FaBell, FaCog, FaDollarSign, FaRegHandshake, FaAlignLeft
} from 'react-icons/fa';
import './AdminDashboard.css'; // Ensure this path is correct

import { useAuth } from '../../Homepage/AuthContext';
import Navbar2 from './Navbar2';
import Home from './Home';


const AdminDashboard = () => {
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
    <div className="admin-dashboard-container">
      <Navbar2 />
      <aside className={`admin-side-panel-container ${collapsed ? 'collapsed' : ''}`}>
        <div className="admin-side-panel-header">
          <button className="admin-side-panel-collapse-button" onClick={handleCollapse}>
            <FaAlignLeft />
          </button>
          <div 
            className="admin-navbar-logo">
                Admin
          </div>
        </div>
        <ul className="admin-side-panel-links">
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
                className={`admin-side-panel-link ${activeView === key ? 'active' : ''}`}
                onClick={() => setActiveView(key)}
              >
                <div className={`admin-side-panel-icon ${activeView === key ? 'active' : ''}`}>
                  {icon}
                </div>
                {!collapsed && <span className="admin-side-panel-text">{text}</span>}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className={`admin-dashboard-content ${collapsed ? 'collapsed' : ''}`}>
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
