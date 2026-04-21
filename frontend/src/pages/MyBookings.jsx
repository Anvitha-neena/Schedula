import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axiosInstance.get("/bookings/my");

      setBookings(res.data);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>

      {bookings.map((booking) => (
        <div key={booking._id}>
          <p>
            <b>Service:</b> {booking.service.name}
          </p>

          <p>
            <b>Date:</b> {booking.date}
          </p>

          <p>
            <b>Time:</b> {booking.time}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
