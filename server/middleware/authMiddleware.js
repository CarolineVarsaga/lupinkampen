const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  const tokenWithoutBearer = token.split(" ")[1];
  if (!tokenWithoutBearer) {
    return res.status(403).json({ message: "Access denied. Invalid token format." });
  }

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };