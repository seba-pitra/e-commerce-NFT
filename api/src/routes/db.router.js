const { Router } = require("express");
const { postEverythingToDB, getEverythingFromDB } = require("../controllers/db.controller")

const dbRouter = Router();

dbRouter.post("/createAll", postEverythingToDB);

dbRouter.get("/getAll", getEverythingFromDB);

module.exports = dbRouter;
