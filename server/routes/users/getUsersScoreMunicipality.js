const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js"); 

router.get("/:municipalityId", async (req, res) => {
  const { municipalityId } = req.params;

  try {
    const { data: leaderboard, error } = await supabase
      .from("users")
      .select("userId, userName, totalPickedLupins, avatar")
      .eq("userMunicipality", municipalityId)
      .eq('userDeleted', 0)
      .order("totalPickedLupins", { ascending: false })
      .limit(10); 

    if (error) {
      console.log("Supabase query error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!municipalityId) {
      return res.status(404).json({ message: "Kommunen hittades inte." });
    }

    if (leaderboard.length === 0) {
      return res.status(200).json({ message: "Inga användare hittades.", data: [] });
    }

    res.status(200).json(leaderboard);
  } catch (err) {
    console.log("Error in API:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
