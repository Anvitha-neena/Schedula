const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

const requiredFields = ["ADMIN_NAME", "ADMIN_EMAIL", "ADMIN_PASSWORD", "ADMIN_PHONE"];
const missingFields = requiredFields.filter((field) => !process.env[field]);

const createAdmin = async () => {
  if (missingFields.length) {
    console.error(
      `Missing required environment variables: ${missingFields.join(", ")}`,
    );
    process.exit(1);
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingUser) {
      existingUser.name = process.env.ADMIN_NAME;
      existingUser.phone = process.env.ADMIN_PHONE;
      existingUser.role = "admin";

      if (process.env.ADMIN_PASSWORD) {
        existingUser.password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      }

      await existingUser.save();
      console.log("Existing user updated with admin access.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      phone: process.env.ADMIN_PHONE,
      role: "admin",
    });

    console.log("Admin account created successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
