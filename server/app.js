// src/
// ├── models/
// │   ├── User.js
// │   ├── Trip.js
// │   └── Expense.js
// ├── routes/
// │   ├── auth.js
// │   ├── trips.js
// │   └── expenses.js
// ├── controllers/
// ├── middleware/
// │   └── auth.js
// └── server.js

// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/tripRoutes');
// const expenseRoutes = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Failed:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
// app.use('/api/expenses', expenseRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('TripEase Server is Running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
