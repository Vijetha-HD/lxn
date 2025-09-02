const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get(
  '/campaigns',
  authenticateToken,
  authorizeRoles('Campaign Manager'),
  (req, res) => {
    res.json({
      message: `Hello ${req.user.email}, here are your campaigns!`,
    });
  }
);

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
});

module.exports = router;
