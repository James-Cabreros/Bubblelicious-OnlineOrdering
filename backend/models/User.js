const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
  },
  contactNumber: {
    type: String,
    required: true,
    match: [/^09\d{9}$/, 'Contact number must start with "09" and be exactly 11 digits long.'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

// Hash the password before saving it
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
