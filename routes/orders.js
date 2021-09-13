var express = require("express");
var router = express.Router();
const { Order } = require("../models");

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

router.post("/", async (req, res, next) => {
  // //validate token / get the user
  const user = req.user;
  console.log(user);

  if (!user) {
    res.status(403).send("You must be logged in to place order");
    return;
  }

  // you have access to JWT -> what user are you working with
  // check if the "admin" value on the authenticated user is true or false

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
