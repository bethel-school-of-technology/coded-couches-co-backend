var express = require("express");
var router = express.Router();
const { Inventory } = require("../models");

/* GET: return all inventories */
router.get("/", function (req, res, next) {
  Inventory.findAll({}).then((result) => {
    res.json(result);
  });
});

//GET: /:id get individual inventory
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

// POST: create an inventory
router.post("/", async (req, res, next) => {
  // //validate token / get the user
  const user = req.user;

  if (!user.admin) {
    res.status(403).send();
    return;
  }

  // you have access to JWT -> what user are you working with
  // check if the "admin" value on the authenticated user is true or false

  //create the inventory with the user id (I want to be able to implement price into the models for admin to add/update prices)
  Inventory.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    UserId: user.id,
  })
    .then((newInventory) => {
      res.json(newInventory);
    })
    .catch(() => {
      res.status(400).send();
    });
});

// PUT: update an inventory
router.put("/:id", (req, res, next) => {
  const inventoryId = parseInt(req.params.id);

  if (!inventoryId || !user.admin) {
    //changed inventoryId <=0
    res.status(400).send("Invalid ID");
    return;
  }

  //compare the inventory's userid to the token user id
  Inventory.update(
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    },
    {
      where: {
        id: inventoryId,
      },
    }
  )
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

// DELETE: delete an inventory
router.delete("/:id", (req, res, next) => {
  const inventoryId = parseInt(req.params.id);

  if (!inventoryId || !user.admin) {
    //changed inventoryId <= 0
    res.status(400).send("Invalid ID");
    return;
  }

  Inventory.destroy({
    where: {
      id: inventoryId,
    },
  })
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

module.exports = router;
