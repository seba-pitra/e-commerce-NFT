const { Router } = require("express");
const nftControllers = require("../controllers/nft.controller");

const nftRouter = Router();

nftRouter.get("/", nftControllers.getNfts);

nftRouter.get("/howMany", nftControllers.getNftQuantity);

nftRouter.post("/create", nftControllers.createNewNFT)

nftRouter.get("/:id", nftControllers.getNftById);

nftRouter.put("/:id", nftControllers.updateNft);

nftRouter.put("/addView/:id", nftControllers.addViewsNft);

/* nftRouter.put("/addStar/:id", nftControllers.addStarsNft); */ // esto se calcula automaticamente en add review.

nftRouter.delete("/:id", nftControllers.deleteNft);

nftRouter.get("/restore/:id", nftControllers.restoreDeletedNft)

nftRouter.put("/transferTo/:id", nftControllers.changeNftOwner)


module.exports = nftRouter;
