const express = require("express");
const router = express.Router();
const connection = require("../../lib/conn");

router.post("/", (req, res) => {
  const { userId, additionalLupins } = req.body;

  if (!userId || !additionalLupins) {
    return res.status(400).json({ message: "userId och additionalLupins krävs." });
  }

  const updateUserQuery = `
    UPDATE users
    SET totalPickedLupins = totalPickedLupins + ?
    WHERE userId = ?
  `;

  connection.query(updateUserQuery, [additionalLupins, userId], (err, result) => {
    if (err) {
      console.error("Error updating user lupins:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json({ message: "Lupiner uppdaterade för användaren." });
  });
});

module.exports = router;
