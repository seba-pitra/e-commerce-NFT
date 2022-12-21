const { Router } = require("express");
const {
  getNfts,
  searchNftById,
  updateNft,
  createNewNFT,
  deleteNft,
} = require("../controllers/nft.controller");

const nftRouter = Router();

nftRouter.get("/", getNfts);

nftRouter.post("/", createNewNFT)

nftRouter.get("/:id", searchNftById);

nftRouter.put("/:id", updateNft);


nftRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const nftName = await deleteNft(id);
    res.status(200).send(`${nftName} was deleted successfully`);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = nftRouter;
