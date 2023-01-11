require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY, DB_DEPLOY2 } = process.env;

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Nft, Collection, Transaction, Review, UserSales, UserPurchases } =
  sequelize.models;

//-- USER RELATIONS
User.hasMany(Nft);
User.hasMany(Collection);
User.hasMany(Review);
User.belongsToMany(Transaction, {
  through: UserSales,
  as: "sales",
  foreignKey: "sellerId",
});
User.belongsToMany(Transaction, {
  through: UserPurchases,
  as: "purchases",
  foreignKey: "buyerId",
});

//-- NFT RELATIONS
Nft.belongsTo(User);
Nft.belongsTo(Collection);
Nft.belongsTo(Transaction);
Nft.hasMany(Review);

//--COLLECTION RELATIONS
Collection.belongsTo(User);
Collection.hasMany(Nft);
Collection.hasMany(Review);

//--TRANSACTIONS RELATIONS
Transaction.belongsToMany(User, {
  through: UserPurchases,
  as: "buyer",
  foreignKey: "purchaseId",
});
Transaction.belongsToMany(User, {
  through: UserSales,
  as: "seller",
  foreignKey: "saleId",
});
Transaction.hasMany(Nft, { as: "tokens" });

//--REVIEW RELATIONS
Review.belongsTo(User);
Review.belongsTo(Nft);
Review.belongsTo(Collection);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
