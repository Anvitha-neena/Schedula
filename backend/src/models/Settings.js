const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    openingTime: {
      type: String, // HH:mm
      required: true,
    },

    closingTime: {
      type: String, // HH:mm
      required: true,
    },

    slotInterval: {
      type: Number, // gap between slots in minutes
      required: true,
    },

    holidays: {
      type: [String], // ["2026-01-26", "2026-08-15"]
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Settings", settingsSchema);