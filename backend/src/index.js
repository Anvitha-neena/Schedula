const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

// Error Handler (must come after all routes)
app.use(require("./middleware/errorHandler"));

app.get("/", (req, res) => {
  res.send("Schedula Backend Running 🚀");
});

const startServer = async () => {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log("Server running on port", port);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
