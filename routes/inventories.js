var express = require("express");
var router = express.Router();
const { Inventory } = require("../models");

/* GET return all inventories */
router.get("/", function (req, res, next) {
  Inventory.findAll({}).then((result) => {
    res.json(result);
  });
});

// Post, create an inventory

// PUT ,

module.exports = router;
