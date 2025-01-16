const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js"); 

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .rpc("fetch_top_users_leaderboard");

    if (error) {
      console.error("Error fetching top users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Inga användare hittades." });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const connection = require("../../lib/conn");

// router.get('/', (req, res) => {
//   const query = `
//     SELECT u.userName, 
//       COALESCE(SUM(u.totalPickedLupins), 0) AS totalLupins
//     FROM users u
//     GROUP BY u.userName
//     ORDER BY totalLupins DESC
//     LIMIT 10;
//   `;

//   connection.query(query, (err, result) => {
//     if (err) {
//       console.error("Error fetching top users:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     if (result.length === 0) {
//       return res.status(404).json({ message: "Inga användare hittades." });
//     }

//     res.status(200).json(result);
//   });
// });

// module.exports = router;