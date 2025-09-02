const mongoose = require('../db');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

async function findUserByEmail(email) {
  return User.findOne({ email }).exec();
}

async function createUser({ email, password, role }) {
  const user = new User({ email, password, role });
  return user.save();
}

module.exports = { User, findUserByEmail, createUser };
