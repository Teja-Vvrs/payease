const express = require('express');
const router = express.Router();
const { createTrip } = require('../controllers/createTripController');
const { getTrips } = require('../controllers/tripController');
const authMiddleware = require('../middleware/auth');

// POST /api/trips - Create a trip
router.post('/', authMiddleware, createTrip);

// GET /api/trips - Get all trips for the authenticated user
router.get('/', authMiddleware, getTrips);

module.exports = router;
