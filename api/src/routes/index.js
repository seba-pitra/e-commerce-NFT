const { Router } = require("express");
const nftRouter = require("./nftRouter.js");
const collectionRouter = require("./collection.router");
const paymentRouter = require("./paymentRouter");
const userRouter = require("./user.router.js");
const dbRouter = require("./db.router");
const purchaseRouter = require("./purchase.router");
const fungiblemail = require("./fungiblemailRouter.js");
const reviewRouter = require("./review.router.js");

const router = Router();

router.use("/nft", nftRouter);
router.use("/collection", collectionRouter);
router.use("/database", dbRouter);
router.use("/payment", paymentRouter);
router.use("/user", userRouter);
router.use("/purchase", purchaseRouter);
router.use("/fungiblemail", fungiblemail);
router.use("/review", reviewRouter);

module.exports = router;
