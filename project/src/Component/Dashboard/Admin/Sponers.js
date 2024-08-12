import React, { useState } from 'react';
import './Sponsers.css';

const Sponsors = () => {
  const [sponsors] = useState([
    {
      id: 1,
      name: 'Google',
      details: 'Platinum Sponsor',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      email: 'contact@google.com',
      phone: '123-456-7890'
    },
    {
      id: 3,
      name: 'Apple',
      details: 'Silver Sponsor',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      email: 'contact@apple.com',
      phone: '123-456-7890'
    },
    {
      id: 4,
      name: 'Amazon',
      details: 'Gold Sponsor',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      email: 'contact@amazon.com',
      phone: '123-456-7890'
    },
    {
      id: 5,
      name: 'Facebook',
      details: 'Silver Sponsor',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
      email: 'contact@facebook.com',
      phone: '123-456-7890'
    },
    {
      id: 6,
      name: 'IBM',
      details: 'Bronze Sponsor',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
      email: 'contact@ibm.com',
      phone: '123-456-7890'
    },
    {
      id: 8,
      name: 'Netflix',
      details: 'Gold Sponsor',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
      email: 'contact@netflix.com',
      phone: '123-456-7890'
    },
    {
      id: 9,
      name: 'Microsoft',
      details: 'Gold Sponsor',
      logo: 'https://static.vecteezy.com/system/resources/thumbnails/027/127/493/small_2x/microsoft-logo-microsoft-icon-transparent-free-png.png',
      email: 'contact@microsoft.com',
      phone: '123-456-7890'
    },
    {
      id: 10,
      name: 'Coca-Cola',
      details: 'Platinum Sponsor',
      logo: 'https://i.pinimg.com/736x/1e/c1/d2/1ec1d2ce366d1f603b1bde70ae508063.jpg',
      email: 'contact@coca-cola.com',
      phone: '123-456-7890'
    },
    {
      id: 12,
      name: 'Samsung',
      details: 'Gold Sponsor',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
      email: 'contact@samsung.com',
      phone: '123-456-7890'
    }
  ]);

  return (
    <div className="sponsors-container">
      <h2>SPONSORS</h2>
      <ul className="sponsors-list">
        {sponsors.map(sponsor => (
          <li key={sponsor.id} className="sponsor-item">
            <div className="sponsor-logo">
              <img src={sponsor.logo} alt={`${sponsor.name} Logo`} />
            </div>
            <div className="sponsor-details">
              <h3>{sponsor.name}</h3>
              <p>{sponsor.details}</p>
              <p>Email: {sponsor.email}</p>
              <p>Phone: {sponsor.phone}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sponsors;
