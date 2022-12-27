const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "collection",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      apiId : {
        type : DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
      origin : {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["API", "USER"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
        allowNull: true,
      }
  },
  {
    timestamps: false,
  });
};
