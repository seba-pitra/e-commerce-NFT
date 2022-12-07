const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "nft",
    {
      id: {
        type: DataTypes.INTEGER,
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
      },
      collectionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokenId: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      source: {
        type: DataTypes.JSONB,
      },
      tokenData: {
        type: DataTypes.JSONB,
      },
    },
    {
      timestamps: false,
    }
  );
};
