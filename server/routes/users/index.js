const express = require("express");
const router = express.Router();

const createUser = require("./createUser.js");
const loginUser = require("./loginUser.js");
const updateUser = require("./updateUser.js");
const deleteUser = require("./deleteUser.js");
const getUser = require("./getUser.js");
const getUserScore = require("./getUserScore.js");
const getUserScoreSweden = require("./getUserScoreSweden.js");
const getTopUsers = require("./getLeadingUsersSweden.js");
const getUsersScoreMunicipality = require("./getUsersScoreMunicipality.js");

const checkUser = require("./checkUser.js");

const medals = require("./medals.js");
 
const registerLupins = require("./registerLupins.js");
const getTotalLupins = require("./getTotalLupinsSweden.js");

router.use("/create", createUser);
router.use("/login", loginUser);
router.use("/update", updateUser);
router.use("/delete", deleteUser);
router.use("/getuser", getUser);
router.use("/score", getUserScore); 
router.use("/scoreSweden", getUserScoreSweden); 
router.use("/topUsers", getTopUsers); 
router.use("/getUsersScoreMunicipality", getUsersScoreMunicipality);

router.use("/check", checkUser);

router.use("/medals", medals);

router.use("/registerLupins", registerLupins); 
router.use("/getTotalLupins", getTotalLupins); 

module.exports = router;
