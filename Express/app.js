// Express/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB URI and port
const mongoURI = 'mongodb://localhost:27017/multilanguage_dictionary';
const port = 3000;

// Express app
const app = express();

// Allow Angular frontend (localhost:4200) to access backend
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

// JSON body parsing
app.use(express.json());

// Routes
app.use('/word', require('./routes/word'));

// Connect to MongoDB (no options)
mongoose.set('strictQuery', false);
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🛑 MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
});
