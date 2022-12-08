const { Router } = require("express");
const {
  getNfts,
  searchNftById,
  createAllInitialNFTs,
  createNft,
  changeAvailablePropertyNft,
  deleteNft,
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
    const createdNFTs = await createAllInitialNFTs();
    res.status(201).send("se crearon correctamente");
  } catch (err) {
    res.status(400).send(err);
  }
});

nftRouter.get("/", async (req, res) => {
  try {
    const foundNFTs = await getNfts();
    res.status(200).send(foundNFTs);
  } catch (err) {
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

nftRouter.put("/:attribute", async (req, res) => {
  try {
    const createdNFTs = await createAllInitialNFTs();
    res.status(201).json(createdNFTs);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

nftRouter.delete("/available/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const nftName = await changeAvailablePropertyNft(id);
    res.status(200).json(nftName);
  } catch (err) {
    res.status(404).send(err.message);
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
