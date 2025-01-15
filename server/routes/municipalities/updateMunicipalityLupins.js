const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase.js"); 

router.post("/", async (req, res) => {
  const { userId, additionalLupins } = req.body;

  if (!userId || !additionalLupins) {
    return res.status(400).json({ message: "userId och additionalLupins krävs." });
  }

  try {
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("totalPickedLupins")
      .eq("userId", userId)
      .single(); 

    if (fetchError) {
      console.error("Error fetching user data:", fetchError);
      return res.status(500).json({ message: "Internal server error" });
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({
        totalPickedLupins: user.totalPickedLupins + additionalLupins,
      })
      .eq("userId", userId);

    if (updateError) {
      console.error("Error updating user lupins:", updateError);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json({ message: "Lupiner uppdaterade för användaren." });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const connection = require("../../lib/conn");

// router.post("/", (req, res) => {
//   const { userId, additionalLupins } = req.body;

//   if (!userId || !additionalLupins) {
//     return res.status(400).json({ message: "userId och additionalLupins krävs." });
//   }

//   const updateUserQuery = `
//     UPDATE users
//     SET totalPickedLupins = totalPickedLupins + ?
//     WHERE userId = ?
//   `;

//   connection.query(updateUserQuery, [additionalLupins, userId], (err, result) => {
//     if (err) {
//       console.error("Error updating user lupins:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     res.status(200).json({ message: "Lupiner uppdaterade för användaren." });
//   });
// });

// module.exports = router;
