const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js"); 
const { verifyToken } = require("../../middleware/authMiddleware.js");

router.get("/:municipalityId", verifyToken, async (req, res) => {
  const { municipalityId } = req.params;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("userId, userName, totalPickedLupins")
      .eq("userMunicipality", municipalityId)
      .order("totalPickedLupins", { ascending: false });

    if (error) {
      console.log("Supabase query error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Inga användare hittades i denna kommun." });
    }

    res.status(200).json({
      leaderboard: data,
    });
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;




// const express = require("express");
// const router = express.Router();
// const connection = require("../../lib/conn");
// const { verifyToken } = require("../../middleware/authMiddleware.js");

// router.get("/:municipalityId", verifyToken, (req, res) => {
//   const { municipalityId } = req.params;

//   const query = `
//     SELECT userId, userName, totalPickedLupins
//     FROM users
//     WHERE userMunicipality = ?
//     ORDER BY totalPickedLupins DESC
//   `;

//   connection.query(query, [municipalityId], (err, result) => {
//     if (err) {
//       console.log("Database query error:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     if (result.length === 0) {
//       return res.status(404).json({ message: "Inga användare hittades i denna kommun." });
//     }

//     res.status(200).json({
//       leaderboard: result,
//     });
//   });
// });

// module.exports = router;