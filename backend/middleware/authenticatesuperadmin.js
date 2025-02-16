const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; 

const authenticatesuperadmin = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log('Token decoded:', req.user); // Check if the decoded token contains the expected data

    if (req.user.userrole !== 'superadmin') {
      console.error('Access denied: user is not a superadmin');
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {authenticatesuperadmin};