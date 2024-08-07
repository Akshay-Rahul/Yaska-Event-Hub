import React from 'react';
import './Venues.css';

const VenuesPage = () => {
  const venues = [
    {
      id: 1,
      name: 'Javits Center',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      name: 'Moscone Center',
      location: 'San Francisco, CA',
      image: 'https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      name: 'McCormick Place',
      location: 'Chicago, IL',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 4,
      name: 'Walter E. Washington Convention Center',
      location: 'Washington, D.C.',
      image: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 5,
      name: 'Borough Market Center',
      location: 'Los Angeles, CA',
      image: 'https://images.pexels.com/photos/439818/pexels-photo-439818.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 6,
      name: 'Orange County Park',
      location: 'Orlando, FL',
      image: 'https://images.pexels.com/photos/3453047/pexels-photo-3453047.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 7,
      name: 'Georgia World Congress Shelter',
      location: 'Atlanta, GA',
      image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 8,
      name: 'San Diego Convention Center',
      location: 'San Diego, CA',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 9,
      name: 'Boston Convention and Exhibition Center',
      location: 'Boston, MA',
      image: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <div className="venues-page">
      <h1 className='venue-h1'>Venues</h1>
      <div className="venues-list">
        {venues.map((venue) => (
          <div key={venue.id} className="venue-card">
            <img src={venue.image} alt={venue.name} className="venue-image" />
            <div className="venue-details">
              <h2 className="venue-name">{venue.name}</h2>
              <p className="venue-location">{venue.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenuesPage;
