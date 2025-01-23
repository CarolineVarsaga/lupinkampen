const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js"); 

router.get("/:userId", async (req, res) => {  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('userName, email, userMunicipality, userId, medals')
      .eq('userId', req.params.userId)
      .eq('userDeleted', 0)
      .single(); 

    if (error) {
      console.log("Supabase query error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.log("Error in API:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;