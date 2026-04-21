import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function BookingCalendar({ bookings }) {
  const events = bookings.map((booking) => {
    const start = new Date(`${booking.date}T${booking.startTime}`);

    const end = new Date(`${booking.date}T${booking.endTime}`);

    
    return {
      title: `${booking.service.name} - ${booking.user.name} (${booking.startTime})`,
      start,
      end,
    };
  });

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}

export default BookingCalendar;
