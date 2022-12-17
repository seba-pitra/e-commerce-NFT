const { Router } = require("express");
const { getCollections, postAllCollectionsToDB } = require("../controllers/collection.controller");

const collectionRouter = Router();

collectionRouter.post("/postToDB", postAllCollectionsToDB)

collectionRouter.get("/", getCollections);

module.exports = collectionRouter;
