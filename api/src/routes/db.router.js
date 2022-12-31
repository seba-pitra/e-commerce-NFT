const { Router } = require("express");
const { postNftsToDB, getEverythingFromDB } = require("../controllers/db.controller")

const dbRouter = Router();

dbRouter.get("/getAll", getEverythingFromDB);

dbRouter.get("/create", postNftsToDB);

dbRouter.get("/create/:nftQuantity", postNftsToDB);

module.exports = dbRouter;
