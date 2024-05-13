const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/db');

exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }
  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
