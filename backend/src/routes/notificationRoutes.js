const express = require("express");
const auth = require("../middleware/authMiddleware");

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const router = express.Router();

router.get("/", auth, getNotifications);
router.put("/:id/read", auth, markAsRead);

module.exports = router;
