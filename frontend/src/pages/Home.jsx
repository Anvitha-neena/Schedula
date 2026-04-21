import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ServiceCard from "../components/ServiceCard";

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosInstance.get("/services");
        console.log(res.data);
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h1>Available Services</h1>
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}

export default Home;
