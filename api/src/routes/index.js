const { Router } = require("express");
const nftRouter = require("./nftRouter.js");
const userRouter = require("./user.router");

const router = Router();

router.use("/nft", nftRouter);
router.use("/user", userRouter);

module.exports = router;
