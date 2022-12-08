const fetch = require("node-fetch");
const { updatedNFTs, allCollections, allNFTs } = require("../nft");
const { Nft, Collection } = require("../db");

const createAllInitialNFTs = async () => {
  allNFTs.forEach(async (data) => {
    let nftToCreated = {
      type: data.type,
      name: (data.tokenData && data.tokenData.name) || "no name found",
      image: (data.tokenData && data.tokenData.image) || "no image found",
      available: data.available,
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
  const dbNfts = await Nft.findAll();
  if (!dbNfts.length) throw new Error("No NFT found");

  return dbNfts;
};

const searchNftById = async (id) => {
  const foundNftFromDB = await Nft.findByPk(id);

  if (!foundNftFromDB) throw new Error("No dog found");
  return foundNftFromDB;
};

const updateNFT = async (attribute, value, dogId) => {
  try {
    if (!body || !nftId) throw new Error("Iinsuficient data for update");

    const { price, userId } = body;
    const selectedNFT = await Nft.findByPk(nftId);

    if (!selectedNFT) throw new Error("No NFT found");

    //UserUpdate temporaly outOfService

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

const changeAvailablePropertyNft = async (id) => {
  const foundNft = await Nft.findByPk(id);

  if (!foundNft) throw new Error("No NFT found");

  if (foundNft.available) foundNft.available = false;
  else if (!foundNft.available) foundNft.available = true;

  await foundNft.save();

  return foundNft;
};

const deleteNft = async (id) => {
  const foundNft = await Nft.findByPk(id);

  if (!foundNft) throw new Error("No NFT found");

  const nftName = foundNft.name;

  await foundNft.destroy();

  return nftName;
};

module.exports = {
  getNfts,
  searchNftById,
  createAllInitialNFTs,
  createNft,
  changeAvailablePropertyNft,
  deleteNft,
  updateNFT,
};
