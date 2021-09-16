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
      // inventoryId: DataTypes.ARRAY(DataTypes.INTEGER),
      inventoryId: DataTypes.INTEGER,
      orderTotal: {
        type: DataTypes.DECIMAL(9, 2),
        //Does not like me using allowNull here similar to inventory.js model
      },
      invoiceNumber: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  Order.associate = (models) => {
    Order.belongsTo(models.User);
  };

  return Order;
};
