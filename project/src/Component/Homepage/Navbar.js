import React, { useState, useEffect } from 'react';
import { Link, animateScroll as scrollToTop } from 'react-scroll';
import './Navbar.css';

const Navbar = () => {
  const [navbarClass, setNavbarClass] = useState('navbar1 transparent');
  const [activeLink, setActiveLink] = useState('');
  const [logoActive, setLogoActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarClass('navbar1 black-background');
      } else {
        setNavbarClass('navbar1 transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    scrollToTop.scrollToTop();
    setLogoActive(true);
    setTimeout(() => setLogoActive(false), 2000); // Highlight for 2 seconds
  };

  return (
    <nav className={navbarClass}>
      <div className="navbar-container1">
        <div 
          className={`navbar-logo1 ${logoActive ? 'logo-active' : ''}`} 
          onClick={handleLogoClick}
        >
          YASKA
        </div>
        <ul className="nav-menu1">
          {[
            { to: 'about', label: 'About' },
            { to: 'services', label: 'Service' },
            { to: 'test', label: 'Testimonials' },
            { to: 'signin', label: 'Sign In' },
            { to: 'contact', label: 'Contact Us' }
          ].map(({ to, label }) => (
            <li className="nav-item1" key={to}>
              <Link
                to={to}
                smooth={true}
                duration={500}
                spy={true}
                offset={-80} // Adjust offset if necessary
                className={`nav-links1 ${activeLink === to ? 'active' : ''}`}
                onSetActive={() => setActiveLink(to)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
