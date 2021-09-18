var express = require("express");
var router = express.Router();
const { Order } = require("../models");
const authService = require("../services/auth");

//GET return all orders
router.get("/", function (req, res, next) {
  Order.findAll().then((result) => {
    res.json(result);
  });
  //res.send('respond with a resource');
});

//POST create an order    ASK A MENTOR ON WHAT TO WRITE FOR THIS, YOU ARE TAKING IN MULTIPLE ID'S AND ORDER TOTAL WILL BE NOT ENTERED BY THE USER, SAME WITH THEIR ID.
// router.post("/", (req, res, next) => {
//   Order.create({
//     userId: req.body.userId,
//     inventoryId: req.body.inventoryId,
//     orderTotal: req.body.orderTotal,
//   })
//     .then((newOrder) => {
//       res.json(newOrder);
//     })
//     .catch(() => {
//       res.status(400).send;
//     });
// });

router.post("/checkout", (request, response, next) => {
  // request.data.order
  // [{itemId:1, itemQuantity:2}, {itemId:2, itemQunatity:1}]
  // validation:
  // - valid user: check auth user
  // - check in database that itemIds exists: find an item with the requested itemID
  // - validate type of value...
  // do the math to calcuate totat price. create the order and store it.
  // items: itemId=1 qtt=5 qtt-itemQuantity
});

// Checkout attempt V
router.post("/checkout", (req, res, next) => {
  const inventoryId = parseInt(req.params.id);
  const user = req.user;
  authService.verifyUser(user).then((user) => {
    if (!inventoryId || inventoryId <= 0) {
      if (!user) {
        res.status(400).send("Invalid ID");
        return;
      }
    }
    Inventory.update(
      {
        quantity: quantity - req.body.quantity,
      },
      {
        where: {
          id: inventoryId,
        },
      }
    )
      .then(() => {
        res.status(200).send();
      })
      .catch(() => {
        res.status(400).send();
      });
  });
});

router.post("/", async (req, res, next) => {
  const user = req.user;
  console.log(user);

  if (!user) {
    res.status(403).send("You must be logged in to place order");
    return;
  }

  Order.create({
    inventoryId: req.body.inventoryId,
    orderTotal: req.body.orderTotal,
  })
    .then((newOrder) => {
      res.json(newOrder);
    })
    .catch(() => {
      res.status(400).send();
    });
});

//PUT update an order ( admin )

//DELETE delete an order (admin)

module.exports = router;
