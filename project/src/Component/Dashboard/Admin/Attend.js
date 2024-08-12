import React, { useState } from "react";
import Modal from "react-modal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./Attend.css";

// Setting up the modal root element for accessibility
Modal.setAppElement("#root");

const Attendees = () => {
  // Sample data for attendees
  const [attendees, setAttendees] = useState([
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
  ]);

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
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [editedAttendee, setEditedAttendee] = useState(null);

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setEditedAttendee({ ...attendees[index] });
    setEditModalIsOpen(true);
  };

  const handleDelete = (index) => {
    setCurrentIndex(index);
    setDeleteModalIsOpen(true);
  };

  const confirmDelete = () => {
    if (currentIndex !== null) {
      const updatedAttendees = attendees.filter((_, i) => i !== currentIndex);
      setAttendees(updatedAttendees);
      setDeleteModalIsOpen(false);
    }
  };

  const handleModalClose = () => {
    setEditModalIsOpen(false);
  };

  const handleModalSave = () => {
    const updatedAttendees = [...attendees];
    updatedAttendees[currentIndex] = editedAttendee;
    setAttendees(updatedAttendees);
    handleModalClose();
  };

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
            <th>Actions</th>
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
                <td>
                  <button onClick={() => handleEdit(index)} className="edit-button">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(index)} className="delete-button">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal for editing attendee */}
      {editModalIsOpen && (
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={handleModalClose}
          contentLabel="Edit Attendee"
          className="edit-modal"
          overlayClassName="edit-modal-overlay"
        >
          <h2>Edit Attendee</h2>
          <form>
            <label>Name:
              <input
                type="text"
                value={editedAttendee?.name || ""}
                onChange={(e) => setEditedAttendee({ ...editedAttendee, name: e.target.value })}
              />
            </label>
            <label>Event:
              <input
                type="text"
                value={editedAttendee?.event || ""}
                onChange={(e) => setEditedAttendee({ ...editedAttendee, event: e.target.value })}
              />
            </label>
            <label>Amount Paid:
              <input
                type="text"
                value={editedAttendee?.amountPaid || ""}
                onChange={(e) => setEditedAttendee({ ...editedAttendee, amountPaid: e.target.value })}
              />
            </label>
            <label>Registration Date:
              <input
                type="date"
                value={editedAttendee?.registrationDate || ""}
                onChange={(e) => setEditedAttendee({ ...editedAttendee, registrationDate: e.target.value })}
              />
            </label>
            <label>Venue:
              <select
                value={editedAttendee?.venueId || ""}
                onChange={(e) => setEditedAttendee({ ...editedAttendee, venueId: parseInt(e.target.value) })}
              >
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="modal-buttons">
              <button type="button" onClick={handleModalSave} className="save-button">
                Save
              </button>
              <button type="button" onClick={handleModalClose} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal for deleting attendee */}
      {deleteModalIsOpen && (
        <Modal
          isOpen={deleteModalIsOpen}
          onRequestClose={() => setDeleteModalIsOpen(false)}
          contentLabel="Confirm Delete"
          className="delete-modal"
          overlayClassName="delete-modal-overlay"
        >
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this attendee?</p>
          <div className="modal-buttons">
            <button type="button" onClick={confirmDelete} className="confirm-button">
              Confirm
            </button>
            <button type="button" onClick={() => setDeleteModalIsOpen(false)} className="cancel-delete-button">
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Attendees;
