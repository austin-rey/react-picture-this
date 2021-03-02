const express = require('express');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const cookieParser = require("cookie-parser");
const path = require('path');
const errorHandler = require('./middleware/error');
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const mongoSanitize = require('express-mongo-sanitize')
 
dotenv.config({path: './config/config.env'})

// Connect to DB
connectDB();

// Routes
const auth = require('./routes/auth');
const set = require('./routes/set');

// Initialize app
const app = express();

// Body Parser
app.use(express.json());

// Cors
app.use(cors({credentials: true, origin: ['http://localhost:3000', 'https://austin-reynaud-picture-this.herokuapp.com/']}));

// Clean data from requests
app.use(mongoSanitize());

// Add security headers that aren't set by default
app.use(helmet());

// Prevent XSS
app.use(xss());

// Rate Limit
const limiter = rateLimit({
    windowMs: 10 *60 * 1000, // 10 Minutes
    max: 100
});
app.use(limiter);

// HPP attacks
app.use(hpp());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); 
}

// Cookie Parser
app.use(cookieParser());

// Mount Routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/set', set);

// Global error handler
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
    });
} else {
    // Set static folder
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/images', express.static(__dirname + '/public/uploadedImages'));
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log('Server Running'.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});