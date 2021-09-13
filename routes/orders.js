var express = require("express");
var router = express.Router();
const { Order } = require("../models");

//GET return all orders
router.get("/", function (req, res, next) {
  Order.findAll().then((orderList) => {
    res.json(orderList);
  });
  //res.send('respond with a resource');
});

//POST create an order    ASK A MENTOR ON WHAT TO WRITE FOR THIS, YOU ARE TAKING IN MULTIPLE ID'S AND ORDER TOTAL WILL BE NOT ENTERED BY THE USER, SAME WITH THEIR ID.
router.post("/", (req, res, next) => {
  Order.create({
    userId: req.body.userId,
    inventoryId: req.body.inventoryId,
    orderTotal: req.body.inventoryI,
  })
    .then((newOrder) => {
      res.json(newOrder);
    })
    .catch(() => {
      res.status(500);
    });
});

//PUT update an order ( admin )

//DELETE delete an order (admin)

module.exports = router;
