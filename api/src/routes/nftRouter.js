const { Router } = require("express");
const {
  getNfts,
  getNftById,
  updateNft,
  createNewNFT,
  deleteNft,
  restoreDeletedNft,
  changeNftOwner
} = require("../controllers/nft.controller");

const nftRouter = Router();

nftRouter.get("/", getNfts);

nftRouter.post("/create", createNewNFT)

nftRouter.get("/:id", getNftById);

nftRouter.put("/:id", updateNft);

nftRouter.delete("/:id", deleteNft);

nftRouter.get("/restore/:id", restoreDeletedNft)

nftRouter.put("/transfer/:id", changeNftOwner)

module.exports = nftRouter;
