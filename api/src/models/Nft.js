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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      category: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contract: {
        type: DataTypes.STRING,
      },
      tokenId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      rarity: {
        type: DataTypes.FLOAT,
      },
      favs: {
        type: DataTypes.FLOAT,
      },
      stars: {
        type: DataTypes.FLOAT,
      },
      lastBuyValue: {
        type: DataTypes.FLOAT,
      },
      lastBuyTs: {
        type: DataTypes.DATE,
      },
      createdTs: {
        type: DataTypes.DATE,
      },
      ownerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerIcon: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
