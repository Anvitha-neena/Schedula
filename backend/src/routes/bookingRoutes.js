const express = require("express");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  updateBookingPreferences,
  cancelMyBooking,
  completeMyBooking,
  submitBookingFeedback,
} = require("../controllers/bookingController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  bookingValidation,
  feedbackValidation,
  cancelBookingValidation,
  bookingPreferenceValidation,
} = require("../validators/bookingValidators");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/", auth, bookingValidation, validate, createBooking);
router.get("/me", auth, getMyBookings);
router.get("/", auth, admin, getAllBookings);
router.put("/:id/status", auth, admin, updateBookingStatus);
router.put("/:id/preferences", auth, bookingPreferenceValidation, validate, updateBookingPreferences);
router.put("/:id/cancel", auth, cancelBookingValidation, validate, cancelMyBooking);
router.put("/:id/complete", auth, completeMyBooking);
router.put("/:id/feedback", auth, feedbackValidation, validate, submitBookingFeedback);

module.exports = router;
