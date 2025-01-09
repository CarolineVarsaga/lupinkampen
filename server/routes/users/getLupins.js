const express = require("express");
const router = express.Router();
const connection = require("../../lib/conn"); 
const { verifyToken } = require("../../middleware/authMiddleware.js");

router.get("/:userId", verifyToken, (req, res) => {
  const { userId } = req.params;
  const query = "SELECT totalPickedLupins FROM users WHERE userId = ?";

  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.log("Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Användare hittades inte." });
    }

    res.status(200).json({
      totalPickedLupins: result[0].totalPickedLupins,
    });
  });
});

module.exports = router;
