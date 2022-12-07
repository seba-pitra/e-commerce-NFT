const fetch = require("node-fetch");
const { updatedNFTs, allCollections, allNFTs } = require("../nft");
const { Nft, Collection } = require("../db");

const createAllInitialNFTs = async () => {
  allNFTs.forEach(async (data) => {
    let nftToCreated = {
      id: data.id,
      type: data.type,
      contract: data.contract,
      tokenId: data.tokenId,
      price: data.price,
      source: data.source,
      tokenData: data.tokenData,
    };

    let createdNft = await Nft.create(nftToCreated);

    let createdCollection = await Collection.findOrCreate({
      where: {
        description: data.collectionId,
      },
    }).then(([collection, created]) => collection);

    console.log("CREADOS", createdCollection);

    await createdNft.setCollection(createdCollection);
  });
};

const createNft = async (body) => {
  const { type, contract, price, source, tokenData } = body;

  const validate = !type || !contract || !price || !source || !tokenData;

  if (validate) throw new Error("Mandatory fields are missing");

  const tokenName = tokenData.name;

  const [newNft, foundNft] = Nft.findOrCreate({
    where: { test: body.tokenData.name },
  });

  console.log("todo tranquilo");

  if (foundNft) {
    console.log("nft already exist");
  } else {
    return newNft;
  }
};

const getNfts = async () => {
  const dbNfts = await Nft.findAll({
    include: {
      model: Collection,
      through: { attributes: [] },
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

const update = async (attribute, value, dogId) => {};

const deleteController = async (id) => {};

module.exports = {
  getNfts,
  searchNftById,
  createAllInitialNFTs,
  createNft,
};
