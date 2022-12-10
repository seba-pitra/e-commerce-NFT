const { Router } = require("express");
const nftRouter = require("./nftRouter.js");
const userRouter = require("./user.router");
const collectionRouter = require("./collection.router");

const router = Router();

router.use("/nft", nftRouter);
router.use("/user", userRouter);
router.use("/collection", collectionRouter);

module.exports = router;
