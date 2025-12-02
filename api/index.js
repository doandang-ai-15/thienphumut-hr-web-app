// Vercel Serverless Function Entry Point
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Import routes
const authRoutes = require('../backend/src/routes/authRoutes');
const dashboardRoutes = require('../backend/src/routes/dashboardRoutes');
const employeeRoutes = require('../backend/src/routes/employeeRoutes');
const departmentRoutes = require('../backend/src/routes/departmentRoutes');
const leaveRoutes = require('../backend/src/routes/leaveRoutes');
const contractRoutes = require('../backend/src/routes/contractRoutes');
const seedRoutes = require('../backend/src/routes/seedRoutes');

// API Routes (without /api prefix since Vercel already handles that)
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);
app.use('/leaves', leaveRoutes);
app.use('/contracts', contractRoutes);
app.use('/seed', seedRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'PeopleHub HR API - Vercel Deployment',
        version: '1.0.0'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Export for Vercel
module.exports = app;
