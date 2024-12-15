const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' }); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow cross-origin requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
const promoImageRoutes = require('./routes/PromoImagesRoutes');
app.use('/api/promo-images', promoImageRoutes);

const bestSellerRoutes = require('./routes/BestSellerRoutes');
app.use('/api/best-sellers', bestSellerRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Example Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors, // Sends back the validation errors
    });
  }
  res.status(500).json({ message: 'Server error, something went wrong.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
