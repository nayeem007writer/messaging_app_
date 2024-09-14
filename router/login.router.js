const express = require("express");

// internal imports
const { getLogin } = require("../controller/login.controller");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");

const router = express.Router();

// login page 
router.get("/", decorateHtmlResponse("Index"), getLogin);

module.exports = router;