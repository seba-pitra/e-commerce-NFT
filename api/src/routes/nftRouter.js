const { Router } = require("express");
const {
  getNfts,
  searchNftById,
  createAllInitialNFTs,
  /* createNewNFT, */
  /*   deleteNft,
  updateNFT, */
} = require("../controllers/nft.controller");

const nftRouter = Router();

/* nftRouter.post("/", createNewNFT); */

nftRouter.get("/", getNfts);

nftRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundNft = await searchNftById(id);
    res.status(200).send(foundNft);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

nftRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNFT = await updateNFT(id, req.body);
    res.status(201).json(updatedNFT);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

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
