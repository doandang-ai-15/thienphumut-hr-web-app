// Vercel Serverless Function Entry Point
const path = require('path');

// Set up paths
process.env.NODE_PATH = path.join(__dirname, '..');
require('module').Module._initPaths();

// Now require the actual server
const app = require('../backend/server');

// Export for Vercel
module.exports = app;
