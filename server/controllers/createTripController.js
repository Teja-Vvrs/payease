const Trip = require('../models/Trip');
const User = require('../models/User');

const createTrip = async (req, res) => {
  const { name, participants } = req.body;

  if (!name || !participants) {
    return res.status(400).json({ message: 'Trip name and participants are required' });
  }

  try {
    // Create a new trip
    const trip = new Trip({
      name,
      createdBy: req.user.id,  // `req.user.id` comes from the authMiddleware (user is added to req)
      participants
    });

    // Save the trip to the database
    await trip.save();

    // Update the user's trips array by pushing the newly created trip's ID
    const user = await User.findById(req.user.id);
    user.trips.push(trip._id);
    await user.save();

    res.status(201).json({
      message: 'Trip created successfully',
      trip
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTrip };
