// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/test-register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
