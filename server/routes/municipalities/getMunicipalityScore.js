const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js"); 

router.get("/:municipalityId", async (req, res) => {
  const { municipalityId } = req.params;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("userId, userName, totalPickedLupins")
      .eq("userMunicipality", municipalityId)
      .eq('userDeleted', 0)
      .order("totalPickedLupins", { ascending: false });

    if (error) {
      console.log("Supabase query error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!municipalityId) {
      return res.status(404).json({ message: "Kommunen hittades inte." });
    }

    if (data.length === 0) {
      return res.status(200).json({ message: "Inga användare hittades." });
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