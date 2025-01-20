const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js");
const { verifyToken } = require("../../middleware/authMiddleware.js");
const CryptoJS = require("crypto-js");
require("dotenv").config();

router.post("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;
  const { email, password, userMunicipality, associationId } = req.body;

  const updates = {};

  if (email) {
    updates.email = email;
  }

  if (password) {
    const salt = process.env.SALT_KEY;
    const encryptedPassword = CryptoJS.AES.encrypt(password, salt).toString();
    updates.password = encryptedPassword;
  }

  if (userMunicipality) {
    updates.userMunicipality = userMunicipality;
  }

  if (associationId) {
    updates.userAssociation = associationId;
  }

  console.log("Updates to be made:", updates);

  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("userId", userId);

    if (error) {
      console.error("Supabase query error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json({ message: "User updated successfully", userId });
  } catch (err) {
    console.error("Error in API:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
