const { Router } = require("express");
const nftRouter = require("./nftRouter.js");
const collection = require("./collection.router");
const firebaseRouter = require("./login.js");
const router = Router();

router.use("/nft", nftRouter);
router.use("/login", firebaseRouter);
router.use("/collection", collection); 

module.exports = router;
