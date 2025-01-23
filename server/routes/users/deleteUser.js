const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js");
const { verifyToken } = require("../../middleware/authMiddleware.js");

router.delete("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const { error } = await supabase
      .from("users")
      .update({ userDeleted: 1 })
      .eq("userId", userId);

    if (error) {
      console.error("Supabase query error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error("Error in API:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;