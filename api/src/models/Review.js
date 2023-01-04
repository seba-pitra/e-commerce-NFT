const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("review",
    {
        id : {
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV4,
            allowNull : false,
            unique : true,
            primaryKey : true
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5
            }
        }
    },{
        timestamps: true,
        paranoid: true,
    });
};
