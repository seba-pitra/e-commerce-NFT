const fetch = require("node-fetch");
const { updatedNFTs, allCollections, allNFTs } = require("../nft");
const { Nft, Collection } = require("../db");

const createAllInitialNFTs = async () => {
  allNFTs.forEach(async (data) => {
    let nftToCreated = {
      type: data.type,
      name: (data.tokenData && data.tokenData.name) || null,
      image: (data.tokenData && data.tokenData.image) || null,
      available: data.available,
      contract: data.contract,
      tokenId: data.tokenId,
      price: data.price,
      category: data.category,
      source: data.source,
    };

    try {
      let createdNft = await Nft.create(nftToCreated);

      let createdCollection = await Collection.findOrCreate({
        where: {
          id: data.collection.collectionId,
        },
        defaults: {
          id: data.collection.collectionId,
          name: data.collection.name,
          image: data.collection.image,
        },
      }).then(([collection, created]) => collection);

      await createdNft.setCollection(createdCollection);
    } catch (error) {
      console.log("Can´t create NFT " + data.id);
    }
  });
};

const createNft = async (body) => {
  const { name, image, type, contract, price, collectionId, available } = body;

  const validate =
    !name || !image || !type || !contract || !price || !available;

  if (validate) throw new Error("Mandatory fields are missing");

  const newNft = await Nft.findOrCreate({
    where: { name },
    defaults: body,
  }).then(([nft, created]) => {
    if (!created) throw new Error("NFT already exists with this name");

    return nft;
  });

  await newNft.setCollection(collectionId);

  return newNft;
};

const getNfts = async () => {
  const dbNfts = await Nft.findAll({
    include: [
      {
        model: Collection,
      },
    ],
  });
 /*  if (!dbNfts.length) throw new Error("No NFT found"); */

  return dbNfts;
};

const searchNftById = async (id) => {
  const foundNftFromDB = await Nft.findByPk(id);

  if (!foundNftFromDB) throw new Error("No dog found");
  return foundNftFromDB;
};

const updateNFT = async (nftId, body) => {
  try {
    if (!body || !nftId) throw new Error("Iinsuficient data for update");

    const { price, userId } = body;
    const selectedNFT = await Nft.findByPk(nftId);

    if (!selectedNFT) throw new Error("No NFT found");

    //UserUpdate temporaly disabled

    // if (userId) {
    //   const selectedUser = await User.findByPk(userId);
    //   if (!selectedUser) throw new Error("No User Found");
    //   await selectedNFT.setUser(selectedUser);
    //   await selectedNFT.save();
    // }

    if (price) {
      await selectedNFT.set({ price: price });
      await selectedNFT.save();
    }
    return selectedNFT;
  } catch (error) {
    throw error;
  }
};

const deleteNft = async (id) => {
  const foundNft = await Nft.findByPk(id);

  if (!foundNft) throw new Error("No NFT found");

  if (foundNft.available) foundNft.available = false;
  else if (!foundNft.available) foundNft.available = true;

  await foundNft.save();

  return foundNft.name;
};

module.exports = {
  getNfts,
  searchNftById,
  createAllInitialNFTs,
  createNft,
  deleteNft,
  updateNFT,
};
