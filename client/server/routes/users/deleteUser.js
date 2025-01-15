const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js");

router.delete("/:userId", async (req, res) => {
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



// const express = require("express");
// const router = express.Router();
// const connection = require("../../lib/conn");

// router.delete("/:userId", (req, res) => {
//   const userId = req.params.userId;

//   connection.connect((err) => {
//     if (err) console.log(err, "error");

//     const query = "UPDATE users SET userDeleted=1 WHERE userId=?";
//     const values = [userId];

//     connection.query(query, values, (err, data) => {
//       if (err) console.log(err, "error");

//       res.json({ message: "user deleted" });
//     });
//   });
// });

// module.exports = router;
