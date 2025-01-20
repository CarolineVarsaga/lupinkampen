const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authMiddleware.js");
const supabase = require("../../config/supabase.js"); 

router.post("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;
  const { lupinsPicked } = req.body;

  if (!lupinsPicked || lupinsPicked <= 0) {
    return res.status(400).json({ message: "Antal plockade lupiner måste vara större än noll." });
  }

  try {
    const { data: user, error } = await supabase
      .from('users') 
      .select('totalPickedLupins') 
      .eq('userId', userId) 
      .single();

    if (error) {
      console.log("Supabase query error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!user) {
      return res.status(404).json({ message: "Användare hittades inte." });
    }

 
    const { error: updateError } = await supabase
      .from('users')
      .update({
        recentlyPickedLupins: lupinsPicked,
        totalPickedLupins: (user.totalPickedLupins || 0) + lupinsPicked, 
      })
      .eq('userId', userId); 

    if (updateError) {
      console.log("Supabase update error:", updateError);
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({
      message: "Registrering av lupiner lyckades.",
      recentlyPickedLupins: lupinsPicked,
      newTotal: (user.totalPickedLupins || 0) + lupinsPicked,
    });

  } catch (err) {
    console.log("Error in API:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;