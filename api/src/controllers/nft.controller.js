const fetch = require("node-fetch");
const { updatedNFTs, allCollections, allNFTs } = require("../nft");
const { Nft, Collection } = require("../db");

const createAllInitialNFTs = async () => {
  // let allNFTsCreated = await Nft.bulkCreate(updatedNFTs);

  // return allNFTsCreated; 

  allNFTs.forEach(async (data) => {
    let nftToCreated = {
      id:data.id,
      type:data.type,
      contract: data.contract,
      tokenId:data.tokenId,
      price: data.price,
      source: data.source,
      tokenData: data.tokenData
    }

    let createdNft = await Nft.create(nftToCreated);

    let createdCollection = await Collection.findOrCreate({
      where: {
        description: data.collectionId
      }
    }).then(([collection, created]) => collection);

    await createdNft.setCollection(createdCollection);
  })

};

const getNfts = async () => {
  const dbNfts = await Nft.findAll({
    include: {
      model: Collection,
      attributes: ["description"],
    },
  });
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

module.exports = { getNfts, searchNftById ,createAllInitialNFTs,  };
