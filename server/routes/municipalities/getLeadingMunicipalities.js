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