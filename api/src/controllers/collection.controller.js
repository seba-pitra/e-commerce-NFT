const { reauthenticateWithCredential } = require("firebase/auth");
const { Collection } = require("../db");
const { collections } = require("../jsondata/collections.json")

const getCollections = async (req, res) => {
  try{
    let dbCollections = await Collection.findAll();
    if(dbCollections.length === 0){
      dbCollections = await createAllInitialCollections();
    }
    return res.status(200).json(dbCollections);
  }catch(err){
    return res.status(400).json({error : err.message});
  }
};

const postAllCollectionsToDB = async (req, res) => {
  try{
    const allCollections = createAllInitialCollections();
    res.status(200).json(allCollections);
  }catch(err){
    res.status(400).json({error : err.message});
  }
}

const createAllInitialCollections = async () => {
  const response = [];
  collections.forEach(async collection => {
    let collectionToDB = {
      id : collection.collectionId,
      name : collection.name,
      image : collection.image
    }
    const collectionInDB = await Collection.create(collectionToDB)
    response.push(collectionInDB);
  })
  return response;
}


module.exports = {
  getCollections,
  postAllCollectionsToDB,
  createAllInitialCollections
};
