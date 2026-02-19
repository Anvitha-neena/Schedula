const Service = require("../models/Service");

// CREATE SERVICE (ADMIN)
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.json(service);
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
