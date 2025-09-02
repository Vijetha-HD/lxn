require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://lxn.app',
];


app.use(cors({
  origin:  function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },// frontend URL
  credentials: true,
}));
app.use(express.json());

// Use the auth routes
app.use('/api', authRoutes);
// Use protected routes
app.use('/api', protectedRoutes);
//budget routes
app.use('/api/budgets', budgetRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
