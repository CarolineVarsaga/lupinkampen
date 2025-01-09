const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const connection = require("../../lib/conn");

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

router.get("/:userId", verifyToken, (req, res) => {
  console.log("Inside /users/:userId route");

  const userIdFromToken = String(req.user.id);
  const userIdFromParams = String(req.params.userId);

  if (userIdFromToken !== userIdFromParams) {
    return res.status(403).json({ message: "You are not authorized to access this data." });
  }

  connection.connect((err) => {
    if (err) {
      console.log("Database connection error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const query = "SELECT userName, email, userMunicipality, userId FROM users WHERE userId = ?";
    const values = [req.params.userId];

    connection.query(query, values, (err, data) => {
      if (err) {
        console.log("Database query error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (data.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(data[0]);
    });
  });
});

module.exports = router;
