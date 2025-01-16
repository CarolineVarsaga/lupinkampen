const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authMiddleware.js");
const supabase = require("../../config/supabase.js");

router.get("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from('users') 
      .select('totalPickedLupins, recentlyPickedLupins')
      .eq('userId', userId) 
      .single(); 

    if (error) {
      console.log("Supabase query error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!data) {
      return res.status(404).json({ message: "Användare hittades inte." });
    }

    res.status(200).json({
      totalPickedLupins: data.totalPickedLupins,
      recentlyPickedLupins: data.recentlyPickedLupins,
    });
  } catch (err) {
    console.log("Error in API:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;




// const express = require("express");
// const router = express.Router();
// const connection = require("../../lib/conn"); 
// const { verifyToken } = require("../../middleware/authMiddleware.js");

// router.get("/:userId", verifyToken, (req, res) => {
//   const { userId } = req.params;
//   const query = "SELECT totalPickedLupins, recentlyPickedLupins FROM users WHERE userId = ?";

//   connection.query(query, [userId], (err, result) => {
//     if (err) {
//       console.log("Database query error:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     if (result.length === 0) {
//       return res.status(404).json({ message: "Användare hittades inte." });
//     }

//     res.status(200).json({
//       totalPickedLupins: result[0].totalPickedLupins,
//       recentlyPickedLupins: result[0].recentlyPickedLupins,
//     });
//   });
// });

// module.exports = router;
