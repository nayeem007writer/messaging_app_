const express = require("express");

// internal imports
const { getUsers, addUser } = require("../controller/users.controller");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const avatarUpload = require("../middleware/user/avater.upload");
const { addUserValidators, addUserValidationHandler } = require("../middleware/user/user.validator");

const router = express.Router();

// login page 
router.get("/", decorateHtmlResponse("Users"),getUsers);
// add a user
router.post("/",avatarUpload, addUserValidators, addUserValidationHandler, addUser);

module.exports = router;