const allNFTs = require('../jsondata')
const { Nft, Collection } = require("../db");

const getNfts = async (req, res) => {
  try {
    const dbNfts = await Nft.findAll({
      include: {
        model : Collection
      }
    });
    if(dbNfts.length === 0){
      throw new Error("nothing on database please contact Mr. Miguel Villa");
    }
    res.status(200).send(dbNfts);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const getNftById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundNftFromDB = await Nft.findByPk(id);
    if(foundNftFromDB){
      res.status(200).json(foundNftFromDB);
    }else{
      throw new Error(`No nft with id ${id}`)
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};


const updateNft = async (req, res) => {
  try{
    const { id } = req.params;
    const dataToUpdate = req.body;
    const [updatedNft, created] = await Nft.upsert({
      id : id,
      ...dataToUpdate
    })
    res.status(200).send(updatedNft);
  }catch(err){
    res.status(400).send(err.message);
  }
};

const createNewNFT = async (req, res) => {
  try{
      const {
        name,
        description,
        image,
        contract,
        tokenId,
        price,
        ownerName,
        ownerIcon,
      } = req.body;
      if(!name || !image || !tokenId || !price || !ownerName || !ownerIcon){
        throw new Error(`Insufficient data provided`)
      }

      const newNFT = await Nft.create({
        name: name,
        description: description,
        image : image,
        contract: contract || "No corresponding contract",
        tokenId: tokenId,
        price: price,
        ownerName: ownerName,
        ownerIcon: ownerIcon,
      });

      if(contract){
        const correspondingCollection = await Collection.findByPk({
          where : {
            id: contract
          }
        })
        if(correspondingCollection){ 
          await newNFT.setCollection(correspondingCollection)
        }else{
          throw new Error(`No collection found with id  ${contract}`)
        }
      }

      res.status(200).json(newNFT);
    }catch(err){
      res.status(400).send(err.message);
    }
  };

const deleteNft = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNFT = await Nft.findByPk({
      where: {
        id: id,
      }
    })
    if (deletedNFT) {
      await Nft.destroy({
        where : {
          id: id,
        }
      });
      return res.status(200).send(`${deletedNFT.name}  successfully deleted`);
    }else {
      throw new Error(`no NFT found with id: ${id}`)
    }
  }catch (err) {
    return res.status(400).json({error : err.message})
  }
  
}

const restoreDeletedNft = async (req, res) => {
  try {
    const { id } = req.params;
    await Nft.restore({
      where : {
        id : id,
      }
    })
    const restoredNft = await Nft.findByPk({
      where : {
        id : id,
      }
    })
    if(restoredNft){
      return res.status(200).json({
        nft : restoredNft,
        message : `${restoredNft.name} successfully restored`
      })
    }else{
      throw new Error(`No nft found with id ${id}`)
    }
  }catch(err){
    return res.status(400).json({err : err.message})
  }
}

/*
* function to add all nfts to the database using jsons as the base data.
*/

const createAllInitialNFTs = async () => {
  try {
    const response = await Nft.findAll();
    if(response.length === 0){
      allNFTs.forEach(async (nft) => {
        let nftName = nft.token.name || nft.token.collection.name + " #" + nft.token.tokenId

        nftName = nftName.charAt(0) === "#" ? nft.token.collection.name + " " + nftName : nftName
        nftName = nftName.includes("#") ? nftName : nftName + " #" + nft.token.tokenId

        let nftToDB = {
        name: nftName,
        description: nft.token.description || "No description",
        image: nft.token.image || "No image",
        contract: nft.token.contract,
        category: nft.token.category || ["Otros"],
        tokenId: nft.token.tokenId,
        price: nft.market.floorAsk.price.amount.decimal,
        rarity: nft.token.rarity || 0.0,
        rarityRank: nft.token.rarityRank || 0.0,
        lastBuyValue: nft.token.lastBuy.value || 0.0,
        lastBuyTs: nft.token.lastBuy.timestamp || 0.0,
        lastSellValue: nft.token.lastSell.value || 0.0,
        lastSellTs: nft.token.lastSell.timestamp || 0.0,
        ownerName: nft.market.floorAsk.source.name || "OpenSea",
        ownerIcon: nft.market.floorAsk.source.icon || "OpenSea Icon"
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
  getNftById,
  createAllInitialNFTs,
  updateNft,
  createNewNFT,
  deleteNft,
  restoreDeletedNft
};
