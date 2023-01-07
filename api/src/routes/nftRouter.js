const { Router } = require("express");
const {
  getNfts,
  getNftById,
  updateNft,
  addViewsNft,
  addStarsNft,
  createNewNFT,
  deleteNft,
  restoreDeletedNft,
  changeNftOwner,
  getNftQuantity
} = require("../controllers/nft.controller");

const nftRouter = Router();

nftRouter.get("/", getNfts);

nftRouter.get("/howMany", getNftQuantity);

nftRouter.post("/create", createNewNFT)

nftRouter.get("/:id", getNftById);

nftRouter.put("/:id", updateNft);

nftRouter.put("/addView/:id", addViewsNft);

nftRouter.put("/addStar/:id", addStarsNft);

nftRouter.delete("/:id", deleteNft);

nftRouter.get("/restore/:id", restoreDeletedNft)

nftRouter.put("/transfer/:id", changeNftOwner)


module.exports = nftRouter;
