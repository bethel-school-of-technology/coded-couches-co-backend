"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      // define association here
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
