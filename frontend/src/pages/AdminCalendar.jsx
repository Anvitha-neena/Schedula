import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import BookingCalendar from "../components/Calendar";

function AdminCalendar() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axiosInstance.get("/bookings");

      setBookings(res.data);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Salon Schedule</h2>

      <BookingCalendar bookings={bookings} />
    </div>
  );
}

export default AdminCalendar;
