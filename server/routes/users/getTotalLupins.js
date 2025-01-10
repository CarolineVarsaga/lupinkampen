const express = require("express");
const router = express.Router();
const connection = require("../../lib/conn");

router.get('/', (req, res) => {
  const query = `
    SELECT COALESCE(SUM(totalPickedLupins), 0) AS totalLupins
    FROM users;
  `;

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching total lupins:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const totalLupins = result[0].totalLupins;

    res.status(200).json({ totalLupins });
  });
});

module.exports = router;