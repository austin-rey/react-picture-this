const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes - Need a valid token to access this route
exports.protect = asyncHandler(async (req, res, next) => {
    let token;
  
    // Check header for token and cookies
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ){
      token = req.headers.authorization.split(' ')[1];
    }else if (req.cookies.token) {
      token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
      return next(
        new ErrorResponse('Not authorized to access this resource', 401)
      );
    }
  
    // Verify that a user with the token fetched above is a valid user in the DB
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      return next(
        new ErrorResponse('Not authorized to access this resource', 401)
      );
    }
  });