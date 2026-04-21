import { Routes, Route } from "react-router-dom";
import AdminCalendar from "./pages/AdminCalendar";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";

import AdminDashboard from "./pages/AdminDashboard";
import ManageServices from "./pages/ManageServices";
import ManageBookings from "./pages/ManageBookings";

function Router() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* User */}
      <Route
        path="/booking/:serviceId"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />
      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/services"
        element={
          <AdminRoute>
            <ManageServices />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/calendar"
        element={
          <AdminRoute>
            <AdminCalendar />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default Router;
