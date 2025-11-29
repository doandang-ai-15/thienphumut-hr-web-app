const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { testConnection } = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Test database connection
testConnection();

// Routes
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

// API Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/dashboard', require('./src/routes/dashboardRoutes'));
// app.use('/api/employees', require('./src/routes/employeeRoutes')); // Coming in VERSION 3
// app.use('/api/departments', require('./src/routes/departmentRoutes')); // Coming in VERSION 4
// app.use('/api/leaves', require('./src/routes/leaveRoutes')); // Coming in VERSION 4
// app.use('/api/contracts', require('./src/routes/contractRoutes')); // Coming in VERSION 4

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('❌ Unhandled Rejection:', err.message);
    process.exit(1);
});
