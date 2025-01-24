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