const express = require("express");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { bookingValidation } = require("../validators/bookingValidators");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/", auth, bookingValidation, validate, createBooking);
router.get("/me", auth, getMyBookings);
router.get("/", auth, admin, getAllBookings);
router.put("/:id/status", auth, admin, updateBookingStatus);

module.exports = router;
