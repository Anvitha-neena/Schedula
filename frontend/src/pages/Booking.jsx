import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import TimeSlots from "../components/TimeSlots";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);
<Calendar
  localizer={localizer}
  events={[]}
  startAccessor="start"
  endAccessor="end"
  selectable
  onSelectSlot={(slot) => {
    const selectedDate = moment(slot.start).format("YYYY-MM-DD");
    setDate(selectedDate);
    fetchBookings(selectedDate);
  }}
/>;

function Booking() {
  const { serviceId } = useParams();

  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  // 👉 ADD THE FUNCTION HERE
  const calculateEndTime = (start, duration) => {
    const [h, m] = start.split(":").map(Number);

    const total = h * 60 + m + duration;

    const endH = Math.floor(total / 60);
    const endM = total % 60;

    return `${endH.toString().padStart(2, "0")}:${endM
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchService = async () => {
      const res = await axiosInstance.get(`/services/${serviceId}`);

      setService(res.data);
    };

    fetchService();
  }, [serviceId]);

  const fetchBookings = async (selectedDate) => {
    const res = await axiosInstance.get(
      `/bookings?serviceId=${serviceId}&date=${selectedDate}`,
    );

    setBookings(res.data);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    setDate(selectedDate);

    fetchBookings(selectedDate);
  };

  const handleBooking = async () => {
    try {
      const endTime = calculateEndTime(selectedSlot, service.duration);

      await axiosInstance.post("/bookings", {
        service: serviceId,
        date,
        startTime: selectedSlot,
        endTime: endTime,
      });

      alert("Booking successful");
    } catch (err) {
      alert("Booking failed");
    }
  };

  if (!service) return <p>Loading...</p>;

  return (
    <div>
      <h2>{service.name}</h2>

      <p>{service.description}</p>

      <p>Duration: {service.duration} mins</p>

      <h3>Select Date</h3>

      <input type="date" onChange={handleDateChange} />

      {date && (
        <TimeSlots
          duration={service.duration}
          bookings={bookings}
          onSelect={setSelectedSlot}
        />
      )}

      {selectedSlot && (
        <div>
          <p>Selected Slot: {selectedSlot}</p>

          <button onClick={handleBooking}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
}

export default Booking;
