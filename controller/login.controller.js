// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

//internal imports
const User = require("../model/user.model");
// get login page
function getLogin(req, res, next) {
    res.render("index");
} 

async function login(req, res, next) {
    try{
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }],
          });
          
        console.log(user);
        if (user && user._id) {
            const isValidPass = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if (isValidPass) {
                const tokenObject = {
                    username: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: "user",
                };
            const token = jwt.sign(tokenObject, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXP,
            });     
            
            // set cokie
            res.cookie(process.env.COOKIE_NAME, token, {
                maxAge: process.env.JWT_EXP,
                httpOnly: true,
                signed: true,
            });
            res.locals.loggedInuser = tokenObject;
            res.render("inbox");
            } else {
                throw createError("Login failed! Please try again....");
            }
        } else {
            throw createError("Login failed! Please try again...");
        }
    } catch (err) {
        res.render("index", {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message,
                }
            },
        },);
    }
}
module.exports = {
    getLogin,
    login,
}