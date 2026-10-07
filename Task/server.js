// server.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Middleware
app.use(express.json());

// Database Connection
const MONGO_URI = process.env.MONGO_URI; 

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(' Connected to MongoDB Atlas (inventory_db)'))
  .catch((err) => console.error(' MongoDB connection error:', err.message));

// Routes
app.use('/api', itemRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
