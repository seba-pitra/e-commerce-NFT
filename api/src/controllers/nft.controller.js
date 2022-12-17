const allNFTs = require('../jsondata')
const { Nft, Collection } = require("../db");


/* const createNewNFT = async (req, res) => {
  const { name, image, contract, price, collectionId, available } = body;
  
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
}; */

const getNfts = async (req, res) => {
  try {
    const dbNfts = await Nft.findAll({});
    if(dbNfts.length === 0){
      throw new Error("nothing on database please contact Mr. Miguel Villa");
    }
    res.status(200).send(dbNfts);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const searchNftById = async (id) => {
  const foundNftFromDB = await Nft.findByPk(id);
  if (!foundNftFromDB) throw new Error("No NFT exists with this id");
  return foundNftFromDB;
};

/*
* function to add all nfts to the database using jsons as the base data.
*/

const createAllInitialNFTs = async () => {
    const response = [];

    allNFTs.forEach(async (nft) => {
    let nftToDB = {
      name: nft.token.name,
      image: nft.token.image,
      available: true,
      contract: nft.token.contract,
      tokenId: nft.token.tokenId,
      price: nft.market.floorAsk.price.amount.decimal,
    };

    const nftInDb = await Nft.create(nftToDB);
    const correspondingCollection = await Collection.findOne({
      where: {
        id: nft.token.collection.id
      }
    });

    await nftInDb.setCollection(correspondingCollection);
    response.push(nftInDb);
  });
  
  return response;
};
module.exports = {
  getNfts,
  searchNftById,
  createAllInitialNFTs,
  /* createNft, */
};
