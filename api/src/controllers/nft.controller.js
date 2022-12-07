const fetch = require("node-fetch");
const { allNFTs } = require("../../../client/src/nft");
const { Nft } = require("../db");

// const createAllInitialNFTs = async () => {
//   let allNFTsCreated = await Nft.bulkCreate(allNFTs);

//   return allNFTsCreated;
// };

const getNfts = async () => {
  const dbNfts = await Nft.findAll();

  if (!dbNfts.length) throw new Error("No NFT found");

  return dbNfts;
};

const searchNftById = async (id) => {
  const foundNftFromDB = await Nft.findByPk(id);

  if (!foundNftFromDB) throw new Error("No dog found");

  return foundNftFromDB;
};

const searchNftByName = async (name) => {};

const createNft = async () => {};

const update = async (attribute, value, dogId) => {};

const deleteController = async (id) => {};

module.exports = { getNfts, searchNftById /*createAllInitialNFTs */ };
