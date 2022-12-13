const { Router } = require("express");
const nftRouter = require("./nftRouter.js");
const userRouter = require("./user.router");
const collectionRouter = require("./collection.router");
const paymentRouter = require("./paymentRouter");

const router = Router();

router.use("/nft", nftRouter);
router.use("/user", userRouter);
router.use("/collection", collectionRouter);
router.use("/payment", paymentRouter);

module.exports = router;
