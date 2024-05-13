// authUtils.js

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/db');
const authUtils = require('../utils/authUtils');

router.get('/protected-route', authUtils.verifyToken, (req, res) => {
  // Route handler for protected endpoint
});


exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId; // Attach userId to request object
    next(); // Call next middleware
  });
};
