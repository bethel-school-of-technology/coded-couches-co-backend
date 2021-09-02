"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Inventory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Inventory",
    }
  );
  return Inventory;
};
