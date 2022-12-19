const allNFTs = require('../jsondata')
const { Nft, Collection } = require("../db");



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

const searchNftById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundNftFromDB = await Nft.findByPk(id);
    res.status(200).send(foundNftFromDB);
  } catch (err) {
    res.status(400).send(err.message);
  }
};


const updateNft = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNFT = await updateNFT(id, req.body);
    res.status(201).json(updatedNFT);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const createNewNFT = async (req, res) => {
  const { name, image, price, collectionId, available } = req.body;

};

/*
* function to add all nfts to the database using jsons as the base data.
*/

const createAllInitialNFTs = async () => {
  try {
    const response = await Nft.findAll();
    if(response.length === 0){
      allNFTs.forEach(async (nft) => {
        let nftToDB = {
        name: nft.token.name || "No name",
        image: nft.token.image || "No image",
        available: true,
        contract: nft.token.contract,
        tokenId: nft.token.tokenId,
        price: nft.market.floorAsk.price.amount.decimal || 0.0
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
  }
    }catch (err) {
      throw new Error(err.message)
    }
  };

module.exports = {
  getNfts,
  searchNftById,
  createAllInitialNFTs,
  updateNft,
  createNewNFT
};
