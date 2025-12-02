// Vercel Serverless Function Entry Point
const express = require('express');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

// Simple test endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'PeopleHub HR API - Vercel Serverless',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint working!' });
});

// Try to import backend routes
try {
    const authRoutes = require('../backend/src/routes/authRoutes');
    const dashboardRoutes = require('../backend/src/routes/dashboardRoutes');
    const employeeRoutes = require('../backend/src/routes/employeeRoutes');
    const departmentRoutes = require('../backend/src/routes/departmentRoutes');
    const leaveRoutes = require('../backend/src/routes/leaveRoutes');
    const contractRoutes = require('../backend/src/routes/contractRoutes');
    const seedRoutes = require('../backend/src/routes/seedRoutes');

    // Mount routes
    app.use('/auth', authRoutes);
    app.use('/dashboard', dashboardRoutes);
    app.use('/employees', employeeRoutes);
    app.use('/departments', departmentRoutes);
    app.use('/leaves', leaveRoutes);
    app.use('/contracts', contractRoutes);
    app.use('/seed', seedRoutes);
} catch (error) {
    console.error('Failed to load backend routes:', error);
    app.get('/error', (req, res) => {
        res.status(500).json({
            error: 'Failed to load routes',
            message: error.message
        });
    });
}

// Error handler
app.use((err, req, res, next) => {
    console.error('API Error:', err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Export for Vercel
module.exports = app;
