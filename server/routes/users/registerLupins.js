const express = require("express");
const router = express.Router();
const connection = require("../../lib/conn"); 
const { verifyToken } = require("../../middleware/authMiddleware.js");

router.post("/:userId", verifyToken, (req, res) => {
  const { userId } = req.params;
  const { lupinsPicked } = req.body; 

  if (!lupinsPicked || lupinsPicked <= 0) {
    return res.status(400).json({ message: "Antal plockade lupiner måste vara större än noll." });
  }

  const getQuery = "SELECT totalPickedLupins FROM users WHERE userId = ?";
  const updateQuery = `
    UPDATE users
    SET recentlyPickedLupins = ?, totalPickedLupins = IFNULL(totalPickedLupins, 0) + ?
    WHERE userId = ?
  `;

  connection.query(getQuery, [userId], (err, result) => {
    if (err) {
      console.log("Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Användare hittades inte." });
    }

    connection.query(updateQuery, [lupinsPicked, lupinsPicked, userId], (err) => {
      if (err) {
        console.log("Database update error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      return res.status(200).json({ 
        message: "Registrering av lupiner lyckades.", 
        recentlyPickedLupins: lupinsPicked,
        newTotal: result[0].totalPickedLupins + lupinsPicked,
      });
    });
  });
});

module.exports = router;
