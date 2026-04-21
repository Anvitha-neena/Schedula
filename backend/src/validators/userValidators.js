const { body } = require("express-validator");

exports.registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be 5+ chars"),
  body("phone").isLength({ min: 10 }).withMessage("Phone must be 10 digits"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

exports.updateProfileValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").isLength({ min: 10 }).withMessage("Phone must be 10 digits"),
];

exports.adminUserValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be 5+ chars"),
  body("phone").isLength({ min: 10 }).withMessage("Phone must be 10 digits"),
  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("Role must be admin or user"),
];
