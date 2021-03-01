const express = require('express');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const cookieParser = require("cookie-parser");
const path = require('path');
const errorHandler = require('./middleware/error');
var cors = require('cors')
 
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
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }


// Cookie Parser
app.use(cookieParser());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(__dirname + '/public/uploadedImages'));

// Mount Routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/set', set);

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