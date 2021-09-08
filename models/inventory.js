"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "id",
      });
    }
  }
  Inventory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
      price: {
        type: DataTypes,
        Integer,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: "Inventory",
    }
  );
  return Inventory;
};
