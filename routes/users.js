var express = require("express");
var router = express.Router();
const { User } = require("../models");

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

// Post, Register User
router.post("/", (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).semd("Username and password is required");
    return;
  }

  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((newUser) => {
      res.json(newUser);
    })
    .catch(() => {
      res.status(400).send();
    });
});

// Register User

// SignIn

module.exports = router;
