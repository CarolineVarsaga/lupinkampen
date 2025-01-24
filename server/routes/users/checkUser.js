const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js"); 

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("userName", username)
      .single();

    if (error) {
      return res.status(500).json({ message: "Error fetching user" });
    }

    if (data) {
      return res.status(200).json({ user: data });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;