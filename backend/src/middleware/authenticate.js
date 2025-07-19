const jwt = require('jsonwebtoken');
const { readData } = require('../utils/jsonStorage');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Authentication failed: Missing or invalid Authorization header');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    // Attach full user object from data store to req.user
    const users = readData();
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      console.log('Authentication failed: User not found for id', decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('Authentication failed: Invalid token', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
