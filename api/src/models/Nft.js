const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "nft",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate: {
          isUUID: 4,
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contract: {
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
