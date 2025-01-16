const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js"); 

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.rpc("fetch_total_lupins");

    if (error) {
      console.error("Error fetching total lupins:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    const totalLupins = data || 0;

    res.status(200).json({ totalLupins });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;




// const express = require("express");
// const router = express.Router();
// const connection = require("../../lib/conn");

// router.get('/', (req, res) => {
//   const query = `
//     SELECT COALESCE(SUM(totalPickedLupins), 0) AS totalLupins
//     FROM users;
//   `;

//   connection.query(query, (err, result) => {
//     if (err) {
//       console.error("Error fetching total lupins:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     const totalLupins = result[0].totalLupins;

//     res.status(200).json({ totalLupins });
//   });
// });

// module.exports = router;