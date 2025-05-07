const Trip = require('../models/Trip');

const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ createdBy: req.user.id })
      .populate('createdBy', 'name email')
      .populate('participants', 'name email');

    res.status(200).json({ trips });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trips', error: err.message });
  }
};

module.exports = { getTrips };
