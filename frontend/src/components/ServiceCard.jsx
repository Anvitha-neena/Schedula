import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{service.name}</h3>

      <p>{service.description}</p>

      <p>
        <b>Duration:</b> {service.duration} mins
      </p>

      <p>
        <b>Price:</b> ₹{service.price}
      </p>

      <Link to={`/booking/${service._id}`}>
        <button>Book Now</button>
      </Link>
    </div>
  );
}

export default ServiceCard;
