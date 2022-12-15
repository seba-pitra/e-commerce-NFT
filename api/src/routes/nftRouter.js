const { Router } = require("express");
const {
  getNfts,
  searchNftById,
  createAllInitialNFTs,
  createNft,
  deleteNft,
  updateNFT,
} = require("../controllers/nft.controller");

const nftRouter = Router();

nftRouter.post("/", async (req, res) => {
  try {
    const newNft = await createNft(req.body);
    res.status(201).send(newNft);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

nftRouter.post("/initialNFTs", async (req, res) => {
  try {
    res.status(201).send("se crearon correctamente");
  } catch (err) {
    res.status(400).send(err);
  }
});

nftRouter.get("/", async (req, res) => {
  try {
    let allNfts = await getNfts();
    if (allNfts.length === 0) {
      allNfts = await createAllInitialNFTs();
    }
    res.status(200).send(allNfts);
  } catch (err) {
    console.log(err.message);
    res.status(404).send(err.message);
  }
});

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
