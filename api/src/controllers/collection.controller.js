const { reauthenticateWithCredential } = require("firebase/auth");
const { Collection } = require("../db");
const { collections } = require("../jsondata/collections.json")

const getCollections = async (req, res) => {
  try{
    const dbCollections = await Collection.findAll();
    if(dbCollections.length === 0){
      throw new Error("nothing on database please contact Mr. Miguel Villa");
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
  try{
    const response = await Collection.findAll();
    if(response.length === 0){
      collections.forEach(async collection => {
        let collectionToDB = {
          id : collection.id,
          name : collection.name || "No name",
          image : collection.image || "No image"
        };
        const collectionInDB = await Collection.create(collectionToDB)
        response.push(collectionInDB);
      })
    }
      return response;
  }catch(err) {
    throw new Error(err.message);
  }
}


module.exports = {
  getCollections,
  postAllCollectionsToDB,
  createAllInitialCollections
};
