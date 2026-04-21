const { body } = require("express-validator");
const { getIndianHolidayByDate } = require("../config/indianHolidays");

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

exports.bookingValidation = [
  body("service").notEmpty().withMessage("Service is required"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .custom((value) => {
      const bookingDate = new Date(`${value}T00:00:00`);

      if (Number.isNaN(bookingDate.getTime())) {
        throw new Error("Date must be valid");
      }

      if (bookingDate.getDay() === 0) {
        throw new Error("Bookings are not allowed on Sundays");
      }

      const holiday = getIndianHolidayByDate(value);
      if (holiday) {
        throw new Error(`Bookings are not allowed on holidays: ${holiday.name}`);
      }

      return true;
    }),
  body("startTime")
    .notEmpty()
    .withMessage("Start time is required")
    .custom((value) => {
      const startMinutes = timeToMinutes(value);

      if (Number.isNaN(startMinutes)) {
        throw new Error("Start time must be valid");
      }

      if (startMinutes < 10 * 60 || startMinutes > 21 * 60) {
        throw new Error("Bookings must start between 10:00 and 21:00");
      }

      return true;
    }),
  body("endTime")
    .notEmpty()
    .withMessage("End time is required")
    .custom((value, { req }) => {
      const startMinutes = timeToMinutes(req.body.startTime);
      const endMinutes = timeToMinutes(value);

      if (Number.isNaN(endMinutes)) {
        throw new Error("End time must be valid");
      }

      if (endMinutes <= startMinutes) {
        throw new Error("End time must be later than start time");
      }

      if (endMinutes > 21 * 60) {
        throw new Error("Bookings must end by 21:00");
      }

      return true;
    }),
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be Low, Medium, or High"),
  body("reminder.isEnabled")
    .optional()
    .isBoolean()
    .withMessage("Reminder enabled flag must be true or false"),
  body("reminder.minutesBefore")
    .optional()
    .isIn([15, 30, 60, 120, 1440])
    .withMessage("Reminder time must be one of: 15, 30, 60, 120, 1440 minutes"),
];

exports.feedbackValidation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment")
    .optional()
    .isLength({ max: 300 })
    .withMessage("Comment must be 300 characters or less"),
];

exports.cancelBookingValidation = [
  body("reason")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Cancellation reason must be text")
    .isLength({ max: 300 })
    .withMessage("Cancellation reason must be 300 characters or less"),
];

exports.bookingPreferenceValidation = [
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be Low, Medium, or High"),
  body("reminder.isEnabled")
    .optional()
    .isBoolean()
    .withMessage("Reminder enabled flag must be true or false"),
  body("reminder.minutesBefore")
    .optional()
    .isIn([15, 30, 60, 120, 1440])
    .withMessage("Reminder time must be one of: 15, 30, 60, 120, 1440 minutes"),
];
