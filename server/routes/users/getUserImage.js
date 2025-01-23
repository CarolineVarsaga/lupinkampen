const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js"); 

router.get("/:userId", async (req, res) => {

  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from('users') 
      .select('avatar')
      .eq('userId', userId) 
      .eq('userDeleted', 0)
      .single(); 

    if (error) {
      console.log("Supabase query error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!data) {
      return res.status(404).json({ message: "Användare hittades inte." });
    }

    if (data.avatar) {
      return res.status(200).json({ avatar: data.avatar });
    }

    return res.status(200).json({ avatar: "/assets/profile-pic.png" });

  } catch (err) {
    console.log("Error in API:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;