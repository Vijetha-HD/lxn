const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../models/User');

const SECRET_KEY = process.env.JWT_SECRET;

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      {_id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
