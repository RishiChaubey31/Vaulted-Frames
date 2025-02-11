// auth.middleware.js
import jwt from 'jsonwebtoken';

export const verifyTokenAndExtractUserInfo = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export const authenticateUser = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No authentication token provided"
      });
    }

    // Check if the header format is correct
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format"
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token and extract user info
    const decoded = await verifyTokenAndExtractUserInfo(token);
    
    // Add user info to request object
    req.user = {
      id: decoded.userId
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token has expired"
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
    res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: error.message
    });
  }
};