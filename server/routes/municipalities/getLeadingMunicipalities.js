const express = require("express");
const router = express.Router();
const connection = require("../../lib/conn");

router.get("/", (req, res) => {
  const topMunicipalitiesQuery = `
    SELECT m.municipalityId, m.municipalityName, 
      COALESCE(m.municipalityTotalPickedLupins, 0) AS municipalityTotalPickedLupins, 
      SUM(u.totalPickedLupins) AS totalLupins
    FROM municipalities m
    LEFT JOIN users u ON u.userMunicipality = m.municipalityId
    GROUP BY m.municipalityId, m.municipalityName, m.municipalityTotalPickedLupins
    ORDER BY totalLupins DESC
    LIMIT 10;
  `;

  connection.query(topMunicipalitiesQuery, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Inga kommuner hittades." });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
