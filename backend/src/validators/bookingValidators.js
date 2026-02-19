const { body } = require("express-validator");

exports.bookingValidation = [
  body("service").notEmpty().withMessage("Service is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("startTime").notEmpty().withMessage("Start time is required"),
  body("endTime").notEmpty().withMessage("End time is required"),
];
