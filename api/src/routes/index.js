const { Router } = require("express");
const nftRouter = require("./nftRouter.js");

const router = Router();

router.use("/nft", nftRouter);

module.exports = router;
