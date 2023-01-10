const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "userPurchases", {}, { timestamps: true }
    );
};
