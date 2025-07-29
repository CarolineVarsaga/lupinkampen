const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js"); 
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
require("dotenv").config();

router.post("/", async (req, res) => {
  const salt = process.env.SALT_KEY;
  const identifier = req.body.userName;
  const password = req.body.password;

  if (!identifier || !password) {
    return res.status(400).json({ message: "Username/email and password are required" });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`userName.eq.${identifier},email.eq.${identifier}`)
      .single();

    if (error) {
      console.log("Supabase error:", error);
      return res.status(500).json({ message: "Error fetching user" });
    }

    if (data) {
      const user = data;

      if (user.userDeleted === 1) {
        return res.status(403).json({ message: "This account is no longer active." });
      }

      const decryptedPassword = CryptoJS.AES.decrypt(user.password, salt).toString(CryptoJS.enc.Utf8);

      if (decryptedPassword === password) {
        const token = jwt.sign(
          { id: user.userId, userName: user.userName },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );

        return res.status(200).json({ user: user.userId, message: "Logged in", token, expiresIn: 3600 });
      } else {
        return res.status(401).json({ message: "Wrong username/email or password" });
      }
    } else {
      return res.status(401).json({ message: "Wrong username/email or password" });
    }

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
