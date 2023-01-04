const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "purchase",
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
      contract: {
        type: DataTypes.STRING,
      },
      statusPay: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["Created", "Pending", "Rejected", "Successed"];
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
      /*
      Esto se maneja mediante asignar los nfts a la compra,
      no hace falta agregar al modelo un arreglo de JSONS
      */
      pruchases: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },

      /*
        Preguntarle a los chicos para que es esto
        o averiguarlo.
      */
      from: {
        type: DataTypes.STRING,
      },
      to: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
