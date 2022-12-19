const { Router } = require("express");
const nftRouter = require("./nftRouter.js");
const collection = require("./collection.router");
const firebaseRouter = require("./login.js");
const paymentRouter = require("./paymentRouter");
const dbRouter = require("./db.router")
const router = Router();

router.use("/nft", nftRouter);
router.use("/collection", collection);
router.use("/database", dbRouter);
router.use("/login", firebaseRouter);
router.use("/payment", paymentRouter);

module.exports = router;
