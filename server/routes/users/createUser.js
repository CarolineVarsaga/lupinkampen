const express = require("express");
const router = express.Router();
const connection= require("../../lib/conn");
const CryptoJS = require("crypto-js");
require("dotenv").config();

const generateUserId = () => Math.floor(Math.random() * 1000000000000);

const checkUniqueUserId = (callback) => {
  const userId = generateUserId();

  const query = "SELECT COUNT(*) AS count FROM users WHERE userId = ?";
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.log("Database error:", err);
      return callback(err);
    }

    if (results[0].count > 0) {
      checkUniqueUserId(callback);
    } else {
      callback(null, userId);
    }
  });
};

router.post("/", (req, res) => {
  const salt = process.env.SALT_KEY;
  const { userName, email, password, userMunicipality, associationId } = req.body;
  const encryptedPassword = CryptoJS.AES.encrypt(password, salt).toString();

  if(/\s/.test(userName)) {
    return res.status(400).json({ message: "Invalid username" });
  }

  checkUniqueUserId((err, userId) => {
    if (err) {
      return res.status(500).json({ message: "Error generating userId" });
    }

    const query =
      "INSERT INTO users (userId, userName, password, email, userMunicipality, userAssociation) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      userId,
      userName,
      encryptedPassword,
      email,
      userMunicipality,
      associationId,
    ];

    connection.query(query, values, (err, data) => {
      if (err) console.log(err, "error");
    });
    res
      .status(200)
      .json({ message: "user saved successfully", userId: userId });
  });
});

module.exports = router;
