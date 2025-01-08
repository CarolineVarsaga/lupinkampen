const express = require("express");
const router = express.Router();
const connection = require("../../lib/conn");

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  connection.connect((err) => {
    if (err) console.log(err, "error");

    const query = "SELECT userName FROM users WHERE userId = ?";
    const values = [userId];

    connection.query(
      query,
      values,
      (err, data) => {
        if (err) console.log(err, "error");

        res.status(200).json(data);
      }
    );
  });
});

module.exports = router;
