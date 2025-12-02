// Vercel Serverless Function Entry Point
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: require('path').join(__dirname, '../backend/.env') });

// Create Express app
const app = express();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes from backend
const authRoutes = require('../backend/src/routes/authRoutes');
const dashboardRoutes = require('../backend/src/routes/dashboardRoutes');
const employeeRoutes = require('../backend/src/routes/employeeRoutes');
const departmentRoutes = require('../backend/src/routes/departmentRoutes');
const leaveRoutes = require('../backend/src/routes/leaveRoutes');
const contractRoutes = require('../backend/src/routes/contractRoutes');
const seedRoutes = require('../backend/src/routes/seedRoutes');

// Root API endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'PeopleHub HR API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            dashboard: '/api/dashboard',
            employees: '/api/employees',
            departments: '/api/departments',
            leaves: '/api/leaves',
            contracts: '/api/contracts'
        }
    });
});

// Mount routes WITHOUT /api prefix (Vercel already handles /api routing)
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);
app.use('/leaves', leaveRoutes);
app.use('/contracts', contractRoutes);
app.use('/seed', seedRoutes);

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
