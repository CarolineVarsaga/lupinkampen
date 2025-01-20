const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const supabase = require("../../config/supabase");
require("dotenv").config();

const generateUserId = () => Math.floor(Math.random() * 1000000000000);

const checkUniqueUserId = async () => {
  const userId = generateUserId();
  const { data, error } = await supabase
    .from("users")
    .select("userId", { count: "exact" })
    .eq("userId", userId);

  if (error) {
    console.log("Database error:", error);
    throw error;
  }

  if (data.length > 0) {
    return checkUniqueUserId();
  }

  return userId;
};

router.post("/", async (req, res) => {
  try {
    const salt = process.env.SALT_KEY;
    const { userName, email, password, userMunicipality, associationId } = req.body;

    if (/\s/.test(userName)) {
      return res.status(400).json({ message: "Invalid username" });
    }

    const encryptedPassword = CryptoJS.AES.encrypt(password, salt).toString();
    const userId = await checkUniqueUserId();

    const { error } = await supabase.from("users").insert([
      {
        userId,
        userName,
        password: encryptedPassword,
        email,
        userMunicipality,
        userAssociation: associationId,
      },
    ]);

    if (error) {
      console.error("Error saving user:", error);
      return res.status(500).json({ message: "Error saving user" });
    }

    res.status(200).json({ message: "User saved successfully", userId });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;