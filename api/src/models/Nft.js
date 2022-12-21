const { DataTypes, STRING } = require("sequelize");

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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
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
      rarity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      rarityRank: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lastBuyValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lastBuyTs: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lastSellValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lastSellTs: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      ownerName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ownerIcon: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
