const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema definition
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  contactNumber: {
    type: String,
    default: '', // Optional
  },
  googleId: {
    type: String, // Unique Google ID for Google-authenticated users
    unique: true,
  },
}, { timestamps: true });

// Hash password before saving it
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it's modified
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10); // Hash with salt rounds
  }
  next();
});

// Check password validity
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Export the model
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
