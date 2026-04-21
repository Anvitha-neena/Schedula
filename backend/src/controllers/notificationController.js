const Notification = require("../models/Notification");

// GET MY NOTIFICATIONS
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// MARK AS READ
exports.markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      { isRead: true },
      { new: true },
    );

    if (!notif) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
