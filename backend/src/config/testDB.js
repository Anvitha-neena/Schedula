import dotenv from "dotenv";
import connectDB from "./config/db.js";
import "../models/User.js";
import "../models/Booking.js";
import "../models/Booking.js";
import "../models/Notification.js";
import "../models/Settings.js";

dotenv.config();

connectDB().then(() => {
  console.log("Schemas loaded & DB connected successfully!");
  process.exit(0); // Close program after verification
});
