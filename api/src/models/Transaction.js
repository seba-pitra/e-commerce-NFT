const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "transaction",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
      },
      statusPay: {
        type: DataTypes.STRING,
        defaultValue: "Created",
        validate: {
          customValidator: (value) => {
            const enums = ["Created", "Pending", "Rejected", "Successful" ];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
      payMethod: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["MercadoPago", "Metamask"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
