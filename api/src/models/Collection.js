const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "collection",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
  },
  {
    timestamps: false,
  });
};
