import { useState } from "react";

function ServiceForm({ onSubmit, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [category, setCategory] = useState(initialData?.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name,
      description,
      duration,
      price,
      category,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Service Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Hair">Hair</option>
        <option value="Beard">Beard</option>
        <option value="Skin">Skin</option>
      </select>
      ;<button type="submit">Save Service</button>
    </form>
  );
}

export default ServiceForm;
