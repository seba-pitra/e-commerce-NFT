const fetch = require("node-fetch");
const { updatedNFTs, allCollections, allNFTs } = require("../nft");
const { Nft, Collection } = require("../db");

const createAllInitialNFTs = async () => {
  allNFTs.forEach(async (data) => {
    let nftToCreated = {
      type: data.type,
      name: (data.tokenData && data.tokenData.name) || "no name found",
      image: (data.tokenData && data.tokenData.image) || "no image found",
      contract: data.contract,
      tokenId: data.tokenId,
      price: data.price,
      source: data.source,
    };

    let createdCollection = await Collection.findOrCreate({
      where: {
        id: data.collectionId,
      },
    }).then(([collection, created]) => collection);

    let createdNft = await Nft.create(nftToCreated);

    await createdNft.setCollection(createdCollection);
  });
};

const createNft = async (body) => {
  const { name, type, contract, price, source } = body;

  const validate = !name || !type || !contract || !price;

  if (validate) throw new Error("Mandatory fields are missing");

  const [newNft, foundNft] = Nft.findOrCreate({
    where: { name },
    defaults: body,
  });

  if (foundNft) {
    console.log("nft already exist");
  } else {
    console.log("nft created");
  }
};

const getNfts = async () => {
  const dbNfts = await Nft
    .findAll
    /* {
    include: {
      model: Collection,
      attributes: ["id"],
    },
  } */
    ();
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
