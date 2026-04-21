const Service = require("../models/Service");

// CREATE SERVICE (ADMIN)
exports.createService = async (req, res) => {
  try {
    const service = await Service.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL SERVICES
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE SERVICE (ADMIN)
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
