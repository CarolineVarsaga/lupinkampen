const express = require("express");
const router = express.Router();
const connection = require("../../lib/conn");
const { verifyToken } = require("../../middleware/authMiddleware.js");

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
