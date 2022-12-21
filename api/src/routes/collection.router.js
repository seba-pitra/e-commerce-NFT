const { Router } = require("express");
const { getCollections } = require("../controllers/collection.controller");

const collectionRouter = Router();

collectionRouter.get("/", getCollections);

module.exports = collectionRouter;
