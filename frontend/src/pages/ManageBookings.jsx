import { useEffect, useState } from "react";
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "../services/bookingService";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const data = await getBookings();
    setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateBookingStatus(id, status);
    loadBookings();
  };

  const handleDelete = async (id) => {
    await deleteBooking(id);
    loadBookings();
  };

  return (
    <div>
      <h2>Manage Bookings</h2>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{booking.service.name}</h3>

          <p>
            <b>Customer:</b> {booking.user.name}
          </p>

          <p>
            <b>Date:</b> {booking.date}
          </p>

          <p>
            <b>Time:</b> {booking.startTime} - {booking.endTime}
          </p>

          <p>
            <b>Status:</b> {booking.status}
          </p>

          <select
            value={booking.status}
            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <br />

          <button onClick={() => handleDelete(booking._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ManageBookings;
