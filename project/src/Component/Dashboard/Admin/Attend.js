import React, { useState } from "react";
import "./Attend.css";

const Attendees = () => {
  // Sample data for attendees
  const attendees = [
    { name: "John Doe", event: "Tech Conference", amountPaid: "$100", registrationDate: "2024-07-10", venueId: 1 },
    { name: "Jane Smith", event: "Business Summit", amountPaid: "$150", registrationDate: "2024-07-12", venueId: 2 },
    { name: "Alice Johnson", event: "Networking Event", amountPaid: "$200", registrationDate: "2024-07-14", venueId: 3 },
    { name: "Robert Brown", event: "Workshop", amountPaid: "$120", registrationDate: "2024-07-15", venueId: 4 },
    { name: "Emily Davis", event: "Seminar", amountPaid: "$180", registrationDate: "2024-07-18", venueId: 5 },
    { name: "Michael Wilson", event: "Tech Conference", amountPaid: "$100", registrationDate: "2024-07-20", venueId: 6 },
    { name: "Sarah Miller", event: "Business Summit", amountPaid: "$150", registrationDate: "2024-07-22", venueId: 7 },
    { name: "David Lee", event: "Networking Event", amountPaid: "$200", registrationDate: "2024-07-25", venueId: 8 },
    { name: "Olivia Clark", event: "Workshop", amountPaid: "$120", registrationDate: "2024-07-27", venueId: 9 },
    { name: "Chris Walker", event: "Seminar", amountPaid: "$180", registrationDate: "2024-07-30", venueId: 1 },
    { name: "Sophia Turner", event: "Tech Conference", amountPaid: "$100", registrationDate: "2024-08-01", venueId: 2 },
    { name: "Daniel Anderson", event: "Business Summit", amountPaid: "$150", registrationDate: "2024-08-03", venueId: 3 },
    { name: "Grace Robinson", event: "Networking Event", amountPaid: "$200", registrationDate: "2024-08-05", venueId: 4 },
    { name: "James Harris", event: "Workshop", amountPaid: "$120", registrationDate: "2024-08-07", venueId: 5 },
    { name: "Emma Lewis", event: "Seminar", amountPaid: "$180", registrationDate: "2024-08-09", venueId: 6 },
    { name: "Liam Walker", event: "Tech Conference", amountPaid: "$100", registrationDate: "2024-08-11", venueId: 7 },
    { name: "Ava Martinez", event: "Business Summit", amountPaid: "$150", registrationDate: "2024-08-13", venueId: 8 },
    { name: "Noah White", event: "Networking Event", amountPaid: "$200", registrationDate: "2024-08-15", venueId: 9 },
    { name: "Mia Thompson", event: "Workshop", amountPaid: "$120", registrationDate: "2024-08-17", venueId: 1 },
    { name: "Lucas Hall", event: "Seminar", amountPaid: "$180", registrationDate: "2024-08-19", venueId: 2 },
    { name: "Ethan Allen", event: "Tech Conference", amountPaid: "$100", registrationDate: "2024-08-21", venueId: 3 },
    { name: "Charlotte King", event: "Business Summit", amountPaid: "$150", registrationDate: "2024-08-23", venueId: 4 },
    { name: "Amelia Scott", event: "Networking Event", amountPaid: "$200", registrationDate: "2024-08-25", venueId: 5 },
  ];

  // Venue data
  const venues = [
    { id: 1, name: "Javits Center", location: "New York, NY" },
    { id: 2, name: "Moscone Center", location: "San Francisco, CA" },
    { id: 3, name: "McCormick Place", location: "Chicago, IL" },
    { id: 4, name: "Walter E. Washington Convention Center", location: "Washington, D.C." },
    { id: 5, name: "Borough Market Center", location: "Los Angeles, CA" },
    { id: 6, name: "Orange County Park", location: "Orlando, FL" },
    { id: 7, name: "Georgia World Congress Shelter", location: "Atlanta, GA" },
    { id: 8, name: "San Diego Convention Center", location: "San Diego, CA" },
    { id: 9, name: "Boston Convention and Exhibition Center", location: "Boston, MA" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="attendees-container">
      <h2>Attendees List</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <table className="attendees-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Event Joined</th>
            <th>Amount Paid</th>
            <th>Date of Registration</th>
            <th>Venue Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendees.map((attendee, index) => {
            const venue = venues.find((v) => v.id === attendee.venueId);
            return (
              <tr key={index}>
                <td>{attendee.name}</td>
                <td>{attendee.event}</td>
                <td>{attendee.amountPaid}</td>
                <td>{attendee.registrationDate}</td>
                <td>{venue?.name || "N/A"}</td>
                <td>{venue?.location || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Attendees;