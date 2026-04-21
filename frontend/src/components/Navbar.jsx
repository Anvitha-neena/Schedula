import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Link to="/">Home</Link>

      {user && (
        <Link to="/my-bookings" style={{ marginLeft: "10px" }}>
          My Bookings
        </Link>
      )}

      {user?.role === "admin" && (
        <>
          <Link to="/admin/dashboard" style={{ marginLeft: "10px" }}>
            Admin Dashboard
          </Link>

          <Link to="/admin/calendar" style={{ marginLeft: "10px" }}>
            Salon Schedule
          </Link>
        </>
      )}

      <span style={{ float: "right" }}>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>{user.name}</span>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>
              Login
            </Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </span>
    </nav>
  );
}

export default Navbar;
