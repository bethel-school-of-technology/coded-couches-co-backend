var express = require("express");
var router = express.Router();
const { Inventory } = require("../models");

/* GET return all inventories */
router.get("/", function (req, res, next) {
  Inventory.findAll({}).then((result) => {
    res.json(result);
  });
});

//GET /:id get individual inventory
router.get("/:id", (req, res, next) => {
  const inventoryId = parseInt(req.params.id);

  Inventory.findOne({
    where: {
      id: inventoryId,
    },
  }).then(
    (theInventory) => {
      if (theInventory) {
        res.json(theInventory);
      } else {
        res.status(404).send(err);
      }
    },
    (err) => {
      res.status(500).send(err);
    }
  );
});

// Post, create an inventory
router.post("/", (req, res, next) => {
  Inventory.create({
    name: req.body.name,
    description: req.body.description,
    // price: req.body.price,
  })
    .then((newInventory) => {
      res.json(newInventory);
    })
    .catch(() => {
      res.status(400).send();
    });
});

// PUT ,

module.exports = router;