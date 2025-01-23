const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authMiddleware.js");
const supabase = require("../../config/supabase.js");

const validMedals = 
[
  "Lupinens fiende", "Bivän", "Uppryckaren", "Bekämparen", "Florans lärling", "Beskyddaren", 
  "Faunans förkämpe", "Naturfantast", "Gröna fingrar", "Ambassadör", "Blomsterprakt", "Maskrosen", 
  "Blommande hjälte", "Fjärilsvän", "Växtentusiast", "Den tålmodige", "Fältets ande", "Mästare", "Queen Bee", 
  "Blomsterguru", "Botanist", "Mångfaldens väktare" 
];

router.post("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;
  const { name: medal } = req.body;

  if (!medal || !validMedals.includes(medal)) {
    return res.status(400).json({ message: "Ogiltig eller saknad medalj." });
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("medals")
      .eq("userId", userId)
      .eq('userDeleted', 0)
      .single();

    if (error || !user) {
      console.error(`Fel vid hämtning av användardata för användare ${userId}:`, error);
      return res.status(404).json({ message: "Användare hittades inte." });
    }

    if (user.medals && user.medals.includes(medal)) {
      return res.status(200).json({
        message: "Medaljen finns redan i användarens lista.",
        medals: user.medals,
      });
    }

    const updatedMedals = user.medals ? [...new Set([...(user.medals || []), medal])] : [medal];

    const { error: updateError } = await supabase
      .from("users")
      .update({ medals: updatedMedals })
      .eq("userId", userId);

    if (updateError) {
      console.error(`Fel vid uppdatering av medaljer för användare ${userId}:`, updateError);
      return res.status(500).json({ message: "Fel vid uppdatering av medaljer." });
    }

    return res.status(200).json({
      message: "Medalj tillagd framgångsrikt.",
      medals: updatedMedals,
    });
  } catch (err) {
    console.error("Internt fel:", err);
    return res.status(500).json({ message: "Internt serverfel." });
  }
});

module.exports = router;
