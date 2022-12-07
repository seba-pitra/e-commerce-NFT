const { Router } = require("express");
const {
  getNfts,
  searchNftById,
  createAllInitialNFTs,
  createNft,
} = require("../controllers/nft.controller");

const nftRouter = Router();

nftRouter.post("/", async (req, res) => {
  try {
    const newNft = await createNft(req.body);
    res.status(201).send("todo ok");
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
  // try {
  // } catch (err) {
  // }
});

nftRouter.delete("/:id", async (req, res) => {
  // try {
  // } catch (err) {
  // }
});

module.exports = nftRouter;
