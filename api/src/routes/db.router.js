const { Router } = require("express");
const { postEverythingToDB, getEverythingFromDB, postQuantityToDB } = require("../controllers/db.controller")

const dbRouter = Router();

dbRouter.get("/createAll", postEverythingToDB);

dbRouter.get("/getAll", getEverythingFromDB);

dbRouter.get("/create/:nftQuantity", postQuantityToDB);

module.exports = dbRouter;
