var express = require("express");
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Post method for making a new user
router.post("/users", function (req, res, next) {
  models.user
    .create(req.body)
    .then((newUser) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(newUser));
    })
    .catch((err) => {
      res.status(400);
      res.send(err.message);
    });
});

module.exports = router;
