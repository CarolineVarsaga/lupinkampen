const express = require("express");
const router = express.Router();

const getMunicipalityScore = require("./getMunicipalityScore.js");

router.use("/score", getMunicipalityScore); 

module.exports = router;
