const Booking = require("../models/Booking");
const Notification = require("../models/Notification");
const { getIndianHolidayByDate } = require("../config/indianHolidays");

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const appendStatusHistory = (booking, status, note, changedBy) => {
  booking.statusHistory = [
    ...(booking.statusHistory || []),
    {
      status,
      note,
      changedBy,
      changedAt: new Date(),
    },
  ];
};

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
    const {
      service,
      date,
      startTime,
      endTime,
      notes,
      priority = "Medium",
      reminder,
    } = req.body;
    const bookingDate = new Date(`${date}T00:00:00`);

    if (bookingDate.getDay() === 0) {
      return res
        .status(400)
        .json({ message: "Bookings are not allowed on Sundays" });
    }

    const holiday = getIndianHolidayByDate(date);
    if (holiday) {
      return res.status(400).json({
        message: `Bookings are not allowed on holidays: ${holiday.name}`,
      });
    }

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    if (startMinutes < 10 * 60 || endMinutes > 21 * 60) {
      return res.status(400).json({
        message: "Bookings are only allowed between 10:00 AM and 9:00 PM",
      });
    }

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
      priority,
      reminder: {
        isEnabled: reminder?.isEnabled ?? true,
        minutesBefore: reminder?.minutesBefore ?? 60,
      },
      statusHistory: [
        {
          status: "Pending",
          note: "Booking created",
          changedBy: "user",
          changedAt: new Date(),
        },
      ],
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
    const booking = await Booking.findById(req.params.id)
      .populate("user")
      .populate("service");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    appendStatusHistory(booking, status, `Admin updated status to ${status}`, "admin");
    await booking.save();

    // notify user
    await Notification.create({
      user: booking.user._id,
      message: `Your booking status is updated to: ${status}`,
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER: UPDATE PRIORITY/REMINDER PREFERENCES
exports.updateBookingPreferences = async (req, res) => {
  try {
    const { priority, reminder } = req.body;
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("service");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({ message: "Cancelled bookings cannot be updated" });
    }

    if (booking.status === "Completed") {
      return res.status(400).json({ message: "Completed bookings cannot be updated" });
    }

    if (priority) {
      booking.priority = priority;
    }

    if (reminder) {
      booking.reminder = {
        ...booking.reminder,
        ...reminder,
      };
    }

    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER: CANCEL OWN BOOKING
exports.cancelMyBooking = async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("service");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    if (booking.status === "Completed") {
      return res
        .status(400)
        .json({ message: "Completed bookings cannot be cancelled" });
    }

    booking.status = "Cancelled";
    appendStatusHistory(
      booking,
      "Cancelled",
      reason?.trim() || "Cancelled by user",
      "user",
    );
    booking.cancellation = {
      reason: reason?.trim() || "",
      cancelledAt: new Date(),
    };
    await booking.save();

    const reasonSuffix = reason?.trim()
      ? ` Reason: ${reason.trim()}`
      : "";

    await Notification.create({
      user: req.user.id,
      message: `Your booking for ${booking.service?.name || "service"} on ${booking.date} at ${booking.startTime} has been cancelled.${reasonSuffix}`,
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER: MARK OWN BOOKING AS COMPLETED
exports.completeMyBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("service");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({ message: "Cancelled bookings cannot be completed" });
    }

    if (booking.status === "Completed") {
      return res.status(400).json({ message: "Booking is already completed" });
    }

    booking.status = "Completed";
    appendStatusHistory(booking, "Completed", "Marked completed by user", "user");
    await booking.save();

    await Notification.create({
      user: req.user.id,
      message: `You marked your ${booking.service?.name || "service"} booking on ${booking.date} at ${booking.startTime} as completed.`,
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER: SUBMIT FEEDBACK
exports.submitBookingFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("service");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "Completed") {
      return res
        .status(400)
        .json({ message: "Feedback can only be submitted for completed bookings" });
    }

    booking.feedback = {
      rating,
      comment,
      submittedAt: new Date(),
    };

    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
