const { Router } = require("express");
const {
  getNfts,
  getNftById,
  updateNft,
  createNewNFT,
  deleteNft,
  restoreDeletedNft
} = require("../controllers/nft.controller");

const nftRouter = Router();

nftRouter.get("/", getNfts);

nftRouter.post("/", createNewNFT)

nftRouter.get("/:id", getNftById);

nftRouter.put("/:id", updateNft);

nftRouter.delete("/:id", deleteNft);

nftRouter.put("/restore/:id", restoreDeletedNft)

module.exports = nftRouter;
