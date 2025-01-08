const express = require("express");
const router = express.Router();
const connection = require("../../lib/conn");

router.delete("/:userId", (req, res) => {
  const userId = req.params.userId;

  connection.connect((err) => {
    if (err) console.log(err, "error");

    const query = "UPDATE users SET userDeleted=1 WHERE userId=?";
    const values = [userId];

    connection.query(query, values, (err, data) => {
      if (err) console.log(err, "error");

      res.json({ message: "user deleted" });
    });
  });
});

module.exports = router;
