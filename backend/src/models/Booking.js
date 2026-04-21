const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    startTime: {
      type: String, // HH:mm
      required: true,
    },

    endTime: {
      type: String, // HH:mm
      required: true,
    },

    notes: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },

    statusHistory: [
      {
        status: {
          type: String,
          enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
          required: true,
        },
        note: {
          type: String,
          trim: true,
          maxlength: 300,
        },
        changedBy: {
          type: String,
          enum: ["user", "admin", "system"],
          default: "system",
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    reminder: {
      isEnabled: {
        type: Boolean,
        default: true,
      },
      minutesBefore: {
        type: Number,
        enum: [15, 30, 60, 120, 1440],
        default: 60,
      },
    },

    cancellation: {
      reason: {
        type: String,
        trim: true,
        maxlength: 300,
      },
      cancelledAt: {
        type: Date,
      },
    },

    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        trim: true,
      },
      submittedAt: {
        type: Date,
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
