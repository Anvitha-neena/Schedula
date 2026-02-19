const Booking = require("../models/Booking");
const Notification = require("../models/Notification");

// SLOT CONFLICT LOGIC (USED IN CREATE BOOKING)
const checkSlotConflict = async (serviceId, date, startTime, endTime) => {
  const conflict = await Booking.findOne({
    service: serviceId,
    date,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
      },
    ],
    status: { $ne: "Cancelled" },
  });

  return conflict ? true : false;
};

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const { service, date, startTime, endTime, notes } = req.body;

    // check for conflicts
    const hasConflict = await checkSlotConflict(
      service,
      date,
      startTime,
      endTime,
    );
    if (hasConflict) {
      return res.status(400).json({ message: "This slot is already booked!" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      service,
      date,
      startTime,
      endTime,
      notes,
    });

    // notification
    await Notification.create({
      user: req.user.id,
      message: `Your booking on ${date} at ${startTime} is created.`,
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET MY BOOKINGS
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("service")
      .sort({ date: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: GET ALL BOOKINGS
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("service")
      .sort({ date: 1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: UPDATE BOOKING STATUS
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    // notify user
    await Notification.create({
      user: booking.user,
      message: `Your booking status is updated to: ${status}`,
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
