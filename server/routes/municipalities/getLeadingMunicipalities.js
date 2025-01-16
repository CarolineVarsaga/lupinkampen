const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js");  

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.rpc('fetch_leaderboard', {
    });

    if (error) {
      console.error("Error fetching leaderboard:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json(data); 
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const connection = require("../../lib/conn");

// router.get("/", (req, res) => {
//   const topMunicipalitiesQuery = `
//     SELECT m.municipalityId, m.municipalityName, 
//       COALESCE(m.municipalityTotalPickedLupins, 0) AS municipalityTotalPickedLupins, 
//       SUM(u.totalPickedLupins) AS totalLupins
//     FROM municipalities m
//     LEFT JOIN users u ON u.userMunicipality = m.municipalityId
//     GROUP BY m.municipalityId, m.municipalityName, m.municipalityTotalPickedLupins
//     ORDER BY totalLupins DESC
//     LIMIT 10;
//   `;

//   connection.query(topMunicipalitiesQuery, (err, results) => {
//     if (err) {
//       console.error("Database query error:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ message: "Inga kommuner hittades." });
//     }

//     res.status(200).json(results);
//   });
// });

// module.exports = router;
