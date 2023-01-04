const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      username : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      metamask_wallet: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "Basic",
        validate: {
          customValidator: (value) => {
            const enums = ["Admin", "VerificationInProcess", "Verified", "Basic"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
      face_picture: {
        type: DataTypes.TEXT,
      },
      dni_image_front: {
        type : DataTypes.TEXT,
      },
      dni_image_back: {
        type : DataTypes.TEXT,
      },
      phone_number: {
        type : DataTypes.STRING,
        unique : true,
      },
      nationality : {
        type : DataTypes.STRING,
      },
      address : {
        type : DataTypes.STRING,
      },
      dni: {
        type: DataTypes.STRING,
        unique: true,
      },
      profile_pic: {
        type : DataTypes.TEXT,
      }
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
