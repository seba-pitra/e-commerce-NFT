const { Router } = require("express");
const {
    getCollections,
    getCollectionById,
    createNewCollection,
    deleteCollection,
    updateCollection,
    restoreDeletedCollection,
} = require("../controllers/collection.controller");

const collectionRouter = Router();

collectionRouter.get("/", getCollections);

collectionRouter.post("/create", createNewCollection);

collectionRouter.get("/:id", getCollectionById);

collectionRouter.put("/:id", updateCollection);

collectionRouter.delete("/:id", deleteCollection);

collectionRouter.put("/restore/:id", restoreDeletedCollection);


module.exports = collectionRouter;
