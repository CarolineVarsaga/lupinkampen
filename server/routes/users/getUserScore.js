const express = require("express");
const router = express.Router();
const connection = require("../../lib/conn");
const { verifyToken } = require("../../middleware/authMiddleware.js");

router.get("/:userId", verifyToken, (req, res) => {
  const { userId } = req.params;

  const userQuery = `
    SELECT totalPickedLupins, userMunicipality
    FROM users
    WHERE userId = ?
  `;

  connection.query(userQuery, [userId], (err, userResult) => {
    if (err) {
      console.log("Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ message: "Användare hittades inte." });
    }

    const { totalPickedLupins, userMunicipality } = userResult[0];

    const leaderboardQuery = `
      SELECT userId, userName, totalPickedLupins
      FROM users
      WHERE userMunicipality = ?
      ORDER BY totalPickedLupins DESC
    `;

    connection.query(leaderboardQuery, [userMunicipality], (err, leaderboardResult) => {
      if (err) {
        console.log("Database query error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (leaderboardResult.length === 0) {
        return res.status(404).json({ message: "Inga användare hittades i denna kommun." });
      }

      const userPlacement = leaderboardResult.findIndex(user => String(user.userId) === String(userId)) + 1;

      if (userPlacement === 0) {
        return res.status(404).json({ message: "Användaren finns inte på rankningen. Kontrollera om du har registrerat några plockade lupiner." });
      }

      res.status(200).json({
        userPlacement,
        totalPickedLupins,
      });
    });
  });
});

module.exports = router;
