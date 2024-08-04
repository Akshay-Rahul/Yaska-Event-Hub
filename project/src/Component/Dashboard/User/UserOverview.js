import React, { useState, useEffect } from 'react';
import {
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './UserOverview.css';

// Pie chart data
const pieData = [
  { name: 'Training Sessions', value: 18 },
  { name: 'Event Categories', value: 6 },
  { name: 'Sponsors', value: 12 },
  { name: 'Event Venues', value: 10 },
  { name: 'Workshops', value: 15 }
];

const pieData1 = [
  { name: 'Male Participant', value: 660 },
  { name: 'Female Participant', value: 220 }
];

const counters = [
  { id: 1, name: 'Akshay', role: 'Lead Organizer' },
  { id: 2, name: 'Aditya', role: 'Co-Organizer' },
  { id: 3, name: 'Deepak', role: 'Event Coordinator' },
  { id: 4, name: 'Harish', role: 'Logistics Manager' },
  { id: 5, name: 'Aswin', role: 'Marketing Lead' }
];

// Geocode function to fetch country name from coordinates
const getCountryName = async (lat, lng) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();
    return data.address.country || 'Unknown';
  } catch (error) {
    console.error('Geocoding error:', error);
    return 'Unknown';
  }
};

// Custom icon for Leaflet
const customIcon = new L.DivIcon({
  className: 'custom-icon',
  html: '<div style="font-size:24px; color:#ff4500;"><i class="fas fa-map-marker-alt"></i></div>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// MetricsSection Component
const MetricsSection = ({ metrics }) => (
  <div className="stats-container">
    {Object.entries(metrics).map(([key, value]) => (
      <StatItem key={key} number={value} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} />
    ))}
  </div>
);

// StatItem Component
const StatItem = ({ number, label }) => (
  <div className="stat-item">
    <h3>{number}</h3>
    <p>{label}</p>
  </div>
);

const UserOverview = () => {
  const [keyMetrics, setKeyMetrics] = useState({
    events: 30,
    attendees: 500,
    ongoingEvents: 5,
    upcomingEvents: 10,
    pastEvents: 20,
  });

  const [locations, setLocations] = useState({ customers: [], visitors: [] });

  useEffect(() => {
    const fetchData = async () => {
      const customerData = [
        { id: 1, lat: 40.712776, lng: -74.005974 }, // New York, USA
        { id: 2, lat: 51.507351, lng: -0.127758 }, // London, UK
        { id: 3, lat: 35.689487, lng: 139.691711 }, // Tokyo, Japan
        { id: 4, lat: -33.868820, lng: 151.209296 }, // Sydney, Australia
        { id: 5, lat: 55.755825, lng: 37.617298 }, // Moscow, Russia
      ];

      const visitorData = [
        { id: 1, lat: 48.856613, lng: 2.352222 }, // Paris, France
        { id: 2, lat: 40.416775, lng: -3.703790 }, // Madrid, Spain
        { id: 3, lat: 37.774929, lng: -122.419418 } // San Francisco, USA
      ];

      const fetchCountryNames = async (data) => {
        return Promise.all(data.map(async (item) => {
          const country = await getCountryName(item.lat, item.lng);
          return { ...item, country };
        }));
      };

      const customersWithCountry = await fetchCountryNames(customerData);
      const visitorsWithCountry = await fetchCountryNames(visitorData);

      setLocations({ customers: customersWithCountry, visitors: visitorsWithCountry });
    };

    fetchData();
  }, []);

  const barData = [
    { name: 'Events', value: keyMetrics.events },
    { name: 'Attendees', value: keyMetrics.attendees },
    { name: 'Ongoing Events', value: keyMetrics.ongoingEvents },
    { name: 'Upcoming Events', value: keyMetrics.upcomingEvents },
    { name: 'Past Events', value: keyMetrics.pastEvents }
  ];

  return (
    <div className="overview1">
      <h1>YASKA CORPORATE EVENTS</h1>
      <p className="overview-description">Overview of key metrics and information for your corporate events.</p>

      <MetricsSection metrics={keyMetrics} />

      <div className="charts-container">
        <div className="chart-item">
          <BarChart width={600} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <RechartsLegend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
        <RechartsPieChart width={400} height={400}>
          <RechartsPie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666'][index]} />
            ))}
          </RechartsPie>
          <RechartsTooltip />
          <RechartsLegend />
        </RechartsPieChart>
      </div>
      <div className="dashe">
        <div className="counterList1">
          <h2>Top 5 Organizers</h2>
          {counters.map((counter) => (
            <div className="counter1" key={counter.id}>
              <p>{counter.name}</p>
              <span>{counter.role}</span>
            </div>
          ))}
        </div>
        <div className="pieChart1">
          <h2>By Gender</h2>
          <RechartsPieChart width={400} height={400}>
            <RechartsPie
              data={pieData1}
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {pieData1.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#36A2EB', '#FF6384'][index]} />
              ))}
            </RechartsPie>
            <RechartsTooltip />
            <RechartsLegend />
          </RechartsPieChart>
        </div>
      </div>
      
      <div className='map-head'>Our Corporate Events</div>

      <div className="map-container">
        <MapContainer 
          center={[20, 0]} 
          zoom={2} 
          style={{ height: '400px', width: '100%' }}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          boxZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='<a href="https://www.openstreetmap.org/"></a>'
          />
          {locations.customers.map(customer => (
            <Marker key={customer.id} position={[customer.lat, customer.lng]} icon={customIcon}>
              <Popup>
                {customer.country}<br />({customer.lat}, {customer.lng})
              </Popup>
            </Marker>
          ))}
          {locations.visitors.map(visitor => (
            <Marker key={visitor.id} position={[visitor.lat, visitor.lng]} icon={customIcon}>
              <Popup>
                {visitor.country}<br />({visitor.lat}, {visitor.lng})
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default UserOverview;
