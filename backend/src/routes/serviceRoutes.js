const express = require("express");
const {
  createService,
  getServices,
} = require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { serviceValidation } = require("../validators/serviceValidators");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/", auth, admin, serviceValidation, validate, createService);
router.get("/", getServices);

module.exports = router;
