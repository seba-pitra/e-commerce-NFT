const { Router } = require("express");
const dbControllers = require("../controllers/db.controller")

const dbRouter = Router();

dbRouter.get("/getAll", dbControllers.getEverythingFromDB);

dbRouter.get("/create", dbControllers.postNftsToDB);

dbRouter.get("/create/:nftQuantity", dbControllers.postNftsToDB);

module.exports = dbRouter;
