const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "nft",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
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
        type: DataTypes.JSONB,
        allowNull: false,
        unique: true,
      },
      tokenData: {
        type: DataTypes.JSONB,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
