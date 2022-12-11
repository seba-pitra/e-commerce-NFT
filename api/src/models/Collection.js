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
      },
      name: {
        type: DataTypes.STRING,
        // allowNull: false, // needs fix
      },
      image: {
        type: DataTypes.STRING,
        // allowNull: false, // needs fix
      },
      /* 
      description: {
        type: DataTypes.STRING,
        unique: true,
      }, */
    },
    {
      timestamps: false,
    }
  );
};
