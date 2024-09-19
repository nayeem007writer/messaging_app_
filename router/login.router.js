const express = require("express");

// internal imports
const { getLogin, login } = require("../controller/login.controller");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const { loginValidators, loginValidatorErrorHandler } = require("../middleware/login/login.validator");

const router = express.Router();

// login page 
router.get("/", decorateHtmlResponse("Index"), getLogin);

//login process
router.post("/", decorateHtmlResponse("login"),loginValidators, loginValidatorErrorHandler, login);

module.exports = router;