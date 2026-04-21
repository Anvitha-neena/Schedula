import { useEffect, useState } from "react";

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../services/serviceService";

import ServiceForm from "../components/ServiceForm";

function ManageServices() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  const loadServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleCreate = async (data) => {
    if (editingService) {
      await updateService(editingService._id, data);
      setEditingService(null);
    } else {
      await createService(data);
    }

    loadServices();
  };

  const handleDelete = async (id) => {
    await deleteService(id);
    loadServices();
  };

  return (
    <div>
      <h2>Manage Services</h2>

      <ServiceForm onSubmit={handleCreate} initialData={editingService} />

      <hr />

      {services.map((service) => (
        <div key={service._id}>
          <h3>{service.name}</h3>

          <p>{service.description}</p>

          <p>Duration: {service.duration} mins</p>

          <p>Price: ₹{service.price}</p>

          <button onClick={() => setEditingService(service)}>Edit</button>

          <button onClick={() => handleDelete(service._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ManageServices;
