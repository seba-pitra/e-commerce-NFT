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
      category: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
        allowNull: false,
      },
      rarity: {
        type: DataTypes.FLOAT,
      },
      rarityRank: {
        type: DataTypes.FLOAT,
      },
      lastBuyValue: {
        type: DataTypes.FLOAT,
      },
      lastBuyTs: {
        type: DataTypes.FLOAT,
      },
      lastSellValue: {
        type: DataTypes.FLOAT,
      },
      lastSellTs: {
        type: DataTypes.FLOAT,
      },
      ownerName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ownerIcon: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
