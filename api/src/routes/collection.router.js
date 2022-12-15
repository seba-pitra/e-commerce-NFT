const { Router } = require("express");
const { getCollections } = require("../controllers/collection.controller");

const collectionRouter = Router();

collectionRouter.get("/", async (req, res) => {
  try {
    const foundCollections = await getCollections();
    res.status(200).send(foundCollections);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = collectionRouter;
