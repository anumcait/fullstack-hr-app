const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

const app = express();
const allowedOrigins = [
  'http://localhost',
  'http://52.4.231.1', //AWS dev
  'http://localhost:5173', // local Vite dev server
  'https://fullstack-hr-app-frontend.onrender.com', // deployed frontend
];
// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // allow requests with no origin (like curl or Postman) or matching origins
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Employee Routes
app.use('/api/employees', employeeRoutes);

//Leave Routes
app.use('/api/leave', leaveRoutes); // http://localhost:5000/api/leave/apply

// Health check
app.get('/', (req, res) => res.send('✅ App is running.'));

module.exports = app;
