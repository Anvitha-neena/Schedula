import { useEffect, useState } from "react";

function TimeSlots({ duration, bookings, onSelect }) {
  const [slots, setSlots] = useState([]);

  const convertToMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const convertToTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const generateSlots = () => {
      const startDay = 10 * 60;
      const endDay = 19 * 60;

      const available = [];

      for (let time = startDay; time + duration <= endDay; time += 30) {
        const slotStart = time;
        const slotEnd = time + duration;

        const overlap = bookings.some((booking) => {
          const bookingStart = convertToMinutes(booking.startTime);
          const bookingEnd = convertToMinutes(booking.endTime);

          return slotStart < bookingEnd && slotEnd > bookingStart;
        });

        if (!overlap) {
          available.push(convertToTime(slotStart));
        }
      }

      setSlots(available);
    };

    generateSlots();
  }, [duration, bookings]);

  return (
    <div>
      <h3>Select Time Slot</h3>

      {slots.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelect(slot)}
          style={{ margin: "6px" }}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}

export default TimeSlots;
