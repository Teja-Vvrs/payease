const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Authorization denied: User not found' });
    }
    req.user = user;  // Adding user info to request
    next();  // Proceed to the next middleware (i.e., the controller)
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Authorization denied: Invalid token' });
  }
};

module.exports = authMiddleware;
