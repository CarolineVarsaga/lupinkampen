const express = require("express");
const router = express.Router();

const createUser = require("./createUser.js");
const loginUser = require("./loginUser.js");
const updateUser = require("./updateUser.js");
const deleteUser = require("./deleteUser.js");
const getUser = require("./getUser.js");

const registerLupins = require("./registerLupins.js");
const getLupins = require("./getLupins.js");

router.use("/create", createUser);
router.use("/login", loginUser);
router.use("/update", updateUser);
router.use("/delete", deleteUser);
router.use("/getuser", getUser);

router.use("/registerLupins", registerLupins); 
router.use("/getLupins", getLupins); 

module.exports = router;
