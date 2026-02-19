const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const {
  registerValidation,
  loginValidation,
} = require("../validators/userValidators");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);

module.exports = router;
