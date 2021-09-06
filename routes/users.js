var express = require("express");
var router = express.Router();
const { User } = require("../models");
var bcrypt = require("bcrypt");

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

// Post, Register User
router.post("/", async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).semd("Username and password is required");
    return;
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  User.create({
    username: req.body.username,
    password: hashedPassword,
  })
    .then((newUser) => {
      res.json({
        id: newUser.id,
        username: newUser.username,
      });
    })
    .catch(() => {
      res.status(400).send();
    });
});

// Register User

// SignIn

module.exports = router;
