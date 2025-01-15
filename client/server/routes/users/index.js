const express = require("express");
const router = express.Router();

const createUser = require("./createUser.js");
const loginUser = require("./loginUser.js");
const updateUser = require("./updateUser.js");
const deleteUser = require("./deleteUser.js");
const getUser = require("./getUser.js");
const getUserScore = require("./getUserScore.js");
const getUserScoreSweden = require("./getUserScoreSweden.js");
const getTopUsers = require("./getLeadingUsers.js");
 
const registerLupins = require("./registerLupins.js");
const getLupins = require("./getLupins.js");
const getTotalLupins = require("./getTotalLupins.js");


router.use("/create", createUser);
router.use("/login", loginUser);
router.use("/update", updateUser);
router.use("/delete", deleteUser);
router.use("/getuser", getUser);
router.use("/score", getUserScore); 
router.use("/scoreSweden", getUserScoreSweden); 
router.use("/topUsers", getTopUsers); 

router.use("/registerLupins", registerLupins); 
router.use("/getLupins", getLupins); 
router.use("/getTotalLupins", getTotalLupins); 

router.get("/", (req, res) => {
  res.status(200).json({ message: "Test route fungerar!" });
});

module.exports = router;
