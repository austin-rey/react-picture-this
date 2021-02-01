const express = require('express');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const path = require('path');
const errorHandler = require('./middleware/error');
var cors = require('cors')
 
dotenv.config({path: './config/config.env'})

// Connect to DB
connectDB();

// Routes
const auth = require('./routes/auth');

// Initialize app
const app = express();

// Body Parser
app.use(express.json());

// Cors
app.use(cors())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// TODO: File upload

// TODO: Cookie Parser

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/auth', auth);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log('Server Running'.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});