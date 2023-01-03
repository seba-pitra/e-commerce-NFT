const { Router } = require("express");
const {
  getNfts,
  getNftById,
  updateNft,
  addViewsNft,
  createNewNFT,
  deleteNft,
  restoreDeletedNft
} = require("../controllers/nft.controller");

const nftRouter = Router();

nftRouter.get("/", getNfts);

nftRouter.post("/create", createNewNFT)

nftRouter.get("/:id", getNftById);

nftRouter.put("/:id", updateNft);

nftRouter.put("/addView/:id", addViewsNft);

nftRouter.delete("/:id", deleteNft);

nftRouter.put("/restore/:id", restoreDeletedNft)

module.exports = nftRouter;
