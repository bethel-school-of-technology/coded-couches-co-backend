"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "id",
      });
    }
  }
  Order.init(
    {
      orderId: DataTypes.INTEGER,
      // inventoryId: DataTypes.ARRAY(DataTypes.INTEGER),
      inventoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(9, 2),
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
