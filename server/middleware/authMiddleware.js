import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  let token = null;

  // Check cookie first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Otherwise check Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, deny access
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach a proper user object (with id) to request
    req.user = {_id: decoded.id}; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default protect;
