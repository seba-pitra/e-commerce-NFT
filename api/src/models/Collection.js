const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "collection",
    {
      id: {
        type: DataTypes.STRING,
        // defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        // validate: {
        //   isUUID: 4,
        // },
      } /* 
      description: {
        type: DataTypes.STRING,
        unique: true,
      }, */,
    },
    {
      timestamps: false,
    }
  );
};
