const express = require("express");
const router = express.Router();
const connection = require("../../lib/conn");
require("dotenv").config();

router.post("/:userId", (req, res) => {
  const userId = req.params.userId;
  const { email, password, userMunicipality, associationId } = req.body;

  const salt = process.env.SALT_KEY;
  const encryptedPassword = CryptoJS.AES.encrypt(password, salt).toString();

  connection.connect((err) => {
    if (err) console.log(err, "error");

    const query =
      "UPDATE users SET email=?, password=?, userMunicipality=?, userAssociation=? WHERE userId=?";
    const values = [
      email,
      encryptedPassword,
      userMunicipality,
      associationId,
      userId,
    ];

    connection.query(query, values, (err, data) => {
      if (err) console.log(err, "error");

      res.json({ userId: userId, data: data });
    });
  });
});
//================================================
router.post("/:userId/email", (req, res) => {
  const userId = req.params.userId;
  const { email } = req.body;

  const query = "UPDATE users SET email = ? WHERE userId = ?";
  const values = [email, userId];

  connection.query(query, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error updating email" });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Email updated successfully" });
  });
});
//=================================================
router.post("/:userId/password", (req, res) => {
  const userId = req.params.userId;
  const { password } = req.body;
  const salt = process.env.SALT_KEY;
  const encryptedPassword = CryptoJS.AES.encrypt(password, salt).toString();

  const query = "UPDATE users SET password = ? WHERE userId = ?";
  const values = [encryptedPassword, userId];

  connection.query(query, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error updating password" });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  });
});
//================================================
router.post("/:userId/municipality", (req, res) => {
  const userId = req.params.userId;
  const { userMunicipality } = req.body;

  const query = "UPDATE users SET userMunicipality = ? WHERE userId = ?";
  const values = [userMunicipality, userId];

  connection.query(query, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Error updating userMunicipality" });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "userMunicipality updated successfully" });
  });
});
//================================================
router.post("/:userId/association", (req, res) => {
  const userId = req.params.userId;
  const { userAssociation } = req.body;

  const query = "UPDATE users SET userAssociation = ? WHERE userId = ?";
  const values = [userAssociation, userId];

  connection.query(query, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Error updating userAssociation" });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "userAssociation updated successfully" });
  });
});

module.exports = router;
