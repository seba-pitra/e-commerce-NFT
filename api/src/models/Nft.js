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
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // available: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   validate: {
      //     isIn: [[true, false]],
      //   },
      // },
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
      category: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      source: {
        type: DataTypes.JSONB,
      },
    },
    {
      timestamps: false,
    }
  );
};
