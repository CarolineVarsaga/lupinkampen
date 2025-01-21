const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authMiddleware.js");
const supabase = require("../../config/supabase.js"); 
const { medals } = require("../medalsList.js"); 

router.post("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;
  const { lupinsPicked } = req.body;

  if (!lupinsPicked || lupinsPicked <= 0) {
    return res.status(400).json({ message: "Antal plockade lupiner måste vara större än noll." });
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("totalPickedLupins, medals")
      .eq("userId", userId)
      .single();

    if (error || !user) {
      console.error("Fel vid hämtning av användardata:", error);
      return res.status(404).json({ message: "Användare hittades inte." });
    }

    const newTotal = (user.totalPickedLupins || 0) + lupinsPicked;

    if (!medals || !Array.isArray(medals)) {
      console.error("Medals är inte korrekt definierat:", medals);
      return res.status(500).json({ message: "Medals är inte korrekt definierat." });
    }

    const earnedMedals = medals.filter((medal) => newTotal >= medal.threshold);

    const updatedMedals = [...new Set([
      ...(user.medals || []),
      ...earnedMedals.map(medal => medal.name)
    ])];

    const { error: updateError } = await supabase
      .from("users")
      .update({
        totalPickedLupins: newTotal,
        medals: updatedMedals,
        recentlyPickedLupins: lupinsPicked,
      })
      .eq("userId", userId);

    if (updateError) {
      console.error("Fel vid uppdatering av användardata:", updateError);
      return res.status(500).json({ message: "Fel vid uppdatering av användardata." });
    }

    return res.status(200).json({
      message: "Data uppdaterad framgångsrikt.",
      newTotal,
      medals: updatedMedals,
      recentlyPickedLupines: lupinsPicked
    });
  } catch (err) {
    console.error("Internt fel:", err);
    return res.status(500).json({ message: "Internt serverfel." });
  }
});

module.exports = router;