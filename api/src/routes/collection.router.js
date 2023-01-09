const { Router } = require("express");
const collectionControllers = require("../controllers/collection.controller");

const collectionRouter = Router();

collectionRouter.get("/", collectionControllers.getCollections);

collectionRouter.post("/create", collectionControllers.createNewCollection);

collectionRouter.get("/:id", collectionControllers.getCollectionById);

collectionRouter.put("/:id", collectionControllers.updateCollection);

collectionRouter.delete("/:id", collectionControllers.deleteCollection);

collectionRouter.get("/restore/:id", collectionControllers.restoreDeletedCollection);


module.exports = collectionRouter;
