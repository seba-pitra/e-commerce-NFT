const { Router } = require("express");
const nftRouter = require("./nftRouter.js");
const collection = require("./collection.router");
const paymentRouter = require("./paymentRouter");
const userRouter = require("./user.router.js");
const dbRouter = require("./db.router")
const buyRouter = require("./buy.router")
const fungiblemail = require ("./fungiblemailRouter.js")
const reviewRouter = require("./review.router.js");

const router = Router();

router.use("/nft", nftRouter);
router.use("/collection", collection);
router.use("/database", dbRouter);
router.use("/payment", paymentRouter);
router.use("/user", userRouter);
router.use("/buy", buyRouter)
router.use("/fungiblemail", fungiblemail);
router.use("/review", reviewRouter)

module.exports = router;
