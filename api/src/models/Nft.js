const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "nft",
    {
      id: {
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contract: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      collectionId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      tokenId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true,
      },
      source: {
        type: DataTypes.JSON,
        allowNull: false,
        unique: true,
      },
      tokenData: {
        type: DataTypes.JSON,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
