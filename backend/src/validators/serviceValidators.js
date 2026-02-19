const { body } = require("express-validator");

exports.serviceValidation = [
  body("name").notEmpty().withMessage("Service name is required"),
  body("duration")
    .isInt({ min: 10 })
    .withMessage("Duration must be at least 10 mins"),
  body("price").isFloat({ min: 1 }).withMessage("Price must be valid"),
];
