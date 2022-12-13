const { Router } = require("express");

const nftRouter = require("./nftRouter.js");
const firebaseRouter = require("./login.js")

const router = Router();

router.use("/nft", nftRouter);
router.use("/login", firebaseRouter);

module.exports = router;
