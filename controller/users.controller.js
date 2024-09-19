// external imports
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

// internal imports
const User = require("../model/user.model");

// get user
async function getUsers(req, res, next) {
    try {
      const users = await User.find();
      res.render("users", {
        users: users,
      });
    } catch (err) {
      next(err);
    }
  }

// add user
async function addUser(req, res, next) {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    console.log(req.body.password);
  
    if (req.files && req.files.length > 0) {
      newUser = new User({
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
      });
      console.log(newUser)
    } else {
      newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
    }
  
    // save user or send error
    try {
      const result = await newUser.save();
      res.status(200).json({
        message: "User was added successfully!",
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: "Unknown error occured!",
          },
        },
      });
    }
  }

module.exports = {
    getUsers,
    addUser,
}