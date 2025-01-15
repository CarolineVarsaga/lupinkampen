const express = require("express");
const router = express.Router();

const getMunicipalityScore = require("./getMunicipalityScore.js");
const getLeadingMunicipalities = require("./getLeadingMunicipalities.js");

router.use("/score", getMunicipalityScore); 
router.use("/topMunicipalities", getLeadingMunicipalities); 

module.exports = router;
