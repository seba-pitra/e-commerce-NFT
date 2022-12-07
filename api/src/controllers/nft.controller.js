const fetch = require("node-fetch");
const { allNFTs } = require("../nft");

const getNfts = async () => {
  if (!allNFTs.length) throw new Error("No NFT found");

  return allNFTs;
};

const searchNftById = async (id) => {};

const searchNftByName = async (name) => {};

const createNft = async () => {};

const update = async (attribute, value, dogId) => {};

const deleteController = async (id) => {};

module.exports = { getNfts };
