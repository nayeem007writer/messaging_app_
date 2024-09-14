const express = require("express");

// internal imports
const { getUsers } = require("../controller/users.controller");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");

const router = express.Router();

// login page 
router.get("/", decorateHtmlResponse("Users"),getUsers);

module.exports = router;