const { Router } = require("express");
const { postEverythingToDB, getEverythingFromDB, postQuantityToDB } = require("../controllers/db.controller")

const dbRouter = Router();

dbRouter.get("/getAll", getEverythingFromDB);

dbRouter.get("/create/:nftQuantity", postQuantityToDB);

dbRouter.get("/createAll", postEverythingToDB);


module.exports = dbRouter;
