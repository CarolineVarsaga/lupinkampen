const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js"); 

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const { data: user, error: userError } = await supabase
      .from('users') 
      .select('totalPickedLupins') 
      .eq('userId', userId) 
      .eq('userDeleted', 0)
      .single(); 

    if (userError) {
      console.log("Supabase query error:", userError);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!user) {
      return res.status(404).json({ message: "Användare hittades inte." });
    }

    const { totalPickedLupins } = user;

    const { data: leaderboard, error: leaderboardError } = await supabase
      .from('users') 
      .select('userId, totalPickedLupins')
      .order('totalPickedLupins', { ascending: false }); 

    if (leaderboardError) {
      console.log("Supabase query error:", leaderboardError);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (leaderboard.length === 0) {
      return res.status(404).json({ message: "Inga användare hittades." });
    }

    const userPlacement = leaderboard.findIndex(user => String(user.userId) === String(userId)) + 1;

    if (userPlacement === 0) {
      return res.status(404).json({ message: "Användaren finns inte på rankningen. Kontrollera om du har registrerat några plockade lupiner." });
    }

    res.status(200).json({
      userPlacement,
      totalPickedLupins,
    });
  } catch (err) {
    console.log("Error in API:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;