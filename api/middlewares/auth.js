import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json('Not authenticated!');
  }

  try {
    const decoded = jwt.verify(token, 'jwtkey');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json('Invalid token!');
  }
};

export default authMiddleware;
