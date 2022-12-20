const { Router } = require("express");
const nftRouter = require("./nftRouter.js");
const collection = require("./collection.router");
const paymentRouter = require("./paymentRouter");
const userRouter = require("./user.router.js");
const router = Router();

router.use("/nft", nftRouter);
router.use("/collection", collection);
router.use("/payment", paymentRouter);
router.use("/user", userRouter);

module.exports = router;
