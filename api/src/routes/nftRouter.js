// const {  } = require("../db");
const { Router } = require("express");
const { getNfts } = require("../controllers/nft.controller");

const nftRouter = Router();

nftRouter.post("/", async (req, res) => {
  // try {
  //   res.status(201).json();
  // } catch (err) {
  //   res.status(400).send(err.message);
  // }
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
  // try {
  // } catch (error) {
  // }
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
