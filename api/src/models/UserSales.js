const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
      "userSales", {}, { timestamps: true }
      );
  };
  