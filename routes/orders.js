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

//POST create an order

//PUT update an order ( admin )

//DELETE delete an order (admin)

module.exports = router;
