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
router.post("/", async (req, res, next) => {
  // //get token from the request
  // const header = req.headers.authorization;

  // if (!header) {
  //   res.status(403).send();
  //   return;
  // }

  // const token = header.split(" ")[1];

  // //validate token / get the user
  // const user = await auth.verifyUser(token);
  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }

  //create the cat with the user id

  Inventory.create({
    name: req.body.name,
    description: req.body.description,
    UserId: user.id,
    // price: req.body.price,
  })
    .then((newInventory) => {
      res.json(newInventory);
    })
    .catch(() => {
      res.status(400).send();
    });
});

// PUT , update an inventory
router.put("/:id", (req, res, next) => {
  const inventoryId = parseInt(req.params.id);

  if (!inventoryId || inventoryId <= 0) {
    res.status(400).send("Invalid ID");
    return;
  }

  //get the inventory from jwt

  //get the cat already in the database

  //compare the inventory's userid to the token user id

  Inventory.update(
    {
      name: req.body.name,
      description: req.body.description,
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

// DELETE delete an inventory
router.delete("/:id", (req, res, next) => {
  const inventoryId = parseInt(req.params.id);

  if (!inventoryId || inventoryId <= 0) {
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
