const mongoose = require("mongoose");

// Import Schemas
const User = require("../models/User.js");
const Service = require("../models/Service.js");
const Booking = require("../models/Booking.js");
const Notification = require("../models/Notification.js");

// MongoDB URL (Local or Cloud)
const url = "mongodb://localhost:27017/schedulaDB";

// Main connection + testing function
const testConnection = async () => {
  try {
    await mongoose.connect(url);
    console.log("Mongoose Connected to MongoDB");

    // ----------------------------------------
    // 1. Insert Sample User
    // ----------------------------------------
    const newUser = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
      phone: "9999999999",
      role: "user",
    });

    console.log("Sample User Saved:", newUser._id);

    // ----------------------------------------
    // 2. Insert Sample Service
    // ----------------------------------------
    const newService = await Service.create({
      name: "Haircut",
      description: "Basic haircut",
      duration: 30,
      price: 199,
      isActive: true,
      createdBy: newUser._id,
    });

    console.log("Sample Service Saved:", newService._id);

    // ----------------------------------------
    // 3. Insert Sample Booking
    // ----------------------------------------
    const newBooking = await Booking.create({
      user: newUser._id,
      service: newService._id,
      date: "2026-01-22",
      startTime: "10:00",
      endTime: "10:30",
      notes: "Test booking",
      status: "Pending",
    });

    console.log("Sample Booking Saved:", newBooking._id);

    // ----------------------------------------
    // 4. Insert Sample Notification
    // ----------------------------------------
    const newNotification = await Notification.create({
      user: newUser._id,
      message: "Your test booking is confirmed",
      type: "booking",
    });

    console.log("Sample Notification Saved:", newNotification._id);

    // ----------------------------------------
    // 5. Fetch all users, services, bookings
    // ----------------------------------------
    const users = await User.find();
    const services = await Service.find();
    const bookings = await Booking.find();
    const notifications = await Notification.find();

    console.log("\n--- USERS ---");
    console.log(users);

    console.log("\n--- SERVICES ---");
    console.log(services);

    console.log("\n--- BOOKINGS ---");
    console.log(bookings);

    console.log("\n--- NOTIFICATIONS ---");
    console.log(notifications);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB Connection Closed");
  }
};

testConnection();
